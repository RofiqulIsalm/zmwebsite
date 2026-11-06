<?php
/**
 * ==============================================================================
 * ZM PRINTING & DESIGN LTD. - DATABASE CONNECTION & CORE HELPERS
 * ==============================================================================
 */

require_once __DIR__ . '/config.php';

function get_db() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            send_error("Database connection failed. Please check db credentials.", 500);
        }
    }
    return $pdo;
}

function send_json($data, $status = 200) {
    set_api_headers();
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function send_error($message, $status = 400, $extra = []) {
    set_api_headers();
    http_response_code($status);
    $response = array_merge(['success' => false, 'error' => $message], $extra);
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function get_client_ip() {
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        return $_SERVER['HTTP_CF_CONNECTING_IP'];
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($ipList[0]);
    }
    return $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
}

function log_audit($action, $target, $details = '', $userId = null) {
    try {
        $db = get_db();
        $stmt = $db->prepare("INSERT INTO zm_audit_logs (user_id, action, target_entity, details, ip_address) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $userId,
            $action,
            $target,
            is_array($details) ? json_encode($details) : (string)$details,
            get_client_ip()
        ]);
    } catch (Exception $e) {
        // Silently continue if audit logging fails
    }
}

/**
 * High-Security HMAC-SHA256 Token Generator (No external JWT dependencies needed)
 */
function create_auth_token($userId, $username, $role) {
    $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $payload = base64_encode(json_encode([
        'uid' => $userId,
        'usr' => $username,
        'rol' => $role,
        'iat' => time(),
        'exp' => time() + SESSION_LIFETIME
    ]));
    $signature = hash_hmac('sha256', "$header.$payload", ADMIN_SECRET_KEY, true);
    $signBase64 = base64_encode($signature);
    return "$header.$payload.$signBase64";
}

function verify_auth_token($token) {
    if (empty($token)) return false;
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;
    
    list($header, $payload, $sign) = $parts;
    $expectedSign = base64_encode(hash_hmac('sha256', "$header.$payload", ADMIN_SECRET_KEY, true));
    
    if (!hash_equals($expectedSign, $sign)) {
        return false;
    }
    
    $data = json_decode(base64_decode($payload), true);
    if (!$data || !isset($data['exp']) || $data['exp'] < time()) {
        return false;
    }
    
    return $data;
}

/**
 * Middleware: Verify that current request is from an authenticated admin
 */
function require_auth() {
    $token = '';
    
    // Check Authorization Header
    $headers = getallheaders();
    if (isset($headers['Authorization']) && preg_match('/Bearer\s+(\S+)/', $headers['Authorization'], $m)) {
        $token = $m[1];
    } elseif (isset($_COOKIE[AUTH_COOKIE_NAME])) {
        $token = $_COOKIE[AUTH_COOKIE_NAME];
    }
    
    $user = verify_auth_token($token);
    if (!$user) {
        send_error("Unauthorized access. Please login.", 401);
    }
    
    return $user;
}
