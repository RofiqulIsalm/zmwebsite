-- ==============================================================================
-- ZM PRINTING & DESIGN LTD. - CMS DATABASE SCHEMA
-- Compatible with cPanel MySQL / MariaDB 10.x+
-- Character set: utf8mb4_unicode_ci
-- ==============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- 1. ADMIN USERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `zm_admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `full_name` VARCHAR(100) DEFAULT 'Site Administrator',
  `role` VARCHAR(20) DEFAULT 'admin',
  `is_active` TINYINT(1) DEFAULT 1,
  `last_login` DATETIME NULL,
  `last_ip` VARCHAR(45) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. LOGIN ATTEMPTS TABLE (BRUTE-FORCE PROTECTION)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `zm_login_attempts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ip_address` VARCHAR(45) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `attempted_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('success', 'failed', 'blocked') DEFAULT 'failed',
  INDEX `idx_ip_time` (`ip_address`, `attempted_at`),
  INDEX `idx_user_time` (`username`, `attempted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. SITE SETTINGS TABLE (Global site meta, phones, emails, logos)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `zm_site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` LONGTEXT NOT NULL,
  `group_name` VARCHAR(50) DEFAULT 'general',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. PAGE SECTIONS TABLE (Every section: home, about, capabilities, etc.)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `zm_page_sections` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_key` VARCHAR(50) NOT NULL,
  `section_key` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NULL,
  `subtitle` TEXT NULL,
  `content_json` LONGTEXT NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `sort_order` INT DEFAULT 0,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_page_section` (`page_key`, `section_key`),
  INDEX `idx_page` (`page_key`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. PRODUCTS TABLE (Garment accessories, trims, heat transfers, etc.)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `zm_products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `summary` TEXT NULL,
  `description` LONGTEXT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `gallery_json` LONGTEXT NULL,
  `specs_json` LONGTEXT NULL,
  `is_featured` TINYINT(1) DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `sort_order` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_cat_active` (`category`, `is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. TEAM MEMBERS TABLE (Executive leadership & board)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `zm_team_members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `role_title` VARCHAR(150) NOT NULL,
  `department` VARCHAR(100) DEFAULT 'Executive Board',
  `image_url` VARCHAR(255) NOT NULL,
  `bio` TEXT NULL,
  `sort_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. NEWS ARTICLES TABLE (Technical articles & factory news)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `zm_news_articles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) DEFAULT 'Industry Insights',
  `excerpt` TEXT NULL,
  `content` LONGTEXT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `publish_date` DATE NOT NULL,
  `read_time` VARCHAR(50) DEFAULT '5 min read',
  `is_published` TINYINT(1) DEFAULT 1,
  `sort_order` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. MEDIA FILES TABLE (Track uploaded media & WebP images)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `zm_media_files` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `file_name` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `file_size` INT NOT NULL,
  `mime_type` VARCHAR(50) NOT NULL,
  `dimensions` VARCHAR(50) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 9. AUDIT LOGS TABLE (Track all changes with timestamp and IP)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `zm_audit_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `action` VARCHAR(50) NOT NULL,
  `target_entity` VARCHAR(100) NOT NULL,
  `details` LONGTEXT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_action_time` (`action`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
