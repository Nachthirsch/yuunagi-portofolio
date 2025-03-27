import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Calendar, User, Tag, Globe, ArrowRight, Clock, Terminal, Code, Star, Coffee } from "lucide-react";
import { getAllBlogPosts, filterBlogPosts, getFilterOptions } from "../../../utils/blogUtils";
import SearchFilters from "../../common/SearchFilters";
import { Helmet } from "react-helmet-async";

// Custom decorative elements
const Glyph = ({ variant = "circle", className = "" }) => {
  const glyphs = {
    circle: <div className={`w-2 h-2 rounded-full bg-current ${className}`}></div>,
    square: <div className={`w-2 h-2 bg-current ${className}`}></div>,
    diamond: <div className={`w-2 h-2 bg-current rotate-45 ${className}`}></div>,
    cross: (
      <div className={`relative w-3 h-3 ${className}`}>
        <div className="absolute w-3 h-0.5 bg-current top-1/2 -translate-y-1/2"></div>
        <div className="absolute h-3 w-0.5 bg-current left-1/2 -translate-x-1/2"></div>
      </div>
    ),
    dot: <div className={`w-1 h-1 rounded-full bg-current ${className}`}></div>,
  };

  return glyphs[variant] || glyphs.circle;
};

// Fancy decorative text with slash elements
const DecorativeHeading = ({ children, className = "", glyphColor = "text-neutral-400" }) => (
  <h1 className={`relative inline-flex items-center font-bold ${className}`}>
    <span className="relative">
      <span className="tracking-wider">{children}</span>
      <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-neutral-400"></span>
    </span>
    <span className="flex ml-2 space-x-1">
      <Glyph variant="diamond" className={glyphColor} />
      <Glyph variant="square" className={`${glyphColor} opacity-75`} />
      <Glyph variant="circle" className={`${glyphColor} opacity-50`} />
    </span>
  </h1>
);

// Custom typographical element
const TypewriterText = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeInOut",
      }}
      className="overflow-hidden whitespace-nowrap"
    >
      {children}
    </motion.div>
  );
};

// Helper to get appropriate icon for category
const getCategoryIcon = (category) => {
  const icons = {
    tech: <Terminal size={12} />,
    development: <Code size={12} />,
    personal: <User size={12} />,
    tutorial: <Book size={12} />,
    review: <Star size={12} />,
    lifestyle: <Coffee size={12} />,
  };

  return icons[category?.toLowerCase()] || <Tag size={12} />;
};

// Niche decorator lines
const DecorativeLines = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
    <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent"></div>
    <div className="absolute top-40 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent"></div>
    <div className="absolute top-60 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent"></div>
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="absolute h-full w-px bg-neutral-800/30" style={{ left: `${i * 8.33}%` }}></div>
    ))}
  </div>
);

