import blogPosts from "../data/blogPosts.json";

export const getBlogPostBySlug = (slug) => {
  const post = blogPosts[slug];
  if (!post) return null;

  // Get available languages
  const availableLanguages = Object.keys(post.translations || {});

  // If no translations available, return null
  if (availableLanguages.length === 0) return null;

  return {
    ...post,
    availableLanguages,
  };
};

export const getAllBlogPosts = () => {
  if (!blogPosts) return [];

  return Object.entries(blogPosts)
    .map(([slug, post]) => {
      const translations = post?.translations || {};
      const languages = Object.keys(translations);
      if (languages.length === 0) return null;

      const firstTranslation = translations[languages[0]];
      if (!firstTranslation) return null;

      // Find first image from sections
      const firstImageSection = firstTranslation.sections?.find((section) => section?.type === "image" && ((section.images && section.images.length > 0) || (section.image && section.image.src)));

      // Get thumbnail URL from either new or old format
      const thumbnailSrc = firstImageSection ? firstImageSection.images?.[0]?.src || firstImageSection.image?.src : null;

      return {
        slug,
        title: firstTranslation.title || "Untitled",
        thumbnail: thumbnailSrc,
        date: firstTranslation.metadata?.date || "",
        author: firstTranslation.metadata?.author || "",
        tags: firstTranslation.metadata?.tags || [],
        excerpt: getExcerpt(firstTranslation),
        languages: languages.map((lang) => lang.toUpperCase()),
      };
    })
    .filter(Boolean);
};

// Helper function to get clean excerpt
const getExcerpt = (translation, maxLength = 150) => {
  const introSection = translation.sections?.find((section) => section?.type === "introduction" || section?.type === "section");

  if (!introSection?.content) return "";

  // Remove HTML tags and get plain text
  const plainText = introSection.content.replace(/<[^>]+>/g, "");
  return plainText.length > maxLength ? plainText.slice(0, maxLength) + "..." : plainText;
};
