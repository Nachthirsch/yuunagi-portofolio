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

// Add this helper function at the top of your file
const processContent = (content) => {
  if (!content) return "";
  return content
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0)
    .map((paragraph) => `<p class="mb-4 last:mb-0">${paragraph}</p>`)
    .join("");
};

const WritesPage = () => {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLang, setCurrentLang] = useState("");
  const [post, setPost] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [isTocOpen, setIsTocOpen] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getBlogPostBySlug(slug);
        if (!data) {
          setError("Post not found");
          return;
        }
        setBlogPost(data);

        // Set initial language
        const langs = Object.keys(data.translations || {});
        if (currentLang && langs.includes(currentLang)) {
          // Keep current language if valid
          setPost(data.translations[currentLang]);
        } else {
          // Set new language (prefer ID, fallback to first available)
          const initialLang = langs.includes("id") ? "id" : langs[0];
          setCurrentLang(initialLang);
          setPost(data.translations[initialLang]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Add new useEffect for language changes
  useEffect(() => {
    if (blogPost && currentLang && blogPost.translations[currentLang]) {
      setPost(blogPost.translations[currentLang]);
    }
  }, [currentLang, blogPost]);

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Updated theme styles with typewriter elements
  const themeStyles = {
    background: isDark ? "bg-neutral-900" : "bg-gray-50",
    text: isDark ? "text-neutral-100" : "text-neutral-900",
    subtext: isDark ? "text-neutral-400" : "text-gray-600",
    border: isDark ? "border-neutral-700/30" : "border-gray-200",
    select: isDark ? "bg-neutral-800 text-neutral-200" : "bg-white text-gray-900 border border-gray-200",
    content: isDark ? "text-neutral-300" : "text-neutral-700",
    hover: isDark ? "hover:text-neutral-200" : "hover:text-gray-900",
    paper: isDark ? "bg-neutral-800/50" : "bg-white",
  };

  const getMetaDescription = (post) => {
    const introSection = post.sections?.find((s) => s.type === "introduction");
    const plainText = introSection?.content?.replace(/<[^>]+>/g, "").slice(0, 160) || "";
    return plainText;
  };

  if (loading) {
    return (
      <section className={`min-h-screen ${themeStyles.background} pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${themeStyles.text}`}>Loading...</h1>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`min-h-screen ${themeStyles.background} pt-24 pb-16 px-4 sm:px-8 md:px-16`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${themeStyles.text}`}>{error}</h1>
        </div>
      </section>
    );
  }

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
      setPost(blogPost.translations[newLang]);
    }
  };

  // Function to limit the number of displayed tags>
  const displayTags = (tags = [], limit = 3) => {
    if (!Array.isArray(tags)) return "";
    if (tags.length <= limit) return tags.join(", ");
    return `${tags.slice(0, limit).join(", ")} +${tags.length - limit} more`;
  };

  return (
    <>
      <SEO title={post.title} description={getMetaDescription(post)} image={post.sections?.find((s) => s.type === "image")?.images?.[0]?.src} />
      <section className={`min-h-screen ${themeStyles.background} pt-16 sm:pt-20 pb-16 px-3 sm:px-8 md:px-16 font-mono transition-colors duration-300 isolation`}>
        <div className={`max-w-4xl mx-auto relative ${themeStyles.paper} p-4 sm:p-8 rounded-lg shadow-lg border ${themeStyles.border} z-[1]`}>
          {/* Header Section */}
          <div className="mb-8 sm:mb-10 border-b pb-6 sm:pb-8 border-dashed">
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Title and Controls */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
                <h1 className={`text-xl sm:text-3xl ${themeStyles.text} tracking-tight flex items-start gap-3 font-bold uppercase leading-tight max-w-2xl`}>
                  <Book className={`${themeStyles.subtext} mt-1`} size={24} />
                  <span>{post.title}</span>
                </h1>
                <div className="flex items-center gap-3 self-start">
                  <button onClick={toggleTheme} className={`p-2 rounded-full ${themeStyles.subtext} hover:scale-110 transition-transform`}>
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  {availableLanguages.length > 1 && (
                    <div className="flex items-center gap-2">
                      <Globe size={18} className={themeStyles.subtext} />
                      <select value={currentLang} onChange={handleLanguageChange} className={`${themeStyles.select} py-1.5 px-3 rounded text-sm min-w-[80px]`}>
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
              <div className={`flex flex-wrap gap-3 sm:gap-4 ${themeStyles.subtext} text-sm`}>
                <span className="flex items-center gap-2">
                  <Calendar size={16} /> {post.metadata.date}
                </span>
                <span className="flex items-center gap-2">
                  <User size={16} /> {post.metadata.author}
                </span>
                <span className="flex items-start gap-2">
                  <Tag size={16} className="mt-1" />
                  <span>{displayTags(post.metadata.tags)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 relative">
            {/* Table of Contents */}
            <motion.div layout transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }} className={`${!isTocOpen ? "fixed top-20 left-4 z-50 w-10 h-10 rounded-lg shadow-lg" : "lg:w-72"} bg-neutral-900/1`}>
              <div className={`${isTocOpen ? "sticky top-20" : ""} max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-hide`}>
                <TableOfContents sections={post.sections} themeStyles={themeStyles} onStateChange={setIsTocOpen} />
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div layout transition={{ layout: { type: "spring", stiffness: 300, damping: 30 } }} className={`flex-grow transition-all duration-500 ease-in-out ${!isTocOpen ? "lg:w-full" : ""}`}>
              <div className={`prose ${isDark ? "prose-invert" : ""} max-w-none prose-sm sm:prose-base prose-p:font-mono prose-headings:font-mono`}>
                {post.sections?.map((section, index) => {
                  if (!section) return null;

                  const sectionId = section.title ? section.title.toLowerCase().replace(/\s+/g, "-") : `section-${index}`;

                  // Handle different section types
                  if (section.type === "image") {
                    return (
                      <div key={index} className="my-6 sm:my-8">
                        <div className={`grid ${section.images?.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-4`}>
                          {(section.images || [section.image]).filter(Boolean).map((image, imgIndex) => (
                            <div key={imgIndex} className="flex flex-col items-center">
                              <img src={image.src} alt={image.altText || ""} className="rounded-lg border shadow-md max-w-full h-auto" />
                              {image.altText && <p className={`mt-2 text-sm ${themeStyles.subtext} italic text-center`}>{image.altText}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={index} id={sectionId} className="mb-6 scroll-mt-20">
                      {section.title && <h2 className={`text-lg sm:text-2xl ${themeStyles.text} mb-4 font-bold tracking-wider`}>{section.title}</h2>}
                      <div
                        className={`
                          ${section.type === "disclaimer" ? `${isDark ? "bg-neutral-800/30" : "bg-gray-100"} p-4 rounded-lg border` : section.type === "footnote" ? "text-sm italic" : ""} 
                          ${themeStyles.content} leading-relaxed tracking-wide
                        `}
                        dangerouslySetInnerHTML={{ __html: processContent(section.content) }}
                      />
                    </div>
                  );
                })}

                {/* References Section */}
                {post.references?.length > 0 && (
                  <div className={`mt-8 pt-6 border-t border-dashed ${themeStyles.border}`}>
                    <h3 className={`text-lg sm:text-xl ${themeStyles.text} mb-3 font-bold tracking-wider`}>References</h3>
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meta tags */}
      <Helmet>
        <title>{post.title} | Yuunagi Blog</title>
        <meta name="description" content={getExcerpt(post, 160)} />
        <meta name="keywords" content={post.metadata.tags.join(", ")} />

        {/* ...existing meta tags... */}
      </Helmet>
    </>
  );
};

export default WritesPage;
