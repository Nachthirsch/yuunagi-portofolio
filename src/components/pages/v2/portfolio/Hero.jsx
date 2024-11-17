import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaInstagram, FaGithub, FaLinkedin, FaSoundcloud } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { ArrowDown, Download } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedButton from "./DownloadResume";
import InteractiveAnimationHero from './InteractiveAnimationHero';

const ScrambleText = ({ phrases }) => {
    const shuffle = (word) => {
      return word
        .split("")
        .sort(() => 0.5 - Math.random())
        .join("");
    };
  
    const generateTextArray = (text) => {
      let textArray = [];
      // Variations with change in size
      for (let i = text.length; i >= 0; i--) {
        let tmp = shuffle(text);
        tmp = tmp.slice(0, text.length - i);
        textArray.push(tmp);
      }
      // Variations without change in size
      for (let i = 0; i < 6; i++) {
        textArray.push(shuffle(text));
      }
      // Final text
      textArray.push(text);
      return textArray;
    };
  
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [textArray, setTextArray] = useState([]);
    const [activeText, setActiveText] = useState(0);
    const [play, setPlay] = useState(true);
  
    // Generate new text array when phrase changes
    useEffect(() => {
      setTextArray(generateTextArray(phrases[currentPhraseIndex]));
      setActiveText(0);
      setPlay(true);
    }, [currentPhraseIndex]);
  
    // Handle animation
    useEffect(() => {
      let interval = null;
      
      if (play && activeText < textArray.length - 1) {
        interval = setInterval(() => {
          setActiveText(prev => prev + 1);
        }, 50);
      } else if (play && activeText === textArray.length - 1) {
        // When current animation completes
        setTimeout(() => {
          setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
        }, 2000);
      }
  
      return () => {
        clearInterval(interval);
      };
    }, [play, activeText, textArray.length]);
  
    return (
      <span>{textArray[activeText] || phrases[currentPhraseIndex]}</span>
    );
  };

const Hero = () => {
    const phrases = [
        "Handra Putratama",
    ];

  return (
    <InteractiveAnimationHero>
      <section className="min-h-screen relative flex items-center px-4 sm:px-8 md:px-16">
        {/* Remove the existing gradient backgrounds div and keep the rest of the content */}
        <div className="relative max-w-6xl mx-auto w-full pt-20">
          <div className="space-y-8">
            {/* Animated Welcome Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="tracking-wide"
            >
        <h2 className="text-2xl sm:text-3xl font-light text-neutral-600">
          Welcome to my portfolio
        </h2>
            </motion.div>

            {/* Name and Description */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-800">
                  <ScrambleText phrases={phrases} />
                  <span className="text-neutral-400">.</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-2xl"
              >
                <p className="text-neutral-600 text-lg sm:text-xl leading-relaxed">
                  A Final Year-Student majoring in{" "}
                  <span className="font-medium text-neutral-800">
                    Information Technology
                  </span>
                  , passionate about crafting digital experiences through web development, photography, and creative arts.
                </p>
              </motion.div>

              {/* Decorative Line */}
              <motion.div
                className="w-20 h-1 bg-neutral-200"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex space-x-6 sm:space-x-8"
            >
              {[
                { icon: AiOutlineMail, href: "mailto:handraputratama@gmail.com", hoverColor: "hover:text-red-500" },
                { icon: FaInstagram, href: "https://www.instagram.com/nachthirsch/", hoverColor: "hover:text-pink-500" },
                { icon: FaGithub, href: "https://github.com/Nachthirsch", hoverColor: "hover:text-neutral-900" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/handra-putratama-tanjung/", hoverColor: "hover:text-blue-500" },
                { icon: FaSoundcloud, href: "https://soundcloud.com/nachthirsch", hoverColor: "hover:text-orange-500" },
              ].map((social, index) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-neutral-400 transition-colors duration-300 ${social.hoverColor}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.8 + (index * 0.1) }
                  }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </motion.div>

            {/* Download Resume Button */}
            <AnimatedButton text="Download Resume" downloadPath="https://drive.google.com/file/d/1ZT1BibmojS748IxkBCzY0slEN72bIjya/view?usp=drive_link" />

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-neutral-400"
              >
                <ArrowDown size={20} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </InteractiveAnimationHero>
  );
};

export default Hero;