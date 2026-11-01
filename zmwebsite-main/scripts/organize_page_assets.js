import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const imagesDir = path.join(publicDir, 'images');

// Ensure target directories exist
const targetDirs = [
  path.join(imagesDir, 'home'),
  path.join(imagesDir, 'about'),
  path.join(imagesDir, 'gallery'),
  path.join(imagesDir, 'products'),
  path.join(imagesDir, 'sections'),
  path.join(imagesDir, 'team')
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

function safeCopy(srcRel, destRel) {
  const src = path.join(publicDir, srcRel);
  const dest = path.join(publicDir, destRel);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${srcRel} -> ${destRel}`);
    return true;
  } else {
    console.warn(`Source not found: ${src}`);
    return false;
  }
}

console.log('=== POPULATING HOME PAGE ASSETS ===');
// Hero slides
safeCopy('images/products/Screen-Printing-for-Custom-Apparel.jpg', 'images/home/hero-screen-printing.jpg');
safeCopy('images/Productlist/SUBLIMATION.jpeg', 'images/home/hero-sublimation.jpg');
safeCopy('images/Productlist/silicon badge.jpg', 'images/home/hero-silicon.jpg');
safeCopy('images/Productlist/pvc patch.jpg', 'images/home/hero-sonic.jpg');

// Company Story video poster & factory image
safeCopy('images/factory-tour/printing-floor-1.jpg', 'images/home/story-factory-poster.jpg');

// Engineered Products 8 Cards (matching user screenshot)
safeCopy('images/products/Screen-Printing-for-Custom-Apparel.jpg', 'images/home/card-screen-printing.jpg');
safeCopy('images/Productlist/SUBLIMATION.jpeg', 'images/home/card-sublimation.jpg');
safeCopy('images/Productlist/dtf print.jpg', 'images/home/card-dtf-sticker.jpg');
safeCopy('images/Productlist/uv print.jpg', 'images/home/card-uv-printing.jpg');
safeCopy('images/Productlist/vinyl print.jpg', 'images/home/card-vinyl-sticker.jpg');
safeCopy('images/Productlist/silicon transfer.jpg', 'images/home/card-silicon-transfer.jpg');
safeCopy('images/Productlist/silicon badge.jpg', 'images/home/card-silicon-badge.jpg');
safeCopy('images/Productlist/pvc patch.jpg', 'images/home/card-pvc-badge.jpg');

// Marquee run images
const runNewsDir = path.join(imagesDir, 'run_news_image');
if (fs.existsSync(runNewsDir)) {
  const runFiles = fs.readdirSync(runNewsDir);
  runFiles.forEach((file, idx) => {
    safeCopy(`images/run_news_image/${file}`, `images/home/marquee-${String(idx + 1).padStart(2, '0')}.jpg`);
  });
}

console.log('=== POPULATING ABOUT PAGE ASSETS ===');
safeCopy('images/team/md-abdul-kader-zilani.jpg', 'images/about/md-abdul-kader-zilani.jpg');
safeCopy('images/team/chairman-mst-rojina.jpg', 'images/about/chairman-mst-rojina.jpg');
safeCopy('images/team/ainul islam picture.jpg', 'images/about/ainul-islam.jpg');
safeCopy('images/factory-tour/printing-floor-1.jpg', 'images/about/factory-plant-profile.jpg');
safeCopy('images/run_news_image/0Y3A8911.jpg', 'images/about/factory-workforce-team.jpg');

console.log('=== POPULATING SECTIONS PAGE ASSETS ===');
const factoryTourDir = path.join(imagesDir, 'factory-tour');
if (fs.existsSync(factoryTourDir)) {
  const ftFiles = fs.readdirSync(factoryTourDir);
  ftFiles.forEach(file => {
    safeCopy(`images/factory-tour/${file}`, `images/sections/${file}`);
  });
}

console.log('=== POPULATING GALLERY PAGE ASSETS (ALL PROFILE & FACTORY PHOTOS) ===');
// 1. All Factory Tour photos
if (fs.existsSync(factoryTourDir)) {
  const ftFiles = fs.readdirSync(factoryTourDir);
  ftFiles.forEach(file => {
    safeCopy(`images/factory-tour/${file}`, `images/gallery/${file}`);
  });
}

// 2. All Marquee/Run Factory Action Shots
if (fs.existsSync(runNewsDir)) {
  const runFiles = fs.readdirSync(runNewsDir);
  runFiles.forEach(file => {
    safeCopy(`images/run_news_image/${file}`, `images/gallery/${file}`);
  });
}

// 3. All Product Profile Craft Samples (prod_*, cat_*, subcat_*)
const assetsImgDir = path.join(publicDir, 'assets', 'images');
if (fs.existsSync(assetsImgDir)) {
  const assetFiles = fs.readdirSync(assetsImgDir);
  assetFiles.filter(f => f.startsWith('prod_') || f.startsWith('cat_') || f.startsWith('subcat_')).forEach(file => {
    safeCopy(`assets/images/${file}`, `images/gallery/${file}`);
  });
}

// 4. Core products
safeCopy('images/Productlist/SUBLIMATION.jpeg', 'images/gallery/SUBLIMATION.jpeg');
safeCopy('images/Productlist/dtf print.jpg', 'images/gallery/dtf print.jpg');
safeCopy('images/Productlist/uv print.jpg', 'images/gallery/uv print.jpg');
safeCopy('images/Productlist/vinyl print.jpg', 'images/gallery/vinyl print.jpg');
safeCopy('images/Productlist/silicon transfer.jpg', 'images/gallery/silicon transfer.jpg');
safeCopy('images/Productlist/silicon badge.jpg', 'images/gallery/silicon badge.jpg');
safeCopy('images/Productlist/pvc patch.jpg', 'images/gallery/pvc patch.jpg');
safeCopy('images/products/Screen-Printing-for-Custom-Apparel.jpg', 'images/gallery/Screen-Printing-for-Custom-Apparel.jpg');

console.log('Organization complete!');