const BlogList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [layout, setLayout] = useState("grid"); // "grid" or "list"

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const posts = await getAllBlogPosts();
        console.log("Fetched posts:", posts); // Debug log
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

  // Card variations for visual interest
  const getCardStyle = (index) => {
    const styles = ["border-l-4 border-neutral-500 [mask-image:linear-gradient(to_bottom,white,white)]", "border-t-4 border-neutral-400 [mask-image:linear-gradient(to_right,white,white)]", "border-r-4 border-neutral-500 [mask-image:linear-gradient(to_left,white,white)]", "border-b-4 border-neutral-400 [mask-image:linear-gradient(to_top,white,white)]", "border-l-4 border-neutral-500 after:content-[''] after:absolute after:top-0 after:left-0 after:w-2 after:h-2 after:bg-neutral-500", "border-t-4 border-neutral-400 after:content-[''] after:absolute after:top-0 after:right-0 after:w-2 after:h-2 after:bg-neutral-400"];
    return styles[index % styles.length];
  };

  // Generate uniquely styled cards based on index
  const getUniqueCardStyle = (index) => {
    // Base styles for all cards
    let style = "relative overflow-hidden bg-neutral-800/60 backdrop-blur-sm";

    // Visual variations based on index
    if (index % 7 === 0) {
      // Featured style
      style += " border-l-4 border-neutral-500";
    } else if (index % 7 === 1) {
      // Subtle top accent
      style += " border-t border-neutral-500/50 bg-gradient-to-b from-neutral-900/10 to-neutral-800/60";
    } else if (index % 7 === 2) {
      // Right side accent
      style += " border-r border-neutral-500/50 bg-gradient-to-l from-neutral-900/10 to-neutral-800/60";
    } else if (index % 7 === 3) {
      // Subtle bottom glow
      style += " border border-b-2 border-neutral-700/30 border-b-neutral-500/50";
    } else if (index % 7 === 4) {
      // Corner triangle
      style += " border-t-4 border-r-4 border-t-neutral-500/70 border-r-neutral-500/20";
    } else if (index % 7 === 5) {
      // Double border
      style += " border border-neutral-700/30 outline outline-1 outline-offset-4 outline-neutral-700/20";
    } else {
      // Default with simple border
      style += " border border-neutral-700/30";
    }

    return style;
  };

  // Time to read estimation
  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.length || 0;
    return Math.ceil(words / wordsPerMinute) || 2; // Default to 2 min
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 font-merriweather pt-24 pb-16 px-4 sm:px-8 md:px-16 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-t-2 border-l-2 border-neutral-500 rounded-full animate-spin"></div>
          <p className="text-neutral-400 tracking-widest uppercase text-sm">Loading writings</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-900 font-merriweather pt-24 pb-16 px-4 sm:px-8 md:px-16 flex items-center justify-center">
        <div className="p-6 bg-neutral-800/50 border border-red-500/30 rounded-lg text-center max-w-md">
          <h2 className="text-red-400 text-xl mb-2">Error Encountered</h2>
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
      <section className="min-h-screen bg-neutral-900 font-merriweather pt-16 pb-8 px-3 sm:pt-24 sm:pb-16 sm:px-8 md:px-16 relative overflow-hidden">
        {/* Ambient background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,163,163,0.03)_0%,transparent_65%)] pointer-events-none"></div>
        <div className="absolute top-40 left-10 w-32 h-32 rounded-full bg-neutral-900/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-40 right-10 w-64 h-64 rounded-full bg-neutral-900/5 blur-3xl pointer-events-none"></div>

        <DecorativeLines />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mb-6 sm:mb-12">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs tracking-[0.2em] sm:tracking-[0.3em] text-neutral-400 font-mono uppercase">yuunagi</span>
                <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-neutral-500 to-transparent"></span>
                <TypewriterText>
                  <span className="text-xs text-neutral-500 font-mono">~/digital_chronicles</span>
                </TypewriterText>
              </div>

              <DecorativeHeading className="text-xl sm:text-2xl md:text-3xl text-neutral-200">BLOG POSTS</DecorativeHeading>

              <div className="relative pl-4 sm:pl-5 border-l border-neutral-500/30 max-w-2xl">
                <TypewriterText delay={0.3}>
                  <p className="text-neutral-400">Everything about words</p>
                </TypewriterText>

                <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.4 }} className="absolute -bottom-4 left-0 h-px w-24 bg-gradient-to-r from-neutral-500 to-transparent"></motion.div>
              </div>
            </div>
          </motion.div>

          <div className="mb-6 sm:mb-10 space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div className="flex items-center mb-4">
                <span className="text-neutral-400 text-sm mr-2">
                  Found <span className="text-neutral-400 font-medium">{filteredPosts.length}</span> articles
                </span>
                <div className="flex -space-x-1">
                  {[...new Set(filteredPosts.slice(0, 3).map((p) => p.category))].map((cat, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full flex items-center justify-center 
                      ${i === 0 ? "bg-neutral-500" : i === 1 ? "bg-neutral-500" : "bg-neutral-500"}`}
                    >
                      {getCategoryIcon(cat)}
                    </div>
                  ))}
                  {filteredPosts.length > 3 && <div className="w-6 h-6 rounded-full bg-neutral-700 text-xs flex items-center justify-center">+{filteredPosts.length - 3}</div>}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setLayout("grid")} className={`p-2 rounded ${layout === "grid" ? "bg-neutral-800 text-neutral-400 before:absolute before:content-[''] before:w-1 before:h-1 before:bg-neutral-400 before:rounded-full before:top-1 before:right-1" : "text-neutral-500"} relative`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button onClick={() => setLayout("list")} className={`p-2 rounded ${layout === "list" ? "bg-neutral-800 text-neutral-400 before:absolute before:content-[''] before:w-1 before:h-1 before:bg-neutral-400 before:rounded-full before:top-1 before:right-1" : "text-neutral-500"} relative`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            <div className="-mx-3 sm:mx-0 px-3 sm:px-0 py-2 sm:py-0 bg-neutral-800/50 sm:bg-transparent">
              <SearchFilters filters={filters} setFilters={setFilters} filterOptions={filterOptions} />
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative p-8 text-center before:absolute before:inset-0 before:border before:border-dashed before:border-neutral-700/30 before:rounded-lg">
              <div className="relative z-10">
                <div className="inline-flex justify-center items-center w-16 h-16 mb-4 [background:repeating-linear-gradient(45deg,rgba(163,163,163,0.1),rgba(163,163,163,0.1)_5px,transparent_5px,transparent_10px)]">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl text-neutral-300 mb-2 inline-flex font-mono">
                  <span className="text-neutral-400 mr-2">[404]</span> No matching posts found
                </h3>
                <p className="text-neutral-400 max-w-sm mx-auto">Try adjusting your search parameters or browse all posts</p>
                <div className="mt-4 text-neutral-400 text-xs">
                  <button onClick={() => setFilters({ searchQuery: "", selectedTags: [], selectedCategory: "", selectedLanguage: "" })} className="border border-neutral-500/30 px-4 py-1.5 hover:bg-neutral-500/10 transition-colors duration-300">
                    Reset filters
                  </button>
                </div>
              </div>
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neutral-500"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-neutral-500"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-neutral-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neutral-500"></div>
            </motion.div>
          ) : (
            <motion.div
              className={`
              ${layout === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 lg:gap-8" : "space-y-3 sm:space-y-6"}
            `}
            >
              {filteredPosts.map((post, index) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group touch-pan-y">
                  <Link to={`/writes/${post.slug}`} className="block h-full">
                    <article
                      className={`
                        rounded-lg overflow-hidden shadow-lg hover:shadow-xl 
                        transition-all duration-300 transform hover:-translate-y-1
                        ${getUniqueCardStyle(index)} h-full
                        active:scale-[0.98] touch-pan-y
                      `}
                    >
                      {post.thumbnail && (
                        <div className="relative h-32 xs:h-36 sm:h-48 overflow-hidden">
                          <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder.jpg";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>

                          {/* Category badge with matching icon */}
                          {post.category && (
                            <span
                              className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-1 
                    rounded text-[10px] sm:text-xs flex items-center gap-1.5 
                    backdrop-blur-sm border border-neutral-500/30 
                    bg-neutral-900/90 text-neutral-300"
                            >
                              {getCategoryIcon(post.category)}
                              {post.category}
                            </span>
                          )}

                          {/* Decorative corner accent */}
                          <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
                            <div className="absolute w-4 h-4 border-t-2 border-l-2 border-neutral-500/50"></div>
                          </div>
                        </div>
                      )}

                      <div className="p-3 sm:p-4 md:p-6 flex flex-col h-full">
                        <div className="mb-2 sm:mb-3 flex flex-col">
                          {/* Title with decorative element */}
                          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-200 group-hover:text-neutral-300 transition-colors duration-300 relative leading-snug">
                            {post.title}
                            <span className="absolute -left-4 top-2 w-2 h-2 bg-neutral-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          </h2>

                          {/* Languages indicator */}
                          {post.languages?.length > 0 && (
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-neutral-500 mt-1.5 sm:mt-2">
                              <Globe size={12} />
                              <span>{post.languages.join(" / ")}</span>
                            </div>
                          )}
                        </div>

                        {/* Content preview */}
                        {post.excerpt && <p className="mt-1.5 sm:mt-2 text-neutral-400 text-[11px] sm:text-sm line-clamp-2 flex-grow font-light leading-loose">{post.excerpt}</p>}

                        {/* Metadata bar */}
                        <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-dashed border-neutral-700/30 flex flex-wrap gap-2 text-[10px] sm:text-xs text-neutral-400">
                          {post.date && (
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-neutral-400" />
                              {post.date}
                            </span>
                          )}
                          {post.author && (
                            <span className="flex items-center gap-1">
                              <User size={12} className="text-neutral-400" />
                              {post.author}
                            </span>
                          )}
                          <span className="flex items-center gap-1 ml-auto">
                            <Clock size={12} className="text-neutral-400" />
                            {estimateReadTime(post.excerpt)} min read
                          </span>
                        </div>

                        {/* Tags */}
                        {post.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                            {post.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="text-xs px-2 py-0.5 rounded-sm bg-neutral-700/30 text-neutral-300 font-mono">
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && <span className="text-xs px-2 py-0.5 rounded-sm bg-neutral-700/30 text-neutral-400 font-mono">+{post.tags.length - 2}</span>}
                          </div>
                        )}

                        {/* Read more indicator */}
                        <div className="mt-2 sm:mt-4 text-neutral-400 text-xs sm:text-sm font-medium flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                          <span className="font-mono">&gt;</span> Read article <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>

                      {/* Decorative corner accent */}
                      <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden opacity-30 group-hover:opacity-100 transition-opacity">
                        <div className="absolute transform rotate-45 bg-gradient-to-br from-neutral-500/20 to-neutral-500/5 w-16 h-16 -bottom-8 -right-8"></div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 sm:mt-12 text-center">
            <div className="inline-block relative py-3 px-5 group hover:scale-[1.02] transition-transform duration-300">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-neutral-800/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Scan line effect */}
              <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.08)_3px,transparent_4px)] animate-scan"></div>
              </div>

              {/* Main content */}
              <div className="relative">
                <p className="text-neutral-400 text-xs font-mono flex items-center justify-center gap-1.5">
                  <span className="text-neutral-500 group-hover:text-neutral-400 transition-colors">[</span>
                  <span>Showing</span>
                  <span className="bg-neutral-800/80 px-1.5 py-0.5 rounded text-neutral-300 min-w-[1.5rem]">{filteredPosts.length}</span>
                  <span>of</span>
                  <span className="bg-neutral-800/50 px-1.5 py-0.5 rounded text-neutral-400 min-w-[1.5rem]">{allPosts.length}</span>
                  <span>posts</span>
                  <span className="text-neutral-500 group-hover:text-neutral-400 transition-colors">]</span>
                </p>
              </div>

              {/* Enhanced corner decorations */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-500 transition-all duration-300 group-hover:border-neutral-400 group-hover:w-3 group-hover:h-3"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-500 transition-all duration-300 group-hover:border-neutral-400 group-hover:w-3 group-hover:h-3"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-500 transition-all duration-300 group-hover:border-neutral-400 group-hover:w-3 group-hover:h-3"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-500 transition-all duration-300 group-hover:border-neutral-400 group-hover:w-3 group-hover:h-3"></div>

              {/* Center dots */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-500/50 group-hover:bg-neutral-400/70 transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-500/50 group-hover:bg-neutral-400/70 transition-colors duration-300"></div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogList;
