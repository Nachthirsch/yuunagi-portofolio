import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials!");
  console.log("VITE_SUPABASE_URL:", supabaseUrl);
  console.log("VITE_SUPABASE_ANON_KEY:", supabaseKey ? "Present" : "Missing");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migratePosts() {
  try {
    console.log("Starting migration process...");
    console.log("Reading blog posts file...");

    const blogPostsPath = join(__dirname, "../src/data/blogPosts.json");
    const rawData = await fs.readFile(blogPostsPath, "utf8");
    const blogPosts = JSON.parse(rawData);

    console.log(`Found ${Object.keys(blogPosts).length} posts to migrate\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const [slug, post] of Object.entries(blogPosts)) {
      try {
        console.log(`Processing post: ${slug}`);

        // First try to delete existing post to avoid conflicts
        const { error: deleteError } = await supabase.from("blog_posts").delete().eq("slug", slug);

        if (deleteError) {
          console.log(`Warning: Could not delete existing post: ${deleteError.message}`);
        }

        // Insert new post
        const { error: insertError } = await supabase.from("blog_posts").insert([
          {
            slug,
            translations: post.translations,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

        if (insertError) {
          throw insertError;
        }

        successCount++;
        console.log(`Successfully migrated: ${slug}\n`);
      } catch (error) {
        errorCount++;
        console.error(`Error processing ${slug}:`, error.message, "\n");
      }
    }

    // Verify the migration
    const { data: finalCount, error: countError } = await supabase.from("blog_posts").select("*");

    console.log("\nMigration Summary:");
    console.log(`Total posts processed: ${Object.keys(blogPosts).length}`);
    console.log(`Successfully migrated: ${successCount}`);
    console.log(`Failed to migrate: ${errorCount}`);

    if (countError) {
      console.error("\nError verifying migration:", countError.message);
    } else {
      console.log(`\nVerification: ${finalCount.length} posts found in database`);
      console.log("Post slugs in database:");
      finalCount.forEach((post) => console.log(`- ${post.slug}`));
    }
  } catch (error) {
    console.error("Fatal error during migration:", error);
    process.exit(1);
  }
}

console.log("Migration script starting...");
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase key present:", !!supabaseKey);

migratePosts().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
