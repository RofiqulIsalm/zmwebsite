<?php
/**
 * ==============================================================================
 * ZM PRINTING & DESIGN LTD. - AUTHENTICATION API
 * ==============================================================================
 */

require_once __DIR__ . '/db.php';

set_api_headers();

$action = $_GET['action'] ?? '';
$ip = get_client_ip();

// Helper to check brute force status
function check_rate_limit($ip, $username) {
    $db = get_db();
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

    $db = get_db();
    $stmt = $db->prepare("SELECT * FROM zm_admin_users WHERE username = ? AND is_active = 1 LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        // Record failure
        $logStmt = $db->prepare("INSERT INTO zm_login_attempts (ip_address, username, status) VALUES (?, ?, 'failed')");
        $logStmt->execute([$ip, $username]);
        
        sleep(1); // Time delay against automated bot attacks
        send_error("Invalid credentials.", 401);
    }

    // Success: record success attempt
    $logStmt = $db->prepare("INSERT INTO zm_login_attempts (ip_address, username, status) VALUES (?, ?, 'success')");
    $logStmt->execute([$ip, $username]);

    // Update last login
    $upStmt = $db->prepare("UPDATE zm_admin_users SET last_login = NOW(), last_ip = ? WHERE id = ?");
    $upStmt->execute([$ip, $user['id']]);

    // Generate token
    $token = create_auth_token($user['id'], $user['username'], $user['role']);

    // Set secure cookie
    setcookie(AUTH_COOKIE_NAME, $token, [
        'expires'  => time() + SESSION_LIFETIME,
        'path'     => '/',
        'secure'   => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
        'httponly' => true,
        'samesite' => 'Strict'
    ]);

    log_audit('login_success', 'zm_admin_users', "User logged in: {$user['username']}", $user['id']);

    send_json([
        'success' => true,
        'token'   => $token,
        'user'    => [
            'id'        => $user['id'],
            'username'  => $user['username'],
            'email'     => $user['email'],
            'fullName'  => $user['full_name'],
            'role'      => $user['role']
        ]
    ]);
}

// ------------------------------------------------------------------------------
// 2. CHECK AUTH STATUS
// ------------------------------------------------------------------------------
if ($action === 'check') {
    $authUser = require_auth();
    $db = get_db();
    $stmt = $db->prepare("SELECT id, username, email, full_name, role FROM zm_admin_users WHERE id = ? AND is_active = 1");
    $stmt->execute([$authUser['uid']]);
    $user = $stmt->fetch();

    if (!$user) {
        send_error("User not found or deactivated.", 401);
    }

    send_json([
        'success' => true,
        'user'    => [
            'id'       => $user['id'],
            'username' => $user['username'],
            'email'    => $user['email'],
            'fullName' => $user['full_name'],
            'role'     => $user['role']
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

    $db = get_db();
    $stmt = $db->prepare("SELECT password_hash FROM zm_admin_users WHERE id = ?");
    $stmt->execute([$authUser['uid']]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($oldPass, $user['password_hash'])) {
        send_error("Current password is incorrect.", 400);
    }

    $newHash = password_hash($newPass, PASSWORD_DEFAULT);
    $upStmt = $db->prepare("UPDATE zm_admin_users SET password_hash = ? WHERE id = ?");
    $upStmt->execute([$newHash, $authUser['uid']]);

    log_audit('password_changed', 'zm_admin_users', "Password updated", $authUser['uid']);
    send_json(['success' => true, 'message' => 'Password updated successfully.']);
}

send_error("Invalid auth action requested.", 400);
