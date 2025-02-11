import { motion } from "framer-motion";

export const TraitDescriptionsCard = ({ traitType, traitName, percentage, description, color }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="bg-neutral-800/90 backdrop-blur-sm border border-neutral-700/30 rounded-lg p-4 mt-4">
    <div className="flex justify-between items-center mb-2">
      <span className="text-neutral-400 text-xs font-bold">{traitType}</span>
      <span className="text-neutral-300 text-sm font-medium">
        <span className="font-bold" style={{ color: `#${color}` }}>
          {percentage}%
        </span>{" "}
        <span className="font-bold">{traitName}</span>
      </span>
    </div>
    <p className="text-sm text-neutral-300 leading-relaxed">{description}</p>
  </motion.div>
);
