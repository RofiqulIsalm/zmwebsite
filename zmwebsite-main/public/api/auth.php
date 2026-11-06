<?php
/**
 * ==============================================================================
 * ZM PRINTING & DESIGN LTD. - AUTHENTICATION API (HYBRID DATABASE & ZERO-CONFIG)
 * ==============================================================================
 */

require_once __DIR__ . '/db.php';

set_api_headers();

$action = $_GET['action'] ?? '';
$ip = get_client_ip();

// Helper to check brute force status
function check_rate_limit($ip, $username) {
    $db = get_db(false);
    if ($db) {
        try {
            $cutoff = date('Y-m-d H:i:s', time() - LOGIN_LOCKOUT_TIME);
            $stmt = $db->prepare("
                SELECT COUNT(*) as fail_count 
                FROM zm_login_attempts 
                WHERE (ip_address = ? OR username = ?) 
                  AND status = 'failed' 
                  AND attempted_at > ?
            ");
            $stmt->execute([$ip, $username, $cutoff]);
            $res = $stmt->fetch();
            return (int)($res['fail_count'] ?? 0);
        } catch (Exception $e) {}
    }

    // File-based rate limit fallback
    $limitFile = __DIR__ . '/.login_rate.json';
    if (!file_exists($limitFile)) return 0;
    $data = json_decode(file_get_contents($limitFile), true) ?: [];
    $key = md5($ip . '_' . $username);
    $cutoff = time() - LOGIN_LOCKOUT_TIME;
    if (isset($data[$key]) && $data[$key]['time'] > $cutoff) {
        return (int)$data[$key]['count'];
    }
    return 0;
}

function record_failed_attempt($ip, $username) {
    $db = get_db(false);
    if ($db) {
        try {
            $logStmt = $db->prepare("INSERT INTO zm_login_attempts (ip_address, username, status) VALUES (?, ?, 'failed')");
            $logStmt->execute([$ip, $username]);
        } catch (Exception $e) {}
    }

    $limitFile = __DIR__ . '/.login_rate.json';
    $data = file_exists($limitFile) ? (json_decode(file_get_contents($limitFile), true) ?: []) : [];
    $key = md5($ip . '_' . $username);
    $count = (isset($data[$key]) && $data[$key]['time'] > (time() - LOGIN_LOCKOUT_TIME)) ? $data[$key]['count'] + 1 : 1;
    $data[$key] = ['count' => $count, 'time' => time()];
    @file_put_contents($limitFile, json_encode($data));
}

function clear_failed_attempts($ip, $username) {
    $limitFile = __DIR__ . '/.login_rate.json';
    if (file_exists($limitFile)) {
        $data = json_decode(file_get_contents($limitFile), true) ?: [];
        $key = md5($ip . '_' . $username);
        unset($data[$key]);
        @file_put_contents($limitFile, json_encode($data));
    }
}

// ------------------------------------------------------------------------------
// 1. LOGIN
// ------------------------------------------------------------------------------
if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $username = trim($input['username'] ?? '');
    $password = (string)($input['password'] ?? '');

    if (empty($username) || empty($password)) {
        send_error("Username and password are required.", 400);
    }

    $failedAttempts = check_rate_limit($ip, $username);
    if ($failedAttempts >= MAX_LOGIN_ATTEMPTS) {
        log_audit('login_blocked', 'zm_admin_users', "Rate limit reached for IP: $ip, user: $username");
        send_error("Too many failed login attempts. Account temporarily locked for 15 minutes.", 429);
    }

    $db = get_db(false);
    $authenticated = false;
    $userInfo = null;

    // A. Verify with MySQL Database if available
    if ($db) {
        try {
            $stmt = $db->prepare("SELECT * FROM zm_admin_users WHERE username = ? AND is_active = 1 LIMIT 1");
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                $authenticated = true;
                $userInfo = [
                    'id'        => $user['id'],
                    'username'  => $user['username'],
                    'email'     => $user['email'],
                    'fullName'  => $user['full_name'],
                    'role'      => $user['role']
                ];

                try {
                    $logStmt = $db->prepare("INSERT INTO zm_login_attempts (ip_address, username, status) VALUES (?, ?, 'success')");
                    $logStmt->execute([$ip, $username]);
                    $upStmt = $db->prepare("UPDATE zm_admin_users SET last_login = NOW(), last_ip = ? WHERE id = ?");
                    $upStmt->execute([$ip, $user['id']]);
                } catch (Exception $e) {}
            }
        } catch (Exception $e) {
            // If MySQL table missing, fall back to file auth
        }
    }

    // B. Fallback: File-based Authentication (Zero-Config mode for cPanel)
    if (!$authenticated) {
        $authFile = __DIR__ . '/.admin_auth.php';
        $fileAuth = file_exists($authFile) ? (include $authFile) : null;
        if (!is_array($fileAuth)) {
            $fileAuth = [
                'username' => 'zmadmin',
                'password_hash' => password_hash('ZM_Admin#2026!', PASSWORD_DEFAULT),
                'email' => 'info@zmprintingbd.com',
                'fullName' => 'Site Administrator',
                'role' => 'admin'
            ];
            @file_put_contents($authFile, "<?php defined('API_ROOT') or die;\nreturn " . var_export($fileAuth, true) . ";\n");
        }

        if ($username === $fileAuth['username'] && password_verify($password, $fileAuth['password_hash'])) {
            $authenticated = true;
            $userInfo = [
                'id'        => 1,
                'username'  => $fileAuth['username'],
                'email'     => $fileAuth['email'],
                'fullName'  => $fileAuth['fullName'],
                'role'      => $fileAuth['role']
            ];
        }
    }

    if (!$authenticated) {
        record_failed_attempt($ip, $username);
        sleep(1);
        send_error("Invalid credentials.", 401);
    }

    // Login successful
    clear_failed_attempts($ip, $username);
    $token = create_auth_token($userInfo['id'], $userInfo['username'], $userInfo['role']);

    setcookie(AUTH_COOKIE_NAME, $token, [
        'expires'  => time() + SESSION_LIFETIME,
        'path'     => '/',
        'secure'   => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
        'httponly' => true,
        'samesite' => 'Strict'
    ]);

    log_audit('login_success', 'zm_admin_users', "User logged in: {$userInfo['username']}", $userInfo['id']);

    send_json([
        'success' => true,
        'token'   => $token,
        'user'    => $userInfo
    ]);
}

