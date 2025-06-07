import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import TableOfContents from "./TableOfContents";

const ScrollTransition = ({ sections }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let touchStartY = 0;
    let lastScrollTime = 0;
    const scrollDelay = 1000; // 1 second delay between transitions

    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();

      if (now - lastScrollTime < scrollDelay || isTransitioning) {
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      handleSectionChange(direction);
      lastScrollTime = now;
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const now = Date.now();

      if (now - lastScrollTime < scrollDelay || isTransitioning) {
        return;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > 50) {
        const direction = deltaY > 0 ? 1 : -1;
        handleSectionChange(direction);
        lastScrollTime = now;
      }
    };

    const handleSectionChange = (direction) => {
      setCurrentSection((prev) => {
        const newSection = prev + direction;
        if (newSection >= 0 && newSection < sections.length) {
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 600);
          return newSection;
        }
        return prev;
      });
    };

    const handleKeyDown = (e) => {
      const now = Date.now();

      if (now - lastScrollTime < scrollDelay || isTransitioning) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        handleSectionChange(1);
        lastScrollTime = now;
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        handleSectionChange(-1);
        lastScrollTime = now;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sections.length, isTransitioning]);

  const handleSectionChange = (sectionIndex) => {
    if (!isTransitioning && sectionIndex >= 0 && sectionIndex < sections.length) {
      setCurrentSection(sectionIndex);
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const contentVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <div className="relative h-screen overflow-hidden bg-neutral-900">
      {/* Fixed background with only film grain */}
      <div className="absolute inset-0 bg-neutral-900 film-grain" />

      {/* TableOfContents with current section state */}
      <TableOfContents currentSection={currentSection} onSectionChange={handleSectionChange} totalSections={sections.length} />

      {/* Content Container - only content transitions, not the background */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Render component with transparent background */}
            <div className="h-full w-full">{sections[currentSection].component}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Hint */}
      <div className="fixed bottom-6 left-6 z-30">
        <div className="flex items-center gap-2 text-neutral-500 text-xs">
          <span>Scroll to navigate</span>
          <div className="w-1 h-1 bg-neutral-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ScrollTransition;
