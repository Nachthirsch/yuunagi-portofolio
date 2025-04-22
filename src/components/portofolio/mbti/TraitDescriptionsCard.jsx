import { motion } from "framer-motion";

export const TraitDescriptionsCard = ({ traitType, traitName, percentage, description, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="bg-neutral-800 p-5 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] -rotate-1 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-neutral-700 opacity-20 -z-0"
           style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>
      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-neutral-700 opacity-20 -z-0"
           style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }}></div>
      
      <div className="relative z-10 rotate-1">
        <div className="flex items-start gap-3 mb-3">
          <div className={`flex-shrink-0 w-2 h-12 bg-neutral-700 border-r-2 border-black`} 
               style={{ backgroundColor: `#${color}` }}></div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="bg-neutral-700 text-neutral-300 text-xs uppercase font-bold px-2 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] -rotate-1">
                {traitType}
              </span>
              <h3 className="text-lg font-extrabold text-neutral-200 uppercase text-shadow-small">
                {traitName}
              </h3>
              <span className="text-xs text-neutral-400 font-bold px-2 py-1 bg-neutral-700 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] rotate-1">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="pl-5 border-l-2 border-neutral-700">
          <div className="relative">
            <span className="absolute -left-4 -top-2 text-3xl text-neutral-700 opacity-40">"</span>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {description}
            </p>
            <span className="absolute -right-2 -bottom-2 text-3xl text-neutral-700 opacity-40">"</span>
          </div>
        </div>
        
        {/* Strength indicator bar - neobrutalism style */}
        <div className="mt-4 pt-3 border-t-2 border-neutral-700">
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>Strength</span>
            <span>{percentage}%</span>
          </div>
          <div className="h-3 w-full bg-neutral-700 border-2 border-black">
            <div 
              className="h-full border-r-2 border-black"
              style={{ 
                width: `${percentage}%`, 
                backgroundColor: `#${color}`, 
                boxShadow: "inset 1px 1px 0px rgba(255,255,255,0.1)"
              }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
