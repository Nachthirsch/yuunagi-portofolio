import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaSoundcloud, FaLastfmSquare, FaDiscord } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useEffect, useState } from "react";
import "./header.css";

const Header = () => {
  const [lastTrack, setLastTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch last.fm data
  useEffect(() => {
    const fetchLastFmData = async () => {
      try {
        setIsLoading(true);
        const apiKey = import.meta.env.VITE_LASTFM_API_KEY;

        if (!apiKey) {
          console.error("Last.fm API key is missing from environment variables");
          setIsLoading(false);
          return;
        }

        const tracksResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=yuunaagi&api_key=${apiKey}&format=json&limit=1`);

        if (!tracksResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const tracksData = await tracksResponse.json();

        if (tracksData.recenttracks && tracksData.recenttracks.track && tracksData.recenttracks.track.length > 0) {
          setLastTrack(tracksData.recenttracks.track[0]);
        }
      } catch (error) {
        console.error("Error fetching Last.fm data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastFmData();
  }, []);

  return (
    <header className="relative h-screen font-Hanken tracking-wider overflow-hidden bg-transparent film-grain">
      {/* Last.fm section - positioned at bottom right */}
      <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true, amount: 0.3 }} className="absolute bottom-6 right-6 z-20 max-w-xs">
        {isLoading ? (
          <div className="flex items-center text-neutral-500 text-xs">
            <div className="w-2 h-2 border-t border-neutral-500 rounded-full animate-spin mr-2"></div>
            Loading...
          </div>
        ) : lastTrack ? (
          <div className="flex items-center gap-3">
            {/* Album cover */}
            {lastTrack.image && lastTrack.image.length > 0 ? (
              <div className="flex-shrink-0 w-12 h-12 bg-neutral-800 border border-neutral-700 overflow-hidden rounded-sm">
                <img
                  src={lastTrack.image[2]?.["#text"] || lastTrack.image[1]?.["#text"] || lastTrack.image[0]?.["#text"]}
                  alt={`${lastTrack.name} cover`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML = '<span class="text-neutral-400 text-xl flex items-center justify-center h-full">♪</span>';
                  }}
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-12 h-12 bg-neutral-800 border border-neutral-700 flex items-center justify-center rounded-sm">
                <span className="text-neutral-400 text-xl">♪</span>
              </div>
            )}

            {/* Track info */}
            <div className="text-right min-w-0 flex-1">
              <div className="flex items-center justify-end text-neutral-500 text-xs mb-1">
                <FaLastfmSquare className="mr-1" />
                <span>{lastTrack["@attr"]?.nowplaying ? "Now Playing" : "Last Played"}</span>
                {lastTrack["@attr"]?.nowplaying && <span className="ml-2 w-1.5 h-1.5 bg-neutral-400 rounded-full animate-pulse"></span>}
              </div>
              <div className="text-neutral-300 text-sm font-medium truncate">{lastTrack.name}</div>
              <div className="text-neutral-400 text-xs truncate">by {lastTrack.artist["#text"]}</div>
            </div>
          </div>
        ) : null}
      </motion.div>

      {/* Main content - centered */}
      <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 z-20 max-w-4xl mx-auto">
        {/* Main name/title */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }} className="mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-100 mb-2 tracking-tight">HANDRA</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-300 tracking-widest">PUTRATAMA TANJUNG</h2>
        </motion.div>

        {/* Bio description */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true, amount: 0.3 }} className="mb-8 max-w-2xl">
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">Final-year Information Technology student with interests in Web Development, Photography, Music and Art.</p>
        </motion.div>

        {/* Social links - horizontal minimal layout */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true, amount: 0.3 }} className="flex flex-wrap items-center gap-6">
          <a href="mailto:handraputratama@gmail.com" className="flex items-center text-neutral-400 hover:text-neutral-100 text-sm transition-colors duration-300">
            <AiOutlineMail className="mr-2" />
            handraputratama@gmail.com
          </a>

          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/nachthirsch/" className="text-neutral-500 hover:text-neutral-300 transition-colors duration-300" aria-label="Instagram">
              <FaInstagram className="w-4 h-4" />
            </a>

            <a href="https://github.com/Nachthirsch" className="text-neutral-500 hover:text-neutral-300 transition-colors duration-300" aria-label="GitHub">
              <FaGithub className="w-4 h-4" />
            </a>

            <a href="https://www.linkedin.com/in/handra-putratama-tanjung/" className="text-neutral-500 hover:text-neutral-300 transition-colors duration-300" aria-label="LinkedIn">
              <FaLinkedin className="w-4 h-4" />
            </a>

            <a href="https://soundcloud.com/nachthirsch" className="text-neutral-500 hover:text-neutral-300 transition-colors duration-300" aria-label="SoundCloud">
              <FaSoundcloud className="w-4 h-4" />
            </a>

            <a href="https://discordapp.com/users/745101954174287943" className="text-neutral-500 hover:text-neutral-300 transition-colors duration-300" aria-label="Discord">
              <FaDiscord className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
