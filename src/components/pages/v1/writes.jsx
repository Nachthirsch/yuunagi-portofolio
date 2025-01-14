import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Calendar, User, Tag } from "lucide-react";
import { getBlogPostBySlug } from "../../../utils/blogUtils";

const WritesPage = () => {
  const { slug } = useParams();
  const blogPost = getBlogPostBySlug(slug);

  if (!blogPost) {
    return (
      <section className="min-h-screen bg-neutral-900 pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-neutral-200">Blog post not found</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-900 pt-24 pb-16 px-4 sm:px-8 md:px-16 font-Hanken">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h1 className="text-3xl font-bold text-neutral-200 tracking-wider flex items-center gap-3">
            <Book className="text-neutral-400" size={32} />
            {blogPost.title}
          </h1>
          <motion.div className="h-1 bg-gradient-to-r from-neutral-400 to-transparent mt-4 rounded-full" initial={{ width: 0 }} animate={{ width: "8rem" }} transition={{ duration: 0.8, delay: 0.3 }} />

          <div className="flex gap-4 mt-4 text-neutral-400">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {blogPost.metadata.date}
            </span>
            <span className="flex items-center gap-2">
              <User size={16} />
              {blogPost.metadata.author}
            </span>
            <span className="flex items-center gap-2">
              <Tag size={16} />
              {blogPost.metadata.tags.join(" | ")}
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-invert max-w-none">
          {blogPost.sections.map((section, index) => {
            if (section.type === "image" || section.type === "images") {
              const images = section.type === "image" ? [section.image] : section.images;
              return (
                <div key={index} className={`my-8 grid ${images.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-4`}>
                  {images.map((image, imgIndex) => (
                    <div key={imgIndex} className="flex justify-center">
                      <img src={image.src} alt={image.altText} className="rounded-lg border border-neutral-700/30 shadow-md max-w-full h-auto" />
                    </div>
                  ))}
                </div>
              );
            }

            return (
              <div key={index} className="mb-8">
                {section.title && <h2 className="text-2xl font-bold text-neutral-200 mb-4">{section.title}</h2>}
                <div className="space-y-6 text-neutral-300 text-lg leading-relaxed tracking-wide" dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            );
          })}

          {blogPost.references && blogPost.references.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-800">
              <h3 className="text-xl font-bold text-neutral-200 mb-4">References</h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-400">
                {blogPost.references.map((ref, index) => (
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
