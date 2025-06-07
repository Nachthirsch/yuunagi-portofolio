import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollTransition = ({ sections }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const scrollAccumulatorRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  // Reduced sensitivity - require more scroll to trigger transition
  const SCROLL_THRESHOLD = 100; // Increased from default wheel delta
  const SCROLL_TIMEOUT = 150; // Time window to accumulate scroll
  const TRANSITION_DURATION = 800; // Animation duration

  // Track scroll direction for varied animations
  const [scrollDirection, setScrollDirection] = useState(1);

  const handleScroll = useCallback(
    (e) => {
      e.preventDefault();

      if (isTransitioning) return;

      const currentTime = Date.now();
      const delta = e.deltaY;

      // Reset accumulator if too much time has passed since last scroll
      if (currentTime - lastScrollTimeRef.current > SCROLL_TIMEOUT) {
        scrollAccumulatorRef.current = 0;
      }

      lastScrollTimeRef.current = currentTime;
      scrollAccumulatorRef.current += Math.abs(delta);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout to process accumulated scroll
      scrollTimeoutRef.current = setTimeout(() => {
        if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD) {
          const direction = delta > 0 ? 1 : -1;
          setScrollDirection(direction);

          setCurrentSection((prev) => {
            const newSection = prev + direction;
            if (newSection >= 0 && newSection < sections.length) {
              setIsTransitioning(true);

              // Reset transition state after animation completes
              setTimeout(() => {
                setIsTransitioning(false);
              }, TRANSITION_DURATION);

              return newSection;
            }
            return prev;
          });
        }

        // Reset accumulator
        scrollAccumulatorRef.current = 0;
      }, 50); // Small delay to batch scroll events
    },
    [isTransitioning, sections.length]
  );

  // Add wheel event listener
  useEffect(() => {
    const container = document.body;
    container.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTransitioning, sections.length]);

  // Animation variants for horizontal fade
  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
        duration: TRANSITION_DURATION / 1000,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        type: "tween",
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
        duration: TRANSITION_DURATION / 1000,
        staggerChildren: 0.05,
      },
    }),
  };

  return (
    <div className="relative h-screen overflow-hidden bg-neutral-900">
      {/* Page content with enhanced animations */}
      <AnimatePresence mode="wait" custom={scrollDirection}>
        <motion.div key={currentSection} custom={scrollDirection} variants={pageVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full">
          {/* Inject text animation context */}
          <div className="aesthetic-text-context">{sections[currentSection]?.component}</div>
        </motion.div>
      </AnimatePresence>

      {/* Section indicator dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col space-y-2">
        {sections.map((_, index) => (
          <button key={index} onClick={() => setCurrentSection(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSection ? "bg-white scale-125" : "bg-neutral-500 hover:bg-neutral-400"}`} aria-label={`Go to section ${index + 1}`} />
        ))}
      </div>

      {/* Mobile indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 lg:hidden">
        <div className="bg-neutral-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-neutral-600">
          <span className="text-neutral-300 text-sm font-mono">
            {currentSection + 1} / {sections.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScrollTransition;
