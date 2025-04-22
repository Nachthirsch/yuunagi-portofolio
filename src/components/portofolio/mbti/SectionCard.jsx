import { motion, AnimatePresence } from "framer-motion";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

export const SectionCard = ({ items, activeIndex, setActiveIndex }) => {
  return (
    <div className="relative h-[220px] group">
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeIndex} 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: -30 }} 
          transition={{ duration: 0.5 }} 
          className="h-full relative bg-neutral-800 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] 
                   hover:translate-y-[-4px] hover:shadow-[8px_12px_0px_rgba(0,0,0,0.8)] 
                   transition-all duration-300 ease-out overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-neutral-700 opacity-30 -z-0"
               style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-neutral-700 opacity-30 -z-0"
               style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }}></div>
               
          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-neutral-200 tracking-wide text-shadow-small">
                    {items[activeIndex].title}
                  </h3>
                  <div className="px-2 py-1 bg-neutral-700 text-neutral-300 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] rotate-2">
                    <span className="text-xs font-medium">{items[activeIndex].value}</span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-neutral-400 font-medium px-2 py-1 bg-neutral-700 border-2 border-black -rotate-1">
                {activeIndex + 1}/{items.length}
              </span>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all duration-300">
              {items[activeIndex].description}
            </p>

            {/* Progress bar in neobrutalism style */}
            <div className="absolute bottom-3 left-0 right-0 px-6">
              <div className="h-4 bg-neutral-700 border-2 border-black shadow-inner">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${((activeIndex + 1) / items.length) * 100}%` }} 
                  transition={{ duration: 0.4 }} 
                  className="h-full bg-neutral-600 border-r-2 border-black"
                  style={{ boxShadow: "inset 2px 2px 0px rgba(255,255,255,0.1)" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls in neobrutalism style */}
      <div className="absolute -right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))} 
          className="p-3 bg-neutral-800 rounded-none border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                   hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_rgba(0,0,0,0.8)] 
                   active:translate-y-[0px] active:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                   transition-all duration-200"
        >
          <IoChevronForwardOutline className="text-neutral-300 text-lg" />
        </button>
      </div>

      <div className="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))} 
          className="p-3 bg-neutral-800 rounded-none border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                   hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_rgba(0,0,0,0.8)] 
                   active:translate-y-[0px] active:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                   transition-all duration-200"
        >
          <IoChevronBackOutline className="text-neutral-300 text-lg" />
        </button>
      </div>
    </div>
  );
};
