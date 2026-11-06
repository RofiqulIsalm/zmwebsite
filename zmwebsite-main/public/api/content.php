<?php
/**
 * ==============================================================================
 * ZM PRINTING & DESIGN LTD. - CONTENT MANAGEMENT & CACHE PUBLISHER API
 * HYBRID DUAL-ENGINE: MySQL Database + Zero-Config Direct JSON Storage
 * ==============================================================================
 */

require_once __DIR__ . '/db.php';

set_api_headers();

$action = $_GET['action'] ?? 'get_all';

function get_content_file() {
    if (file_exists(CONTENT_JSON_PATH)) {
        return json_decode(file_get_contents(CONTENT_JSON_PATH), true) ?: [];
    }
    return [];
}

function write_content_file($data) {
    if (!is_dir(DATA_DIR)) {
        @mkdir(DATA_DIR, 0755, true);
    }
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $tmp = CONTENT_JSON_PATH . '.tmp';
    @file_put_contents($tmp, $json);
    if (file_exists($tmp)) {
        @rename($tmp, CONTENT_JSON_PATH);
    } else {
        @file_put_contents(CONTENT_JSON_PATH, $json);
    }
}

/**
 * Rebuilds and writes public/data/content.json from current database state.
 */
function publish_content_json() {
    $db = get_db(false);
    if (!$db) {
        return get_content_file();
    }
    
    // Start with default baseline if content.json exists
    $masterContent = get_content_file();

    try {
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
            
            // Special handling for Factory Sections array
            if ($pKey === 'sections') {
                if ($sKey === 'items' && is_array($cData)) {
                    $masterContent['sections'] = $cData;
                    continue;
                }
                if (isset($masterContent['sections']) && is_array($masterContent['sections'])) {
                    $targetSlug = $cData['slug'] ?? $sKey;
                    $found = false;
                    foreach ($masterContent['sections'] as $idx => $floor) {
                        if (is_array($floor) && isset($floor['slug']) && $floor['slug'] === $targetSlug) {
                            $masterContent['sections'][$idx] = array_merge($floor, $cData);
                            $found = true;
                            break;
                        }
                    }
                    if (!$found) {
                        $masterContent['sections'][] = $cData;
                    }
                } else {
                    $masterContent['sections'] = [$cData];
                }
                continue;
            }
            
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

        write_content_file($masterContent);
    } catch (Exception $e) {}

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
    $title       = trim($input['title'] ?? '');
    $subtitle    = trim($input['subtitle'] ?? '');
    $contentData = $input['content'] ?? $input['content_json'] ?? [];
    $contentJson = is_array($contentData) ? json_encode($contentData) : (string)$contentData;
    $isActive    = isset($input['is_active']) ? (int)$input['is_active'] : 1;
    $sortOrder   = isset($input['sort_order']) ? (int)$input['sort_order'] : 0;

    if (empty($pageKey) || empty($sectionKey)) {
        send_error("page_key and section_key are required.", 400);
    }

    $db = get_db(false);
    if ($db) {
        try {
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
        } catch (Exception $e) {}
    }

    // Direct JSON storage update (always guarantees sync!)
    $master = get_content_file();
    if ($pageKey === 'sections') {
        if ($sectionKey === 'items' && is_array($contentData)) {
            $master['sections'] = $contentData;
        } else if (isset($master['sections']) && is_array($master['sections'])) {
            $targetSlug = $contentData['slug'] ?? $sectionKey;
            $found = false;
            foreach ($master['sections'] as $idx => $floor) {
                if (is_array($floor) && isset($floor['slug']) && $floor['slug'] === $targetSlug) {
                    $master['sections'][$idx] = array_merge($floor, $contentData);
                    $found = true;
                    break;
                }
            }
            if (!$found) $master['sections'][] = $contentData;
        } else {
            $master['sections'] = [$contentData];
        }
    } else {
        if (!isset($master[$pageKey])) $master[$pageKey] = [];
        if (is_array($contentData)) {
            $master[$pageKey][$sectionKey] = array_merge($master[$pageKey][$sectionKey] ?? [], $contentData);
        } else {
            $master[$pageKey][$sectionKey] = $contentData;
        }
    }
    write_content_file($master);

    send_json(['success' => true, 'message' => "Section '{$sectionKey}' updated and published live."]);
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

    $db = get_db(false);
    if ($db) {
        try {
            $stmt = $db->prepare("UPDATE zm_page_sections SET is_active = ? WHERE page_key = ? AND section_key = ?");
            $stmt->execute([$isActive, $pageKey, $sectionKey]);
            log_audit('toggle_section', "section:{$pageKey}/{$sectionKey}", "Visibility set to $isActive", $user['uid']);
            publish_content_json();
        } catch (Exception $e) {}
    }

    $master = get_content_file();
    if (isset($master[$pageKey][$sectionKey])) {
        $master[$pageKey][$sectionKey]['_isActive'] = (bool)$isActive;
        write_content_file($master);
    }

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

    $db = get_db(false);
    if ($db) {
        try {
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
        } catch (Exception $e) {}
    }

    $master = get_content_file();
    $master['site'] = array_merge($master['site'] ?? [], $settings);
    write_content_file($master);

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
    $galleryJson = json_encode($input['gallery'] ?? []);
    $specsJson   = json_encode($input['specifications'] ?? []);
    $isFeatured  = !empty($input['is_featured']) ? 1 : 0;
    $isActive    = isset($input['is_active']) ? (int)$input['is_active'] : 1;
    $sortOrder   = isset($input['sort_order']) ? (int)$input['sort_order'] : 0;

    if (empty($title) || empty($imageUrl)) {
        send_error("Product title and image URL are required.", 400);
    }

    $slug = trim(preg_replace('/[^a-z0-9]+/i', '-', strtolower($title)), '-');
    $db = get_db(false);

    if ($db) {
        try {
            if ($id) {
                $stmt = $db->prepare("
                    UPDATE zm_products SET 
                        title = ?, category = ?, summary = ?, description = ?, 
                        image_url = ?, gallery_json = ?, specs_json = ?, 
                        is_featured = ?, is_active = ?, sort_order = ?
                    WHERE id = ?
                ");
                $stmt->execute([$title, $category, $summary, $description, $imageUrl, $galleryJson, $specsJson, $isFeatured, $isActive, $sortOrder, $id]);
            } else {
                $stmt = $db->prepare("
                    INSERT INTO zm_products (slug, title, category, summary, description, image_url, gallery_json, specs_json, is_featured, is_active, sort_order)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ");
                $stmt->execute([$slug . '-' . time(), $title, $category, $summary, $description, $imageUrl, $galleryJson, $specsJson, $isFeatured, $isActive, $sortOrder]);
                $id = $db->lastInsertId();
            }
            publish_content_json();
        } catch (Exception $e) {}
    }

    // Direct JSON sync
    $master = get_content_file();
    if (!isset($master['products']['items'])) $master['products']['items'] = [];
    $prodObj = [
        'id'            => $id ?: (int)(microtime(true) * 1000),
        'slug'          => $slug,
        'title'         => $title,
        'category'      => $category,
        'summary'       => $summary,
        'description'   => $description,
        'image'         => $imageUrl,
        'gallery'       => json_decode($galleryJson, true) ?: [],
        'specifications'=> json_decode($specsJson, true) ?: [],
        'isFeatured'    => (bool)$isFeatured
    ];

    if ($id) {
        $found = false;
        foreach ($master['products']['items'] as $idx => $p) {
            if ($p['id'] == $id) {
                $master['products']['items'][$idx] = array_merge($p, $prodObj);
                $found = true;
                break;
            }
        }
        if (!$found) $master['products']['items'][] = $prodObj;
    } else {
        array_unshift($master['products']['items'], $prodObj);
    }
    write_content_file($master);

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

    if ($confirm !== 'DELETE') {
        send_error("Double-check failed. Must send confirm: 'DELETE' to permanently remove this item.", 400);
    }

    $db = get_db(false);
    if ($db) {
        try {
            $stmt = $db->prepare("DELETE FROM zm_products WHERE id = ?");
            $stmt->execute([$id]);
            publish_content_json();
        } catch (Exception $e) {}
    }

    $master = get_content_file();
    if (isset($master['products']['items']) && is_array($master['products']['items'])) {
        $master['products']['items'] = array_values(array_filter($master['products']['items'], function($p) use ($id) {
            return $p['id'] != $id;
        }));
        write_content_file($master);
    }

    send_json(['success' => true, 'message' => "Product permanently deleted."]);
}

// ------------------------------------------------------------------------------
// 7. PUBLISH CACHE
// ------------------------------------------------------------------------------
if ($action === 'publish' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    require_auth();
    publish_content_json();
    send_json(['success' => true, 'message' => 'Cache published successfully.']);
}

send_error("Invalid content action requested.", 400);
