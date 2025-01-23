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
      // Get the first available translation if exists
      const translations = post?.translations || {};
      const languages = Object.keys(translations);
      if (languages.length === 0) {
        return null;
      }

      const firstTranslation = translations[languages[0]] || {
        title: "Untitled",
        metadata: {
          date: "",
          author: "",
          tags: [],
        },
        sections: [],
      };

      // Safely find image section
      const firstImageSection = firstTranslation.sections?.find((section) => section?.type === "image" || section?.type === "images");

      const thumbnailSrc = firstImageSection ? (firstImageSection.type === "image" ? firstImageSection.image?.src : firstImageSection.images?.[0]?.src) : null;

      // Safely find introduction section
      const introSection = firstTranslation.sections?.find((section) => section?.type === "introduction");
      const excerpt = introSection?.content ? introSection.content.slice(0, 150) + "..." : "";

      return {
        slug,
        title: firstTranslation.title || "Untitled",
        thumbnail: thumbnailSrc,
        date: firstTranslation.metadata?.date || "",
        author: firstTranslation.metadata?.author || "",
        tags: firstTranslation.metadata?.tags || [],
        excerpt,
        languages: languages.map((lang) => lang.toUpperCase()),
      };
    })
    .filter(Boolean); // Remove any null entries
};
