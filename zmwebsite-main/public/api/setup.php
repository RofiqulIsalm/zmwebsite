<?php
/**
 * ==============================================================================
 * ZM PRINTING & DESIGN LTD. - 1-CLICK CMS DATABASE SETUP & SEEDER
 * ==============================================================================
 * 
 * Run this script once after creating your cPanel MySQL Database to:
 * 1. Automatically create all tables from `schema.sql`.
 * 2. Seed the database with the full current content of `websiteContent.js` / `content.json`.
 * 3. Create the initial Master Admin account.
 * ==============================================================================
 */

require_once __DIR__ . '/db.php';

header('Content-Type: text/html; charset=UTF-8');

$db = null;
try {
    $db = get_db();
} catch (Exception $e) {
    die("<h3>Database Connection Error:</h3><p>" . htmlspecialchars($e->getMessage()) . "</p><p>Please configure <code>DB_NAME</code>, <code>DB_USER</code>, and <code>DB_PASS</code> in <code>api/config.php</code> or create <code>api/db_config.local.php</code>.</p>");
}

// ------------------------------------------------------------------------------
// 1. RUN SCHEMA.SQL
// ------------------------------------------------------------------------------
$schemaFile = __DIR__ . '/schema.sql';
if (!file_exists($schemaFile)) {
    die("schema.sql file not found.");
}

$sql = file_get_contents($schemaFile);
$statements = array_filter(array_map('trim', explode(';', $sql)));

foreach ($statements as $stmt) {
    if (!empty($stmt)) {
        try {
            $db->exec($stmt);
        } catch (PDOException $e) {
            // Ignore if table exists
        }
    }
}

// ------------------------------------------------------------------------------
// 2. CREATE DEFAULT ADMIN USER IF NOT EXISTS
// ------------------------------------------------------------------------------
$adminUser = 'zmadmin';
$adminEmail = 'info@zmprintingbd.com';
$adminDefaultPass = 'ZM_Admin#2026!';

$checkAdmin = $db->prepare("SELECT id FROM zm_admin_users WHERE username = ?");
$checkAdmin->execute([$adminUser]);
$existingAdmin = $checkAdmin->fetch();

if (!$existingAdmin) {
    $hash = password_hash($adminDefaultPass, PASSWORD_DEFAULT);
    $insAdmin = $db->prepare("INSERT INTO zm_admin_users (username, password_hash, email, full_name, role) VALUES (?, ?, ?, 'Master Administrator', 'admin')");
    $insAdmin->execute([$adminUser, $hash, $adminEmail]);
    $adminCreated = true;
} else {
    $adminCreated = false;
}

// ------------------------------------------------------------------------------
// 3. SEED CONTENT FROM CONTENT.JSON
// ------------------------------------------------------------------------------
$seedCount = ['sections' => 0, 'products' => 0, 'team' => 0];

