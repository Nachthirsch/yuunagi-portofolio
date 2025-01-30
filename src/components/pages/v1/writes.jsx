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

  // Updated theme styles with typewriter elements
  const themeStyles = {
    background: isDark ? "bg-neutral-900" : "bg-gray-50",
    text: isDark ? "text-neutral-200" : "text-gray-900",
    subtext: isDark ? "text-neutral-400" : "text-gray-600",
    border: isDark ? "border-neutral-700/30" : "border-gray-200",
    select: isDark ? "bg-neutral-800 text-neutral-200" : "bg-white text-gray-900 border border-gray-200",
    content: isDark ? "text-neutral-300" : "text-gray-700",
    hover: isDark ? "hover:text-neutral-200" : "hover:text-gray-900",
    paper: isDark ? "bg-neutral-800/50" : "bg-white",
  };

  const getMetaDescription = (post) => {
    const introSection = post.sections?.find((s) => s.type === "introduction");
    const plainText = introSection?.content?.replace(/<[^>]+>/g, "").slice(0, 160) || "";
    return plainText;
  };

  if (!blogPost) {
    return (
      <section className={`min-h-screen ${themeStyles.background} pt-24 pb-16 px-4 sm:px-8 md:px-16`}>
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
      <section className={`min-h-screen ${themeStyles.background} pt-12 sm:pt-16 pb-16 px-3 sm:px-8 md:px-16 font-mono transition-colors duration-300`}>
        <div className={`max-w-4xl mx-auto relative ${themeStyles.paper} p-4 sm:p-8 rounded-lg shadow-lg border ${themeStyles.border}`}>
          {/* Header Section */}
          <motion.div className="mb-6 sm:mb-8 border-b pb-4 sm:pb-6 border-dashed">
            <div className="flex flex-col gap-3">
              {/* Title and Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h1 className={`text-lg sm:text-2xl ${themeStyles.text} tracking-tight flex items-center gap-2 sm:gap-3 font-bold uppercase leading-tight`}>
                  <Book className={themeStyles.subtext} size={20} /> {post.title}
                </h1>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button onClick={toggleTheme} className={`p-1.5 rounded-full ${themeStyles.subtext} hover:scale-110 transition-transform`}>
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                  {availableLanguages.length > 1 && (
                    <div className="flex items-center gap-2">
                      <Globe size={16} className={themeStyles.subtext} />
                      <select value={currentLang} onChange={handleLanguageChange} className={`${themeStyles.select} py-1 px-2 rounded text-xs sm:text-sm min-w-[70px]`}>
                        {availableLanguages.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang === "id" ? "ID" : lang === "en" ? "EN" : lang.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className={`flex flex-wrap gap-2 ${themeStyles.subtext} text-xs sm:text-sm`}>
                <span className="flex items-center gap-2">
                  <Calendar size={14} /> {post.metadata.date}
                </span>
                <span className="flex items-center gap-2">
                  <User size={14} /> {post.metadata.author}
                </span>
                <span className="flex items-start gap-2">
                  <Tag size={14} className="mt-1" />
                  <span>{displayTags(post.metadata.tags)}</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div className={`prose ${isDark ? "prose-invert" : ""} max-w-none prose-sm sm:prose-base font-mono prose-headings:font-elite prose-p:font-elite`}>
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
              {/* Table of Contents - Now sticky on both mobile and desktop */}
              <aside className="lg:w-64">
                <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide">
                  <div className="lg:block">
                    <TableOfContents sections={post.sections} themeStyles={themeStyles} />
                  </div>
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="flex-grow">
                {post.sections?.map((section, index) => {
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
                    <div key={index} id={sectionId} className="mb-6 scroll-mt-20">
                      {section.title && <h2 className={`text-lg sm:text-2xl ${themeStyles.text} mb-3 font-bold uppercase tracking-wider`}>{section.title}</h2>}
                      {section.type === "disclaimer" ? <div className={`${isDark ? "bg-neutral-800/30 border-neutral-700/30" : "bg-gray-100 border-gray-300"} p-4 rounded-lg border ${themeStyles.content} text-sm sm:text-base leading-relaxed tracking-wide`} dangerouslySetInnerHTML={{ __html: section.content || "" }} /> : <div className={`space-y-4 ${themeStyles.content} text-sm sm:text-base leading-relaxed tracking-wide`} dangerouslySetInnerHTML={{ __html: section.content || "" }} />}
                    </div>
                  );
                })}
              </div>
            </div>

            {post.references && post.references.length > 0 && (
              <div className={`mt-8 pt-6 border-t border-dashed ${themeStyles.border}`}>
                <h3 className={`text-lg sm:text-xl ${themeStyles.text} mb-3 font-bold uppercase tracking-wider`}>References</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
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
