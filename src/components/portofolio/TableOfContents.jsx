import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, Award, User, Home } from "lucide-react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiCode } from "react-icons/hi";

const TableOfContents = ({ currentSection, onSectionChange, totalSections }) => {
  const sections = [
    { id: 0, label: "Home", icon: Home },
    { id: 1, label: "Experience", icon: Briefcase },
    { id: 2, label: "Projects", icon: Code },
    { id: 3, label: "Certificates", icon: Award },
    { id: 4, label: "About", icon: User },
    { id: 5, label: "MBTI", icon: User },
    { id: 6, label: "Activities", icon: HiOutlineUserGroup },
    { id: 7, label: "Stacks", icon: HiCode },
    { id: 8, label: "Footer", icon: User },
  ];

  const handleSectionClick = (sectionIndex) => {
    if (onSectionChange) {
      onSectionChange(sectionIndex);
    }
  };

  return (
    <>
      {/* Desktop version - Minimalistic horizontal bottom-right */}
      <motion.nav initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <div className="bg-neutral-800/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-neutral-600">
          <ul className="flex items-center space-x-2">
            {sections.slice(0, totalSections).map(({ id, label, icon: Icon }, index) => (
              <motion.li key={id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                <button
                  onClick={() => handleSectionClick(id)}
                  className={`relative w-8 h-8 flex items-center justify-center rounded-md
                            transition-all duration-300 group
                            ${currentSection === id ? "bg-neutral-600 text-neutral-100" : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/50"}`}
                >
                  <Icon size={16} className="flex-shrink-0" />

                  {/* Minimalistic tooltip */}
                  <span
                    className="absolute bottom-full mb-2 px-2 py-1 bg-neutral-700 text-white
                              text-xs whitespace-nowrap pointer-events-none border border-neutral-600
                              rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200
                              left-1/2 -translate-x-1/2"
                  >
                    {label}
                  </span>

                  {/* Active indicator */}
                  {currentSection === id && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-300 rounded-full" />}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile version - Minimalistic bottom center */}
      <motion.nav initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[90%] lg:hidden">
        <div className="bg-neutral-800/80 backdrop-blur-sm rounded-full px-3 py-2 border border-neutral-600">
          <ul className="flex items-center space-x-1">
            {sections.slice(0, totalSections).map(({ id, label, icon: Icon }, index) => (
              <motion.li key={id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex-shrink-0">
                <button
                  onClick={() => handleSectionClick(id)}
                  aria-label={label}
                  className={`relative p-2 rounded-full transition-all duration-300
                            ${currentSection === id ? "text-neutral-100 bg-neutral-600" : "text-neutral-400 hover:text-neutral-200"}`}
                >
                  <Icon size={14} className="flex-shrink-0" />

                  {/* Mobile active indicator */}
                  {currentSection === id && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-300 rounded-full" />}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default TableOfContents;
