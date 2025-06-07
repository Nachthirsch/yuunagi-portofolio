import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import { useState, useCallback } from "react";
import { projects } from "../data/projectsData";

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">PROJECTS</h2>
          <p className="text-neutral-300 text-base sm:text-lg">Featured work and side projects</p>
        </motion.div>

        {/* Content area - More compact */}
        <div className="h-[calc(100vh-300px)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Projects Column */}
            <div className="flex flex-col h-full lg:col-span-2">
              <h3 className="text-base font-medium text-neutral-200 mb-4 border-b border-neutral-700 pb-2 flex-shrink-0">All Projects</h3>
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto h-full pr-2 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
                  {projects.map((project, index) => (
                    <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} viewport={{ once: true }} className="group cursor-pointer py-2 px-3 rounded-lg hover:bg-neutral-800/20 transition-all duration-300" onClick={() => handleProjectClick(project)}>
                      {/* Compact View */}
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-col gap-1">
                          <h4 className="text-white font-medium text-sm group-hover:text-neutral-100 transition-colors line-clamp-2">{project.title}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-300 text-xs">{project.type}</span>
                            <span className={`px-1.5 py-0.5 text-xs rounded ${project.status === "Completed" ? "bg-green-800/30 text-green-400" : "bg-yellow-800/30 text-yellow-400"}`}>{project.status}</span>
                          </div>
                        </div>
                        <span className="text-neutral-400 text-xs font-mono">{project.date}</span>
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
        {selectedProject && isModalOpen && (
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
              className="relative bg-neutral-800/95 backdrop-blur-sm border border-neutral-600 rounded-lg p-6 max-w-lg w-full mx-4 shadow-xl"
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
                <h4 className="text-white font-medium text-lg mb-2">{selectedProject.title}</h4>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-neutral-200 text-sm">{selectedProject.type}</span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.3,
                      ease: "backOut",
                    }}
                    className={`px-2 py-1 text-xs rounded ${selectedProject.status === "Completed" ? "bg-green-800/30 text-green-400" : "bg-yellow-800/30 text-yellow-400"}`}
                  >
                    {selectedProject.status}
                  </motion.span>
                </div>
                <span className="text-neutral-400 text-sm font-mono">{selectedProject.date}</span>
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
                className="border-t border-neutral-700 pt-4 space-y-4"
              >
                {/* Description */}
                <div>
                  <p className="text-neutral-300 text-sm leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h5 className="text-neutral-200 text-sm font-medium mb-2">Tech Stack</h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.tech.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.3 + idx * 0.05,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        className="px-2 py-1 text-xs bg-neutral-700/50 text-neutral-400 rounded"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-2">
                  {selectedProject.github && (
                    <motion.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors text-sm"
                    >
                      <Github size={16} />
                      Source Code
                    </motion.a>
                  )}
                  {selectedProject.website && (
                    <motion.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.5,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      href={selectedProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </motion.div>

              {/* Close hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.6,
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

export default ProjectSection;
