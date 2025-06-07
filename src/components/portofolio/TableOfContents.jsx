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
      {/* Desktop version - Moved to left side to avoid overlap */}
      <motion.nav initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-neutral-800/70 backdrop-blur-sm rounded-lg py-3 px-2 border border-neutral-600">
          <ul className="flex flex-col items-center space-y-2">
            {sections.slice(0, totalSections).map(({ id, label, icon: Icon }, index) => (
              <motion.li key={id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                <button
                  onClick={() => handleSectionClick(id)}
                  className={`relative w-8 h-8 flex items-center justify-center rounded-md
                            transition-all duration-300 group
                            ${currentSection === id ? "bg-neutral-600 text-neutral-100" : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/50"}`}
                >
                  <Icon size={16} className="flex-shrink-0" />

                  {/* Tooltip moved to right side */}
                  <span
                    className="absolute left-full ml-3 px-2 py-1 bg-neutral-700 text-white
                              text-xs whitespace-nowrap pointer-events-none border border-neutral-600
                              rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    {label}
                  </span>

                  {/* Active indicator on left */}
                  {currentSection === id && <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-neutral-300 rounded-full" />}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile version - Keep at top center */}
      <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[90%] lg:hidden">
        <div className="bg-neutral-800/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-neutral-600">
          <ul className="flex items-center space-x-1">
            {sections.slice(0, totalSections).map(({ id, label, icon: Icon }, index) => (
              <motion.li key={id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex-shrink-0">
                <button
                  onClick={() => handleSectionClick(id)}
                  aria-label={label}
                  className={`relative p-1.5 rounded-full transition-all duration-300
                            ${currentSection === id ? "text-neutral-100 bg-neutral-600" : "text-neutral-400 hover:text-neutral-200"}`}
                >
                  <Icon size={12} className="flex-shrink-0" />

                  {/* Mobile active indicator */}
                  {currentSection === id && <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-300 rounded-full" />}
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
