# ZM Printing & Design Ltd. — Official Website

Official website for ZM Printing & Design Ltd. (Screen Printing, Sublimation, Rubber & Silicone Patches, NXP & Ultrasonic Welds, Garment Trims Factory in Savar, Bangladesh).

---

## 🚀 Quick Launch (Windows One-Click)

- **Local Preview / Development:** Double-click `1_RUN_LOCALHOST.bat`
- **Build for Live Hosting:** Double-click `2_BUILD_PRODUCTION_DIST.bat`

---

## 🌐 Live Deployment Instructions

Once `2_BUILD_PRODUCTION_DIST.bat` finishes (or run `npm run build`), the production-ready files are generated inside:
`zmwebsite-main/dist/`

### 1. cPanel / Shared Hosting (Apache / LiteSpeed)
1. Open your cPanel File Manager and navigate to `public_html` (or your domain root).
2. Upload and extract all files from `zmwebsite-main/dist/` directly into `public_html`.
3. The included `.htaccess` file handles:
   - React SPA routing (no 404 on page reload/direct URL visits like `/about`, `/products`)
   - Automatic HTTP to HTTPS redirection
   - GZIP/Brotli compression
   - 1-year browser asset caching for lightning-fast speeds

### 2. Netlify / Cloudflare Pages / Vercel
- The included `_redirects` file guarantees zero 404 errors on direct navigation.
- If deploying via Git, connect the repository and set:
  - **Build Command:** `npm run build`
  - **Output Directory:** `dist`

### 3. SEO & Indexing
- Search engine crawler instructions: `robots.txt`
- Full XML Sitemap: `sitemap.xml` (all 45+ pages, products, factory sections, and articles)
