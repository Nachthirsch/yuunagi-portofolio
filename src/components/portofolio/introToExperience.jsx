import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const IntroToExperience = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [animateWords, setAnimateWords] = useState([false, false, false, false, false]);

  // Generate random animation directions
  const getRandomDirection = () => (Math.random() > 0.5 ? 50 : -50);
  const titleDirection = getRandomDirection();
  const paragraphDirection = getRandomDirection();

  // Start animation sequence when component enters viewport
  const startAnimationSequence = () => {
    if (!hasEntered) {
      setHasEntered(true);

      // Show paragraph after 2 seconds
      setTimeout(() => {
        setShowParagraph(true);

        // Animate words one by one to left alignment
        const words = ["You're", "about", "to", "enter", "my"];
        words.forEach((_, index) => {
          setTimeout(() => {
            setAnimateWords((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }, index * 200); // 200ms delay between each word
        });
      }, 1000);
    }
  };

  // Split title into words for individual animation
  const titleWords = ["You're", "about", "to", "enter", "my"];
  const titleLines = [["You're", "about", "to", "enter"], ["my", "working"], ["journey"]];

  return (
    <section className="bg-gray-50 text-gray-900 min-h-screen flex flex-col justify-center items-center relative pt-36 px-4 sm:px-8">
      {/* Container for centered title and repositioned content */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Main Title - Initially centered, then individual words move to left */}
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
            alignItems: showParagraph ? "flex-start" : "left",
            transition: "align-items 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <motion.h1
            className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight text-gray-900"
            animate={{
              y: showParagraph ? -150 : 0,
            }}
            transition={{
              y: { duration: 2, ease: [0.25, 0.1, 0.25, 1] },
            }}
          >
            {/* Line 1: You're about to enter */}
            <div
              className="flex flex-wrap justify-center"
              style={{
                justifyContent: showParagraph ? "flex-start" : "left",
                transition: "justify-content 2s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              {titleLines[0].map((word, wordIndex) => (
                <motion.span
                  key={`line1-${wordIndex}`}
                  className="inline-block mr-4"
                  animate={{
                    x: showParagraph && animateWords[wordIndex] ? 0 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: showParagraph ? wordIndex * 0.1 : 0,
                  }}
                  style={{
                    textAlign: showParagraph && animateWords[wordIndex] ? "left" : "center",
                    transition: `text-align 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${wordIndex * 100}ms`,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Line 2: my working */}
            <div
              className="flex flex-wrap justify-center"
              style={{
                justifyContent: showParagraph ? "flex-start" : "left",
                transition: "justify-content 2s cubic-bezier(0.25, 0.1, 0.25, 1) 400ms",
              }}
            >
              {titleLines[1].map((word, wordIndex) => (
                <motion.span
                  key={`line2-${wordIndex}`}
                  className="inline-block mr-4"
                  animate={{
                    x: showParagraph && animateWords[wordIndex + 2] ? 0 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: showParagraph ? (wordIndex + 2) * 0.1 : 0,
                  }}
                  style={{
                    textAlign: showParagraph && animateWords[wordIndex + 2] ? "left" : "center",
                    transition: `text-align 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${(wordIndex + 2) * 100}ms`,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Line 3: journey */}
            <div
              className="flex flex-wrap justify-center"
              style={{
                justifyContent: showParagraph ? "flex-start" : "left",
                transition: "justify-content 2s cubic-bezier(0.25, 0.1, 0.25, 1) 600ms",
              }}
            >
              {titleLines[2].map((word, wordIndex) => (
                <motion.span
                  key={`line3-${wordIndex}`}
                  className="inline-block mr-4"
                  animate={{
                    x: showParagraph && animateWords[wordIndex + 4] ? 0 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: showParagraph ? (wordIndex + 4) * 0.1 : 0,
                  }}
                  style={{
                    textAlign: showParagraph && animateWords[wordIndex + 4] ? "left" : "center",
                    transition: `text-align 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${(wordIndex + 4) * 100}ms`,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.h1>
        </motion.div>

        {/* Paragraph - Only appears when component is entered and after delay */}
        <motion.div
          initial={{ opacity: 0, x: paragraphDirection, y: 50 }}
          animate={{
            opacity: hasEntered && showParagraph ? 1 : 0,
            x: hasEntered && showParagraph ? 0 : paragraphDirection,
            y: hasEntered && showParagraph ? -100 : 50,
          }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: showParagraph ? 0.8 : 0,
          }}
          className="w-full"
          style={{
            alignSelf: showParagraph ? "flex-start" : "center",
            transition: "align-self 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-600 max-w-3xl font-light">I might don't have a lot of experiences but I'm a hardworking person who's passionate about learning and growing. Each opportunity has taught me valuable lessons that shaped my approach to work and collaboration. I believe that dedication, curiosity, and the willingness to adapt are more important than just having years of experience.</p>
        </motion.div>
      </div>

      {/* Enhanced CSS for ultra-smooth word-by-word transitions */}
      <style jsx>{`
        .word-transition {
          transition: all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .line-transition {
          transition: justify-content 2s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
      `}</style>
    </section>
  );
};

export default IntroToExperience;
