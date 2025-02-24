import DOMPurify from "dompurify";
import { Loader } from "lucide-react";
import { useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";

const SectionPreview = ({ section }) => {
  const [loadingImages, setLoadingImages] = useState({});

  const handleImageLoad = (imageId) => {
    setLoadingImages((prev) => ({ ...prev, [imageId]: false }));
  };

  const handleImageError = (imageId) => {
    setLoadingImages((prev) => ({ ...prev, [imageId]: false }));
  };

  const renderContent = () => {
    const sanitizedContent = DOMPurify.sanitize(section.content || "");

    switch (section.type) {
      case "image":
        return (
          <div className="grid gap-4">
            {(section.images || []).map((img, idx) => (
              <div key={idx} className="relative">
                {loadingImages[idx] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-base-200/50">
                    <Loader className="animate-spin" />
                  </div>
                )}
                <img src={img.src} alt={img.altText} className="max-w-full rounded-lg shadow-lg" onLoad={() => handleImageLoad(idx)} onError={() => handleImageError(idx)} />
                {img.altText && <p className="text-sm text-base-content/70 mt-2 italic">{img.altText}</p>}
              </div>
            ))}
          </div>
        );

      case "lyric":
        return (
          <div className="whitespace-pre-line font-serif">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        );

      case "introduction":
        return (
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        );

      case "disclaimer":
        return (
          <div className="prose max-w-none border-l-4 border-warning p-4 bg-warning/10">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        );

      case "footnote":
        return (
          <div className="prose-sm max-w-none text-base-content/70 border-t pt-4">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        );

      default: {
        // Process code blocks
        const processedContent = sanitizedContent.replace(/<code>([\s\S]*?)<\/code>/g, (match, code) => {
          const highlighted = Prism.highlight(code, Prism.languages.javascript, "javascript");
          return `<code class="language-javascript">${highlighted}</code>`;
        });

        return (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
          </div>
        );
      }
    }
  };

  return (
    <div className="preview-container">
      {section.title && section.type !== "lyric" && <h3 className="text-xl font-bold mb-4">{section.title}</h3>}
      {renderContent()}
    </div>
  );
};

export default SectionPreview;
