import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock, ArrowLeft, Globe } from "lucide-react";
import { getAllBlogPosts, filterBlogPosts, getFilterOptions } from "../../../utils/blogUtils";
import SearchFilters from "../../common/SearchFilters";
import { Helmet } from "react-helmet-async";

const BlogList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await getAllBlogPosts();
        setAllPosts(posts || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filterOptions = useMemo(() => getFilterOptions(allPosts), [allPosts]);

  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedTags: [],
    selectedCategory: "",
    selectedLanguage: "",
  });

  const filteredPosts = useMemo(() => filterBlogPosts(allPosts, filters), [allPosts, filters]);

  // Time to read estimation
  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.length || 0;
    return Math.ceil(words / wordsPerMinute) || 2;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 font-merriweather pt-24 pb-16 px-4 sm:px-8 md:px-16 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
          <div className="w-3 h-3 border-t border-l border-neutral-500 rounded-full animate-spin"></div>
          <p className="text-neutral-400 text-xs">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-900 font-merriweather pt-24 pb-16 px-4 sm:px-8 md:px-16 flex items-center justify-center">
        <div className="p-4 border border-neutral-700/30 rounded text-center max-w-md">
          <p className="text-neutral-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>YUUNAGI: Digital Chronicles | Blog</title>
        <meta name="description" content="Explore articles about development, technology, and more." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {/* Refined Back to Portfolio Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="fixed top-8 left-8 z-50">
        <Link to="/" className="group flex items-center gap-2 text-neutral-500 hover:text-neutral-300 transition-colors">
          <div className="relative h-px w-5 bg-neutral-600 group-hover:w-6 transition-all duration-300">
            <div className="absolute -left-px -top-px w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-neutral-400 transition-colors"></div>
          </div>
          <span className="text-[10px] font-mono tracking-wide uppercase">Portfolio</span>
        </Link>
      </motion.div>

      <section className="min-h-screen bg-neutral-900 font-merriweather pt-16 pb-8 px-3 sm:pt-24 sm:pb-16 sm:px-8 md:px-16 relative">
        <div className="max-w-3xl mx-auto">
          {/* Enhanced Minimal Header */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mb-12">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] text-neutral-500 tracking-widest uppercase font-mono">yuunagi.site</p>
              <h1 className="text-xl sm:text-2xl text-neutral-200 font-light tracking-wide">Blog</h1>
              <div className="w-12 h-px bg-neutral-700/50 mt-2"></div>
            </div>
          </motion.div>

          {/* Filter Controls */}
          <div className="mb-10">
            {/* Count with typographic enhancement */}
            <div className="text-neutral-500 text-[10px] mb-2 font-mono tracking-wide">
              {filteredPosts.length.toString().padStart(2, "0")} {filteredPosts.length === 1 ? "entry" : "entries"}
            </div>

            {/* Search Filters - Better Border Treatment */}
            <div className="border-l-2 border-neutral-800 pl-3 py-1">
              <SearchFilters filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
            </div>
          </div>

          {/* No Results State */}
          {filteredPosts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center border-t border-b border-neutral-800/50">
              <p className="text-neutral-400 text-sm mb-3">No matching posts found</p>
              <button onClick={() => setFilters({ searchQuery: "", selectedTags: [], selectedCategory: "", selectedLanguage: "" })} className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                Reset filters
              </button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-px">
              {/* Posts List - Enhanced Text and Lines Design */}
              {filteredPosts.map((post, index) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                  <Link to={`/writes/${post.slug}`} className="block py-5 border-t border-neutral-800/30 hover:bg-neutral-800/5 transition-colors group">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1.5">
                      {/* Date - With Refined Styling */}
                      <div className="hidden sm:block text-[10px] text-neutral-600 font-mono min-w-[80px] group-hover:text-neutral-500 transition-colors">{post.date || "—"}</div>

                      {/* Content Area with Improved Typography */}
                      <div className="flex-1 relative">
                        {/* Mobile Date - Enhanced Typography */}
                        <div className="flex items-center gap-3 text-[10px] text-neutral-600 mb-1 sm:hidden font-mono">
                          {post.date && (
                            <span className="flex items-center gap-1">
                              <Calendar size={10} strokeWidth={1.5} />
                              {post.date}
                            </span>
                          )}
                          {post.category && <span className="opacity-60">{post.category}</span>}
                        </div>

                        {/* Title with Left Indicator on Hover */}
                        <h2 className="text-neutral-300 group-hover:text-neutral-100 transition-colors text-base font-normal leading-snug relative">
                          {/* Subtle line indicator that appears on hover */}
                          <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-0 h-[1px] bg-neutral-400 group-hover:w-2 transition-all duration-300"></span>
                          {post.title}
                        </h2>

                        {/* Excerpt with better fade */}
                        {post.excerpt && <p className="text-xs text-neutral-400 mt-1 line-clamp-1 group-hover:text-neutral-500 transition-colors">{post.excerpt}</p>}

                        {/* Metadata with refined spacing */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                          {/* Category - Desktop Only */}
                          {post.category && <span className="hidden sm:block text-[10px] text-neutral-500 uppercase tracking-wide">{post.category}</span>}

                          {/* Read Time */}
                          <span className="flex items-center gap-1 text-[10px] text-neutral-500">
                            <Clock size={10} strokeWidth={1.5} />
                            {estimateReadTime(post.excerpt)} min read
                          </span>

                          {/* Languages */}
                          {post.languages?.length > 0 && (
                            <span className="flex items-center gap-1 text-[10px] text-neutral-500">
                              <Globe size={10} strokeWidth={1.5} />
                              {post.languages.join(" / ")}
                            </span>
                          )}

                          {/* Tags */}
                          {post.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags.slice(0, 2).map((tag, tagIndex) => (
                                <span key={tagIndex} className="text-[9px] text-neutral-500">
                                  #{tag}
                                </span>
                              ))}
                              {post.tags.length > 2 && <span className="text-[9px] text-neutral-600">+{post.tags.length - 2}</span>}
                            </div>
                          )}

                          {/* Read Indicator - Enhanced */}
                          <span className="ml-auto text-[10px] text-neutral-700 group-hover:text-neutral-500 transition-colors flex items-center gap-1 relative">
                            <span>read</span>
                            <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-all duration-300" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Bottom Border with Enhanced Visual Treatment */}
              <div className="border-b border-neutral-800/30"></div>

              {/* Pagination Info with Refined Typography */}
              <div className="py-6 text-center">
                <div className="inline-flex items-center gap-2">
                  <span className="h-px w-4 bg-neutral-800/50"></span>
                  <p className="text-neutral-700 text-[10px] font-mono">
                    {filteredPosts.length} of {allPosts.length}
                  </p>
                  <span className="h-px w-4 bg-neutral-800/50"></span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Subtle background element for visual interest */}
        <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800/20 to-transparent"></div>
      </section>
    </>
  );
};

export default BlogList;
