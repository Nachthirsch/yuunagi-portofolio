import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    // Only run scroll detection for non-admin, non-home pages
    if (location.pathname.startsWith("/admin") || location.pathname === "/") {
      return;
    }

    const handleScroll = () => {
      // Show nav when scrolling down
      if (window.scrollY > 100) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // Determine if we should render the nav component
  const shouldRenderNav = !(location.pathname.startsWith("/admin") || location.pathname === "/");

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

  const menuItems = [
    {
      to: "/",
      label: "Portfolio",
    },
    {
      to: "/writes",
      label: "Blog",
    },
  ];

  return shouldRenderNav ? (
    <AnimatePresence>
      {showNav && (
        <motion.nav className="fixed top-0 w-full z-50 px-6 py-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          {/* Desktop Menu - Minimalist Style */}
          <div className="hidden md:flex items-center justify-between max-w-6xl mx-auto">
            {/* Logo/Brand */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-gray-800 font-light text-lg">
              <Link to="/">Yuunagi</Link>
            </motion.div>

            {/* Navigation Links */}
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`text-sm transition-all duration-200 relative group
                            ${location.pathname === item.to ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900"}`}
                >
                  {item.label}
                  {location.pathname === item.to && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-px bg-gray-800" transition={{ type: "spring", duration: 0.5, bounce: 0.25 }} />}
                </Link>
              ))}

              {/* Fullscreen Button */}
              <motion.button onClick={toggleFullscreen} className="text-gray-500 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 ml-2" whileTap={{ scale: 0.95 }}>
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </motion.button>
            </motion.div>
          </div>

          {/* Mobile Menu - Minimalist Style */}
          <div className="md:hidden flex justify-between items-center relative">
            {/* Mobile Logo */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-gray-800 font-light text-lg">
              <Link to="/">Yuunagi</Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 z-50 relative" whileTap={{ scale: 0.95 }} style={{ position: "relative", zIndex: 60 }}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {isOpen && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="fixed top-0 left-0 right-0 bottom-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center" style={{ zIndex: 55 }}>
                  <div className="w-full max-w-xs">
                    {menuItems.map((item) => (
                      <motion.div key={item.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-4">
                        <Link
                          to={item.to}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-2 text-lg text-center rounded-md transition-colors
                                    ${location.pathname === item.to ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                        >
                          {item.label}
                          {location.pathname === item.to && <motion.div layoutId="mobileNavIndicator" className="mx-auto mt-1 h-px w-8 bg-gray-800" transition={{ type: "spring", duration: 0.5, bounce: 0.25 }} />}
                        </Link>
                      </motion.div>
                    ))}

                    {/* Fullscreen toggle in mobile menu */}
                    <motion.button
                      onClick={() => {
                        toggleFullscreen();
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center mx-auto mt-6 text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                      <span className="ml-2 text-sm">{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  ) : null;
};

export default Nav;
