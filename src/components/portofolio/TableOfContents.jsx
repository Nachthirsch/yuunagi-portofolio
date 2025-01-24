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
    { id: "imageSection", label: "About", icon: User },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "activities", label: "Activities", icon: HiOutlineUserGroup },
    { id: "projects", label: "Projects", icon: Code },
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
      { threshold: 0.3 }
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
      {/* Desktop version */}
      <motion.nav initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="fixed right-3 top-1/4 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-neutral-800/20 backdrop-blur-sm rounded-full p-2">
          <ul className="space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <motion.li key={id}>
                <button
                  onClick={() => handleClick(id)}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center
                            group transition-all duration-300 hover:bg-neutral-700/30
                            ${activeSection === id ? "bg-neutral-700/50 text-white" : "text-neutral-400 hover:text-neutral-200"}`}
                >
                  <Icon size={18} className="flex-shrink-0" />

                  {/* Tooltip */}
                  <span
                    className="absolute right-full mr-2 px-2 py-1 rounded bg-neutral-800 text-white
                              text-xs whitespace-nowrap opacity-0 group-hover:opacity-100
                              transition-opacity duration-200"
                  >
                    {label}
                  </span>

                  {/* Active indicator */}
                  {activeSection === id && <motion.div layoutId="activeSection" className="absolute inset-0 border-2 border-neutral-600 rounded-full" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile version */}
      <motion.nav initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 lg:hidden">
        <div className="bg-neutral-900/70 backdrop-blur-md rounded-full px-2 py-1.5 shadow-lg border border-neutral-800/50">
          <ul className="flex items-center gap-1">
            {sections.map(({ id, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => handleClick(id)}
                  className={`relative p-1.5 rounded-full transition-all duration-300
                            ${activeSection === id ? "text-white bg-neutral-700/50" : "text-neutral-400 hover:text-white hover:bg-neutral-700/30"}`}
                >
                  <Icon size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default TableOfContents;
