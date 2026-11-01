import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Gather all source text
function getAllSourceFiles(dir, exts = ['.js', '.jsx', '.css', '.html', '.json']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        results = results.concat(getAllSourceFiles(fullPath, exts));
      }
    } else {
      if (exts.includes(path.extname(file))) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const sourceFiles = getAllSourceFiles(path.join(rootDir, 'src')).concat([path.join(rootDir, 'index.html')]);
let combinedCode = '';
for (const sf of sourceFiles) {
  combinedCode += fs.readFileSync(sf, 'utf8') + '\n';
}

// 2. Gather all public asset files
function getAllAssets(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllAssets(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const allPublicAssets = getAllAssets(path.join(rootDir, 'public/images'))
  .concat(getAllAssets(path.join(rootDir, 'public/assets')));

const unused = [];
const used = [];

for (const assetPath of allPublicAssets) {
  const relativeFromPublic = path.relative(path.join(rootDir, 'public'), assetPath).replace(/\\/g, '/');
  const basename = path.basename(assetPath);

  // Check if filename or relative path is in code
  const isUsed = combinedCode.includes(basename) || combinedCode.includes(relativeFromPublic);
  const size = fs.statSync(assetPath).size;

  if (isUsed) {
    used.push({ path: relativeFromPublic, size });
  } else {
    unused.push({ path: relativeFromPublic, size, fullPath: assetPath });
  }
}

console.log(`Total Public Assets: ${allPublicAssets.length}`);
console.log(`Used Assets: ${used.length}`);
console.log(`Unused Assets: ${unused.length}`);

let unusedSizeTotal = unused.reduce((sum, item) => sum + item.size, 0);
console.log(`Total Unused Space: ${(unusedSizeTotal / (1024 * 1024)).toFixed(2)} MB`);

console.log('\n--- UNUSED ASSET SAMPLES ---');
unused.slice(0, 30).forEach(u => {
  console.log(`${u.path} (${(u.size / 1024).toFixed(1)} KB)`);
});
