import { motion, AnimatePresence } from "framer-motion";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

export const SectionCard = ({ items, activeIndex, setActiveIndex }) => {
  return (
    <div className="relative h-[220px] group">
      <AnimatePresence mode="wait">
        <motion.div key={activeIndex} initial={{ opacity: 0, x: 50, rotateY: 15 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -50, rotateY: -15 }} transition={{ duration: 0.5, ease: "easeOut" }} className="h-full rounded-xl overflow-hidden relative bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm border border-neutral-700/30">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900/20 to-transparent" />

          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-neutral-200 tracking-wide">{items[activeIndex].title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-neutral-700/50 text-neutral-300">{items[activeIndex].value}</span>
                </div>
              </div>
              <span className="text-sm text-neutral-400">
                {activeIndex + 1}/{items.length}
              </span>
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-sm text-neutral-300 leading-relaxed line-clamp-4">
              {items[activeIndex].description}
            </motion.p>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800">
              <motion.div initial={{ width: 0 }} animate={{ width: `${((activeIndex + 1) / items.length) * 100}%` }} transition={{ duration: 0.3 }} className="h-full bg-gradient-to-r from-neutral-400 to-neutral-300" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full shadow-lg transition-colors border border-neutral-700/50 group">
          <IoChevronForwardOutline className="text-neutral-300 text-lg group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))} className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full shadow-lg transition-colors border border-neutral-700/50 group">
          <IoChevronBackOutline className="text-neutral-300 text-lg group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};
