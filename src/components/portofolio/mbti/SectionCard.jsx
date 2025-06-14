import { motion, AnimatePresence } from "framer-motion";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

export const SectionCard = ({ items, activeIndex, setActiveIndex }) => {
  return (
    <div className="relative group">
      <AnimatePresence mode="wait">
        <motion.div key={activeIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="py-8 min-h-[200px] flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">{items[activeIndex].title}</h3>
                <div className="text-sm text-gray-600">{items[activeIndex].value}</div>
              </div>
            </div>
            <span className="text-xs text-gray-500">
              {activeIndex + 1}/{items.length}
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed flex-1 max-w-md">{items[activeIndex].description}</p>

          {/* Progress indicator */}
          <div className="mt-8">
            <div className="h-px bg-gray-200 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${((activeIndex + 1) / items.length) * 100}%` }} transition={{ duration: 0.4 }} className="h-full bg-gray-400" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={() => setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))} className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
          <IoChevronForwardOutline className="text-base" />
        </button>
      </div>

      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={() => setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))} className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
          <IoChevronBackOutline className="text-base" />
        </button>
      </div>
    </div>
  );
};
