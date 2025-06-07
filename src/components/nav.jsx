/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Maximize2, Minimize2 } from "lucide-react";
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
    { to: "/", label: "Portfolio" },
    { to: "/writes", label: "Blog" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 p-6">
      {/* Desktop Menu - Enhanced Typography */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`text-sm font-light transition-all duration-300 tracking-wide uppercase
                         ${location.pathname === item.to ? "text-white relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-px after:bg-white" : "text-neutral-400 hover:text-neutral-200"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Fullscreen Toggle - Repositioned to avoid ToC overlap */}
        <div className="flex items-center gap-4">
          <button onClick={toggleFullscreen} className="text-neutral-400 hover:text-neutral-200 transition-colors duration-300 group">
            {isFullscreen ? <Minimize2 size={18} className="group-hover:scale-110 transition-transform" /> : <Maximize2 size={18} className="group-hover:scale-110 transition-transform" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Repositioned */}
      <div className="md:hidden flex justify-between items-center pt-12">
        <div className="text-white text-sm font-light uppercase tracking-widest">Menu</div>

        <button onClick={() => setIsOpen(!isOpen)} className="text-neutral-400 hover:text-neutral-200 transition-colors duration-300">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Menu Dropdown - Enhanced */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute top-20 right-6 z-50">
              <div className="bg-neutral-900/95 backdrop-blur-sm border border-neutral-700 rounded-lg p-4">
                <div className="space-y-3">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={`block text-sm font-light transition-colors duration-300 uppercase tracking-wide
                                ${location.pathname === item.to ? "text-white" : "text-neutral-400 hover:text-neutral-200"}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Nav;
