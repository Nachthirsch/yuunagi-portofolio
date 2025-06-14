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
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group py-6 hover:bg-gray-100/30 transition-colors duration-300" onMouseEnter={handleMouseEnter} onMouseLeave={() => setIsHovered(false)}>
      {/* Trait headers */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-900 font-medium text-sm">{trait}</span>
        </div>
        <span className="text-gray-500 text-xs">{opposite}</span>
      </div>

      {/* Progress bar */}
      <div className="relative">
        {/* Progress bar container */}
        <div className="relative h-2 bg-gray-200 overflow-hidden">
          {/* Progress fill */}
          <motion.div initial={{ width: 0 }} whileInView={{ width: `${percentage}%` }} transition={{ duration: 0.8, delay: 0.2 }} className="absolute h-full" style={{ backgroundColor: `#${color}` }} />
        </div>

        {/* Percentage display */}
        <div className="flex justify-between mt-3">
          <span className="text-xs text-gray-600">{percentage}%</span>
          <span className="text-xs text-gray-600">{100 - percentage}%</span>
        </div>
      </div>
    </motion.div>
  );
};
