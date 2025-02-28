/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, Menu, ChevronRight } from "lucide-react";
import MobileTableOfContents from "./MobileTableOfContents";

const TableOfContents = ({ sections, themeStyles, onStateChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    onStateChange?.(isOpen);
  }, [isOpen, onStateChange]);

  // Add observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => {
      if (section?.title) {
        const element = document.getElementById(section.title.toLowerCase().replace(/\s+/g, "-"));
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  // Add mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToSection = (title) => {
    const sectionId = title.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);

      // Add focus ring briefly for accessibility
      element.classList.add("ring-4", "ring-blue-500/30");
      setTimeout(() => element.classList.remove("ring-4", "ring-blue-500/30"), 1500);
    }
  };

  const sectionLinks = sections.filter((section) => section?.title);

  // Return mobile version if on mobile
  if (isMobile) {
    return <MobileTableOfContents sections={sections} themeStyles={themeStyles} isOpen={isOpen} setIsOpen={setIsOpen} activeSection={activeSection} />;
  }

  // Return enhanced desktop version
  return (
    <motion.div
      layout
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 },
        duration: 0.6,
      }}
      className={`${themeStyles.background} rounded-2xl ${isOpen ? "p-5 sm:p-6" : "p-2"} border ${themeStyles.border} w-full shadow-xl backdrop-blur-sm`}
      style={{
        boxShadow: "0 4px 32px rgba(0, 0, 0, 0.15)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="navigation"
      aria-label="Table of contents"
    >
      {isOpen ? (
        <div className="relative">
          <div className={`sticky top-0 z-10 -mt-5 -mx-5 sm:-mx-6 px-5 sm:px-6 pt-5 sm:pt-6 pb-6 ${themeStyles.background}`}>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg bg-neutral-800/30 ${themeStyles.border}`}>
                  <List size={18} className={`${themeStyles.subtext} transition-colors duration-300`} />
                </div>
                <h3 className={`font-bold text-base sm:text-lg ${themeStyles.title} tracking-wide`}>Contents</h3>
              </div>
              <motion.button whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }} className={`p-1.5 rounded-full hover:bg-neutral-800/30 ${themeStyles.subtext}`} aria-label="Collapse table of contents">
                <ChevronRight size={16} />
              </motion.button>
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
                  opacity: { duration: 0.3 },
                },
              }}
              className="space-y-2.5 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-700/20 before:rounded"
              role="list"
            >
              {sectionLinks.map((section, index) => {
                const sectionId = section.title.toLowerCase().replace(/\s+/g, "-");
                const isActive = sectionId === activeSection;

                return (
                  <motion.li key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.07 }} className="relative group">
                    <div className="relative">
                      {/* Section marker */}
                      <div
                        className={`absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10 
                          ${isActive ? "bg-gradient-to-br from-neutral-500 to-neutral-300 shadow-lg shadow-neutral-500/30" : `${themeStyles.border} bg-neutral-800`}
                          transition-all duration-300 group-hover:scale-110`}
                      />

                      <button
                        onClick={() => scrollToSection(section.title)}
                        title={section.title}
                        className={`relative w-full text-left pl-8 pr-4 py-3 rounded-xl text-[0.95rem] leading-relaxed tracking-wide transition-all duration-300 ease-out
                          ${isActive ? `${themeStyles.text} bg-gradient-to-r from-neutral-800/90 to-neutral-800/40 font-semibold shadow-lg` : `${themeStyles.subtext} hover:bg-neutral-800/40 hover:shadow-md`}
                          hover:translate-x-1 hover:${themeStyles.text}
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/50 active:scale-[0.98]`}
                        aria-current={isActive ? "location" : undefined}
                        tabIndex={0}
                      >
                        <span className="line-clamp-2 relative">
                          {section.title}
                          <AnimatePresence>{isActive && <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} transition={{ duration: 0.3 }} className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neutral-500 to-neutral-500 rounded-full origin-left" />}</AnimatePresence>
                        </span>
                      </button>
                    </div>

                    {/* Enhanced tooltip for long titles */}
                    {section.title.length > 40 && (
                      <div
                        className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2.5 rounded-lg 
                          ${themeStyles.background} ${themeStyles.text} border ${themeStyles.border} 
                          shadow-xl text-sm max-w-xs z-50 opacity-0 invisible group-hover:opacity-100 
                          group-hover:visible translate-x-2 group-hover:translate-x-0 transition-all 
                          duration-300 ease-out pointer-events-none whitespace-normal backdrop-blur-md`}
                      >
                        {section.title}
                      </div>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div className="flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.button className="relative p-2.5 rounded-lg hover:bg-neutral-800/30 transition-colors" onClick={() => setIsOpen(true)} whileHover={{ scale: 1.1, rotate: -10 }} whileTap={{ scale: 0.95 }} aria-label="Open table of contents">
            <Menu size={20} className={themeStyles.subtext} />
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap px-3 py-1.5 
                text-xs rounded-lg ${themeStyles.background} ${themeStyles.text} 
                border ${themeStyles.border} shadow-lg`}
              >
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
