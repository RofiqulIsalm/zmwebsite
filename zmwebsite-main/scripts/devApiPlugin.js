import fs from 'fs';
import path from 'path';

/**
 * Localhost Development API Middleware for Vite
 * 
 * Enables the ZM Admin Portal to function 100% locally on Vite dev server (Node.js)
 * without requiring PHP or MySQL installed on the local Windows machine.
 * 
 * In production (cPanel), Apache/LiteSpeed serves the native PHP scripts in public/api/
 */
export function devApiPlugin() {
  return {
    name: 'vite-dev-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost:5173'}`);
        
        if (!url.pathname.startsWith('/api/')) {
          return next();
        }

        // Set response headers
        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          return res.end();
        }

        const action = url.searchParams.get('action') || '';
        const endpoint = url.pathname;

        // Parse Request Body if POST
        let body = {};
        const files = {};

        if (req.method === 'POST') {
          const contentType = req.headers['content-type'] || '';
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const fullBuffer = Buffer.concat(chunks);

          if (contentType.includes('application/json')) {
            try {
              body = JSON.parse(fullBuffer.toString('utf-8') || '{}');
            } catch (e) {
              body = {};
            }
          } else if (contentType.includes('multipart/form-data')) {
            try {
              const dummyRes = new Response(fullBuffer, { headers: { 'content-type': contentType } });
              const formData = await dummyRes.formData();
              for (const [key, val] of formData.entries()) {
                if (typeof val === 'object' && typeof val.arrayBuffer === 'function') {
                  files[key] = val;
                } else {
                  body[key] = val;
                }
              }
            } catch (e) {
              console.error('Multipart form parse error:', e);
            }
          }
        }

        const contentJsonPath = path.resolve(process.cwd(), 'public/data/content.json');
        const readContent = () => {
          try {
            return JSON.parse(fs.readFileSync(contentJsonPath, 'utf-8'));
          } catch (e) {
            return {};
          }
        };
        const writeContent = (data) => {
          fs.writeFileSync(contentJsonPath, JSON.stringify(data, null, 2), 'utf-8');
        };

        // ----------------------------------------------------------------------
        // 1. AUTHENTICATION (auth.php)
        // ----------------------------------------------------------------------
        if (endpoint.includes('auth.php')) {
          if (action === 'login') {
            const { username, password } = body;
            // Allow login with default admin credentials or any reasonable password
            if (username === 'zmadmin' && (password === 'ZM_Admin#2026!' || password.length >= 6)) {
              return res.end(JSON.stringify({
                success: true,
                token: 'zm-local-dev-token-2026',
                user: {
                  id: 1,
                  username: 'zmadmin',
                  email: 'info@zmprintingbd.com',
                  fullName: 'Site Administrator (Local Dev)',
                  role: 'admin'
                }
              }));
            } else {
              res.statusCode = 401;
              return res.end(JSON.stringify({
                success: false,
                error: 'Invalid credentials. Default username: zmadmin and password: ZM_Admin#2026!'
              }));
            }
          }

          if (action === 'check') {
            return res.end(JSON.stringify({
              success: true,
              user: {
                id: 1,
                username: 'zmadmin',
                email: 'info@zmprintingbd.com',
                fullName: 'Site Administrator (Local Dev)',
                role: 'admin'
              }
            }));
          }

          if (action === 'logout') {
            return res.end(JSON.stringify({ success: true, message: 'Logged out successfully.' }));
          }

          if (action === 'change_password') {
            return res.end(JSON.stringify({ success: true, message: 'Password updated successfully in local dev.' }));
          }
        }

        // ----------------------------------------------------------------------
        // 2. CONTENT MANAGEMENT (content.php)
        // ----------------------------------------------------------------------
        if (endpoint.includes('content.php')) {
          const currentContent = readContent();

          if (action === 'get_all') {
            return res.end(JSON.stringify({
              success: true,
              source: 'local_dev_json',
              data: currentContent
            }));
          }

          if (action === 'save_settings') {
            if (body.settings) {
              currentContent.site = { ...(currentContent.site || {}), ...body.settings };
              writeContent(currentContent);
            }
            return res.end(JSON.stringify({ success: true, message: 'Site settings updated and saved to content.json' }));
          }

          if (action === 'save_section') {
            const { page_key, section_key, content } = body;
            if (!currentContent[page_key]) currentContent[page_key] = {};
            if (Array.isArray(content)) {
              currentContent[page_key][section_key] = content;
            } else {
              currentContent[page_key][section_key] = {
                ...(currentContent[page_key][section_key] || {}),
                ...content
              };
            }
            writeContent(currentContent);
            return res.end(JSON.stringify({ success: true, message: `Section '${section_key}' saved to content.json.` }));
          }

          if (action === 'toggle_section') {
            const { page_key, section_key, is_active } = body;
            if (currentContent[page_key] && currentContent[page_key][section_key]) {
              currentContent[page_key][section_key]._isActive = Boolean(is_active);
              writeContent(currentContent);
            }
            return res.end(JSON.stringify({ success: true, is_active: Boolean(is_active) }));
          }

          if (action === 'save_product') {
            const prod = body;
            if (!currentContent.products) currentContent.products = { items: [] };
            if (!currentContent.products.items) currentContent.products.items = [];

            if (prod.id) {
              const idx = currentContent.products.items.findIndex(p => p.id === prod.id);
              if (idx !== -1) {
                currentContent.products.items[idx] = { ...currentContent.products.items[idx], ...prod };
              } else {
                currentContent.products.items.push(prod);
              }
            } else {
              prod.id = Date.now();
              currentContent.products.items.push(prod);
            }
            writeContent(currentContent);
            return res.end(JSON.stringify({ success: true, id: prod.id, message: 'Product saved to content.json.' }));
          }

          if (action === 'delete_product') {
            const { id, confirm } = body;
            if (confirm !== 'DELETE') {
              res.statusCode = 400;
              return res.end(JSON.stringify({ success: false, error: 'Double-check confirmation failed.' }));
            }
            if (currentContent.products?.items) {
              currentContent.products.items = currentContent.products.items.filter(p => p.id !== id);
              writeContent(currentContent);
            }
            return res.end(JSON.stringify({ success: true, message: 'Product deleted from content.json.' }));
          }

          if (action === 'save_team_member') {
            const member = body;
            if (!currentContent.about) currentContent.about = {};
            if (!currentContent.about.leadership) currentContent.about.leadership = {};
            if (!currentContent.about.leadership.members) currentContent.about.leadership.members = [];

            const members = currentContent.about.leadership.members;
            if (member.id) {
              const idx = members.findIndex(m => m.id === member.id);
              if (idx !== -1) {
                members[idx] = { ...members[idx], ...member };
              } else {
                members.push(member);
              }
            } else {
              member.id = Date.now();
              members.push(member);
            }
            writeContent(currentContent);
            return res.end(JSON.stringify({ success: true, id: member.id, message: 'Team member saved to content.json.' }));
          }

          if (action === 'delete_team_member') {
            const { id, confirm } = body;
            if (confirm !== 'DELETE') {
              res.statusCode = 400;
              return res.end(JSON.stringify({ success: false, error: 'Double-check confirmation failed.' }));
            }
            if (currentContent.about?.leadership?.members) {
              currentContent.about.leadership.members = currentContent.about.leadership.members.filter(m => m.id !== id);
              writeContent(currentContent);
            }
            return res.end(JSON.stringify({ success: true, message: 'Team member deleted from content.json.' }));
          }

          if (action === 'publish') {
            return res.end(JSON.stringify({ success: true, message: 'Static JSON cache published.' }));
          }
        }

        // ----------------------------------------------------------------------
        // 3. MEDIA UPLOADER (upload.php)
        // ----------------------------------------------------------------------
        if (endpoint.includes('upload.php')) {
          if (action === 'upload') {
            const file = files['image'];
            if (!file) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ success: false, error: 'No image uploaded.' }));
            }

            const uploadsDir = path.resolve(process.cwd(), 'public/uploads');
            if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

            const originalName = file.name || 'uploaded_image.webp';
            const safeName = path.parse(originalName).name.replace(/[^a-zA-Z0-9_\-]/g, '').toLowerCase();
            const uniqueName = `${safeName}_${Date.now().toString(36)}.webp`;
            const targetPath = path.join(uploadsDir, uniqueName);

            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(targetPath, buffer);

            return res.end(JSON.stringify({
              success: true,
              url: `/uploads/${uniqueName}`,
              fileName: uniqueName,
              fileSize: buffer.length,
              dimensions: 'compressed'
            }));
          }
        }

        res.statusCode = 404;
        return res.end(JSON.stringify({ success: false, error: 'API endpoint not handled' }));
      });
    }
  };
}

