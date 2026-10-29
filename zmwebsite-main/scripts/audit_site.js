import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Audit Products
const prodFile = fs.readFileSync(path.join(rootDir, 'src/data/products.js'), 'utf8');
const prodSlugs = [...prodFile.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
console.log('Total product slugs in products.js:', prodSlugs.length);

// 2. Audit Factory Sections and News
import { websiteContent } from '../src/data/websiteContent.js';
const sectionSlugs = websiteContent.sections.map(s => s.slug);
console.log('Total sections in websiteContent:', sectionSlugs.length);
console.log('Section slugs:', sectionSlugs);

const newsSlugs = websiteContent.news.map(n => n.slug);
console.log('Total news in websiteContent:', newsSlugs.length);
console.log('News slugs:', newsSlugs);

// 3. Audit Sitemap
const sitemap = fs.readFileSync(path.join(rootDir, 'public/sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>https:\/\/zmprintingbd\.com([^<]*)<\/loc>/g)].map(m => m[1]);
console.log('Total URLs in sitemap.xml:', sitemapUrls.length);

const sitemapProdSlugs = sitemapUrls.filter(u => u.startsWith('/products/')).map(u => u.replace('/products/', ''));
const missingProdInSitemap = prodSlugs.filter(s => !sitemapProdSlugs.includes(s));
console.log('Products missing in sitemap:', missingProdInSitemap);

const extraProdInSitemap = sitemapProdSlugs.filter(s => !prodSlugs.includes(s));
console.log('Sitemap products not in products.js:', extraProdInSitemap);

const sitemapSectionSlugs = sitemapUrls.filter(u => u.startsWith('/section/')).map(u => u.replace('/section/', ''));
console.log('Sections in sitemap:', sitemapSectionSlugs);

console.log('Audit complete.');
