import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Calendar, User, Tag, Globe } from "lucide-react";
import { getAllBlogPosts, filterBlogPosts, getFilterOptions } from "../../../utils/blogUtils";
import SearchFilters from "../../common/SearchFilters";
import { Helmet } from "react-helmet-async";

const BlogList = () => {
  const allPosts = getAllBlogPosts();
  const filterOptions = useMemo(() => getFilterOptions(allPosts), [allPosts]);

  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedTags: [],
    selectedCategory: "",
    selectedLanguage: "",
  });

  const filteredPosts = useMemo(() => filterBlogPosts(allPosts, filters), [allPosts, filters]);

  return (
    <>
      <Helmet>
        <title>Blog Posts | Yuunagi</title>
        <meta name="description" content="Explore articles about development, technology, and more." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <section className="min-h-screen bg-neutral-900 font-mono pt-24 pb-16 px-4 sm:px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
            <h1 className="text-3xl font-bold text-neutral-200 tracking-wider flex items-center gap-3">
              <Book className="text-neutral-400" size={32} />
              BLOG POSTS
            </h1>
            <motion.div className="h-1 bg-gradient-to-r from-neutral-400 to-transparent mt-4 rounded-full" initial={{ width: 0 }} animate={{ width: "8rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
          </motion.div>

          <SearchFilters filters={filters} setFilters={setFilters} filterOptions={filterOptions} />

          <motion.div className="space-y-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link key={post.slug} to={`/writes/${post.slug}`} className="block">
                  <motion.div className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {post.thumbnail && (
                      <div className="relative h-48 sm:h-64 overflow-hidden">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = "/placeholder.jpg"; // Set default placeholder image
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h2 className="text-xl font-semibold text-neutral-200">{post.title}</h2>
                        <div className="flex items-center gap-1 text-sm text-neutral-400">
                          <Globe size={14} />
                          <span>{post.languages.join(" / ")}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-neutral-400">
                        {post.date && (
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {post.date}
                          </span>
                        )}
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {post.author}
                          </span>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Tag size={14} />
                            {post.tags.join(", ")}
                          </span>
                        )}
                      </div>
                      {post.excerpt && <p className="mt-3 text-neutral-300 line-clamp-2">{post.excerpt}</p>}
                    </div>
                  </motion.div>
                </Link>
              ))
            ) : (
              <div className="text-center text-neutral-400 py-8">No posts found matching your criteria</div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogList;
