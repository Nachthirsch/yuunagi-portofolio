import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, List } from "lucide-react";
import { createPortal } from "react-dom";

const MobileTableOfContents = ({ sections, themeStyles, isOpen, setIsOpen, activeSection }) => {
  const scrollToSection = (title) => {
    const sectionId = title.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsOpen(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <div className="relative w-full h-full">
        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0.8 : 1,
          }}
          whileTap={{ scale: 0.95 }}
          className={`
            pointer-events-auto
            fixed top-20 left-4
            p-3 rounded-xl 
            ${themeStyles.background}
            border ${themeStyles.border}
            shadow-lg backdrop-blur-md
            transition-transform duration-200
            active:scale-95
          `}
        >
          <List size={20} className={themeStyles.text} />
        </motion.button>

        {/* Overlay */}
        <AnimatePresence>{isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" />}</AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className={`
                pointer-events-auto
                fixed top-0 left-0 h-screen w-[300px]
                ${themeStyles.background}
                shadow-2xl
                border-r ${themeStyles.border}
                backdrop-blur-md
              `}
            >
              {/* Enhanced Header */}
              <div className="flex items-center justify-between p-5 border-b border-dashed border-neutral-700/30">
                <div className="flex items-center gap-3">
                  <List size={20} className={themeStyles.subtext} />
                  <h3 className={`font-bold text-lg ${themeStyles.text}`}>Contents</h3>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    p-2 rounded-xl
                    hover:bg-neutral-800/30
                    transition-colors duration-200
                  `}
                >
                  <X size={20} className={themeStyles.subtext} />
                </motion.button>
              </div>

              {/* Improved Navigation */}
              <nav className="p-4 overflow-y-auto max-h-[calc(100vh-72px)] hide-scrollbar">
                <motion.ul
                  className="space-y-2.5"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 },
                    },
                  }}
                >
                  {sections
                    .filter((section) => section?.title)
                    .map((section, index) => {
                      const sectionId = section.title.toLowerCase().replace(/\s+/g, "-");
                      const isActive = sectionId === activeSection;

                      return (
                        <motion.li
                          key={index}
                          variants={{
                            open: {
                              y: 0,
                              opacity: 1,
                              transition: {
                                y: { stiffness: 1000, velocity: -100 },
                              },
                            },
                            closed: {
                              y: 50,
                              opacity: 0,
                              transition: {
                                y: { stiffness: 1000 },
                              },
                            },
                          }}
                        >
                          <button
                            onClick={() => scrollToSection(section.title)}
                            className={`
                              group w-full text-left p-4
                              rounded-xl flex items-center gap-3
                              transition-all duration-200 ease-out
                              ${
                                isActive
                                  ? `${themeStyles.text} bg-neutral-800/80
                                     font-medium shadow-lg
                                     border border-neutral-700/50
                                     ring-2 ring-neutral-700/20`
                                  : `${themeStyles.subtext} 
                                     hover:bg-neutral-800/40
                                     hover:shadow-md`
                              }
                              active:scale-[0.98]
                            `}
                          >
                            <ChevronRight
                              size={16}
                              className={`
                                transition-all duration-300
                                ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                                transform ${isActive ? "translate-x-0" : "-translate-x-2 group-hover:translate-x-0"}
                              `}
                            />
                            <span className="line-clamp-2 text-[0.95rem] tracking-wide">{section.title}</span>
                          </button>
                        </motion.li>
                      );
                    })}
                </motion.ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>,
    document.body
  );
};

export default MobileTableOfContents;
