/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Calendar, User, Tag, Globe, Sun, Moon } from "lucide-react";
import { getBlogPostBySlug } from "../../../utils/blogUtils";
import { useState, useEffect } from "react";
import TableOfContents from "../../common/TableOfContents";
import SEO from "../../common/SEO";
import { Helmet } from "react-helmet-async";

const WritesPage = () => {
  const { slug } = useParams();
  const blogPost = getBlogPostBySlug(slug);
  const [currentLang, setCurrentLang] = useState("");
  const [post, setPost] = useState(null);
  const [isDark, setIsDark] = useState(true);

  // Improved useEffect for language handling
  useEffect(() => {
    if (blogPost?.translations) {
      const langs = Object.keys(blogPost.translations);

      // If current language is valid for this post, keep it
      if (currentLang && langs.includes(currentLang)) {
        setPost(blogPost.translations[currentLang]);
      } else {
        // Otherwise, set new initial language
        const initialLang = langs.includes("id") ? "id" : langs[0];
        setCurrentLang(initialLang);
        setPost(blogPost.translations[initialLang]);
      }
    } else {
      setCurrentLang("");
      setPost(null);
    }
  }, [blogPost, currentLang]); // Add currentLang to dependencies

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Theme-based styles
  const themeStyles = {
    background: isDark ? "bg-neutral-900" : "bg-gray-50",
    text: isDark ? "text-neutral-200" : "text-gray-900",
    subtext: isDark ? "text-neutral-400" : "text-gray-600",
    border: isDark ? "border-neutral-700/30" : "border-gray-200",
    select: isDark ? "bg-neutral-800 text-neutral-200" : "bg-white text-gray-900 border border-gray-200",
    content: isDark ? "text-neutral-300" : "text-gray-700",
    hover: isDark ? "hover:text-neutral-200" : "hover:text-gray-900",
  };

  const getMetaDescription = (post) => {
    const introSection = post.sections?.find((s) => s.type === "introduction");
    const plainText = introSection?.content?.replace(/<[^>]+>/g, "").slice(0, 160) || "";
    return plainText;
  };

  if (!blogPost) {
    return (
      <section className={`min-h-screen ${themeStyles.background} pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${themeStyles.text}`}>Blog post not found</h1>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className={`min-h-screen ${themeStyles.background} pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${themeStyles.text}`}>Loading...</h1>
        </div>
      </section>
    );
  }

  const availableLanguages = Object.keys(blogPost.translations);

  // Improved language change handler
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    if (blogPost?.translations?.[newLang]) {
      setCurrentLang(newLang);
    }
  };

  // Function to limit the number of displayed tags
  const displayTags = (tags = [], limit = 3) => {
    if (!Array.isArray(tags)) return "";
    if (tags.length <= limit) return tags.join(", ");
    return `${tags.slice(0, limit).join(", ")} +${tags.length - limit} more`;
  };

  return (
    <>
      <SEO title={post.title} description={getMetaDescription(post)} image={post.sections?.find((s) => s.type === "image")?.images?.[0]?.src} />
      <section className={`min-h-screen ${themeStyles.background} pt-16 sm:pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
              <div className="flex items-center gap-4">
                <h1 className={`text-xl sm:text-2xl font-bold ${themeStyles.text} tracking-wider flex items-center gap-3`}>
                  <Book className={themeStyles.subtext} size={24} />
                  {post.title}
                </h1>
                <button onClick={toggleTheme} className={`p-2 rounded-full ${themeStyles.subtext} hover:scale-110 transition-transform`} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}>
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              {availableLanguages.length > 1 && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-3">
                  <Globe size={18} className={`${themeStyles.subtext} animate-pulse`} />
                  <div className="relative">
                    <select value={currentLang} onChange={handleLanguageChange} className="select select-bordered select-sm w-full max-w-[100px] capitalize">
                      {availableLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang === "id" ? "ID" : lang === "en" ? "EN" : lang.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div className={`h-1 bg-gradient-to-r from-${isDark ? "neutral-400" : "gray-400"} to-transparent mt-4 rounded-full`} initial={{ width: 0 }} animate={{ width: "8rem" }} transition={{ duration: 0.8, delay: 0.3 }} />

            <div className={`flex flex-col gap-2 mt-4 ${themeStyles.subtext} text-xs sm:text-sm`}>
              <span className="flex items-center gap-2">
                <Calendar size={14} className="flex-shrink-0" />
                <span className="truncate">{post.metadata.date}</span>
              </span>
              <span className="flex items-center gap-2">
                <User size={14} className="flex-shrink-0" />
                <span className="truncate">{post.metadata.author}</span>
              </span>
              <span className="flex items-start gap-2">
                <Tag size={14} className="flex-shrink-0 mt-1" />
                <span>{displayTags(post.metadata.tags)}</span>
              </span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className={`prose ${isDark ? "prose-invert" : ""} max-w-none`}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-64">
                  <TableOfContents sections={post.sections} themeStyles={themeStyles} />
                </aside>

                <div className="flex-grow">
                  {post.sections &&
                    post.sections.map((section, index) => {
                      if (!section) return null;

                      const sectionId = section.title ? section.title.toLowerCase().replace(/\s+/g, "-") : `section-${index}`;

                      // Handle image sections
                      if (section.type === "image") {
                        // Handle both old and new image formats
                        const images = section.images || (section.image ? [section.image] : []);

                        if (images.length === 0) return null;

                        return (
                          <div key={index} className="my-6 sm:my-8">
                            <div className={`grid ${images.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-4`}>
                              {images.map(
                                (image, imgIndex) =>
                                  image &&
                                  image.src && (
                                    <div key={imgIndex} className="flex flex-col items-center">
                                      <img src={image.src} alt={image.altText || ""} className={`rounded-lg border ${themeStyles.border} shadow-md max-w-full h-auto`} />
                                      {image.altText && <p className={`mt-2 text-sm ${themeStyles.subtext} italic text-center`}>{image.altText}</p>}
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        );
                      }

                      // Handle regular sections with added id
                      return (
                        <div key={index} id={sectionId} className="mb-6 sm:mb-8 scroll-mt-24">
                          {section.title && <h2 className={`text-xl sm:text-2xl font-bold ${themeStyles.text} mb-3 sm:mb-4`}>{section.title}</h2>}
                          <div className={`space-y-4 sm:space-y-6 ${themeStyles.content} text-base sm:text-lg leading-relaxed tracking-wide`} dangerouslySetInnerHTML={{ __html: section.content || "" }} />
                        </div>
                      );
                    })}
                </div>
              </div>

              {post.references && post.references.length > 0 && (
                <div className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t ${themeStyles.border}`}>
                  <h3 className={`text-lg sm:text-xl font-bold ${themeStyles.text} mb-3 sm:mb-4`}>References</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                    {post.references.map(
                      (ref, index) =>
                        ref && (
                          <li key={index} className={themeStyles.subtext}>
                            <a href={ref.url} target="_blank" rel="noopener noreferrer" className={`${themeStyles.hover} transition-colors`}>
                              {ref.title || "Untitled Reference"}
                            </a>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
      <Helmet>
        <title>{post.title} | Yuunagi Blog</title>
        <meta name="description" content={getExcerpt(post, 160)} />
        <meta name="keywords" content={post.metadata.tags.join(", ")} />

        {/* Open Graph tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={getExcerpt(post, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        {post.thumbnail && <meta property="og:image" content={post.thumbnail} />}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={getExcerpt(post, 160)} />
        {post.thumbnail && <meta name="twitter:image" content={post.thumbnail} />}

        {/* Article specific metadata */}
        <meta property="article:published_time" content={post.metadata.date} />
        <meta property="article:author" content={post.metadata.author} />
        {post.metadata.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      </Helmet>
    </>
  );
};
export default WritesPage;
const getStructuredData = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  datePublished: post.metadata.date,
  author: {
    "@type": "Person",
    name: post.metadata.author,
  },
  keywords: post.metadata.tags.join(","),
  articleBody: getExcerpt(post, 500),
  image: post.thumbnail || "",
  url: window.location.href,
});

// Add this function before the WritesPage component
const getExcerpt = (post, maxLength = 160) => {
  // Find first content section
  const introSection = post.sections?.find((section) => section?.type === "introduction" || section?.type === "section");

  if (!introSection?.content) return "";

  // Remove HTML tags and get plain text
  const plainText = introSection.content.replace(/<[^>]+>/g, "");

  // Trim to maxLength
  return plainText.length > maxLength ? plainText.slice(0, maxLength) + "..." : plainText;
};
