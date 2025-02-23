import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function checkData() {
  const blogPostsPath = join(__dirname, "../src/data/blogPosts.json");
  const rawData = await fs.readFile(blogPostsPath, "utf8");
  const blogPosts = JSON.parse(rawData);

  console.log("Data validation:");
  console.log("Number of posts:", Object.keys(blogPosts).length);

  for (const [slug, post] of Object.entries(blogPosts)) {
    console.log(`\nValidating ${slug}:`);
    console.log("Has translations:", !!post.translations);
    console.log("Languages:", Object.keys(post.translations || {}));
  }
}

checkData().catch(console.error);
