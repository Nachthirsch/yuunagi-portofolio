import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Briefcase, Image, Award, Activity, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 0);
  };

  const menuItems = [
    { to: "/#experience", icon: <Briefcase size={16} />, label: "Experience", abbr: "EXP" },
    { to: "/#imageSection", icon: <Image size={16} />, label: "Gallery", abbr: "IMG" },
    { to: "/#certificates", icon: <Award size={16} />, label: "Certificates", abbr: "CRT" },
    { to: "/#activities", icon: <Activity size={16} />, label: "Activities", abbr: "ACT" },
    { to: "/#projects", icon: <Code size={16} />, label: "Projects", abbr: "PRJ" },
    { to: "/#techStacks", icon: <Code size={16} />, label: "Tech Stack", abbr: "TCH" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="fixed right-8 top-8 z-50">
      {" "}
      {/* Changed from right-8 top-1/2 -translate-y-1/2 */}
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div initial="hidden" animate="visible" exit="hidden" variants={containerVariants} className="absolute right-16 top-0 flex flex-col gap-3">
              {menuItems.map((item) => (
                <motion.div key={item.label} variants={itemVariants}>
                  <Link
                    to={item.to}
                    onClick={handleClick}
                    className="group relative p-3 bg-neutral-800/90 backdrop-blur-md
                             text-neutral-200 rounded-xl font-['Hanken_Grotesk'] text-xs
                             transition-all duration-300 hover:bg-neutral-900 w-32
                             flex items-center justify-start space-x-3
                             border border-neutral-700/50 hover:border-neutral-500
                             hover:shadow-lg hover:-translate-x-1"
                  >
                    <span
                      className="z-10 w-8 h-8 flex items-center justify-center 
                               bg-neutral-700/80 rounded-lg group-hover:bg-neutral-600 
                               transition-all duration-300 group-hover:shadow-inner"
                    >
                      {item.icon}
                    </span>
                    <span className="text-xs font-medium tracking-wide opacity-75 group-hover:opacity-100">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-neutral-800/90 backdrop-blur-md rounded-2xl
                     hover:shadow-xl transition-all duration-300 flex items-center justify-center
                     hover:bg-neutral-900 border border-neutral-700/50 hover:border-neutral-500
                     group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-neutral-200 group-hover:text-neutral-100">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
