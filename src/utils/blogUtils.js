import blogPosts from "../data/blogPosts.json";

export const getBlogPostBySlug = (slug) => {
  return blogPosts[slug] || null;
};

export const getAllBlogPosts = () => {
  return Object.entries(blogPosts).map(([slug, post]) => {
    const idTranslation = post.translations.id;
    const firstImageSection = idTranslation.sections.find((section) => section.type === "image" || section.type === "images");
    const thumbnailSrc = firstImageSection ? (firstImageSection.type === "image" ? firstImageSection.image.src : firstImageSection.images[0].src) : null;

    return {
      slug,
      title: idTranslation.title,
      thumbnail: thumbnailSrc,
      date: idTranslation.metadata.date,
      author: idTranslation.metadata.author,
      tags: idTranslation.metadata.tags,
      excerpt: idTranslation.sections.find((section) => section.type === "introduction")?.content.slice(0, 150) + "...",
      languages: Object.keys(post.translations).map((lang) => lang.toUpperCase()),
    };
  });
};
