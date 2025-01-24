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
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="fixed right-2 top-1/4 -translate-y-1/2 z-40 hidden lg:block">
        <nav className="bg-neutral-800/20 backdrop-blur-sm rounded-lg border border-neutral-700/30 p-2 space-y-1">
          <ul className="space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => handleClick(id)}
                  className={`w-full group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                    ${activeSection === id ? "bg-neutral-700/50 text-white" : "text-neutral-400 hover:bg-neutral-700/30 hover:text-neutral-200"}`}
                >
                  <Icon size={15} />
                  <span className="hidden group-hover:block text-sm">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      {/* Mobile version */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <nav className="bg-neutral-800/90 backdrop-blur-sm border-t border-neutral-700/30 p-1">
          <ul className="flex justify-around items-center">
            {sections.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => handleClick(id)}
                  className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all duration-300
                    ${activeSection === id ? "text-white" : "text-neutral-400"}`}
                >
                  <Icon size={15} />
                  <span className="text-xs">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </>
  );
};

export default TableOfContents;
