<?php
/**
 * ==============================================================================
 * ZM PRINTING & DESIGN LTD. - CONTENT MANAGEMENT & CACHE PUBLISHER API
 * ==============================================================================
 */

require_once __DIR__ . '/db.php';

set_api_headers();

$action = $_GET['action'] ?? 'get_all';

/**
 * Rebuilds and writes public/data/content.json from current database state.
 * This guarantees visitors load static JSON in ~15ms with 0 database queries!
 */
function publish_content_json() {
    $db = get_db();
    
    // Start with default baseline if content.json exists
    $masterContent = [];
    if (file_exists(CONTENT_JSON_PATH)) {
        $raw = file_get_contents(CONTENT_JSON_PATH);
        $masterContent = json_decode($raw, true) ?: [];
    }

    // 1. Merge Site Settings
    $settingsStmt = $db->query("SELECT setting_key, setting_value FROM zm_site_settings");
    $settings = $settingsStmt->fetchAll(PDO::FETCH_KEY_PAIR);
    if (!empty($settings)) {
        foreach ($settings as $key => $val) {
            $decoded = json_decode($val, true);
            $masterContent['site'][$key] = ($decoded !== null) ? $decoded : $val;
        }
    }

    // 2. Merge Page Sections
    $sectionsStmt = $db->query("SELECT page_key, section_key, title, subtitle, content_json, is_active FROM zm_page_sections ORDER BY sort_order ASC");
    $sections = $sectionsStmt->fetchAll();
    foreach ($sections as $s) {
        $pKey = $s['page_key'];
        $sKey = $s['section_key'];
        $cData = json_decode($s['content_json'], true) ?: [];
        $cData['_isActive'] = (bool)$s['is_active'];
        if (!empty($s['title'])) $cData['title'] = $s['title'];
        if (!empty($s['subtitle'])) $cData['subtitle'] = $s['subtitle'];
        
        if (!isset($masterContent[$pKey])) {
            $masterContent[$pKey] = [];
        }
        $masterContent[$pKey][$sKey] = $cData;
    }

    // 3. Merge Products
    $prodStmt = $db->query("SELECT * FROM zm_products WHERE is_active = 1 ORDER BY sort_order ASC, id DESC");
    $products = $prodStmt->fetchAll();
    if (!empty($products)) {
        $formattedProducts = [];
        foreach ($products as $p) {
            $formattedProducts[] = [
                'id'            => $p['id'],
                'slug'          => $p['slug'],
                'title'         => $p['title'],
                'category'      => $p['category'],
                'summary'       => $p['summary'],
                'description'   => $p['description'],
                'image'         => $p['image_url'],
                'gallery'       => json_decode($p['gallery_json'] ?? '[]', true) ?: [],
                'specifications'=> json_decode($p['specs_json'] ?? '[]', true) ?: [],
                'isFeatured'    => (bool)$p['is_featured'],
            ];
        }
        $masterContent['products']['items'] = $formattedProducts;
    }

    // 4. Merge Team Members
    $teamStmt = $db->query("SELECT * FROM zm_team_members WHERE is_active = 1 ORDER BY sort_order ASC, id ASC");
    $team = $teamStmt->fetchAll();
    if (!empty($team)) {
        $formattedTeam = [];
        foreach ($team as $t) {
            $formattedTeam[] = [
                'id'         => $t['id'],
                'name'       => $t['name'],
                'role'       => $t['role_title'],
                'department' => $t['department'],
                'image'      => $t['image_url'],
                'bio'        => $t['bio']
            ];
        }
        if (isset($masterContent['about']['leadership'])) {
            $masterContent['about']['leadership']['members'] = $formattedTeam;
        }
    }

    // 5. Merge News
    $newsStmt = $db->query("SELECT * FROM zm_news_articles WHERE is_published = 1 ORDER BY publish_date DESC, sort_order ASC");
    $news = $newsStmt->fetchAll();
    if (!empty($news)) {
        $formattedNews = [];
        foreach ($news as $n) {
            $formattedNews[] = [
                'id'          => $n['id'],
                'slug'        => $n['slug'],
                'title'       => $n['title'],
                'category'    => $n['category'],
                'excerpt'     => $n['excerpt'],
                'content'     => $n['content'],
                'image'       => $n['image_url'],
                'publishDate' => $n['publish_date'],
                'readTime'    => $n['read_time']
            ];
        }
        $masterContent['news']['articles'] = $formattedNews;
    }

    // Write atomic cache file
    if (!is_dir(DATA_DIR)) {
        mkdir(DATA_DIR, 0755, true);
    }
    
    $jsonString = json_encode($masterContent, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $tmpFile = CONTENT_JSON_PATH . '.tmp';
    file_put_contents($tmpFile, $jsonString);
    rename($tmpFile, CONTENT_JSON_PATH);

    return $masterContent;
}

// ------------------------------------------------------------------------------
// 1. GET ALL CONTENT (Public or Admin preview)
// ------------------------------------------------------------------------------
if ($action === 'get_all') {
    if (file_exists(CONTENT_JSON_PATH)) {
        $data = json_decode(file_get_contents(CONTENT_JSON_PATH), true);
        send_json(['success' => true, 'source' => 'cache', 'data' => $data]);
    } else {
        $data = publish_content_json();
        send_json(['success' => true, 'source' => 'generated', 'data' => $data]);
    }
}

// ------------------------------------------------------------------------------
// 2. SAVE SECTION (Admin Only)
// ------------------------------------------------------------------------------
if ($action === 'save_section' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = require_auth();
    $input = json_decode(file_get_contents('php://input'), true);

    $pageKey    = trim($input['page_key'] ?? '');
    $sectionKey = trim($input['section_key'] ?? '');
    $title      = trim($input['title'] ?? '');
    $subtitle   = trim($input['subtitle'] ?? '');
    $contentJson= isset($input['content_json']) ? json_encode($input['content_json']) : '{}';
    $isActive   = isset($input['is_active']) ? (int)$input['is_active'] : 1;
    $sortOrder  = isset($input['sort_order']) ? (int)$input['sort_order'] : 0;

    if (empty($pageKey) || empty($sectionKey)) {
        send_error("page_key and section_key are required.", 400);
    }

    $db = get_db();
    $stmt = $db->prepare("
        INSERT INTO zm_page_sections (page_key, section_key, title, subtitle, content_json, is_active, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            title = VALUES(title),
            subtitle = VALUES(subtitle),
            content_json = VALUES(content_json),
            is_active = VALUES(is_active),
            sort_order = VALUES(sort_order),
            updated_at = NOW()
    ");
    $stmt->execute([$pageKey, $sectionKey, $title, $subtitle, $contentJson, $isActive, $sortOrder]);

    log_audit('save_section', "section:{$pageKey}/{$sectionKey}", "Updated section", $user['uid']);
    publish_content_json();

    send_json(['success' => true, 'message' => "Section '{$sectionKey}' updated and published successfully."]);
}

// ------------------------------------------------------------------------------
// 3. TOGGLE SECTION VISIBILITY (Admin Only)
// ------------------------------------------------------------------------------
if ($action === 'toggle_section' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = require_auth();
    $input = json_decode(file_get_contents('php://input'), true);

    $pageKey    = trim($input['page_key'] ?? '');
    $sectionKey = trim($input['section_key'] ?? '');
    $isActive   = !empty($input['is_active']) ? 1 : 0;

    $db = get_db();
    $stmt = $db->prepare("UPDATE zm_page_sections SET is_active = ? WHERE page_key = ? AND section_key = ?");
    $stmt->execute([$isActive, $pageKey, $sectionKey]);

    log_audit('toggle_section', "section:{$pageKey}/{$sectionKey}", "Visibility set to $isActive", $user['uid']);
    publish_content_json();

    send_json(['success' => true, 'is_active' => (bool)$isActive]);
}

// ------------------------------------------------------------------------------
// 4. SAVE GENERAL SITE SETTINGS (Admin Only)
// ------------------------------------------------------------------------------
if ($action === 'save_settings' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = require_auth();
    $input = json_decode(file_get_contents('php://input'), true);
    $settings = $input['settings'] ?? [];

    if (!is_array($settings)) {
        send_error("Invalid settings payload.", 400);
    }

    $db = get_db();
    $stmt = $db->prepare("
        INSERT INTO zm_site_settings (setting_key, setting_value, group_name)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = NOW()
    ");

    foreach ($settings as $key => $val) {
        $encodedVal = is_array($val) ? json_encode($val) : (string)$val;
        $groupName = 'general';
        if (strpos($key, 'contact_') === 0) $groupName = 'contact';
        if (strpos($key, 'social_') === 0) $groupName = 'social';
        $stmt->execute([$key, $encodedVal, $groupName]);
    }

    log_audit('save_settings', 'zm_site_settings', "Updated site settings", $user['uid']);
    publish_content_json();

    send_json(['success' => true, 'message' => "Site settings updated and published successfully."]);
}

// ------------------------------------------------------------------------------
// 5. SAVE / UPDATE PRODUCT (Admin Only)
// ------------------------------------------------------------------------------
if ($action === 'save_product' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = require_auth();
    $input = json_decode(file_get_contents('php://input'), true);

    $id          = !empty($input['id']) ? (int)$input['id'] : null;
    $title       = trim($input['title'] ?? '');
    $category    = trim($input['category'] ?? 'Garment Accessories');
    $summary     = trim($input['summary'] ?? '');
    $description = trim($input['description'] ?? '');
    $imageUrl    = trim($input['image_url'] ?? '');
    $galleryJson = isset($input['gallery']) ? json_encode($input['gallery']) : '[]';
    $specsJson   = isset($input['specifications']) ? json_encode($input['specifications']) : '[]';
    $isFeatured  = !empty($input['is_featured']) ? 1 : 0;
    $isActive    = isset($input['is_active']) ? (int)$input['is_active'] : 1;
    $sortOrder   = isset($input['sort_order']) ? (int)$input['sort_order'] : 0;

    if (empty($title) || empty($imageUrl)) {
        send_error("Product title and image URL are required.", 400);
    }

    $slug = trim(preg_replace('/[^a-z0-9]+/i', '-', strtolower($title)), '-');
    $db = get_db();

    if ($id) {
        $stmt = $db->prepare("
            UPDATE zm_products SET 
                title = ?, category = ?, summary = ?, description = ?, 
                image_url = ?, gallery_json = ?, specs_json = ?, 
                is_featured = ?, is_active = ?, sort_order = ?
            WHERE id = ?
        ");
        $stmt->execute([$title, $category, $summary, $description, $imageUrl, $galleryJson, $specsJson, $isFeatured, $isActive, $sortOrder, $id]);
        log_audit('update_product', "product:$id", "Updated product $title", $user['uid']);
    } else {
        $stmt = $db->prepare("
            INSERT INTO zm_products (slug, title, category, summary, description, image_url, gallery_json, specs_json, is_featured, is_active, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$slug . '-' . time(), $title, $category, $summary, $description, $imageUrl, $galleryJson, $specsJson, $isFeatured, $isActive, $sortOrder]);
        $id = $db->lastInsertId();
        log_audit('create_product', "product:$id", "Created product $title", $user['uid']);
    }

    publish_content_json();
    send_json(['success' => true, 'id' => $id, 'message' => "Product saved and published."]);
}

// ------------------------------------------------------------------------------
// 6. DELETE PRODUCT (Admin Only WITH DOUBLE-CHECK)
// ------------------------------------------------------------------------------
if ($action === 'delete_product' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = require_auth();
    $input = json_decode(file_get_contents('php://input'), true);

    $id      = (int)($input['id'] ?? 0);
    $confirm = trim($input['confirm'] ?? '');

    // ENFORCE DOUBLE-CHECK CONFIRMATION
    if ($confirm !== 'DELETE') {
        send_error("Double-check failed. Must send confirm: 'DELETE' to permanently remove this item.", 400);
    }

    $db = get_db();
    $stmt = $db->prepare("DELETE FROM zm_products WHERE id = ?");
    $stmt->execute([$id]);

    log_audit('delete_product', "product:$id", "Deleted product ID $id with confirmation", $user['uid']);
    publish_content_json();

    send_json(['success' => true, 'message' => "Product permanently deleted."]);
}

// ------------------------------------------------------------------------------
// 7. SAVE / UPDATE TEAM MEMBER (Admin Only)
// ------------------------------------------------------------------------------
if ($action === 'save_team_member' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = require_auth();
    $input = json_decode(file_get_contents('php://input'), true);

    $id         = !empty($input['id']) ? (int)$input['id'] : null;
    $name       = trim($input['name'] ?? '');
    $roleTitle  = trim($input['role'] ?? '');
    $department = trim($input['department'] ?? 'Executive Board');
    $imageUrl   = trim($input['image'] ?? '');
    $bio        = trim($input['bio'] ?? '');
    $sortOrder  = isset($input['sort_order']) ? (int)$input['sort_order'] : 0;
    $isActive   = isset($input['is_active']) ? (int)$input['is_active'] : 1;

    if (empty($name) || empty($roleTitle) || empty($imageUrl)) {
        send_error("Name, role, and image are required.", 400);
    }

    $db = get_db();
    if ($id) {
        $stmt = $db->prepare("UPDATE zm_team_members SET name = ?, role_title = ?, department = ?, image_url = ?, bio = ?, sort_order = ?, is_active = ? WHERE id = ?");
        $stmt->execute([$name, $roleTitle, $department, $imageUrl, $bio, $sortOrder, $isActive, $id]);
    } else {
        $stmt = $db->prepare("INSERT INTO zm_team_members (name, role_title, department, image_url, bio, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $roleTitle, $department, $imageUrl, $bio, $sortOrder, $isActive]);
        $id = $db->lastInsertId();
    }

    log_audit('save_team_member', "team:$id", "Saved team member $name", $user['uid']);
    publish_content_json();

    send_json(['success' => true, 'id' => $id, 'message' => "Team member saved and published."]);
}

// ------------------------------------------------------------------------------
// 8. DELETE TEAM MEMBER (Admin Only WITH DOUBLE-CHECK)
// ------------------------------------------------------------------------------
if ($action === 'delete_team_member' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = require_auth();
    $input = json_decode(file_get_contents('php://input'), true);

    $id      = (int)($input['id'] ?? 0);
    $confirm = trim($input['confirm'] ?? '');

    if ($confirm !== 'DELETE') {
        send_error("Double-check failed. Must send confirm: 'DELETE' to remove this member.", 400);
    }

    $db = get_db();
    $stmt = $db->prepare("DELETE FROM zm_team_members WHERE id = ?");
    $stmt->execute([$id]);

    log_audit('delete_team_member', "team:$id", "Deleted team member ID $id", $user['uid']);
    publish_content_json();

    send_json(['success' => true, 'message' => "Team member deleted."]);
}

// ------------------------------------------------------------------------------
// 9. MANUAL PUBLISH TRIGGER
// ------------------------------------------------------------------------------
if ($action === 'publish' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    require_auth();
    publish_content_json();
    send_json(['success' => true, 'message' => "Website content published to live static cache."]);
}

send_error("Invalid content action requested.", 400);
