import { motion, AnimatePresence } from "framer-motion";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

export const SectionCard = ({ items, activeIndex, setActiveIndex }) => {
  return (
    <div className="relative h-[220px] group">
      <AnimatePresence mode="wait">
        <motion.div key={activeIndex} initial={{ opacity: 0, x: 50, rotateY: 15 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -50, rotateY: -15 }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} className="h-full rounded-xl overflow-hidden relative bg-gradient-to-br from-neutral-800/80 via-neutral-800/60 to-neutral-900/80 backdrop-blur-md border border-neutral-700/30 hover:scale-[1.02] transition-transform duration-300 ease-out shadow-lg hover:shadow-xl">
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/40 via-neutral-800/20 to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-bl from-neutral-600/10 to-transparent opacity-50" />

          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-base font-semibold text-neutral-200 tracking-wide">
                  {items[activeIndex].title}
                </motion.h3>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-700/50 text-neutral-300 hover:bg-neutral-600/50 transition-colors">{items[activeIndex].value}</span>
                </motion.div>
              </div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-neutral-400 font-medium">
                {activeIndex + 1}/{items.length}
              </motion.span>
            </div>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-sm text-neutral-300 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all duration-300">
              {items[activeIndex].description}
            </motion.p>

            {/* Enhanced progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800/50">
              <motion.div initial={{ width: 0 }} animate={{ width: `${((activeIndex + 1) / items.length) * 100}%` }} transition={{ duration: 0.4, ease: "easeOut" }} className="h-full bg-gradient-to-r from-neutral-400 via-neutral-300 to-neutral-400" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced navigation controls */}
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={() => setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full shadow-lg transition-all duration-300 border border-neutral-700/50 hover:scale-110 hover:shadow-xl active:scale-95 group">
          <IoChevronForwardOutline className="text-neutral-300 text-lg transition-transform" />
        </button>
      </div>

      <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={() => setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full shadow-lg transition-all duration-300 border border-neutral-700/50 hover:scale-110 hover:shadow-xl active:scale-95 group">
          <IoChevronBackOutline className="text-neutral-300 text-lg transition-transform" />
        </button>
      </div>
    </div>
  );
};
