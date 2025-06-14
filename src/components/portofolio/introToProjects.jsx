import { motion } from "framer-motion";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

const IntroToProjects = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [showSecondTitle, setShowSecondTitle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);

  // Generate random animation directions
  const getRandomDirection = () => (Math.random() > 0.5 ? 50 : -50);
  const titleDirection = getRandomDirection();
  const paragraphDirection = getRandomDirection();

  // Start animation sequence when component enters viewport
  const startAnimationSequence = () => {
    if (!hasEntered) {
      setHasEntered(true);

      // Show second title after first typewriter completes (approximately 6 seconds)
      setTimeout(() => {
        setShowSecondTitle(true);

        // Show paragraph after second typewriter completes (approximately 4 more seconds)
        setTimeout(() => {
          setShowParagraph(true);
        }, 4500);
      }, 6000);
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
            alignItems: "center",
          }}
        >
          <motion.div
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-gray-900 pb-4 text-center min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]"
            animate={{
              y: showParagraph ? -60 : 0,
            }}
            transition={{
              y: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
            }}
          >
            {hasEntered && !showSecondTitle && (
              <TypeAnimation
                sequence={["If you see this,", 1000, "If you see this,\nthat means you read", 1000, "If you see this,\nthat means you read\nall of my experiences!", 1500, "If you see this,\nthat means you've read\nall of my experiences!\nI really appreciate it!", 2000]}
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

            {showSecondTitle && (
              <TypeAnimation
                sequence={["", 500, "Now, you're going", 1000, "Now, you're going\nto see my projects", 1000, "Now, you're going\nto see my projects\nthat I have developed", 1500]}
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
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 max-w-2xl font-light text-center">The projects that I have worked on are the results of assignments I received during my college learning period and personal hobbies. Most of my projects are websites with a focus on front-end development. Each project represents my journey in mastering modern web technologies, from basic HTML and CSS to advanced frameworks like React and Vue.js. These experiences have shaped my understanding of user experience design and responsive web development.</p>
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

export default IntroToProjects;
