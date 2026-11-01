import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(srcDir);
const imgRegex = /["'](\/(?:images|assets)\/[^"']+\.(?:png|jpg|jpeg|webp|svg))["']/g;
const missing = new Set();
const found = new Set();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const relPath = match[1];
    // In windows path handling: remove leading slash
    const normPath = relPath.startsWith('/') ? relPath.slice(1) : relPath;
    const fullPath = path.join(publicDir, normPath);
    if (fs.existsSync(fullPath)) {
      found.add(relPath);
    } else {
      missing.add(relPath);
    }
  }
});

console.log('Found:', found.size);
console.log('Missing:', missing.size);
if (missing.size > 0) {
  console.log('Missing images:\n' + Array.from(missing).sort().join('\n'));
}

