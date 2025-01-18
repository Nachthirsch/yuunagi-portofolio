import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Calendar, User, Tag, Globe } from "lucide-react";
import { getBlogPostBySlug } from "../../../utils/blogUtils";
import { useState } from "react";

const WritesPage = () => {
  const { slug } = useParams();
  const blogPost = getBlogPostBySlug(slug);
  const [currentLang, setCurrentLang] = useState("id");

  if (!blogPost) {
    return (
      <section className="min-h-screen bg-neutral-900 pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-neutral-200">Blog post not found</h1>
        </div>
      </section>
    );
  }

  const post = blogPost.translations[currentLang];
  const availableLanguages = Object.keys(blogPost.translations);

  // Function to limit the number of displayed tags
  const displayTags = (tags, limit = 3) => {
    if (tags.length <= limit) return tags.join(", ");
    return `${tags.slice(0, limit).join(", ")} +${tags.length - limit} more`;
  };

  return (
    <section className="min-h-screen bg-neutral-900 pt-16 sm:pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-200 tracking-wider flex items-center gap-3">
              <Book className="text-neutral-400" size={24} />
              {post.title}
            </h1>
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-neutral-400" />
              <select value={currentLang} onChange={(e) => setCurrentLang(e.target.value)} className="bg-neutral-800 text-neutral-200 rounded px-2 py-1 text-sm">
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <motion.div className="h-1 bg-gradient-to-r from-neutral-400 to-transparent mt-4 rounded-full" initial={{ width: 0 }} animate={{ width: "8rem" }} transition={{ duration: 0.8, delay: 0.3 }} />

          <div className="flex flex-col gap-2 mt-4 text-neutral-400 text-xs sm:text-sm">
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-invert max-w-none">
          {post.sections.map((section, index) => {
            if (section.type === "image" || section.type === "images") {
              const images = section.type === "image" ? [section.image] : section.images;
              return (
                <div key={index} className="my-6 sm:my-8">
                  <div className={`grid ${images.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-4`}>
                    {images.map((image, imgIndex) => (
                      <div key={imgIndex} className="flex flex-col items-center">
                        <img src={image.src} alt={image.altText} className="rounded-lg border border-neutral-700/30 shadow-md max-w-full h-auto" />
                        <p className="mt-2 text-sm text-neutral-400 italic text-center">{image.altText}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="mb-6 sm:mb-8">
                {section.title && <h2 className="text-xl sm:text-2xl font-bold text-neutral-200 mb-3 sm:mb-4">{section.title}</h2>}
                <div className="space-y-4 sm:space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed tracking-wide" dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            );
          })}

          {post.references && post.references.length > 0 && (
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-neutral-800">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-200 mb-3 sm:mb-4">References</h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-400 text-sm sm:text-base">
                {post.references.map((ref, index) => (
                  <li key={index}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-200 transition-colors">
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WritesPage;
