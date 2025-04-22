import { motion } from "framer-motion";
import { traitTypes, traitDescriptions } from "../../../data/mbtiData";
import { useState } from "react";

export const TraitProgress = ({ trait, opposite, percentage, index, color, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover({
        trait,
        percentage,
        type: traitTypes[trait],
        description: traitDescriptions[trait],
      });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`bg-neutral-800 p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                 ${index % 2 === 0 ? "rotate-1" : "-rotate-1"} relative 
                 hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_rgba(0,0,0,0.8)]
                 transition-all duration-200`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Trait headers */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-6 bg-neutral-700`} 
               style={{ backgroundColor: `#${color}` }}></div>
          <span className="text-neutral-200 text-sm font-bold">{trait}</span>
        </div>
        <span className="text-neutral-400 text-sm">{opposite}</span>
      </div>
      
      {/* Progress bar */}
      <div className="relative">
        {/* Progress bar container */}
        <div className="relative h-6 bg-neutral-700 border-2 border-black overflow-hidden">
          {/* Progress fill */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
            className="absolute h-full"
            style={{
              backgroundColor: `#${color}`,
              boxShadow: "inset 1px 1px 0px rgba(255,255,255,0.1)"
            }}
          />
          
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center">
            <div className={`ml-2 text-xs font-bold ${percentage > 50 ? 'text-neutral-800' : 'text-neutral-300'}`}>
              {percentage}%
            </div>
            <div className={`ml-auto mr-2 text-xs font-bold ${percentage < 50 ? 'text-neutral-800' : 'text-neutral-300'}`}>
              {100 - percentage}%
            </div>
          </div>
        </div>

        {/* Position marker */}
        <motion.div 
          initial={{ left: 0 }}
          whileInView={{ left: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 h-6 w-0.5 bg-black"
          style={{ left: `${percentage}%` }}
        ></motion.div>
        
        {/* Minimal neobrutalism indicator */}
        <motion.div 
          initial={{ left: 0 }}
          whileInView={{ left: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className="absolute -bottom-2 -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        >
          <div 
            className="w-4 h-4 bg-neutral-800 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] rotate-45"
            style={{ borderBottomColor: `#${color}` }}
          ></div>
        </motion.div>
      </div>
    </motion.div>
  );
};
