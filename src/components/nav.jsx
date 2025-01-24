import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Briefcase, PenTool, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const location = useLocation();
  const isV2 = location.pathname.includes("/v2");

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

  // Add fullscreen change event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const getMenuItems = (isV2) => {
    if (isV2) {
      return [];
    }
    return [
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
  };

  const menuItems = getMenuItems(isV2);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      {/* Version Selector - Desktop */}
      <div className="hidden md:flex absolute left-4 top-4">
        <div
          className="bg-black bg-opacity-10 backdrop-blur-sm rounded-full p-1 
                    border border-white/10 flex"
        >
          <Link
            to={isV2 ? "/" : location.pathname}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
                      ${!isV2 ? "bg-white text-neutral-900" : "text-white hover:text-neutral-200"}`}
          >
            V1
          </Link>
          <Link
            to={!isV2 ? "/v2" : location.pathname}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
                      ${isV2 ? "bg-white text-neutral-900" : "text-white hover:text-neutral-200"}`}
          >
            V2
          </Link>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block max-w-[320px] mx-auto">
        {menuItems.length > 0 && (
          <div
            className="bg-black bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2.5 
                        border border-white/10"
          >
            <div className="flex items-center justify-center gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`text-white text-sm font-bold hover:text-neutral-300 
                             transition-colors duration-300
                             ${location.pathname === item.to ? "text-neutral-300" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons - Desktop Only */}
      <div className="hidden md:flex absolute right-4 top-4">
        <motion.button
          onClick={toggleFullscreen}
          className="bg-black bg-opacity-10 backdrop-blur-sm rounded-full p-2.5 
                   border border-white/10 hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div className="text-white">{isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}</motion.div>
        </motion.button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between items-center">
        {/* Version Selector - Mobile */}
        <div
          className="bg-black bg-opacity-10 backdrop-blur-sm rounded-full p-1 
                    border border-white/10 flex"
        >
          <Link
            to={isV2 ? "/" : location.pathname}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 
                      ${!isV2 ? "bg-white text-neutral-900" : "text-white hover:text-neutral-200"}`}
          >
            V1
          </Link>
          <Link
            to={!isV2 ? "/v2" : location.pathname}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 
                      ${isV2 ? "bg-white text-neutral-900" : "text-white hover:text-neutral-200"}`}
          >
            V2
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        {menuItems.length > 0 && (
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-black bg-opacity-10 backdrop-blur-sm rounded-full p-2.5 
                       border border-white/10 hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{
                rotate: isOpen ? 180 : 0,
                scale: isOpen ? 0.8 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="text-white"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-16 right-4 w-48">
            <div
              className="bg-black bg-opacity-10 backdrop-blur-xl 
                          rounded-2xl p-3 border border-white/10"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1 },
                  }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-3 p-2 rounded-xl
                             hover:bg-white/10 transition-all duration-300"
                  >
                    <span className="text-white text-sm font-bold">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
