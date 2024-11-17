import backgroundImage from "../../assets/header_img.jpg";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaSoundcloud } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useState, useEffect } from "react";

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const iframe = document.querySelector("#soundcloud-player");
    const widget = window.SC.Widget(iframe);

    widget.bind(window.SC.Widget.Events.PLAY, () => {
      setIsPlaying(true);
    });

    widget.bind(window.SC.Widget.Events.PAUSE, () => {
      setIsPlaying(false);
    });
  }, []);

  const togglePlay = () => {
    const iframe = document.querySelector("#soundcloud-player");
    const widget = window.SC.Widget(iframe);
    widget.toggle();
  };

  return (
    <header className="relative h-[100vh] sm:h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-85">
        {/* Main content container with adjusted padding */}
        <div className="h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 mt-16 sm:mt-0">
          <div className="my-3 sm:my-5 tracking-widest">
            <TypeAnimation
              sequence={["Hello there!", 1000, "How are you?", 1000, "Welcome to my world!"]}
              wrapper="h1"
              cursor={true}
              style={{
                fontSize: "clamp(1.25rem, 5vw, 2.25rem)",
                color: "rgb(212 212 212)",
              }}
            />
          </div>
          <motion.div className="w-16 h-0.5 bg-neutral-300" initial={{ width: 0 }} animate={{ width: ["100%", "80%", "60%"] }} transition={{ duration: 10, ease: "easeInOut" }} />
          <div className="max-w-3xl">
            <p className="text-neutral-300 tracking-wider mt-4 mb-4 text-sm sm:text-base sm:tracking-wider">
              I would love to introduce myself now! My name is{" "}
              <motion.span className="relative inline-block">
                <span className="text-white tracking-widest font-medium">Handra Putratama Tanjung</span>
                <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-300" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5, ease: "easeInOut" }} style={{ originX: 0 }} />
              </motion.span>
              .
              <br className="hidden sm:block" />
              <span className="block mt-2 sm:mt-0 sm:inline">
                I&apos;m a final-year Student majoring in Information Technology, having an interest in Web Development, photography, music and art.
              </span>
            </p>
          </div>
          <div className="flex space-x-4 sm:space-x-6 mt-3">
            <a href="mailto:handraputratama@gmail.com" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-red-600 transition-colors duration-300">
              <AiOutlineMail size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="https://www.instagram.com/nachthirsch/" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-pink-600 transition-colors duration-300">
              <FaInstagram size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="https://github.com/Nachthirsch" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-black transition-colors duration-300">
              <FaGithub size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="https://www.linkedin.com/in/handra-putratama-tanjung/" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-blue-600 transition-colors duration-300">
              <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="https://soundcloud.com/nachthirsch" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-red-600 transition-colors duration-300">
              <FaSoundcloud size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>

          {/* Audio Player */}
          <div className="absolute bottom-4 right-4 pr-7 flex flex-col items-end">
            <p className="text-neutral-400 text-sm mb-2 italic">Play my song while knowing more about me !</p>
            <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg p-3 border border-neutral-700/30">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="p-2 rounded-full bg-neutral-700/50 hover:bg-neutral-600/50 border border-neutral-600/30 transition-all group">
                  {isPlaying ? (
                    <svg className="w-5 h-5 text-neutral-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-neutral-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-300 font-medium">i see you in every word i speak</span>
                  <span className="text-xs text-neutral-400">MoonLiar</span>
                </div>
              </div>
              <iframe id="soundcloud-player" width="0" height="0" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1666557249&color=%23868686&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false" className="hidden" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
