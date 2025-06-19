import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, Clock, Globe } from "lucide-react";
import { getAllBlogPosts, filterBlogPosts } from "../../../utils/blogUtils";
import { Helmet } from "react-helmet-async";

const WelcomeAnimation = ({ onSkip }) => {
  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      {/* Background pattern - subtle grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, #333333 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      {/* Central vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 20%, #090909 70%)",
        }}
      ></div>

      <motion.div
        className="flex flex-col items-center justify-center gap-4 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 1 },
        }}
        exit={{ opacity: 0, scale: 1.1 }}
      >
        {/* Floating particles */}
        <motion.div className="absolute left-1/2 top-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.5, duration: 1 }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-neutral-400"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, Math.random() * -20 - 10],
                x: [0, Math.random() * 20 - 10],
                opacity: [0.8, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>{" "}
        <motion.div className="w-28 h-28 relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
          <motion.div className="absolute inset-0 rounded-full bg-neutral-800" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ delay: 0.6, duration: 1.2, times: [0, 0.6, 1] }} />{" "}
          <motion.div className="absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
            <svg width="90" height="90" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-neutral-300" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Updated kanji based on the provided image */}
              <g transform="translate(50, 40) scale(0.8)">
                {/* Simplified outline of the kanji character with inverted color (white) */}
                <path d="M30,20 C40,15 55,15 65,20 C75,25 85,35 85,50 C85,65 75,80 60,85 C45,90 30,85 20,75" />
                <path d="M55,40 C60,42 65,45 70,50 C75,55 78,62 76,70 C74,78 68,85 60,88 C52,90 42,88 35,82" />
                <path d="M40,30 C45,35 50,42 52,50 C54,58 55,70 50,80 C45,90 35,95 25,93" />
                <path d="M75,70 C80,65 85,60 90,55 C95,50 100,45 105,42" />
                <path d="M70,80 C75,75 82,72 90,70 C98,68 110,66 120,67" />
                <path d="M50,95 C55,100 62,103 70,105 C78,107 90,108 100,105" />
                {/* Additional strokes to match the sketch-like quality */}
                <path d="M55,25 C60,23 70,22 75,25" />
                <path d="M45,60 C50,58 55,57 60,60" />
              </g>
            </svg>
          </motion.div>{" "}
          {/* Ink splashes around kanji */}
          <motion.div
            className="absolute -inset-4 opacity-0"
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0.8, 1.3],
            }}
            transition={{
              duration: 2,
              delay: 2,
              repeat: 1,
              repeatType: "loop",
              repeatDelay: 1,
            }}
          >
            <svg width="140" height="140" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700">
              <g transform="translate(100, 100)">
                {/* Ink splashes */}
                <path d="M-70,-20 Q-60,-40 -40,-30 Q-20,-25 -30,-10 Q-40,0 -60,-5 Q-75,-10 -70,-20 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M50,-40 Q70,-50 80,-30 Q85,-10 70,0 Q55,5 45,-15 Q40,-30 50,-40 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M-20,40 Q-10,60 10,50 Q25,40 15,25 Q5,15 -10,20 Q-25,25 -20,40 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M20,30 Q35,25 40,40 Q45,55 30,60 Q15,60 10,45 Q10,35 20,30 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                {/* Tiny dots */}
                <circle cx="-60" cy="40" r="2" fill="currentColor" opacity="0.3" />
                <circle cx="60" cy="20" r="1.5" fill="currentColor" opacity="0.3" />
                <circle cx="-40" cy="-50" r="2" fill="currentColor" opacity="0.3" />
                <circle cx="20" cy="-30" r="1" fill="currentColor" opacity="0.3" />
                <circle cx="40" cy="50" r="1.5" fill="currentColor" opacity="0.3" />
              </g>
            </svg>
          </motion.div>
        </motion.div>{" "}
        <motion.div className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.7 }}>
          <p className="text-neutral-400 text-xl font-light tracking-wider">Welcome to</p>
          <p className="text-neutral-300 text-2xl font-light mt-1">
            夕凪 <span className="text-sm opacity-70">YUUNAGI</span>
          </p>
        </motion.div>
        <motion.div className="w-16 h-px bg-neutral-700/50" initial={{ width: 0 }} animate={{ width: 150 }} transition={{ delay: 2.2, duration: 0.8 }} />
        <motion.p className="text-neutral-500 text-xs font-mono mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.5 }}>
          Digital Chronicles
        </motion.p>{" "}
        {/* Loading indicator that appears toward the end */}
        <motion.div className="mt-8 flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 0.5 }}>
          <div className="flex items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-neutral-500 animate-pulse"></span>
            <span className="block w-1.5 h-1.5 rounded-full bg-neutral-500 animate-pulse" style={{ animationDelay: "0.2s" }}></span>
            <span className="block w-1.5 h-1.5 rounded-full bg-neutral-500 animate-pulse" style={{ animationDelay: "0.4s" }}></span>
          </div>

          <motion.button onClick={onSkip} className="text-xs text-neutral-500 hover:text-neutral-300 transition-all hover:tracking-wide mt-2 opacity-80" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            Skip
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const BlogList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    // Animasi welcome selalu ditampilkan setiap kali halaman dibuka
    // State showWelcome sudah default true

    // Sembunyikan animasi welcome setelah 5 detik
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []); // Function to skip the welcome animation
  const skipAnimation = () => {
    setShowWelcome(false);
  };

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
  // Filter options are pre-calculated by the filterBlogPosts function when needed

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
      </Helmet>{" "}
      <AnimatePresence>{showWelcome && <WelcomeAnimation onSkip={skipAnimation} />}</AnimatePresence>
      {/* Refined Back to Portfolio Button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="fixed top-8 left-8 z-50">
        <Link to="/" className="group flex items-center gap-2 text-neutral-500 hover:text-neutral-300 transition-colors">
          <div className="relative h-px w-5 bg-neutral-600 group-hover:w-6 transition-all duration-300">
            <div className="absolute -left-px -top-px w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-neutral-400 transition-colors"></div>
          </div>
          <span className="text-[10px] font-mono tracking-wide uppercase">Portfolio</span>
        </Link>
      </motion.div>{" "}
      <motion.section className="min-h-screen bg-neutral-900 font-merriweather pt-16 pb-8 px-3 sm:pt-24 sm:pb-16 sm:px-8 md:px-16 relative" initial={{ opacity: 0 }} animate={{ opacity: showWelcome ? 0 : 1 }} transition={{ duration: 0.8, delay: showWelcome ? 0 : 0.2 }}>
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
              <div className="border-b border-neutral-800/30"></div> {/* Pagination Info with Refined Typography */}
              <div className="py-6 text-center">
                <div className="inline-flex items-center gap-2">
                  <span className="h-px w-4 bg-neutral-800/50"></span>
                  <p className="text-neutral-700 text-[10px] font-mono">
                    {filteredPosts.length} of {allPosts.length}
                  </p>
                  <span className="h-px w-4 bg-neutral-800/50"></span>{" "}
                </div>
              </div>
            </motion.div>
          )}
        </div>{" "}
        {/* Subtle background element for visual interest */}
        <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800/20 to-transparent"></div>
      </motion.section>
    </>
  );
};

export default BlogList;
