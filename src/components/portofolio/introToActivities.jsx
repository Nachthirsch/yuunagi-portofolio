import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

const IntroToActivities = ({ onAnimationStart, onAnimationComplete }) => {
  const [hasEntered, setHasEntered] = useState(false);
  const [showSecondTitle, setShowSecondTitle] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [shouldLockScroll, setShouldLockScroll] = useState(false);
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);
  const [secondAnimationComplete, setSecondAnimationComplete] = useState(false);

  // Generate random animation directions
  const getRandomDirection = () => (Math.random() > 0.5 ? 50 : -50);
  const titleDirection = getRandomDirection();
  const paragraphDirection = getRandomDirection();

  // Track component visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setShouldLockScroll(true);
          if (!hasEntered) {
            setHasEntered(true);
            onAnimationStart?.();
          }
        }
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById("introToActivities");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }

      // Ensure scroll is unlocked when component unmounts
      if (shouldLockScroll) {
        onAnimationComplete?.();
      }
    };
  }, [hasEntered, onAnimationStart, onAnimationComplete, shouldLockScroll]);

  // Handle first animation completion
  useEffect(() => {
    if (firstAnimationComplete && hasEntered) {
      // First animation is complete, now show second title
      setShowSecondTitle(true);
    }
  }, [firstAnimationComplete, hasEntered]);

  // Handle second animation completion
  useEffect(() => {
    if (secondAnimationComplete && showSecondTitle) {
      // Second animation is complete, now show paragraph
      setShowParagraph(true);

      // Complete all animations after paragraph appears
      setTimeout(() => {
        setAnimationComplete(true);
        onAnimationComplete?.();
        setShouldLockScroll(false);
      }, 3000);
    }
  }, [secondAnimationComplete, showSecondTitle, onAnimationComplete]);

  return (
    <section className="bg-gray-50 text-gray-900 min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-8">
      {/* Overlay to prevent interaction during animation */}
      {!animationComplete && shouldLockScroll && <div className="fixed inset-0 z-40 bg-transparent pointer-events-auto" style={{ touchAction: "none" }} />}

      <div className="w-full max-w-3xl flex flex-col items-center">
        <motion.div
          className="w-full relative"
          initial={{ opacity: 0, x: titleDirection }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
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
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-gray-900 pb-4 text-center"
            animate={{
              y: showParagraph ? -60 : 0, // Move up significantly when paragraph appears (same as introToExperience)
            }}
            transition={{
              y: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
            }}
          >
            {hasEntered && !showSecondTitle && (
              <TypeAnimation
                sequence={[
                  "Hey!",
                  1000,
                  "Hey! You see me again!",
                  1000,
                  "Hey! You see me again!\nI truly appreciate",
                  1500,
                  "Hey! You see me again!\nI truly appreciate\nyour effort to make it this far!",
                  2000,
                  () => setFirstAnimationComplete(true), // Call when animation completes
                ]}
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
                sequence={[
                  "",
                  500,
                  "You're almost there!",
                  1000,
                  "You're almost there!\nJust two more sections",
                  1000,
                  "You're almost there!\nJust two more sections\nto complete the journey",
                  1500,
                  () => setSecondAnimationComplete(true), // Call when second animation completes
                ]}
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
          initial={{ opacity: 0, x: paragraphDirection, y: 10 }}
          animate={{
            opacity: hasEntered && showParagraph ? 1 : 0,
            x: hasEntered && showParagraph ? 0 : paragraphDirection,
            y: hasEntered && showParagraph ? -20 : 30,
          }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.1, 0.25, 1],
            delay: showParagraph ? 0.3 : 0,
          }}
          className="w-full flex justify-center"
        >
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 max-w-2xl font-light text-center">If you're reading this, you've made it to the final stretch with only two sections remaining! While these sections might not be essential to understanding my professional profile, they offer additional insights into who I am beyond my work. Should you choose to continue, you'll discover more about my personal interests and activities that have shaped my perspective. I appreciate your interest and dedication in exploring my portfolio this far!</p>
        </motion.div>

        {/* Simple decorative element - centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: hasEntered && showParagraph ? 1 : 0,
            scale: hasEntered && showParagraph ? 1 : 0,
            y: hasEntered && showParagraph ? -10 : 0,
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

export default IntroToActivities;