// ------------------------------------------------------------------------------
// 2. CHECK AUTH STATUS
// ------------------------------------------------------------------------------
if ($action === 'check') {
    $authUser = require_auth();
    $db = get_db(false);

    if ($db) {
        try {
            $stmt = $db->prepare("SELECT id, username, email, full_name, role FROM zm_admin_users WHERE id = ? AND is_active = 1");
            $stmt->execute([$authUser['uid']]);
            $user = $stmt->fetch();
            if ($user) {
                send_json([
                    'success' => true,
                    'user'    => [
                        'id'        => $user['id'],
                        'username'  => $user['username'],
                        'email'     => $user['email'],
                        'fullName'  => $user['full_name'],
                        'role'      => $user['role']
                    ]
                ]);
            }
        } catch (Exception $e) {}
    }

    send_json([
        'success' => true,
        'user'    => [
            'id'        => $authUser['uid'] ?? 1,
            'username'  => $authUser['usr'] ?? 'zmadmin',
            'email'     => 'info@zmprintingbd.com',
            'fullName'  => 'Site Administrator',
            'role'      => $authUser['rol'] ?? 'admin'
        ]
    ]);
}

// ------------------------------------------------------------------------------
// 3. LOGOUT
// ------------------------------------------------------------------------------
if ($action === 'logout') {
    setcookie(AUTH_COOKIE_NAME, '', [
        'expires'  => time() - 3600,
        'path'     => '/',
        'secure'   => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
        'httponly' => true,
        'samesite' => 'Strict'
    ]);
    send_json(['success' => true, 'message' => 'Logged out successfully.']);
}

// ------------------------------------------------------------------------------
// 4. CHANGE PASSWORD
// ------------------------------------------------------------------------------
if ($action === 'change_password' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $authUser = require_auth();
    $input = json_decode(file_get_contents('php://input'), true);
    $oldPass = (string)($input['oldPassword'] ?? '');
    $newPass = (string)($input['newPassword'] ?? '');

    if (strlen($newPass) < 8) {
        send_error("New password must be at least 8 characters long.", 400);
    }

    $db = get_db(false);
    $oldPassValid = false;
    $newHash = password_hash($newPass, PASSWORD_DEFAULT);

    if ($db) {
        try {
            $stmt = $db->prepare("SELECT password_hash FROM zm_admin_users WHERE id = ?");
            $stmt->execute([$authUser['uid']]);
            $user = $stmt->fetch();
            if ($user && password_verify($oldPass, $user['password_hash'])) {
                $oldPassValid = true;
                $upStmt = $db->prepare("UPDATE zm_admin_users SET password_hash = ? WHERE id = ?");
                $upStmt->execute([$newHash, $authUser['uid']]);
            }
        } catch (Exception $e) {}
    }

    $authFile = __DIR__ . '/.admin_auth.php';
    $fileAuth = file_exists($authFile) ? (include $authFile) : null;
    if (!is_array($fileAuth)) {
        $fileAuth = [
            'username' => 'zmadmin',
            'password_hash' => password_hash('ZM_Admin#2026!', PASSWORD_DEFAULT),
            'email' => 'info@zmprintingbd.com',
            'fullName' => 'Site Administrator',
            'role' => 'admin'
        ];
    }

    if (!$oldPassValid) {
        if (password_verify($oldPass, $fileAuth['password_hash'])) {
            $oldPassValid = true;
        }
    }

    if (!$oldPassValid) {
        send_error("Current password is incorrect.", 400);
    }

    $fileAuth['password_hash'] = $newHash;
    @file_put_contents($authFile, "<?php defined('API_ROOT') or die;\nreturn " . var_export($fileAuth, true) . ";\n");

    log_audit('password_changed', 'zm_admin_users', "Password updated", $authUser['uid']);
    send_json(['success' => true, 'message' => 'Password updated successfully.']);
}

send_error("Invalid auth action requested.", 400);
