import { motion } from "framer-motion";
import { traitTypes, traitDescriptions } from "../../../data/mbtiData";

export const TraitProgress = ({ trait, opposite, percentage, index, color, onHover }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700/30 backdrop-blur-sm"
    onMouseEnter={() =>
      onHover({
        trait,
        percentage,
        type: traitTypes[trait],
        description: traitDescriptions[trait],
      })
    }
  >
    <div className="flex justify-between mb-2">
      <div>
        <span className="text-neutral-200 text-sm">{trait}</span>
        <span className="text-neutral-400 text-xs ml-2">{percentage}%</span>
      </div>
      <div>
        <span className="text-neutral-400 text-sm">{opposite}</span>
        <span className="text-neutral-400 text-xs ml-2">{100 - percentage}%</span>
      </div>
    </div>
    <div className="relative">
      <div className="relative h-2 bg-neutral-700/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
          className="absolute h-full rounded-full"
          style={{
            backgroundColor: `#${color}`,
            boxShadow: `0 0 10px #${color}80, 0 0 20px #${color}80, 0 0 30px #${color}0`,
            filter: "brightness(1.2)",
          }}
        />
      </div>

      {/* Circle indicator with tooltip at percentage position */}
      <motion.div initial={{ left: 0, opacity: 0 }} animate={{ left: `${percentage}%`, opacity: 1 }} transition={{ duration: 0.8 }} className="absolute -top-1.5 -translate-x-1/2 group">
        <div
          className="w-5 h-5 rounded-full border-2 border-neutral-700 bg-neutral-800 cursor-pointer
          hover:scale-110 transition-transform shadow-lg"
          style={{ borderColor: `#${color}` }}
        >
          {/* Tooltip */}
          <div
            className="absolute opacity-0 group-hover:opacity-100 bottom-8 left-1/2 -translate-x-1/2 w-64 p-3 
            bg-neutral-800 rounded-lg border border-neutral-700/50 shadow-xl transition-all duration-300
            translate-y-2 group-hover:translate-y-0 pointer-events-none z-50"
          >
            <div className="text-xs text-neutral-300 leading-relaxed text-center">{traitDescriptions[trait]}</div>
            {/* Tooltip arrow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 
              border-l-8 border-l-transparent
              border-r-8 border-r-transparent
              border-t-8 border-neutral-800"
            />
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);
