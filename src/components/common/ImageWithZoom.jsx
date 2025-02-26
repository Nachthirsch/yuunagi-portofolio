import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageWithZoom = ({ src, alt, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // Toggle scroll lock on body when image is expanded
    document.body.style.overflow = isExpanded ? "auto" : "hidden";
  };

  return (
    <>
      <img src={src} alt={alt || ""} onClick={toggleExpand} className={`image-focus ${className || ""} transition-all duration-300 cursor-zoom-in`} />

      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4" onClick={toggleExpand}>
            <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }} src={src} alt={alt || ""} className="max-h-full max-w-full object-contain cursor-zoom-out" />
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded">Click anywhere to close</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageWithZoom;
