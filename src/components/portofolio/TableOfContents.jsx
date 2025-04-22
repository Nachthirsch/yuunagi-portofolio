/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, Award, User } from "lucide-react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiCode } from "react-icons/hi";

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "imageSection", label: "About", icon: User },
    { id: "activities", label: "Activities", icon: HiOutlineUserGroup },
    { id: "techStacks", label: "Stacks", icon: HiCode },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop version - Neobrutalism style */}
      <motion.nav 
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }} 
        className="fixed right-6 top-1/3 z-50 hidden lg:block"
      >
        <div className="border-3 border-black bg-neutral-800/80 backdrop-blur-sm rounded-lg p-2.5 shadow-[5px_5px_0px_rgba(0,0,0,0.8)] rotate-1">
          <ul className="space-y-3">
            {sections.map(({ id, label, icon: Icon }, index) => (
              <motion.li 
                key={id}
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => handleClick(id)}
                  className={`relative w-11 h-11 flex items-center justify-center
                            group transition-all duration-300
                            ${activeSection === id 
                              ? "bg-neutral-700 text-white border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] -rotate-2" 
                              : "text-neutral-400 hover:text-neutral-200 hover:-translate-y-0.5"}`}
                >
                  <Icon size={18} className="flex-shrink-0" />

                  {/* Tooltip - Neobrutalism style */}
                  <motion.span
                    initial={{ opacity: 0, x: -10, scale: 0.9 }}
                    whileHover={{ opacity: 1, x: 0, scale: 1 }}
                    className="absolute right-full mr-3 px-3 py-1.5 bg-neutral-800 text-white
                              text-xs whitespace-nowrap pointer-events-none border-2 border-black
                              shadow-[3px_3px_0px_rgba(0,0,0,0.8)] font-bold rotate-1"
                  >
                    {label}
                  </motion.span>

                  {/* Decorative elements for active item */}
                  {activeSection === id && (
                    <>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-neutral-700 border-1 border-black rotate-12"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-neutral-700 border-1 border-black -rotate-12"></div>
                    </>
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
          
          {/* Decorative element */}
          <div className="w-full h-1 bg-neutral-700 mt-3 border-t-1 border-black"></div>
        </div>
      </motion.nav>

      {/* Mobile version - Improved responsiveness */}
      <motion.nav 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90%] lg:hidden"
      >
        <div className="bg-neutral-900/90 backdrop-blur-md rounded-full border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] 
                      px-2 py-1.5 flex justify-center w-full overflow-x-auto scrollbar-none">
          <ul className="flex items-center space-x-1">
            {sections.map(({ id, label, icon: Icon }, index) => (
              <motion.li 
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex-shrink-0"
              >
                <button
                  onClick={() => handleClick(id)}
                  aria-label={label}
                  className={`relative p-1.5 transition-all duration-300
                            ${activeSection === id 
                              ? "text-white bg-neutral-700 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] rounded-md -rotate-2" 
                              : "text-neutral-400 hover:text-white"}`}
                >
                  <Icon size={16} className="flex-shrink-0" />
                </button>
                
                {/* Mobile tooltip - appears on active */}
                {activeSection === id && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] 
                              px-1.5 py-0.5 rounded border-1 border-black shadow-[1px_1px_0px_rgba(0,0,0,0.8)]
                              whitespace-nowrap max-w-[80px] truncate"
                  >
                    {label}
                  </motion.div>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>
      
      {/* Styles for neobrutalism and responsiveness */}
      <style>
        {`
          .border-3 {
            border-width: 3px;
          }
          .border-1 {
            border-width: 1px;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          @media (max-width: 360px) {
            .mobile-nav-container {
              padding: 0.25rem 0.5rem;
            }
            .mobile-icon {
              font-size: 14px;
            }
          }
        `}
      </style>
    </>
  );
};

export default TableOfContents;
