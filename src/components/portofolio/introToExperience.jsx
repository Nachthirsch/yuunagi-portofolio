import { motion } from "framer-motion";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

const IntroToExperience = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);

  // Generate random animation directions
  const getRandomDirection = () => (Math.random() > 0.5 ? 50 : -50);
  const titleDirection = getRandomDirection();
  const paragraphDirection = getRandomDirection();

  // Start animation sequence when component enters viewport
  const startAnimationSequence = () => {
    if (!hasEntered) {
      setHasEntered(true);

      // Show paragraph after typewriter completes (approximately 4 seconds)
      setTimeout(() => {
        setShowParagraph(true);
      }, 4500);
    }
  };

  return (
    <section className="bg-gray-50 text-gray-900 min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-8">
      {/* Container for centered title and repositioned content */}
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Main Title with Typewriter Effect - Always stays centered */}
        <motion.div
          className="w-full relative"
          initial={{ opacity: 0, x: titleDirection }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          onAnimationComplete={() => startAnimationSequence()}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 },
            x: { duration: 0.8, delay: 0.2 },
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Always keep centered
          }}
        >
          <motion.div
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-gray-900 pb-4 text-center"
            animate={{
              y: showParagraph ? -60 : 0, // Move up slightly when paragraph appears
            }}
            transition={{
              y: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
            }}
          >
            {hasEntered && (
              <TypeAnimation
                sequence={["You're about to enter", 1000, "You're about to enter\nmy working", 1000, "You're about to enter\nmy working\njourney", 1000]}
                wrapper="h1"
                speed={50}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                }}
                cursor={true}
                repeat={0}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Paragraph - Appears centered below the title */}
        <motion.div
          initial={{ opacity: 0, x: paragraphDirection, y: 50 }}
          animate={{
            opacity: hasEntered && showParagraph ? 1 : 0,
            x: hasEntered && showParagraph ? 0 : paragraphDirection,
            y: hasEntered && showParagraph ? -40 : 50,
          }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
            delay: showParagraph ? 0.3 : 0,
          }}
          className="w-full flex justify-center"
        >
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 max-w-2xl font-light text-center">I might don't have a lot of experiences but I'm a hardworking person who's passionate about learning and growing. Each opportunity has taught me valuable lessons that shaped my approach to work and collaboration. I believe that dedication, curiosity, and the willingness to adapt are more important than just having years of experience.</p>
        </motion.div>

        {/* Simple decorative element - centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: hasEntered && showParagraph ? 1 : 0,
            scale: hasEntered && showParagraph ? 1 : 0,
            y: hasEntered && showParagraph ? -20 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            delay: showParagraph ? 0.6 : 0,
          }}
          className="w-full flex justify-center mt-12"
        >
          <div className="w-20 h-px bg-gray-300" />
        </motion.div>
      </div>
    </section>
  );
};

export default IntroToExperience;
