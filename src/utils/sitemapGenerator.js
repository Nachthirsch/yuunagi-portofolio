import { getAllBlogPosts } from "./blogUtils";

export const generateSitemap = async () => {
  const baseUrl = "https://handraputratama.xyz";
  const posts = await getAllBlogPosts();
  const currentDate = new Date().toISOString();

  // Static pages configuration
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "writes", priority: "0.9", changefreq: "daily" },
    { url: "about", priority: "0.7", changefreq: "monthly" },
    { url: "contact", priority: "0.7", changefreq: "monthly" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      
      ${staticPages
        .map(
          (page) => `
        <url>
          <loc>${baseUrl}/${page.url}</loc>
          <lastmod>${currentDate}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
        )
        .join("")}

      ${posts
        .map(
          (post) => `
        <url>
          <loc>${baseUrl}/writes/${post.slug}</loc>
          <lastmod>${new Date(post.updated_at || post.created_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
          ${
            post.thumbnail
              ? `
          <image:image>
            <image:loc>${post.thumbnail}</image:loc>
            <image:title>${post.title}</image:title>
            <image:caption>${post.excerpt}</image:caption>
          </image:image>
          `
              : ""
          }
          <news:news>
            <news:publication>
              <news:name>Yuunagi Blog</news:name>
              <news:language>${post.languages[0].toLowerCase()}</news:language>
            </news:publication>
            <news:publication_date>${new Date(post.created_at).toISOString()}</news:publication_date>
            <news:title>${post.title}</news:title>
            <news:keywords>${post.tags.join(",")}</news:keywords>
          </news:news>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  return sitemap;
};

// Add link checker
export const checkDeadLinks = async (content) => {
  const urlPattern = /https?:\/\/[^\s<>'"]+/g;
  const urls = content.match(urlPattern) || [];
  const deadLinks = [];

  for (const url of urls) {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) {
        deadLinks.push(url);
      }
    } catch (error) {
      deadLinks.push(url);
    }
  }

  return deadLinks;
};

// Function to update lastmod date
export const updateLastModified = async (slug) => {
  try {
    const { data, error } = await supabase.from("blog_posts").update({ updated_at: new Date().toISOString() }).eq("slug", slug);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating lastmod:", error);
    throw error;
  }
};

// Generate sitemap index if you have multiple sitemaps
export const generateSitemapIndex = (sitemaps) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps
        .map(
          (sitemap) => `
        <sitemap>
          <loc>${sitemap.url}</loc>
          <lastmod>${sitemap.lastmod}</lastmod>
        </sitemap>
      `
        )
        .join("")}
    </sitemapindex>`;
};

// Function to generate and save sitemap
export const saveSitemap = async () => {
  try {
    const sitemap = await generateSitemap();

    // Save sitemap.xml to public directory
    const response = await fetch("/api/save-sitemap", {
      method: "POST",
      headers: { "Content-Type": "application/xml" },
      body: sitemap,
    });

    if (!response.ok) throw new Error("Failed to save sitemap");
    return true;
  } catch (error) {
    console.error("Error saving sitemap:", error);
    return false;
  }
};
