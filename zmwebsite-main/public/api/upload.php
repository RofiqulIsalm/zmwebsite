<?php
/**
 * ==============================================================================
 * ZM PRINTING & DESIGN LTD. - SECURE MEDIA UPLOAD & WEBP OPTIMIZATION API
 * ==============================================================================
 */

require_once __DIR__ . '/db.php';

set_api_headers();

$user = require_auth();
$action = $_GET['action'] ?? 'upload';

// ------------------------------------------------------------------------------
// 1. LIST RECENT MEDIA FILES
// ------------------------------------------------------------------------------
if ($action === 'list') {
    $db = get_db();
    $stmt = $db->query("SELECT id, file_name, original_name, file_path, file_size, mime_type, dimensions, created_at FROM zm_media_files ORDER BY id DESC LIMIT 50");
    send_json(['success' => true, 'files' => $stmt->fetchAll()]);
}

// ------------------------------------------------------------------------------
// 2. UPLOAD & AUTO-CONVERT TO WEBP
// ------------------------------------------------------------------------------
if ($action === 'upload' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        send_error("No image uploaded or upload error occurred.", 400);
    }

    $file = $_FILES['image'];
    $maxFileSize = 15 * 1024 * 1024; // 15MB max input limit

    if ($file['size'] > $maxFileSize) {
        send_error("Image file exceeds the 15MB maximum size limit.", 400);
    }

    // Verify MIME type safely
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($mimeType, $allowedMimes)) {
        send_error("Invalid file format. Only JPG, PNG, and WebP images are allowed.", 400);
    }

    // Prepare uploads directory
    if (!is_dir(UPLOADS_DIR)) {
        mkdir(UPLOADS_DIR, 0755, true);
    }

    $originalName = basename($file['name']);
    $safeName = preg_replace('/[^a-zA-Z0-9_\-]/', '', pathinfo($originalName, PATHINFO_FILENAME));
    $uniqueId = substr(md5(uniqid(rand(), true)), 0, 8);
    $targetFileName = strtolower($safeName) . '_' . $uniqueId . '.webp';
    $targetFilePath = UPLOADS_DIR . '/' . $targetFileName;
    $publicUrl = '/uploads/' . $targetFileName;

    // Load image into GD based on type
    $srcImg = null;
    if ($mimeType === 'image/jpeg') {
        $srcImg = @imagecreatefromjpeg($file['tmp_name']);
    } elseif ($mimeType === 'image/png') {
        $srcImg = @imagecreatefrompng($file['tmp_name']);
        if ($srcImg) {
            imagepalettetotruecolor($srcImg);
            imagealphablending($srcImg, true);
            imagesavealpha($srcImg, true);
        }
    } elseif ($mimeType === 'image/webp') {
        $srcImg = @imagecreatefromwebp($file['tmp_name']);
    }

    if (!$srcImg) {
        send_error("Failed to decode uploaded image.", 400);
    }

    $origW = imagesx($srcImg);
    $origH = imagesy($srcImg);

    // Downscale if wider than 1920px (prevents camera bloat)
    $maxW = 1920;
    $finalImg = $srcImg;
    $finalW = $origW;
    $finalH = $origH;

    if ($origW > $maxW) {
        $finalW = $maxW;
        $finalH = (int)round(($origH * $maxW) / $origW);
        $resized = imagecreatetruecolor($finalW, $finalH);
        imagealphablending($resized, false);
        imagesavealpha($resized, true);
        imagecopyresampled($resized, $srcImg, 0, 0, 0, 0, $finalW, $finalH, $origW, $origH);
        $finalImg = $resized;
    }

    // Convert and write as optimized WebP (Quality 82%)
    $saved = imagewebp($finalImg, $targetFilePath, 82);
    
    // Free GD memory
    if ($finalImg !== $srcImg) imagedestroy($finalImg);
    imagedestroy($srcImg);

    if (!$saved || !file_exists($targetFilePath)) {
        send_error("Failed to save and compress WebP image.", 500);
    }

    $fileSize = filesize($targetFilePath);
    $dimensions = "{$finalW}x{$finalH}";

    // Record into zm_media_files
    $db = get_db();
    $stmt = $db->prepare("INSERT INTO zm_media_files (file_name, original_name, file_path, file_size, mime_type, dimensions) VALUES (?, ?, ?, ?, 'image/webp', ?)");
    $stmt->execute([$targetFileName, $originalName, $publicUrl, $fileSize, $dimensions]);
    $mediaId = $db->lastInsertId();

    log_audit('upload_media', "media:$mediaId", "Uploaded $targetFileName ({$dimensions}, " . round($fileSize / 1024) . " KB)", $user['uid']);

    send_json([
        'success'   => true,
        'url'       => $publicUrl,
        'fileName'  => $targetFileName,
        'fileSize'  => $fileSize,
        'dimensions'=> $dimensions
    ]);
}

send_error("Invalid upload action requested.", 400);
