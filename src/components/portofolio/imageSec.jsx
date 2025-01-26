/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import me from "../../assets/me_1.jpg";

const ImageSec = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section className="relative py-8 sm:py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 overflow-hidden">
      <Particles
        id="tsparticles-image"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 200,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8">
          {/* Description Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1 w-full lg:w-auto">
            <motion.h1
              className="text-2xl sm:text-3xl text-neutral-100 mb-4 sm:mb-6 leading-relaxed relative inline-block"
              initial={{ backgroundSize: "0 2px" }}
              whileInView={{ backgroundSize: "100% 2px" }}
              transition={{ duration: 0.7 }}
              style={{
                backgroundImage: "linear-gradient(currentColor, currentColor)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 100%",
                letterSpacing: ".1em",
              }}
            >
              A little bit more info about me!
            </motion.h1>
            <p className="text-base sm:text-lg text-neutral-100 font-medium mb-4 sm:mb-6 leading-relaxed">
              I love language exchange! I can hold daily conversations in <span className="text-white">English</span>, although I&apos;m still working on my grammar. I also know a little <span className="text-white">Japanese</span>, even if it&apos;s at a beginner level!
            </p>
            <p className="text-base sm:text-lg text-neutral-100 mb-4 sm:mb-6 leading-relaxed">I'm always exploring how I can use Al tools to make my projects smarter and more efficient. Whether it's automating boring tasks or improving user experiences, I'm eager to try new things and push boundaries. Creativity and tech-savviness keep me motivated and ready for the next challenge.</p>
          </motion.div>

          {/* Card Section */}
          <div className="flex flex-col items-center w-full lg:w-auto p-4 sm:p-6 lg:p-10">
            {/* Image Container with Effects */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative group w-full max-w-[280px] sm:max-w-xs">
              {/* Background Shape */}
              <motion.div
                className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-neutral-600 to-neutral-800 opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Main Image */}
              <div className="relative">
                <img src={me} alt="Profile" className="w-full h-auto aspect-[4/5] object-cover rounded-lg hover:grayscale-0 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* Name Tag */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="mt-4 sm:mt-6 text-center group">
              <p className="text-sm sm:text-base text-neutral-400 mt-1 pl-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">i see you in every poem i read</p>
              <p className="text-sm sm:text-base text-neutral-400 pl-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">i see you in every word i speak</p>
              <p className="text-sm sm:text-base text-neutral-400 pl-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 italic font-semibold">
                To you who always turns toward the sun, like a <span className="text-amber-200">sunflower</span>—.
              </p>
              /
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSec;
