/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, Menu } from "lucide-react";
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
    }
  };

  const sectionLinks = sections.filter((section) => section?.title);

  // Return mobile version if on mobile
  if (isMobile) {
    return <MobileTableOfContents sections={sections} themeStyles={themeStyles} isOpen={isOpen} setIsOpen={setIsOpen} activeSection={activeSection} />;
  }

  // Return desktop version
  return (
    <motion.div
      layout
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 },
        duration: 0.6,
      }}
      className={`${themeStyles.background} rounded-2xl ${isOpen ? "p-5 sm:p-6" : "p-2"} border ${themeStyles.border} w-full shadow-xl backdrop-blur-sm`}
      style={{
        boxShadow: "0 4px 32px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isOpen ? (
        <>
          <div className="flex items-center justify-between cursor-pointer mb-6" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-3">
              <List size={22} className={`${themeStyles.subtext} transition-colors duration-300`} />
              <h3 className={`font-bold text-base sm:text-lg ${themeStyles.title} tracking-wide`}>Contents</h3>
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
              className="space-y-2.5"
            >
              {sectionLinks.map((section, index) => {
                const sectionId = section.title.toLowerCase().replace(/\s+/g, "-");
                const isActive = sectionId === activeSection;

                return (
                  <motion.li key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="relative group">
                    <button
                      onClick={() => scrollToSection(section.title)}
                      title={section.title}
                      className={`w-full text-left py-3 px-4 rounded-xl text-[0.95rem] leading-relaxed tracking-wide transition-all duration-300 ease-out
                        ${isActive ? `${themeStyles.text} bg-neutral-800/80 font-semibold shadow-lg border border-neutral-700/50 ring-2 ring-neutral-700/20` : `${themeStyles.subtext} hover:bg-neutral-800/40 hover:shadow-md`}
                        hover:translate-x-1.5 hover:${themeStyles.text}
                        focus:outline-none focus:ring-2 focus:ring-neutral-700/50 active:scale-[0.98]`}
                    >
                      <span className="line-clamp-2">{section.title}</span>
                    </button>
                    {/* Enhanced tooltip for long titles */}
                    {section.title.length > 40 && <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2.5 rounded-lg ${themeStyles.background} ${themeStyles.text} border ${themeStyles.border} shadow-xl text-sm max-w-xs z-50 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none whitespace-normal backdrop-blur-md`}>{section.title}</div>}
                  </motion.li>
                );
              })}
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
