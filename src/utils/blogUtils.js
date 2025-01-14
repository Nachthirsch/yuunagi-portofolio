import blogPosts from '../data/blogPosts.json';

export const getBlogPostBySlug = (slug) => {
  return blogPosts[slug] || null;
};

export const getAllBlogPosts = () => {
  return Object.entries(blogPosts).map(([slug, post]) => ({
    slug,
    title: post.title
  }));
};