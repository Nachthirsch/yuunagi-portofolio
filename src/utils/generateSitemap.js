import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const domain = 'https://yuunagi.netlify.app';

const pages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly'
  },
  // Add more routes as needed
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(({ path, priority, changefreq }) => {
          return `
            <url>
              <loc>${domain}${path}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>${changefreq}</changefreq>
              <priority>${priority}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;

  const dir = resolve(__dirname, '../../dist');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(resolve(dir, 'sitemap.xml'), sitemap.trim());
};

export default generateSitemap;
