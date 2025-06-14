import { motion } from "framer-motion";

export const TraitDescriptionsCard = ({ traitType, traitName, percentage, description, color }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="py-8">
      <div className="space-y-8">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-px h-20" style={{ backgroundColor: `#${color}` }} />

          <div className="flex-1">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500 uppercase tracking-wider">{traitType}</span>
                <span className="text-xs text-gray-500">{percentage}%</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{traitName}</h3>
            </div>
          </div>
        </div>

        <div className="pl-8">
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};
