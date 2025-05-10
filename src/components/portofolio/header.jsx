import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaSoundcloud, FaLastfmSquare, FaHistory, FaExchangeAlt, FaHeadphones, FaDiscord } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useRef, useState } from "react";
import "./header.css"; // Import custom CSS for scrollbar styling

const Header = () => {
  const canvasRef = useRef(null);
  const [lastTrack, setLastTrack] = useState(null);
  const [recentTracks, setRecentTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("lastTrack"); // 'lastTrack' or 'recentTracks'
  const [userInfo, setUserInfo] = useState(null); // New state for user info

  // Toggle between Last Track and Recent Tracks view
  const toggleViewMode = () => {
    setViewMode(viewMode === "lastTrack" ? "recentTracks" : "lastTrack");
  };

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
        const tracksResponse = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=yuunaagi&api_key=${apiKey}&format=json&limit=10`);

        if (!tracksResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const tracksData = await tracksResponse.json();

        if (tracksData.recenttracks && tracksData.recenttracks.track && tracksData.recenttracks.track.length > 0) {
          setLastTrack(tracksData.recenttracks.track[0]);
          setRecentTracks(tracksData.recenttracks.track);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    let animationFrameId;
    let lastRender = 0;

    // Calculate responsive values
    const isMobile = window.innerWidth < 768;
    const baseRadius = isMobile ? 170 : 200; // Radius sedikit lebih kecil
    const numPoints = isMobile ? 200 : 250; // Mengurangi jumlah titik untuk efek lebih tegas
    const baseFontSize = isMobile ? 12 : 16; // Ukuran font lebih besar untuk keterbacaan neobrutalism
    const rotationSpeed = isMobile ? 0.005 : 0.007; // Rotasi lebih lambat untuk efek lebih berat

    // Menggunakan karakter yang lebih variatif dan tegas untuk gaya neobrutalism
    const BRUTALISM_CHARS = [". ."];
    const points = [];
    let angleX = 2;
    let angleY = 0;

    // Generate cube points instead of sphere for brutalism effect
    const createCubePoints = () => {
      // Hapus array points yang ada
      points.length = 0;

      // Buat titik-titik berbentuk kubus
      const cubeSize = baseRadius * 0.8;
      const halfSize = cubeSize / 2;
      const sides = [-halfSize, halfSize]; // Koordinat sisi kubus

      // Tambahkan titik-titik random dalam bentuk kubus
      for (let i = 0; i < numPoints; i++) {
        // Acak posisi titik dalam batas kubus dengan sedikit variasi untuk efek tidak sempurna
        const x = Math.random() * cubeSize - halfSize;
        const y = Math.random() * cubeSize - halfSize;

        // Pastikan titik berada di sekitar permukaan kubus
        // Pilih sisi mana yang ingin diletakkan titik
        const side = Math.floor(Math.random() * 6);
        let z;

        switch (side) {
          case 0:
            z = -halfSize + (Math.random() * 10 - 5); // Depan
            break;
          case 1:
            z = halfSize + (Math.random() * 10 - 5); // Belakang
            break;
          case 2:
            // Atas (dengan y tetap)
            points.push({
              x: x,
              y: -halfSize + (Math.random() * 10 - 5),
              z: Math.random() * cubeSize - halfSize,
              char: BRUTALISM_CHARS[Math.floor(Math.random() * BRUTALISM_CHARS.length)],
            });
            continue;
          case 3:
            // Bawah (dengan y tetap)
            points.push({
              x: x,
              y: halfSize + (Math.random() * 10 - 5),
              z: Math.random() * cubeSize - halfSize,
              char: BRUTALISM_CHARS[Math.floor(Math.random() * BRUTALISM_CHARS.length)],
            });
            continue;
          case 4:
            // Kiri (dengan x tetap)
            points.push({
              x: -halfSize + (Math.random() * 10 - 5),
              y: y,
              z: Math.random() * cubeSize - halfSize,
              char: BRUTALISM_CHARS[Math.floor(Math.random() * BRUTALISM_CHARS.length)],
            });
            continue;
          case 5:
            // Kanan (dengan x tetap)
            points.push({
              x: halfSize + (Math.random() * 10 - 5),
              y: y,
              z: Math.random() * cubeSize - halfSize,
              char: BRUTALISM_CHARS[Math.floor(Math.random() * BRUTALISM_CHARS.length)],
            });
            continue;
        }

        points.push({
          x: x,
          y: y,
          z: z,
          char: BRUTALISM_CHARS[Math.floor(Math.random() * BRUTALISM_CHARS.length)],
        });
      }
    };

    createCubePoints();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = (timestamp) => {
      // Limit frame rate
      const frameInterval = isMobile ? 4 : 4;
      if (timestamp - lastRender < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastRender = timestamp;

      // Warna background lebih kontras untuk neobrutalism
      ctx.fillStyle = "rgb(23, 23, 23, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width - baseRadius * (isMobile ? 0.3 : 0.5);
      const centerY = canvas.height - baseRadius * (isMobile ? 0.3 : 0.5);

      // Threshold untuk menyaring titik yang terlihat
      const visibilityThreshold = isMobile ? -baseRadius : -baseRadius * 0.7;

      // Pre-calculate sin and cos values
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const rotatedPoints = points
        .map((point) => {
          const x1 = point.x * cosY - point.z * sinY;
          const z1 = point.z * cosY + point.x * sinY;
          const y2 = point.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + point.y * sinX;

          return {
            x: x1,
            y: y2,
            z: z2,
            char: point.char,
          };
        })
        .filter((point) => point.z > visibilityThreshold)
        .sort((a, b) => b.z - a.z);

      // Batch similar font sizes
      let currentFontSize = 0;

      rotatedPoints.forEach((point) => {
        // Tingkatkan ukuran dan kontras untuk efek neobrutalism
        const scale = (point.z + baseRadius) / (1 * baseRadius);

        // Warna lebih kontras dengan hanya 3-4 level intensitas untuk neobrutalism
        let intensity;
        if (scale < 0.4) intensity = 100;
        else if (scale < 0.7) intensity = 160;
        else if (scale < 0.9) intensity = 210;
        else intensity = 255;

        // Tambahkan sedikit variasi warna untuk neobrutalism
        const r = intensity;
        const g = intensity;
        const b = intensity;

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

        // Ukuran font yang lebih variatif untuk neobrutalism
        const fontSize = Math.floor(baseFontSize * scale * 1.2);
        if (fontSize !== currentFontSize) {
          // Gunakan font dengan style lebih tegas/monospace untuk neobrutalism
          ctx.font = `bold ${fontSize}px "Courier New"`;
          currentFontSize = fontSize;
        }

        // Tambahkan efek shadow untuk karakter neobrutalism
        if (scale > 0.8) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = 2;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
        } else {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }

        ctx.fillText(point.char, centerX + point.x, centerY + point.y);
      });

      angleX += rotationSpeed;
      angleY += rotationSpeed;

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      const wasModule = window.innerWidth < 768;
      const isMobileNow = window.innerWidth < 768;

      if (wasModule !== isMobileNow) {
        // Reload component if switching between mobile and desktop
        window.location.reload();
      }
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <header className="relative h-screen font-Hanken tracking-wider overflow-hidden bg-neutral-900">
      <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 10, willChange: "transform", background: "transparent" }} />

      {/* Neo-brutalism content container */}
      <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 z-10">
        {" "}
        {/* Bio text with neo-brutalism styles */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }} className="max-w-2xl">
          <h2 className="text-neutral-100 text-xl sm:text-2xl font-bold mb-3 inline-block bg-red-800 px-3 py-1 shadow-[4px_4px_0px_rgb(0,0,0)]">About Me</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true, amount: 0.3 }} className="max-w-2xl mt-2 bg-neutral-800 p-4 sm:p-5 rounded-sm border-2 border-black shadow-[6px_6px_0px_rgb(0,0,0)]">
          <p className="text-neutral-100 tracking-wider text-sm sm:text-base sm:leading-7">
            I would love to introduce myself now! My name is <span className="text-neutral-200 font-extrabold bg-red-800 px-2 py-0.5 shadow-[3px_3px_0px_rgba(0,0,0,0.8)] inline-block mx-1">Handra Putratama Tanjung</span>
            .
            <br className="hidden sm:block" />
            <span className="block mt-3 sm:mt-2 sm:inline">I&apos;m a final-year student majoring in Information Technology, having an interest in Web Development, Photography, Music and Art.</span>
          </p>
        </motion.div>
        {/* Last Track Listened / Recent Tracks Combined Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true, amount: 0.3 }} className="mt-6 mb-6 flex flex-col md:flex-row gap-4">
          {/* Last Track Listened / Recent Tracks Combined */}
          <div className="bg-neutral-800 py-3 px-4 rounded-sm border-2 border-black shadow-[4px_4px_0px_rgb(0,0,0)] md:w-1/2 max-w-sm relative overflow-hidden group">
            {/* Background pattern for visual interest */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
              <div className="absolute -top-8 -right-8 w-16 h-16 rotate-12 bg-red-600"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 rotate-45 bg-red-600"></div>
            </div>

            {/* User info section */}
            {userInfo && (
              <div className="flex items-center mb-3 pb-2 border-b border-neutral-700">
                {userInfo.image && userInfo.image.length > 0 ? (
                  <div className="mr-3 flex-shrink-0 w-10 h-10 bg-neutral-700 border border-black overflow-hidden rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
                    <img
                      src={userInfo.image[1]?.["#text"] || userInfo.image[0]?.["#text"]}
                      alt="Last.fm profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = '<span class="text-red-400 text-xl flex items-center justify-center h-full">♪</span>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="mr-3 flex-shrink-0 w-10 h-10 bg-neutral-700 border border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.3)] rounded-sm">
                    <span className="text-red-400 text-xl">♪</span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-neutral-100 font-bold text-xs truncate">{userInfo.realname || userInfo.name}</p>
                  <div className="flex items-center text-[10px] text-neutral-400">
                    <FaHeadphones className="mr-1 text-[8px] text-red-500" />
                    <span>{parseInt(userInfo.playcount).toLocaleString()} scrobbles</span>
                  </div>
                </div>
                <a href={userInfo.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-[10px] bg-neutral-700 hover:bg-neutral-600 px-1.5 py-0.5 rounded-sm text-neutral-300 border border-black transition-colors duration-200 flex items-center">
                  <FaLastfmSquare className="mr-1 text-red-500" />
                  Profile
                </a>
              </div>
            )}

            <div className="flex items-center mb-3 relative justify-between">
              <div className="flex items-center">
                {viewMode === "lastTrack" ? (
                  <>
                    <FaLastfmSquare className="text-red-600 mr-2 text-sm" />
                    <h3 className="text-neutral-200 text-sm font-bold">{lastTrack && lastTrack["@attr"]?.nowplaying ? "Scrobbling Now" : "Last Track Listened"}</h3>
                    {lastTrack && lastTrack["@attr"]?.nowplaying && <span className="ml-2 text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-sm animate-pulse">LIVE</span>}
                  </>
                ) : (
                  <>
                    <FaHistory className="text-red-600 mr-2 text-sm" />
                    <h3 className="text-neutral-200 text-sm font-bold">Recent Tracks</h3>
                    <span className="ml-2 text-[10px] bg-neutral-700 text-white px-1.5 py-0.5 rounded-sm">{recentTracks.length}</span>
                  </>
                )}
              </div>

              {/* Toggle Button */}
              <button onClick={toggleViewMode} className="bg-neutral-700 p-1 rounded-sm hover:bg-neutral-600 transition-colors duration-200 border border-black" aria-label={viewMode === "lastTrack" ? "View recent tracks" : "View last track"}>
                <FaExchangeAlt className="text-neutral-300 text-xs" />
              </button>
            </div>

            {isLoading ? (
              <div className="py-2 text-neutral-300 text-xs flex items-center">
                <div className="w-3 h-3 border-t-2 border-r-2 border-red-600 rounded-full animate-spin mr-2"></div>
                Loading {viewMode === "lastTrack" ? "track data" : "history"}...
              </div>
            ) : viewMode === "lastTrack" ? (
              lastTrack ? (
                <div className="flex items-start">
                  {lastTrack.image && lastTrack.image.length > 0 ? (
                    <div className="mr-3 flex-shrink-0 w-12 h-12 bg-neutral-700 border border-black overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,0.3)] group-hover:shadow-[3px_3px_0px_rgba(0,0,0,0.3)] transition-shadow duration-300">
                      <img
                        src={lastTrack.image[2]?.["#text"] || lastTrack.image[1]?.["#text"] || lastTrack.image[0]?.["#text"]}
                        alt={`${lastTrack.name} cover`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                          e.target.parentNode.innerHTML = '<span class="text-orange-400 text-xl flex items-center justify-center h-full">♪</span>';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="mr-3 flex-shrink-0 w-12 h-12 bg-neutral-700 border border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
                      <span className="text-orange-400 text-xl">♪</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-neutral-100 font-bold text-sm truncate pr-2 group-hover:text-red-200 transition-colors duration-300">{lastTrack.name}</p>
                    <p className="text-neutral-100 text-xs mt-0.5 truncate">
                      by <span className="text-neutral-300">{lastTrack.artist["#text"]}</span>
                    </p>

                    <div className="mt-2 flex items-center text-xs">
                      {lastTrack["@attr"]?.nowplaying ? (
                        <a href="https://www.last.fm/user/yuunaagi" target="_blank" rel="noopener noreferrer" className="flex items-center bg-neutral-800 hover:bg-neutral-700 rounded-sm px-3 py-1.5 inline-block transition-all duration-200 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.8)] hover:-translate-y-0.5 hover:rotate-[0.5deg] relative overflow-hidden group">
                          <div className="absolute -right-6 -top-6 w-10 h-10 bg-red-600 opacity-10 rotate-12 z-0"></div>
                          <span className="text-red-500 text-xs font-bold uppercase tracking-wide z-10 relative">Visit Profile</span>
                          <span className="ml-1 text-xs font-bold z-10 relative">→</span>
                        </a>
                      ) : lastTrack.date ? (
                        <div className="text-neutral-400 bg-neutral-900 rounded-sm px-1.5 py-1 inline-block">
                          {new Date(parseInt(lastTrack.date.uts) * 1000).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </div>
                      ) : (
                        <span className="text-neutral-400 bg-neutral-900 rounded-sm px-1.5 py-1 inline-block">Last Played</span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-neutral-300 text-xs py-2 flex items-center">
                  <span className="w-3 h-3 text-red-600 mr-2">⚠</span>
                  No recent tracks found
                </p>
              )
            ) : recentTracks.length > 0 ? (
              <div className="h-[70px] overflow-y-auto custom-scrollbar pr-1">
                {recentTracks.map((track, index) => (
                  <div key={index} className={`flex items-center mb-1 ${track["@attr"]?.nowplaying ? "opacity-100" : "opacity-80 hover:opacity-100"} transition-opacity duration-200`}>
                    <div className="mr-2 flex-shrink-0 w-8 h-8 bg-neutral-700 border border-black overflow-hidden">
                      {track.image && track.image.length > 0 ? (
                        <img
                          src={track.image[1]?.["#text"] || track.image[0]?.["#text"]}
                          alt={`${track.name} cover`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.parentNode.innerHTML = '<span class="text-orange-400 text-sm flex items-center justify-center h-full">♪</span>';
                          }}
                        />
                      ) : (
                        <span className="text-orange-400 text-sm flex items-center justify-center h-full">♪</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-neutral-100 text-xs font-medium truncate">{track.name}</p>
                      <p className="text-neutral-400 text-[10px] truncate">{track.artist["#text"]}</p>
                    </div>
                    <div className="ml-1 flex-shrink-0">
                      {track["@attr"]?.nowplaying ? (
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse block"></span>
                      ) : (
                        track.date && (
                          <span className="text-neutral-500 text-[9px]">
                            {new Date(parseInt(track.date.uts) * 1000).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-300 text-xs py-2 flex items-center">
                <span className="w-3 h-3 text-red-600 mr-2">⚠</span>
                No track history found
              </p>
            )}
          </div>

          {/* Social media icons with neo-brutalism style */}
          <div className="bg-neutral-800 py-3 px-4 rounded-sm border-2 border-black shadow-[4px_4px_0px_rgb(0,0,0)] md:w-1/2 max-w-sm relative overflow-hidden">
            <h3 className="flex items-center text-neutral-200 text-sm font-bold mb-3 relative">
              <span className="text-red-600 mr-2">@</span>Connect With Me
            </h3>

            {/* Triangle-shaped social media icons */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.4 }} viewport={{ once: true, amount: 0.3 }} className="flex flex-col items-center gap-2 my-4">
              {/* First row - Email only */}
              <div className="flex justify-center">
                <a href="mailto:handraputratama@gmail.com" className="social-icon-wrapper group relative" aria-label="Email">
                  <div className="p-2 rounded-md bg-neutral-700 border border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
                    <AiOutlineMail className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded border border-black shadow-[1px_1px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">Email</span>
                </a>
              </div>

              {/* Second row - Instagram and Github */}
              <div className="flex justify-center gap-3">
                <a href="https://www.instagram.com/nachthirsch/" className="social-icon-wrapper group relative" aria-label="Instagram">
                  <div className="p-2 rounded-md bg-neutral-700 border border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
                    <FaInstagram className="w-5 h-5 text-pink-400" />
                  </div>
                  <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded border border-black shadow-[1px_1px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">Instagram</span>
                </a>

                <a href="https://github.com/Nachthirsch" className="social-icon-wrapper group relative" aria-label="GitHub">
                  <div className="p-2 rounded-md bg-neutral-700 border border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
                    <FaGithub className="w-5 h-5 text-gray-300" />
                  </div>
                  <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded border border-black shadow-[1px_1px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">GitHub</span>
                </a>
              </div>

              {/* Third row - LinkedIn, SoundCloud and Discord */}
              <div className="flex justify-center gap-3">
                <a href="https://www.linkedin.com/in/handra-putratama-tanjung/" className="social-icon-wrapper group relative" aria-label="LinkedIn">
                  <div className="p-2 rounded-md bg-neutral-700 border border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
                    <FaLinkedin className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded border border-black shadow-[1px_1px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">LinkedIn</span>
                </a>

                <a href="https://soundcloud.com/nachthirsch" className="social-icon-wrapper group relative" aria-label="SoundCloud">
                  <div className="p-2 rounded-md bg-neutral-700 border border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
                    <FaSoundcloud className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded border border-black shadow-[1px_1px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">SoundCloud</span>
                </a>

                <a href="https://discordapp.com/users/745101954174287943" className="social-icon-wrapper group relative" aria-label="Discord">
                  <div className="p-2 rounded-md bg-neutral-700 border border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
                    <FaDiscord className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded border border-black shadow-[1px_1px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">Discord</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
