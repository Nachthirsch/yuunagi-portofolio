/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { List, ChevronUp, ChevronDown } from "lucide-react";

const TableOfContents = ({ sections, themeStyles }) => {
  const [isOpen, setIsOpen] = useState(true);

  const scrollToSection = (title) => {
    const sectionId = title.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sectionLinks = sections.filter((section) => section?.title);

  return (
    <div className={`sticky top-24 ${themeStyles.background} rounded-lg p-4 border ${themeStyles.border}`}>
      <div className="flex items-center justify-between cursor-pointer mb-4" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2">
          <List size={20} className={themeStyles.subtext} />
          <h3 className={`font-semibold ${themeStyles.text}`}>Contents</h3>
        </div>
        {isOpen ? <ChevronUp className={themeStyles.subtext} size={20} /> : <ChevronDown className={themeStyles.subtext} size={20} />}
      </div>

      {isOpen && (
        <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
          {sectionLinks.map((section, index) => (
            <li key={index}>
              <button onClick={() => scrollToSection(section.title)} className={`text-sm ${themeStyles.subtext} hover:${themeStyles.text} transition-colors duration-200 w-full text-left py-1 px-2 rounded hover:bg-neutral-800/50`}>
                {section.title}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default TableOfContents;
