import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { X } from "lucide-react";

const Experience = () => {
  const [selectedExp, setSelectedExp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const experiences = [
    {
      title: "Frontend Developer",
      company: "PT Bee Telematic Solutions",
      date: "Sep 2024 - Dec 2024",
      label: "Internship",
      description: ["Developing a company portfolio website showcasing completed projects using technologies like React, Tailwind CSS, and any other technologies that I'm learning.", "Ensuring responsive design and optimal user experience across devices and browsers.", "Implementing animations and interactivity to enhance engagement on the website."],
    },
    {
      title: "Data and Map Processing Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Sep 2023 – Des 2023",
      label: "Contract",
      description: ["ST2023 Spatial Framework and Wilkerstat (Wilayah Kerja Statistik) Load Update", "Processed and analyzed 1000+ building points and 300+ SLS maps using QGIS to assess land cover for 200+ areas.", "Leveraged Python programming for task automation, enhancing efficiency and accuracy."],
    },
    {
      title: "Data Entry Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Jan 2023 – Mar 2023",
      label: "Contract",
      description: ["Accurately entered 1000+ data points monthly into the system.", "Ensuring data entry accuracy through verification against processed results.", "Conducted data validation, error correction, and reporting on input outcomes."],
    },
    {
      title: "Data and Map Processing Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Sep 2022 – Nov 2022",
      label: "Contract",
      description: ["Processed and analyzed ST2023 results, including over 1000 building points and 300+ SLS maps using QGIS to determine land cover for 200+ areas.", "Leveraged Python programming for task automation, improving efficiency and accuracy."],
    },
  ];

  const education = [
    {
      title: "ReactJS for Front-end Website Developer",
      company: "Hacktiv8 Indonesia",
      date: "Sep 2024 – Dec 2024",
      label: "Bootcamp",
      description: ["Completed intensive front-end development bootcamp focusing on React.js", "Built multiple real-world projects using React, Redux, and modern JavaScript", "Implemented responsive design principles and component-based architecture", "Collaborated with peers on group projects using Git and Agile methodologies"],
    },
  ];

  const handleExpClick = useCallback((exp) => {
    setSelectedExp(exp);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedExp(null);
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
        {/* Header with enhanced animations */}
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.15 } },
            exit: { transition: { staggerChildren: 0.08 } },
          }}
          className="mb-8"
        >
          <motion.h2
            variants={{
              initial: { x: -80, opacity: 0, filter: "blur(8px)" },
              animate: {
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 25,
                  duration: 0.7,
                },
              },
              exit: {
                x: 120,
                opacity: 0,
                filter: "blur(6px)",
                transition: { duration: 0.35, ease: [0.4, 0.0, 0.6, 1] },
              },
            }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight"
          >
            EXPERIENCE
          </motion.h2>
          <motion.p
            variants={{
              initial: { x: 80, opacity: 0, filter: "blur(8px)" },
              animate: {
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 25,
                  duration: 0.7,
                  delay: 0.1,
                },
              },
              exit: {
                x: -120,
                opacity: 0,
                filter: "blur(6px)",
                transition: { duration: 0.35, ease: [0.4, 0.0, 0.6, 1] },
              },
            }}
            className="text-neutral-300 text-base sm:text-lg"
          >
            Professional journey and educational background
          </motion.p>
        </motion.div>

        {/* Content area - More compact */}
        <div className="h-[calc(100vh-300px)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Work Experience Column */}
            <div className="flex flex-col h-full">
              <h3 className="text-base font-medium text-neutral-200 mb-4 border-b border-neutral-700 pb-2 flex-shrink-0">Work Experience</h3>
              <div className="flex-1 overflow-hidden">
                <div className="space-y-2 overflow-y-auto h-full pr-2 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
                  {experiences.map((exp, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group cursor-pointer py-2 px-3 rounded-lg hover:bg-neutral-800/20 transition-all duration-300" onClick={() => handleExpClick(exp)}>
                      {/* Compact View */}
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h4 className="text-white font-medium text-sm group-hover:text-neutral-100 transition-colors">{exp.title}</h4>
                          <span className="text-neutral-400 text-xs font-mono whitespace-nowrap">{exp.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-300 text-xs">{exp.company}</span>
                          <span className="px-1.5 py-0.5 text-xs text-neutral-400 bg-neutral-800 rounded">{exp.label}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education Column */}
            <div className="flex flex-col h-full">
              <h3 className="text-base font-medium text-neutral-200 mb-4 border-b border-neutral-700 pb-2 flex-shrink-0">Education & Training</h3>
              <div className="flex-1 overflow-hidden">
                <div className="space-y-2 overflow-y-auto h-full pr-2 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
                  {education.map((edu, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="group cursor-pointer py-2 px-3 rounded-lg hover:bg-neutral-800/20 transition-all duration-300" onClick={() => handleExpClick(edu)}>
                      {/* Compact View */}
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h4 className="text-white font-medium text-sm group-hover:text-neutral-100 transition-colors">{edu.title}</h4>
                          <span className="text-neutral-400 text-xs font-mono whitespace-nowrap">{edu.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-300 text-xs">{edu.company}</span>
                          <span className="px-1.5 py-0.5 text-xs text-neutral-400 bg-neutral-800 rounded">{edu.label}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click Modal with Backdrop */}
      <AnimatePresence mode="wait">
        {selectedExp && isModalOpen && (
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
                <h4 className="text-white font-medium text-lg mb-2">{selectedExp.title}</h4>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-neutral-200 text-sm">{selectedExp.company}</span>
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
                    {selectedExp.label}
                  </motion.span>
                </div>
                <span className="text-neutral-400 text-sm font-mono">{selectedExp.date}</span>
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
                <ul className="space-y-3 text-neutral-300 text-sm">
                  {selectedExp.description.map((item, idx) => (
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
                      {item}
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

export default Experience;
