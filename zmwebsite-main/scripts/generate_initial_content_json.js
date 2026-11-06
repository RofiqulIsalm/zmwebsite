import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { websiteContent } from '../src/data/websiteContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../public/data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetPath = path.join(targetDir, 'content.json');
fs.writeFileSync(targetPath, JSON.stringify(websiteContent, null, 2), 'utf-8');

console.log(`Successfully generated ${targetPath}`);
console.log(`Content size: ${(fs.statSync(targetPath).size / 1024).toFixed(2)} KB`);

