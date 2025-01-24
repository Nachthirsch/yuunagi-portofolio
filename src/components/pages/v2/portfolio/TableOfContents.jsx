/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, Code, Award, User, Image } from "lucide-react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiCode } from "react-icons/hi";

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "hero", label: "Home", icon: Home },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "story", label: "Story", icon: User },
    { id: "gallery-section", label: "Gallery", icon: Image },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "activities", label: "Activities", icon: HiOutlineUserGroup },
    { id: "projects", label: "Projects", icon: Code },
    { id: "tech-stack", label: "Tech Stack", icon: HiCode },
  ];

  // Define mobile sections separately
  const mobileSections = sections.filter((section) => ["experience", "story", "certificates", "activities"].includes(section.id));

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Desktop version */}
      <motion.nav initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="fixed right-5 top-1/4 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-neutral-900/5 backdrop-blur-sm rounded-full">
          <ul className="space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <motion.li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center
                            group transition-all duration-300 hover:bg-white/80
                            ${activeSection === id ? "bg-white text-neutral-800" : "text-neutral-600"}`}
                >
                  <Icon size={15} className="flex-shrink-0" />

                  {/* Tooltip */}
                  <span
                    className="absolute right-full mr-2 px-2 py-1 rounded bg-neutral-800 text-white
                                text-xs whitespace-nowrap opacity-0 group-hover:opacity-100
                                transition-opacity duration-200"
                  >
                    {label}
                  </span>

                  {/* Active indicator */}
                  {activeSection === id && <motion.div layoutId="activeSection" className="absolute inset-0 border-2 border-white rounded-full" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile version - More minimalist */}
      <motion.nav initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden">
        <div className="bg-neutral-900/70 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg border border-white/10">
          <ul className="flex items-center gap-2">
            {mobileSections.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`p-2 rounded-full transition-all duration-300
                            ${activeSection === id ? "text-white bg-white/20" : "text-neutral-400 hover:text-white"}`}
                >
                  <Icon size={18} />
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
