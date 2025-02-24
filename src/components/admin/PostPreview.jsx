import { useState } from "react";
import { X } from "lucide-react";
import SectionPreview from "./sections/SectionPreview";

const PostPreview = ({ post, onClose }) => {
  const [selectedLang, setSelectedLang] = useState(Object.keys(post.translations)[0]);
  const translation = post.translations[selectedLang];

  return (
    <div className="fixed inset-0 z-50 bg-base-100 overflow-auto">
      <div className="container mx-auto py-8 px-4">
        {/* Header with Language Selector */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{translation?.title || post.title}</h1>
            <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="select select-bordered select-sm">
              {Object.keys(post.translations).map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <button onClick={onClose} className="btn btn-circle btn-ghost">
            <X size={24} />
          </button>
        </div>

        {/* Meta Information */}
        <div className="flex gap-4 text-base-content/70 mb-8">
          <div>Author: {translation?.metadata?.author || "Unknown"}</div>
          <div>Category: {translation?.metadata?.category || "Uncategorized"}</div>
          <div>Status: {post.status || "Draft"}</div>
        </div>

        {/* Featured Image */}
        {translation?.metadata?.featuredImage && (
          <div className="mb-8">
            <img src={translation.metadata.featuredImage} alt={translation.title} className="w-full max-h-[500px] object-cover rounded-lg shadow-lg" />
          </div>
        )}

        {/* Description */}
        {translation?.description && (
          <div className="prose max-w-none mb-8">
            <p className="text-xl">{translation.description}</p>
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-8">
          {translation?.sections?.map((section, index) => (
            <div key={index} className="preview-section">
              <SectionPreview section={section} />
            </div>
          ))}
        </div>

        {/* Tags */}
        {translation?.metadata?.tags?.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex gap-2 flex-wrap">
              {translation.metadata.tags.map((tag, index) => (
                <span key={index} className="badge badge-neutral">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPreview;
