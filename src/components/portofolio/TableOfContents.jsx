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

  // Subtler animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Desktop version - Minimalist style */}
      <motion.nav initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="fixed right-6 top-1/3 z-50 hidden lg:block">
        <motion.div className="bg-white/80 backdrop-blur-sm rounded-md p-2 shadow-sm" variants={containerVariants} initial="hidden" animate="visible">
          <ul className="space-y-2">
            {sections.map(({ id, label, icon: Icon }, index) => (
              <motion.li key={id} variants={itemVariants}>
                <button
                  onClick={() => handleClick(id)}
                  className={`relative w-9 h-9 flex items-center justify-center rounded-full
                            transition-all duration-200 group
                            ${activeSection === id ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  <Icon size={16} className="flex-shrink-0" />

                  {/* Minimalist tooltip */}
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-full mr-2 px-2 py-1 bg-white text-gray-800
                              text-xs whitespace-nowrap pointer-events-none rounded-md shadow-sm"
                  >
                    {label}
                  </motion.span>
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.nav>

      {/* Mobile version - Minimalist style */}
      <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90%] lg:hidden">
        <motion.div className="bg-white/85 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm flex justify-center" variants={containerVariants} initial="hidden" animate="visible">
          <ul className="flex items-center space-x-3">
            {sections.map(({ id, label, icon: Icon }, index) => (
              <motion.li key={id} variants={itemVariants} className="flex-shrink-0">
                <button
                  onClick={() => handleClick(id)}
                  aria-label={label}
                  className={`relative p-1.5 rounded-full transition-all duration-200
                            ${activeSection === id ? "text-gray-900 bg-gray-100" : "text-gray-400 hover:text-gray-900"}`}
                >
                  <Icon size={15} className="flex-shrink-0" />
                </button>

                {/* Minimalist mobile tooltip - appears on active */}
                {activeSection === id && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-xs 
                              px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap"
                  >
                    {label}
                  </motion.div>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.nav>

      {/* Removing previous neobrutalist styles */}
      <style>
        {`
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </>
  );
};

export default TableOfContents;
