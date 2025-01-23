import { getAllBlogPosts } from "./blogUtils";

export const generateSitemap = () => {
  const baseUrl = "https://handraputratama.xyz/";
  const posts = getAllBlogPosts();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts
        .map(
          (post) => `
        <url>
          <loc>${baseUrl}/writes/${post.slug}</loc>
          <lastmod>${post.metadata.date}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  return sitemap;
};
