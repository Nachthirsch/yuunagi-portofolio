/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Briefcase, PenTool, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const location = useLocation();

  // Add check for admin path
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const menuItems = [
    {
      to: "/",
      icon: <Briefcase size={18} />,
      label: "Portfolio",
      description: "View my work experience & projects",
    },
    {
      to: "/writes",
      icon: <PenTool size={18} />,
      label: "Blog",
      description: "Read my thoughts & articles",
    },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 p-4">
      {/* Desktop Menu - Neobrutalism Style */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-neutral-900/90 backdrop-blur-sm rounded-full px-12 py-2.5 
                    border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] rotate-[0.5deg]" 
        >
          {/* Decorative elements */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-black rounded-full border-1 border-white/20"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black rounded-full border-1 border-white/20"></div>
          
          <div className="flex items-center justify-center gap-8">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-white text-sm font-extrabold hover:text-neutral-300 
                           transition-all duration-300 group flex items-center gap-2
                           ${location.pathname === item.to 
                            ? "bg-neutral-800 px-4 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] -rotate-1" 
                            : "hover:-translate-y-0.5"}`}
              >
                <span className={`${location.pathname === item.to ? 'text-neutral-300' : 'text-neutral-400'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Control Buttons - Desktop Only - Neobrutalism Style */}
      <div className="hidden md:flex absolute right-4 top-4">
        <motion.button
          onClick={toggleFullscreen}
          className="bg-neutral-900/90 backdrop-blur-sm rounded-full p-2.5 
                   border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)]
                   hover:shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:-translate-y-0.5
                   transition-all duration-300"
          whileHover={{ rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div className="text-white">
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </motion.div>
        </motion.button>
      </div>
      
      {/* Mobile Menu Button - Neobrutalism Style */}
      <div className="md:hidden flex justify-end">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-neutral-900/90 backdrop-blur-sm rounded-full p-2.5 
                   border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)]
                   transition-all duration-300"
          whileHover={{ rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="text-white"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </motion.button>

        {/* Mobile Menu Dropdown - Neobrutalism Style */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: -20, scale: 0.95 }} 
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute top-16 right-4 w-48 z-50"
            >
              <div
                className="bg-neutral-900/95 backdrop-blur-xl 
                          rounded-xl p-3 border-3 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.8)] rotate-1"
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-neutral-800 opacity-20"
                    style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>
                
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1 },
                    }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center gap-3 p-2.5 mb-2
                                ${location.pathname === item.to 
                                ? "bg-neutral-800 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] -rotate-1" 
                                : "hover:bg-neutral-800/30"}`}
                    >
                      <span className={`p-1.5 bg-neutral-800 border-1 border-black rounded-md
                                      ${location.pathname === item.to ? 'shadow-[1px_1px_0px_rgba(0,0,0,0.8)]' : ''}`}>
                        {item.icon}
                      </span>
                      <span className="text-white text-sm font-bold">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Decorative bottom line */}
                <div className="w-full h-1 bg-neutral-800 mt-1 border-t-1 border-b-1 border-black opacity-30"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Styles for neobrutalism */}
      <style>
        {`
          .border-3 {
            border-width: 3px;
          }
          .border-1 {
            border-width: 1px;
          }
        `}
      </style>
    </nav>
  );
};

export default Nav;
