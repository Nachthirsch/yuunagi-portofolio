const BlogList = () => {
  const posts = [
    { id: 1, title: "First Blog Post", summary: "This is the summary of the first blog post." },
    { id: 2, title: "Second Blog Post", summary: "This is the summary of the second blog post." },
    // Add more blog posts here
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
