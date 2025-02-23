import { supabase } from "./supabaseClient";

export const getBlogPostBySlug = async (slug) => {
  try {
    const { data: post, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();

    if (error) {
      console.error("Error fetching blog post:", error);
      return null;
    }

    if (!post || !post.translations) {
      console.log("Post not found or invalid format");
      return null;
    }

    // Validate translations
    const availableLanguages = Object.keys(post.translations);
    if (availableLanguages.length === 0) {
      console.log("No translations available");
      return null;
    }

    console.log("Post loaded successfully:", {
      slug: post.slug,
      languages: availableLanguages,
    });

    return post;
  } catch (error) {
    console.error("Error in getBlogPostBySlug:", error);
    return null;
  }
};

export const getAllBlogPosts = async () => {
  try {
    console.log("Fetching all blog posts...");
    const { data: posts, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }

    if (!posts) {
      console.log("No posts found");
      return [];
    }

    return posts
      .map((post) => {
        const translations = post?.translations || {};
        const firstLang = Object.keys(translations)[0];
        const firstTranslation = translations[firstLang];

        if (!firstTranslation) {
          console.log(`No translation found for post ${post.slug}`);
          return null;
        }

        // Get thumbnail from sections
        const firstImageSection = firstTranslation.sections?.find((section) => section?.type === "image" && (section.images?.length > 0 || section.image?.src));

        return {
          id: post.id,
          slug: post.slug,
          title: firstTranslation.title || "Untitled",
          thumbnail: firstImageSection?.images?.[0]?.src || firstImageSection?.image?.src,
          date: firstTranslation.metadata?.date || "",
          author: firstTranslation.metadata?.author || "",
          tags: firstTranslation.metadata?.tags || [],
          excerpt: getExcerpt(firstTranslation),
          languages: Object.keys(translations).map((lang) => lang.toUpperCase()),
          translations: post.translations,
          created_at: post.created_at,
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error("Error in getAllBlogPosts:", error);
    return [];
  }
};

// Helper function to get clean excerpt
const getExcerpt = (translation, maxLength = 150) => {
  const introSection = translation.sections?.find((section) => section?.type === "introduction" || section?.type === "section");

  if (!introSection?.content) return "";

  // Remove HTML tags and get plain text
  const plainText = introSection.content.replace(/<[^>]+>/g, "");
  return plainText.length > maxLength ? plainText.slice(0, maxLength) + "..." : plainText;
};

// Add these utility functions
export const filterBlogPosts = (posts, filters) => {
  const { searchQuery, selectedTags, selectedCategory, selectedLanguage } = filters;

  return posts.filter((post) => {
    // Search query matching
    const searchMatch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    // Tags filtering
    const tagsMatch = !selectedTags?.length || post.tags.some((tag) => selectedTags.includes(tag));

    // Category filtering
    const categoryMatch = !selectedCategory || post.metadata?.category === selectedCategory;

    // Language filtering
    const languageMatch = !selectedLanguage || post.languages.includes(selectedLanguage);

    return searchMatch && tagsMatch && categoryMatch && languageMatch;
  });
};

// Get unique categories and tags from all posts
export const getFilterOptions = (posts) => {
  const tags = new Set();
  const categories = new Set();
  const languages = new Set();

  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag));
    post.metadata?.category && categories.add(post.metadata.category);
    post.languages?.forEach((lang) => languages.add(lang));
  });

  return {
    tags: Array.from(tags),
    categories: Array.from(categories),
    languages: Array.from(languages),
  };
};

// Blog Editor Utils
export const readBlogPosts = async () => {
  try {
    // First try to get from localStorage
    const localData = localStorage.getItem("blog_posts");
    if (localData) {
      return JSON.parse(localData);
    }

    // If no local data, return default structure with sample post
    const defaultData = {
      "welcome-post": {
        metadata: {
          title: "Welcome to My Blog",
          author: "Author Name",
          date: new Date().toISOString().split("T")[0],
          tags: ["welcome", "first-post"],
        },
        translations: {
          en: {
            title: "Welcome to My Blog",
            sections: [
              {
                type: "text",
                content: "Welcome to my blog! This is a sample post.",
              },
            ],
          },
        },
      },
    };

    localStorage.setItem("blog_posts", JSON.stringify(defaultData));
    return defaultData;
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return {}; // Return empty object if everything fails
  }
};

export const saveBlogPosts = async (data) => {
  try {
    // Save to localStorage
    localStorage.setItem("blog_posts", JSON.stringify(data));
    return { success: true };
  } catch (error) {
    console.error("Error saving blog posts:", error);
    throw new Error("Failed to save blog posts");
  }
};

// Add CRUD operations
export const createBlogPost = async (postData) => {
  try {
    // Only send the fields that exist in the database
    const dataToInsert = {
      slug: postData.slug,
      translations: postData.translations,
    };

    const { data, error } = await supabase.from("blog_posts").insert([dataToInsert]).select().single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
};

export const updateBlogPost = async (slug, postData) => {
  try {
    // Only send the fields that exist in the database
    const dataToUpdate = {
      translations: postData.translations,
    };

    const { data, error } = await supabase.from("blog_posts").update(dataToUpdate).eq("slug", slug).select().single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
};

export const deleteBlogPost = async (slug) => {
  const { error } = await supabase.from("blog_posts").delete().eq("slug", slug);

  if (error) throw error;
  return true;
};
