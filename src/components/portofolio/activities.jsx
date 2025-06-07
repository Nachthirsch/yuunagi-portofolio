import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { X } from "lucide-react";

const ActivitiesSection = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activities = [
    {
      title: "Karang Taruna Mutiara Bogor City",
      role: "Leader",
      date: "Aug 2022 – Nov 2022",
      type: "Youth Organization",
      details: ["Led youth organization in organizing Indonesian Independence Day celebration", "Managed event planning and proposal drafting", "Coordinated community outreach initiatives"],
    },
    {
      title: "Training and Workshop Committee",
      role: "Member",
      date: "July 2024",
      type: "Community Service",
      details: ["Served as a committee member for digital marketing training", "Facilitated Canva workshops for KWT Pancasona", "Supported participant engagement and learning outcomes"],
    },
  ];

  const handleActivityClick = useCallback((activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedActivity(null);
    }, 200);
  }, []);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  return (
    <section className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-16 bg-neutral-900 font-Hanken tracking-wider overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">ACTIVITIES</h2>
          <p className="text-neutral-300 text-base sm:text-lg">Organizations and community involvement</p>
        </motion.div>

        {/* Content area */}
        <div className="h-[calc(100vh-300px)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Activities Column */}
            <div className="flex flex-col h-full lg:col-span-2">
              <h3 className="text-base font-medium text-neutral-200 mb-4 border-b border-neutral-700 pb-2 flex-shrink-0">All Activities</h3>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-full pr-2 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
                  {activities.map((activity, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group cursor-pointer py-4 px-4 rounded-lg hover:bg-neutral-800/20 transition-all duration-300" onClick={() => handleActivityClick(activity)}>
                      {/* Compact View */}
                      <div className="flex flex-col gap-3">
                        {/* Title and role */}
                        <div className="flex flex-col gap-2">
                          <h4 className="text-white font-medium text-sm group-hover:text-neutral-100 transition-colors line-clamp-2 leading-tight">{activity.title}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 text-xs">{activity.type}</span>
                            <span className="px-2 py-1 text-xs text-neutral-400 bg-neutral-800 rounded">{activity.role}</span>
                          </div>
                        </div>

                        {/* Date */}
                        <span className="text-neutral-400 text-xs font-mono">{activity.date}</span>

                        {/* Brief preview */}
                        <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">{activity.details[0]}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Detail Modal */}
      <AnimatePresence mode="wait">
        {selectedActivity && isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 50,
                rotateX: -15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -20,
                rotateX: 5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.8,
                duration: 0.5,
              }}
              className="relative bg-neutral-800/95 backdrop-blur-sm border border-neutral-600 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  delay: 0.1,
                  duration: 0.2,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-200 transition-colors duration-200"
              >
                <X size={20} />
              </motion.button>

              {/* Modal Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="mb-4 pr-8"
              >
                <h4 className="text-white font-medium text-lg mb-2 leading-tight">{selectedActivity.title}</h4>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-neutral-200 text-sm">{selectedActivity.type}</span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.3,
                      ease: "backOut",
                    }}
                    className="px-2 py-1 text-xs text-neutral-400 bg-neutral-700 rounded"
                  >
                    {selectedActivity.role}
                  </motion.span>
                </div>
                <span className="text-neutral-400 text-sm font-mono">{selectedActivity.date}</span>
              </motion.div>

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="border-t border-neutral-700 pt-4"
              >
                <h5 className="text-neutral-200 text-sm font-medium mb-3">Responsibilities & Achievements</h5>
                <ul className="space-y-3 text-neutral-300 text-sm">
                  {selectedActivity.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.3 + idx * 0.1,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="leading-relaxed pl-4 relative before:absolute before:content-['•'] before:text-neutral-500 before:left-0 before:top-1"
                    >
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Close hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="mt-4 pt-3 border-t border-neutral-700/50"
              >
                <p className="text-neutral-500 text-xs text-center">Click outside or X to close</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ActivitiesSection;
