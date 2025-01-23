import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { getAllBlogPosts } from "./blogUtils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateSitemap = () => {
  const baseUrl = "https://yuunagi.vercel.app";
  const posts = getAllBlogPosts();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts
        .map(
          (post) => `
        <url>
          <loc>${baseUrl}/writes/${post.slug}</loc>
          <lastmod>${post.date}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  const dir = resolve(__dirname, "../../dist");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(resolve(dir, "sitemap.xml"), sitemap.trim());
};

export default generateSitemap;
