import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { X, ExternalLink } from "lucide-react";
import { traitColors, testData, traitDescriptions } from "../../data/mbtiData";

const MBTI = () => {
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const activeTest = showHistory ? testData.historical : testData.current;

  const handleTraitClick = useCallback((trait) => {
    setSelectedTrait(trait);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedTrait(null);
    }, 200);
  }, []);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  return (
    <section className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-16 bg-neutral-900 font-Hanken tracking-wider overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">PERSONALITY</h2>
          <p className="text-neutral-300 text-base sm:text-lg">MBTI profile and traits analysis</p>
        </motion.div>

        {/* Content area */}
        <div className="h-[calc(100vh-300px)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            {/* Main Profile - Left */}
            <div className="lg:col-span-1 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
                {/* Main Type */}
                <div className="text-center">
                  <div className="text-6xl sm:text-7xl font-black text-white mb-4 tracking-tighter">{activeTest.personality.type}</div>
                  <h3 className="text-xl sm:text-2xl font-light text-neutral-300 mb-2">{activeTest.personality.title || "Mediator"}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed max-w-xs mx-auto">{activeTest.personality.description?.slice(0, 80) + "..." || "Poetic, kind and altruistic people."}</p>
                </div>

                {/* Quick Info */}
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-xs uppercase tracking-widest">Role</span>
                    <span className="text-neutral-300 text-sm">{activeTest.role.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-xs uppercase tracking-widest">Strategy</span>
                    <span className="text-neutral-300 text-sm">{activeTest.strategy.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-xs uppercase tracking-widest">Test Date</span>
                    <span className="text-neutral-400 text-sm font-mono">{activeTest.date}</span>
                  </div>
                </div>

                {/* Toggle & Links */}
                <div className="pt-4 space-y-3">
                  <button onClick={() => setShowHistory(!showHistory)} className="w-full text-xs text-neutral-400 hover:text-neutral-200 transition-colors duration-300 border-b border-transparent hover:border-neutral-600 pb-1">
                    {showHistory ? "← Current Results" : "View History →"}
                  </button>

                  <a href="https://www.16personalities.com/profiles/b560acc3a3d53" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-xs text-neutral-400 hover:text-neutral-200 transition-colors duration-300">
                    <ExternalLink size={12} />
                    Full Profile
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Traits Grid - Right */}
            <div className="lg:col-span-2 flex flex-col justify-center mb-16">
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="space-y-6">
                {/* Section Title */}
                <div className="border-b border-neutral-700 pb-4">
                  <h3 className="text-base font-medium text-neutral-200">Personality Traits</h3>
                </div>

                {/* Traits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeTest.traits.map((trait, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group cursor-pointer py-3 px-4 rounded-lg hover:bg-neutral-800/20 transition-all duration-300" onClick={() => handleTraitClick(trait)}>
                      {/* Trait Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-6 rounded-sm" style={{ backgroundColor: `#${traitColors[trait.trait]}` }} />
                          <span className="text-white font-medium text-sm group-hover:text-neutral-100 transition-colors">{trait.trait}</span>
                        </div>
                        <span className="text-neutral-400 text-xs">{trait.percentage}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${trait.percentage}%` }} transition={{ duration: 0.8, delay: index * 0.1 }} className="absolute h-full rounded-full" style={{ backgroundColor: `#${traitColors[trait.trait]}` }} />
                      </div>

                      {/* Opposite Trait */}
                      <div className="flex justify-between mt-1">
                        <span className="text-neutral-500 text-xs">vs {trait.opposite}</span>
                        <span className="text-neutral-500 text-xs">{100 - trait.percentage}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Trait Detail Modal */}
      <AnimatePresence mode="wait">
        {selectedTrait && isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 50,
                rotateX: -15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -20,
                rotateX: 5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.8,
                duration: 0.5,
              }}
              className="relative bg-neutral-800/95 backdrop-blur-sm border border-neutral-600 rounded-lg p-6 max-w-lg w-full mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  delay: 0.1,
                  duration: 0.2,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
              >
                <X size={20} />
              </motion.button>

              {/* Modal Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="mb-4 pr-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-8 rounded-sm" style={{ backgroundColor: `#${traitColors[selectedTrait.trait]}` }} />
                  <h4 className="text-white font-medium text-lg">{selectedTrait.trait}</h4>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.3,
                      ease: "backOut",
                    }}
                    className="px-2 py-1 text-xs text-neutral-400 bg-neutral-700 rounded"
                  >
                    {selectedTrait.percentage}%
                  </motion.span>
                </div>
                <p className="text-neutral-400 text-sm">
                  vs {selectedTrait.opposite} ({100 - selectedTrait.percentage}%)
                </p>
              </motion.div>

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="border-t border-neutral-700 pt-4"
              >
                <p className="text-neutral-300 text-sm leading-relaxed">{traitDescriptions[selectedTrait.trait]}</p>

                {/* Progress visualization */}
                <div className="mt-4 pt-3 border-t border-neutral-700/50">
                  <div className="flex justify-between text-xs text-neutral-400 mb-2">
                    <span>{selectedTrait.trait}</span>
                    <span>{selectedTrait.opposite}</span>
                  </div>
                  <div className="relative h-3 bg-neutral-700 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${selectedTrait.percentage}%` }} transition={{ duration: 0.8, delay: 0.3 }} className="absolute h-full rounded-full" style={{ backgroundColor: `#${traitColors[selectedTrait.trait]}` }} />
                  </div>
                </div>
              </motion.div>

              {/* Close hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="mt-4 pt-3 border-t border-neutral-700/50"
              >
                <p className="text-neutral-500 text-xs text-center">Click outside or X to close</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MBTI;
