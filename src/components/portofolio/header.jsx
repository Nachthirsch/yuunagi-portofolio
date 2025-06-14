import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaSoundcloud, FaDiscord, FaLastfm } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";

const Header = () => {
  const [lastTrack, setLastTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // New state for user info

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
      <div className="flex justify-between px-4 sm:px-8 py-6 sm:py-8 tracking-widest font-medium">
        {["P", "O", "R", "T", "F", "O", "L", "I", "O"].map((letter, index) => (
          <motion.span key={index} className="text-base sm:text-xl text-gray-900 opacity-70 font-medium tracking-wider transition-opacity duration-300 hover:opacity-100" initial={{ opacity: 0, x: animationDirections.letters[index] }} animate={{ opacity: 0.7, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ opacity: 1 }}>
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Main Content Grid - Takes remaining height */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 px-4 sm:px-8 pb-8">
        {/* Left Side - Main Content */}
        <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-center">
          <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight text-gray-900 mb-6 sm:mb-8 lg:mb-12" initial={{ opacity: 0, x: animationDirections.title }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            We believe in the
            <br />
            value of what
            <br />
            can't be measured.
          </motion.h1>

          {/* About section from original header */}
          <motion.div initial={{ opacity: 0, x: animationDirections.about }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-6 sm:mb-8">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 max-w-2xl">
              My name is <span className="font-bold">Handra Putratama Tanjung</span>.<br />
              I'm a final-year student majoring in Information Technology, having an interest in Web Development, Photography, Music and Art.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div initial={{ opacity: 0, x: animationDirections.social }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex gap-4 sm:gap-6 mb-8 lg:mb-0">
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
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-all duration-300 hover:text-gray-800 hover:-translate-y-1" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Right Side - LastFM Section - Hidden on mobile (shown in absolute positioning) */}
        <div className="hidden lg:flex lg:col-span-4 xl:col-span-3 xl:col-start-10 flex-col justify-center lg:justify-end">
          <motion.div initial={{ opacity: 0, x: animationDirections.lastfm }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="self-center lg:self-end">
            <div className="p-6 sm:p-4 border w-full max-w-xs">
              {isLoading ? (
                <div className="py-2 text-gray-500 text-xs flex items-center justify-center">
                  <div className="w-3 h-3 border-t-2 border-r-2 border-gray-500 rounded-full animate-spin mr-2"></div>
                  Loading...
                </div>
              ) : userInfo && lastTrack ? (
                <div className="flex flex-col">
                  {/* User info - minimalist version */}
                  <motion.div className="flex items-center mb-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
                    {userInfo.image && userInfo.image.length > 0 ? (
                      <div className="mr-2 sm:mr-3 flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 overflow-hidden rounded-sm bg-gray-100">
                        <img
                          src={userInfo.image[1]?.["#text"] || userInfo.image[0]?.["#text"]}
                          alt="Last.fm profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.parentNode.innerHTML = '<span class="text-gray-500 text-sm flex items-center justify-center h-full">♪</span>';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="mr-2 sm:mr-3 flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 flex items-center justify-center rounded-sm">
                        <span className="text-gray-500 text-sm">♪</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-medium text-xs truncate">YUUNAAGI</p>
                      <div className="flex items-center text-[10px] text-gray-500">
                        <span className="truncate">{parseInt(userInfo.playcount).toLocaleString()} scrobbles</span>
                      </div>
                    </div>
                    <a href={userInfo.url} target="_blank" rel="noopener noreferrer" className="text-[10px] px-4 py-1 rounded-sm hover:bg-gray-200 text-gray-700 flex-shrink-0">
                      <FaLastfm />
                    </a>
                  </motion.div>

                  {/* Now playing status */}
                  <motion.div className="flex items-center mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.4 }}>
                    <div className="flex items-center">
                      <span className="text-gray-600 text-[10px] font-medium mr-1">{lastTrack["@attr"]?.nowplaying ? "Now Playing" : "Last Track"}</span>
                      {lastTrack["@attr"]?.nowplaying && <span className="text-[8px] bg-red-100 text-red-700 px-1 py-0.5 rounded-sm">LIVE</span>}
                    </div>
                  </motion.div>

                  {/* Track info - minimalist version */}
                  <motion.div className="flex items-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.6 }}>
                    {lastTrack.image && lastTrack.image.length > 0 ? (
                      <div className="mr-2 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 overflow-hidden rounded-sm">
                        <img
                          src={lastTrack.image[1]?.["#text"] || lastTrack.image[0]?.["#text"]}
                          alt={`${lastTrack.name} cover`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.parentNode.innerHTML = '<span class="text-gray-500 text-lg flex items-center justify-center h-full">♪</span>';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="mr-2 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 flex items-center justify-center rounded-sm">
                        <span className="text-gray-500 text-lg">♪</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-medium text-xs leading-tight truncate">{lastTrack.name}</p>
                      <p className="text-gray-600 text-[10px] truncate">by {lastTrack.artist["#text"]}</p>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <p className="text-gray-500 text-xs py-2 flex items-center justify-center">
                  <span className="w-3 h-3 text-gray-600 mr-2">⚠</span>
                  No data available
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile LastFM Section - Positioned at bottom right */}
      <motion.div initial={{ opacity: 0, x: animationDirections.lastfm }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="lg:hidden absolute bottom-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm p-3 border border-gray-200 rounded-lg shadow-lg max-w-[280px]">
          {isLoading ? (
            <div className="py-2 text-gray-500 text-xs flex items-center justify-center">
              <div className="w-3 h-3 border-t-2 border-r-2 border-gray-500 rounded-full animate-spin mr-2"></div>
              Loading...
            </div>
          ) : userInfo && lastTrack ? (
            <div className="flex flex-col">
              {/* User info - mobile version */}
              <motion.div className="flex items-center mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
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
                  <p className="text-gray-800 font-medium text-[10px] truncate">YUUNAAGI</p>
                  <div className="flex items-center text-[8px] text-gray-500">
                    <span className="truncate">{parseInt(userInfo.playcount).toLocaleString()} scrobbles</span>
                  </div>
                </div>
                <a href={userInfo.url} target="_blank" rel="noopener noreferrer" className="text-[8px] px-2 py-1 rounded-sm hover:bg-gray-200 text-gray-700 flex-shrink-0">
                  <FaLastfm className="w-3 h-3" />
                </a>
              </motion.div>

              {/* Now playing status - mobile */}
              <motion.div className="flex items-center mb-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.4 }}>
                <div className="flex items-center">
                  <span className="text-gray-600 text-[8px] font-medium mr-1">{lastTrack["@attr"]?.nowplaying ? "Now Playing" : "Last Track"}</span>
                  {lastTrack["@attr"]?.nowplaying && <span className="text-[7px] bg-red-100 text-red-700 px-1 py-0.5 rounded-sm">LIVE</span>}
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
    </header>
  );
};

export default Header;
