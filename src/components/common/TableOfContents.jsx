/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, Menu } from "lucide-react";

const TableOfContents = ({ sections, themeStyles, onStateChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    onStateChange?.(isOpen);
  }, [isOpen, onStateChange]);

  const scrollToSection = (title) => {
    const sectionId = title.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sectionLinks = sections.filter((section) => section?.title);

  return (
    <motion.div
      layout
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 },
        duration: 0.6,
      }}
      className={`${themeStyles.background} rounded-lg ${isOpen ? "p-5" : "p-2"} border ${themeStyles.border} w-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isOpen ? (
        <>
          <div className="flex items-center justify-between cursor-pointer mb-4" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-2">
              <List size={20} className={themeStyles.subtext} />
              <h3 className={`font-semibold ${themeStyles.text}`}>Contents</h3>
            </div>
          </div>

          <AnimatePresence>
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                },
              }}
              className="space-y-2"
            >
              {sectionLinks.map((section, index) => (
                <motion.li key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  <button onClick={() => scrollToSection(section.title)} className={`text-sm ${themeStyles.subtext} hover:${themeStyles.text} transition-all duration-200 w-full text-left py-1 px-2 rounded hover:bg-neutral-800/50 hover:translate-x-1`}>
                    {section.title}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </>
      ) : (
        <motion.div className="flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.button className="relative p-1.5 rounded-lg hover:bg-neutral-800/30" onClick={() => setIsOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Menu size={20} className={themeStyles.subtext} />
            {isHovered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap px-2 py-1 text-xs rounded ${themeStyles.background} ${themeStyles.text} border ${themeStyles.border} shadow-lg`}>
                Show Contents
              </motion.div>
            )}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TableOfContents;
