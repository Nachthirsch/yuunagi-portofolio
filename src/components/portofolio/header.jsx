import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaSoundcloud, FaDiscord, FaLastfm } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Maximize2, Minimize2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [lastTrack, setLastTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // New state for user info
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items
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

  // Fullscreen toggle function
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

  // Fetch last.fm recent tracks and user info
  useEffect(() => {
    const fetchLastFmData = async () => {
      try {
        setIsLoading(true);
        // Get API key from environment variables
        const apiKey = import.meta.env.VITE_LASTFM_API_KEY;

        if (!apiKey) {
          console.error("Last.fm API key is missing from environment variables");
          setIsLoading(false);
          return;
        }

        // Fetch recent tracks
        const tracksResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=yuunaagi&api_key=${apiKey}&format=json&limit=1`);

        if (!tracksResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const tracksData = await tracksResponse.json();

        if (tracksData.recenttracks && tracksData.recenttracks.track && tracksData.recenttracks.track.length > 0) {
          setLastTrack(tracksData.recenttracks.track[0]);
        }

        // Fetch user info
        const userResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=yuunaagi&api_key=${apiKey}&format=json`);

        if (!userResponse.ok) {
          throw new Error("Network response was not ok for user info");
        }

        const userData = await userResponse.json();

        if (userData.user) {
          setUserInfo(userData.user);
        }
      } catch (error) {
        console.error("Error fetching Last.fm data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastFmData();
  }, []);

  // Generate random animation directions
  const getRandomDirection = () => (Math.random() > 0.5 ? 50 : -50);

  // Pre-generate random directions for consistency
  const animationDirections = {
    title: getRandomDirection(),
    about: getRandomDirection(),
    social: getRandomDirection(),
    lastfm: getRandomDirection(),
    letters: Array.from({ length: 9 }, () => getRandomDirection()),
    socialIcons: Array.from({ length: 6 }, () => getRandomDirection()),
  };

  return (
    <header className="bg-gray-50 text-gray-900 min-h-screen flex flex-col relative">
      {/* Top Navigation */}
      <div className="flex justify-between px-6 sm:px-12 py-8 sm:py-12 tracking-widest font-medium">
        {["P", "O", "R", "T", "F", "O", "L", "I", "O"].map((letter, index) => (
          <motion.span key={index} className="text-sm sm:text-base text-gray-900 opacity-60 font-light tracking-wider transition-opacity duration-300 hover:opacity-100" initial={{ opacity: 0, x: animationDirections.letters[index] }} animate={{ opacity: 0.6, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ opacity: 1 }}>
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Mobile menu button - only on home page */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.0 }} className="md:hidden absolute top-6 right-6" style={{ zIndex: 60 }}>
        <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 relative" whileTap={{ scale: 0.95 }}>
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center" style={{ zIndex: 55 }}>
            <div className="w-full max-w-xs">
              {menuItems.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} className="mb-4">
                  <Link
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 text-lg text-center transition-colors
                              ${location.pathname === item.to ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    {item.label}
                    {location.pathname === item.to && <motion.div layoutId="mobileHeaderNavIndicator" className="mx-auto mt-1 h-px w-8 bg-gray-800" transition={{ type: "spring", duration: 0.5, bounce: 0.25 }} />}
                  </Link>
                </motion.div>
              ))}

              {/* Fullscreen toggle in mobile menu */}
              <motion.button
                onClick={() => {
                  toggleFullscreen();
                  setIsMenuOpen(false);
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

      {/* Main Content Grid - Takes remaining height */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 px-6 sm:px-12 pb-12">
        {/* Left Side - Main Content */}
        <div className="lg:col-span-10 xl:col-span-9 flex flex-col justify-center">
          <motion.h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-gray-900 mb-8 sm:mb-12 lg:mb-16" initial={{ opacity: 0, x: animationDirections.title }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            We believe in the
            <br />
            value of what
            <br />
            can't be measured.
          </motion.h1>

          {/* About section from original header */}
          <motion.div initial={{ opacity: 0, x: animationDirections.about }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-gray-600 max-w-xl font-light">
              My name is <span className="font-medium">Handra Putratama Tanjung</span>.<br />
              I'm a final-year student majoring in Information Technology, having an interest in Web Development, Photography, Music and Art.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{ opacity: 0, x: animationDirections.social }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex gap-3 sm:gap-4 mb-8 lg:mb-0">
            {[
              { href: "mailto:handraputratama@gmail.com", icon: AiOutlineMail, label: "Email" },
              { href: "https://www.instagram.com/nachthirsch/", icon: FaInstagram, label: "Instagram" },
              { href: "https://github.com/Nachthirsch", icon: FaGithub, label: "GitHub" },
              { href: "https://www.linkedin.com/in/handra-putratama-tanjung/", icon: FaLinkedin, label: "LinkedIn" },
              { href: "https://soundcloud.com/nachthirsch", icon: FaSoundcloud, label: "SoundCloud" },
              { href: "https://discordapp.com/users/745101954174287943", icon: FaDiscord, label: "Discord" },
            ].map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a key={index} href={social.href} aria-label={social.label} initial={{ opacity: 0, x: animationDirections.socialIcons[index] }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}>
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-all duration-300 hover:text-gray-800 hover:-translate-y-0.5" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Navigation positioned at right center */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10">
        <div className=" px-4 py-3 hidden md:block">
          <div className="flex flex-col items-end space-y-4">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.to}
                className={`text-sm transition-all duration-200 relative
                          ${location.pathname === item.to ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900"}`}
              >
                {item.label}
                {location.pathname === item.to && <motion.div layoutId="headerNavIndicator" className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-gray-800 rounded-full" transition={{ duration: 0.3 }} />}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Desktop LastFM Section - Positioned at bottom right */}
      <motion.div initial={{ opacity: 0, x: animationDirections.lastfm }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="hidden lg:block absolute bottom-12 right-12 z-10">
        <div className="p-3 border max-w-xs">
          {isLoading ? (
            <div className="py-2 text-gray-500 text-xs flex items-center justify-center">
              <div className="w-2 h-2 border-t border-r border-gray-500 rounded-full animate-spin mr-2"></div>
              Loading...
            </div>
          ) : userInfo && lastTrack ? (
            <div className="flex flex-col">
              {/* User info - minimalist version */}
              <motion.div className="flex items-center mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
                {userInfo.image && userInfo.image.length > 0 ? (
                  <div className="mr-2 flex-shrink-0 w-10 h-10 overflow-hidden rounded-sm bg-gray-100">
                    <img
                      src={userInfo.image[1]?.["#text"] || userInfo.image[0]?.["#text"]}
                      alt="Last.fm profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = '<span class="text-gray-500 text-xs flex items-center justify-center h-full">♪</span>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="mr-2 flex-shrink-0 w-6 h-6 bg-gray-100 flex items-center justify-center rounded-sm">
                    <span className="text-gray-500 text-xs">♪</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium text-[10px] truncate">YUUNAAGI</p>
                  <div className="flex items-center text-[8px] text-gray-500">
                    <span className="truncate">{parseInt(userInfo.playcount).toLocaleString()} scrobbles</span>
                  </div>
                </div>
                <a href={userInfo.url} target="_blank" rel="noopener noreferrer" className="text-[8px] px-2 py-1 rounded-sm hover:bg-gray-200 text-gray-700 flex-shrink-0">
                  <FaLastfm className="w-2.5 h-2.5" />
                </a>
              </motion.div>

              {/* Now playing status */}
              <motion.div className="flex items-center mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.4 }}>
                <div className="flex items-center">
                  <span className="text-gray-600 text-[8px] font-medium mr-1">{lastTrack["@attr"]?.nowplaying ? "Now Playing" : "Last Track"}</span>
                  {lastTrack["@attr"]?.nowplaying && <span className="text-[7px] bg-red-100 text-red-700 px-1 py-0.5 rounded-sm">LIVE</span>}
                </div>
              </motion.div>

              {/* Track info - minimalist version */}
              <motion.div className="flex items-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.6 }}>
                {lastTrack.image && lastTrack.image.length > 0 ? (
                  <div className="mr-2 flex-shrink-0 w-8 h-8 bg-gray-100 overflow-hidden rounded-sm">
                    <img
                      src={lastTrack.image[1]?.["#text"] || lastTrack.image[0]?.["#text"]}
                      alt={`${lastTrack.name} cover`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = '<span class="text-gray-500 text-sm flex items-center justify-center h-full">♪</span>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="mr-2 flex-shrink-0 w-8 h-8 bg-gray-100 flex items-center justify-center rounded-sm">
                    <span className="text-gray-500 text-sm">♪</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium text-[10px] leading-tight truncate">{lastTrack.name}</p>
                  <p className="text-gray-600 text-[8px] truncate">by {lastTrack.artist["#text"]}</p>
                </div>
              </motion.div>
            </div>
          ) : (
            <p className="text-gray-500 text-[10px] py-2 flex items-center justify-center">
              <span className="w-2 h-2 text-gray-600 mr-1">⚠</span>
              No data available
            </p>
          )}
        </div>
      </motion.div>

      {/* Mobile LastFM Section - Positioned at bottom right */}
      <motion.div initial={{ opacity: 0, x: animationDirections.lastfm }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="lg:hidden absolute bottom-6 right-6 z-10">
        <div className="p-2.5  max-w-[240px]">
          {isLoading ? (
            <div className="py-1.5 text-gray-500 text-[10px] flex items-center justify-center">
              <div className="w-2 h-2 border-t border-r border-gray-500 rounded-full animate-spin mr-1.5"></div>
              Loading...
            </div>
          ) : userInfo && lastTrack ? (
            <div className="flex flex-col">
              {/* User info - mobile version */}
              <motion.div className="flex items-center mb-1.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
                {userInfo.image && userInfo.image.length > 0 ? (
                  <div className="mr-2 flex-shrink-0 w-6 h-6 overflow-hidden rounded-sm bg-gray-100">
                    <img
                      src={userInfo.image[1]?.["#text"] || userInfo.image[0]?.["#text"]}
                      alt="Last.fm profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = '<span class="text-gray-500 text-xs flex items-center justify-center h-full">♪</span>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="mr-2 flex-shrink-0 w-6 h-6 bg-gray-100 flex items-center justify-center rounded-sm">
                    <span className="text-gray-500 text-xs">♪</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium text-[9px] truncate">YUUNAAGI</p>
                  <div className="flex items-center text-[7px] text-gray-500">
                    <span className="truncate">{parseInt(userInfo.playcount).toLocaleString()} scrobbles</span>
                  </div>
                </div>
                <a href={userInfo.url} target="_blank" rel="noopener noreferrer" className="text-[7px] px-1.5 py-0.5 rounded-sm hover:bg-gray-200 text-gray-700 flex-shrink-0">
                  <FaLastfm className="w-2 h-2" />
                </a>
              </motion.div>

              {/* Now playing status - mobile */}
              <motion.div className="flex items-center mb-1.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.4 }}>
                <div className="flex items-center">
                  <span className="text-gray-600 text-[7px] font-medium mr-1">{lastTrack["@attr"]?.nowplaying ? "Now Playing" : "Last Track"}</span>
                  {lastTrack["@attr"]?.nowplaying && <span className="text-[6px] bg-red-100 text-red-700 px-1 py-0.5 rounded-sm">LIVE</span>}
                </div>
              </motion.div>

              {/* Track info - mobile version */}
              <motion.div className="flex items-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.6 }}>
                {lastTrack.image && lastTrack.image.length > 0 ? (
                  <div className="mr-2 flex-shrink-0 w-8 h-8 bg-gray-100 overflow-hidden rounded-sm">
                    <img
                      src={lastTrack.image[1]?.["#text"] || lastTrack.image[0]?.["#text"]}
                      alt={`${lastTrack.name} cover`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = '<span class="text-gray-500 text-sm flex items-center justify-center h-full">♪</span>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="mr-2 flex-shrink-0 w-8 h-8 bg-gray-100 flex items-center justify-center rounded-sm">
                    <span className="text-gray-500 text-sm">♪</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium text-[9px] leading-tight truncate">{lastTrack.name}</p>
                  <p className="text-gray-600 text-[7px] truncate">by {lastTrack.artist["#text"]}</p>
                </div>
              </motion.div>
            </div>
          ) : (
            <p className="text-gray-500 text-[9px] py-1.5 flex items-center justify-center">
              <span className="w-1.5 h-1.5 text-gray-600 mr-1">⚠</span>
              No data available
            </p>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