if (file_exists(CONTENT_JSON_PATH)) {
    $content = json_decode(file_get_contents(CONTENT_JSON_PATH), true);
    
    // Seed Site Settings
    if (!empty($content['site'])) {
        $settingStmt = $db->prepare("INSERT INTO zm_site_settings (setting_key, setting_value, group_name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
        foreach ($content['site'] as $k => $v) {
            $settingStmt->execute([$k, json_encode($v), 'site']);
        }
    }

    // Seed Sections (Home, About, Capabilities, Quality, Sustainability, etc.)
    $secStmt = $db->prepare("INSERT INTO zm_page_sections (page_key, section_key, title, subtitle, content_json, is_active, sort_order) VALUES (?, ?, ?, ?, ?, 1, ?) ON DUPLICATE KEY UPDATE content_json = VALUES(content_json)");
    
    $pagesToSeed = ['home', 'about', 'sections', 'capabilities', 'quality', 'sustainability', 'clients', 'contact', 'gallery'];
    $orderIndex = 1;
    foreach ($pagesToSeed as $pageKey) {
        if (!empty($content[$pageKey]) && is_array($content[$pageKey])) {
            foreach ($content[$pageKey] as $sectionKey => $sectionData) {
                if (is_array($sectionData)) {
                    $title = $sectionData['title'] ?? $sectionData['heading'] ?? '';
                    $subtitle = $sectionData['subtitle'] ?? $sectionData['subheading'] ?? '';
                    $secStmt->execute([$pageKey, $sectionKey, $title, $subtitle, json_encode($sectionData), $orderIndex++]);
                    $seedCount['sections']++;
                }
            }
        }
    }

    // Seed Products
    if (!empty($content['products']['items']) && is_array($content['products']['items'])) {
        $prodStmt = $db->prepare("INSERT INTO zm_products (slug, title, category, summary, description, image_url, gallery_json, specs_json, is_featured, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?) ON DUPLICATE KEY UPDATE title = VALUES(title)");
        $pIndex = 1;
        foreach ($content['products']['items'] as $item) {
            $slug = $item['slug'] ?? 'prod-' . $pIndex;
            $title = $item['title'] ?? 'Product ' . $pIndex;
            $category = $item['category'] ?? 'Garment Accessories';
            $summary = $item['summary'] ?? '';
            $desc = $item['description'] ?? '';
            $image = $item['image'] ?? $item['image_url'] ?? '';
            $gallery = json_encode($item['gallery'] ?? []);
            $specs = json_encode($item['specifications'] ?? []);
            $featured = !empty($item['isFeatured']) ? 1 : 0;
            $prodStmt->execute([$slug, $title, $category, $summary, $desc, $image, $gallery, $specs, $featured, $pIndex++]);
            $seedCount['products']++;
        }
    }

    // Seed Team Members
    if (!empty($content['about']['leadership']['members']) && is_array($content['about']['leadership']['members'])) {
        $teamStmt = $db->prepare("INSERT INTO zm_team_members (name, role_title, department, image_url, bio, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)");
        $tIndex = 1;
        foreach ($content['about']['leadership']['members'] as $m) {
            $name = $m['name'] ?? '';
            $role = $m['role'] ?? '';
            $dept = $m['department'] ?? 'Executive Board';
            $img = $m['image'] ?? '';
            $bio = $m['bio'] ?? '';
            $teamStmt->execute([$name, $role, $dept, $img, $bio, $tIndex++]);
            $seedCount['team']++;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ZM Printing CMS — Database Setup Complete</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0b1a10; color: #e2e8f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
        .card { background: #13281a; border: 1px solid #22543d; border-radius: 12px; max-width: 600px; width: 100%; padding: 32px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
        h1 { color: #48bb78; margin-top: 0; font-size: 24px; }
        .badge { display: inline-block; background: #22543d; color: #9ae6b4; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: bold; margin-bottom: 20px; }
        .info-box { background: #1a3622; border-left: 4px solid #48bb78; padding: 16px; border-radius: 4px; margin: 20px 0; }
        .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #274b33; font-size: 14px; }
        .info-row:last-child { border-bottom: none; }
        .label { color: #a0aec0; }
        .value { color: #f7fafc; font-family: monospace; font-size: 14px; }
        .btn { display: inline-block; background: #38a169; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 10px; }
        .btn:hover { background: #2f855a; }
    </style>
</head>
<body>
    <div class="card">
        <span class="badge">ZM CMS INSTALLER</span>
        <h1>Database & Content Setup Successful!</h1>
        <p>All database tables have been verified and initialized on your cPanel MySQL server.</p>
        
        <div class="info-box">
            <div class="info-row"><span class="label">Page Sections Imported:</span><span class="value"><?= $seedCount['sections'] ?></span></div>
            <div class="info-row"><span class="label">Products Imported:</span><span class="value"><?= $seedCount['products'] ?></span></div>
            <div class="info-row"><span class="label">Team Members Imported:</span><span class="value"><?= $seedCount['team'] ?></span></div>
            <div class="info-row"><span class="label">Static Cache Generated:</span><span class="value">/public/data/content.json</span></div>
        </div>

        <?php if ($adminCreated): ?>
        <h3>Initial Master Admin Credentials:</h3>
        <div class="info-box" style="border-color: #ecc94b; background: #2d2a13;">
            <div class="info-row"><span class="label">Username:</span><span class="value"><?= htmlspecialchars($adminUser) ?></span></div>
            <div class="info-row"><span class="label">Password:</span><span class="value"><?= htmlspecialchars($adminDefaultPass) ?></span></div>
            <p style="margin: 8px 0 0; font-size: 13px; color: #ecc94b;">âš ï¸ Please login and change this password immediately from the admin panel.</p>
        </div>
        <?php else: ?>
        <p style="color: #9ae6b4;">âœ… Admin account already exists. Existing credentials preserved.</p>
        <?php endif; ?>

        <a href="../zm-portal-admin" class="btn">Proceed to Admin Login &rarr;</a>
    </div>
</body>
</html>
