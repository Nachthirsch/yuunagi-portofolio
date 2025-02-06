/* eslint-disable react/no-unknown-property */
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaSoundcloud } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import AsciiSphere from "./AsciiSphere";

const Header = () => {
  return (
    <>
      <header className="relative h-screen font-Hanken tracking-wider overflow-hidden backdrop-blur-sm">
        <AsciiSphere />
        <div className="relative h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-4 sm:mb-6">
            <TypeAnimation
              sequence={["Hello there!", 1000, "How are you?", 1000, "Welcome to my world!"]}
              wrapper="h1"
              cursor={true}
              style={{
                fontSize: "clamp(1.25rem, 5vw, 2.25rem)",
                color: "rgb(212 212 212)",
                fontWeight: "600",
              }}
            />
          </motion.div>

          <motion.div className="w-16 h-0.5 bg-neutral-300" initial={{ width: 0 }} animate={{ width: "5rem" }} transition={{ duration: 1.5, ease: "easeOut" }} />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="max-w-3xl mt-6">
            <p className="text-neutral-100  tracking-wider text-base sm:text-lg sm:leading-8">
              I would love to introduce myself now! My name is <span className="text-neutral-200 font-medium border-b border-neutral-400">Handra Putratama Tanjung</span>
              .
              <br className="hidden sm:block" />
              <span className="block mt-2 sm:mt-0 sm:inline">I&apos;m a final-year student majoring in Information Technology, having an interest in Web Development, Photography, Music and Art.</span>
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex space-x-8 mt-8 md:mt-12">
            <a href="mailto:handraputratama@gmail.com" className="social-icon-wrapper group" aria-label="Email">
              <AiOutlineMail className="social-icon text-red-400 group-hover:text-red-300" />
              <span className="icon-tooltip">Email</span>
            </a>

            <a href="https://www.instagram.com/nachthirsch/" className="social-icon-wrapper group" aria-label="Instagram">
              <FaInstagram className="social-icon text-pink-400 group-hover:text-pink-300" />
              <span className="icon-tooltip">Instagram</span>
            </a>

            <a href="https://github.com/Nachthirsch" className="social-icon-wrapper group" aria-label="GitHub">
              <FaGithub className="social-icon text-gray-300 group-hover:text-white" />
              <span className="icon-tooltip">GitHub</span>
            </a>

            <a href="https://www.linkedin.com/in/handra-putratama-tanjung/" className="social-icon-wrapper group" aria-label="LinkedIn">
              <FaLinkedin className="social-icon text-blue-400 group-hover:text-blue-300" />
              <span className="icon-tooltip">LinkedIn</span>
            </a>

            <a href="https://soundcloud.com/nachthirsch" className="social-icon-wrapper group" aria-label="SoundCloud">
              <FaSoundcloud className="social-icon text-orange-400 group-hover:text-orange-300" />
              <span className="icon-tooltip">SoundCloud</span>
            </a>
          </motion.div>

          <style jsx global>{`
            .social-icon-wrapper {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 8px;
              border-radius: 50%;
              transition: all 0.3s ease;
              background: rgba(255, 255, 255, 0.05);
            }

            .social-icon-wrapper:hover {
              transform: translateY(-4px);
              background: rgba(255, 255, 255, 0.1);
              box-shadow: 0 4px 12px rgba(233, 69, 96, 0.2);
            }

            .social-icon {
              width: 24px;
              height: 24px;
              transition: all 0.3s ease;
            }

            .icon-tooltip {
              position: absolute;
              bottom: -30px;
              font-size: 12px;
              background: rgba(233, 69, 96, 0.9);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              opacity: 0;
              transform: translateY(10px);
              transition: all 0.3s ease;
              pointer-events: none;
            }

            .social-icon-wrapper:hover .icon-tooltip {
              opacity: 1;
              transform: translateY(0);
            }
          `}</style>
        </div>

        <style jsx>{`
          .social-icon {
            @apply text-neutral-400 hover:text-neutral-200 transform 
                 hover:scale-110 transition-all duration-300;
          }
          .play-button {
            @apply p-2 rounded-full bg-neutral-700/50 hover:bg-neutral-600/50 
                 border border-neutral-600/30 transition-all;
          }
        `}</style>
      </header>
    </>
  );
};

export default Header;
