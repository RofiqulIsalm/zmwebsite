<?php
/**
 * ==============================================================================
 * ZM PRINTING & DESIGN LTD. - CMS BACKEND CONFIGURATION
 * ==============================================================================
 * 
 * Instructions:
 * 1. For cPanel: In phpMyAdmin create a database (e.g. `zmprin_cms`)
 * 2. Set DB_NAME, DB_USER, DB_PASS below, OR create `db_config.local.php`.
 * 3. Change ADMIN_SECRET_KEY to any random complex string of your choice.
 * ==============================================================================
 */

// Prevent direct execution error leakage
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// Database Credentials (Defaults for local development, override for cPanel)
define('DB_HOST', 'localhost');
define('DB_NAME', 'zmprinting_cms');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Security & Authentication Configuration
define('ADMIN_SECRET_KEY', 'zm_secure_key_9f82d1c7a4b830e2f56194b7');
define('SESSION_LIFETIME', 86400 * 7); // 7 days in seconds
define('MAX_LOGIN_ATTEMPTS', 5);
define('LOGIN_LOCKOUT_TIME', 900); // 15 minutes lockout in seconds
define('AUTH_COOKIE_NAME', 'zm_admin_token');

// Path Constants
define('API_ROOT', __DIR__);
define('PUBLIC_ROOT', dirname(__DIR__));
define('DATA_DIR', PUBLIC_ROOT . '/data');
define('CONTENT_JSON_PATH', DATA_DIR . '/content.json');
define('UPLOADS_DIR', PUBLIC_ROOT . '/uploads');

// Load environment/cPanel local override if it exists
if (file_exists(__DIR__ . '/db_config.local.php')) {
    include_once __DIR__ . '/db_config.local.php';
}

// Ensure secure headers for all API responses
function set_api_headers() {
    header('Content-Type: application/json; charset=UTF-8');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    
    // Handle CORS for local development if needed
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed_origins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://website.zmprintingbd.com',
        'https://zmprintingbd.com'
    ];
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-CSRF-Token');
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

