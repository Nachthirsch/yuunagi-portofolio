import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Code2, Github, MonitorSmartphone, Calendar, LayoutGrid, Rows, Filter } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import weather from "../../assets/weather-app.jpg";
import ngutang from "../../assets/ngutang-yuk.jpg";
import portofolio from "../../assets/portofolio-app.jpg";
import movie from "../../assets/movie-app.jpg";
import news from "../../assets/news-app.png";
import bee from "../../assets/bee.png";

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [viewMode, setViewMode] = useState("carousel"); // 'carousel' or 'grid'
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTech, setFilterTech] = useState("all");
  const x = useMotionValue(0);
  const carouselRef = useRef(null);
  const projects = [
    {
      title: "Weather Dashboard",
      description: "Simple Real-time weather application with detailed forecasts. Built with React and OpenWeather API for live weather data. Features include current weather conditions, hourly forecasts, and location-based weather updates.",
      date: "Sep 2024",
      tech: ["React", "TailwindCSS", "OpenWeather API", "Express.js", "PostgreSQL"],
      github: "https://github.com/Nachthirsch/Weather-App",
      website: "",
      type: "Web App",
      image: weather,
      status: "In Development",
    },
    {
      title: "Ngutang Yuk!",
      description: "A simple web application for managing and tracking debts among friends.",
      date: "Mar 2024",
      tech: ["Code Igniter 3", "MySQL", "Bootstrap 4", "jQuery"],
      github: "https://github.com/Nachthirsch/Ngutang-Yuk",
      website: "",
      type: "Web App",
      image: ngutang,
      status: "In Development",
    },

    {
      title: "Portofolio Website",
      description: "A simple portofolio website to showcase my projects and skills.",
      date: "Sep 2024",
      tech: ["React", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/Nachthirsch/yuunagi-portfolio",
      website: "https://handraputratama.xyz",
      type: "Web App",
      image: portofolio,
      status: "Completed",
    },

    {
      title: "Movie App",
      description: "A simple movie application to search for movies and TV shows.",
      date: "Sep 2024",
      tech: ["React", "TailwindCSS", "OMDB API"],
      github: "https://github.com/Nachthirsch/movie-app",
      website: "https://assignmentmovieappmsib.netlify.app/",
      type: "Web App",
      image: movie,
      status: "Completed",
    },
    {
      title: "News App",
      description: "A simple news application to search for news articles.",
      date: "Nov 2024",
      tech: ["React", "TailwindCSS", "NY Times API", "Redux Toolkit"],
      github: "https://github.com/Nachthirsch/Capstone-Project_News-App",
      website: "https://capstone-project-news-app-alpha.vercel.app",
      type: "Web App",
      image: news,
      status: "Completed",
    },
    {
      title: "Bee Telematic Solutions Portofolio",
      description: "A Company's Portofolio Website to showcase their projects and services.",
      date: "Dec 2024",
      tech: ["React", "TailwindCSS", "Framer Motion"],
      github: null,
      website: "https://beetelematicsolutions.netlify.app/",
      type: "Web App",
      image: bee,
      status: "Completed",
    },
  ];

  // Get unique tech stacks for filter
  const allTechStacks = [...new Set(projects.flatMap((p) => p.tech))];

  const filteredProjects = projects.filter((project) => {
    const statusMatch = filterStatus === "all" || project.status === filterStatus;
    const techMatch = filterTech === "all" || project.tech.includes(filterTech);
    return statusMatch && techMatch;
  });

  useEffect(() => {
    // Add keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  // Navigation handlers
  const handleNext = () => {
    if (selectedProject < projects.length - 1) {
      setSelectedProject((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (selectedProject > 0) {
      setSelectedProject((prev) => prev - 1);
    }
  };

  // Enhanced drag handler
  const handleDragEnd = (event, info) => {
    const threshold = 50;
    const velocity = Math.abs(info.velocity.x);
    const direction = info.velocity.x < 0 ? 1 : -1;
    const shouldSwitch = velocity > 200 || Math.abs(info.offset.x) > threshold;

    if (shouldSwitch) {
      const nextIndex = selectedProject + direction;
      if (nextIndex >= 0 && nextIndex < projects.length) {
        setSelectedProject(nextIndex);
      }
    }
  };

  // Enhanced card style calculation
  const calculateCardStyle = (index, selectedIndex) => {
    const diff = index - selectedIndex;
    const distance = Math.abs(diff);

    if (diff === 0)
      return {
        scale: 1,
        opacity: 1,
        zIndex: 5,
        x: "0%",
        rotateZ: 0,
        y: 0,
      };

    if (diff < 0) {
      return {
        scale: 0.85 - distance * 0.05,
        opacity: 0.6 - distance * 0.1,
        zIndex: 4 - distance,
        x: `-${20 + distance * 8}%`,
        rotateZ: -8 * distance,
        y: distance * 15,
      };
    }

    return {
      scale: 0.85 - distance * 0.05,
      opacity: 0.6 - distance * 0.1,
      zIndex: 4 - distance,
      x: `${20 + distance * 8}%`,
      rotateZ: 8 * distance,
      y: distance * 15,
    };
  };

  return (
    <section className="min-h-screen bg-neutral-900 font-Hanken overflow-hidden py-4 sm:py-8">
      <div className="max-w-7xl mx-auto flex flex-col px-3 sm:px-8 md:px-16">
        {/* Header with Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-200 tracking-wider flex items-center gap-2 sm:gap-3">
              <Code2 className="text-neutral-400" />
              Featured Projects
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            {/* View Mode Toggle */}
            <div className="bg-neutral-800 rounded-lg p-1 flex">
              <button onClick={() => setViewMode("carousel")} className={`p-1.5 sm:p-2 rounded ${viewMode === "carousel" ? "bg-neutral-700 text-white" : "text-neutral-400"}`}>
                <Rows size={18} sm:size={20} />
              </button>
              <button onClick={() => setViewMode("grid")} className={`p-1.5 sm:p-2 rounded ${viewMode === "grid" ? "bg-neutral-700 text-white" : "text-neutral-400"}`}>
                <LayoutGrid size={18} sm:size={20} />
              </button>
            </div>

            {/* Filters */}
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-neutral-800 text-neutral-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm">
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Development">In Development</option>
            </select>

            <select value={filterTech} onChange={(e) => setFilterTech(e.target.value)} className="bg-neutral-800 text-neutral-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm">
              <option value="all">All Tech</option>
              {allTechStacks.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {viewMode === "carousel" ? (
          // Carousel view with responsive adjustments
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Left Column - Project Details */}
            <div className="flex-1 flex flex-col order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-neutral-800/50 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-neutral-700
                          shadow-lg flex-1 flex flex-col"
                >
                  <div className="flex flex-col h-full gap-4 sm:gap-8">
                    {/* Project Info */}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        <span
                          className="px-4 py-1.5 bg-neutral-800 text-neutral-300 text-sm rounded-full 
                                    border border-neutral-600 flex items-center gap-2"
                        >
                          <MonitorSmartphone size={14} />
                          {projects[selectedProject].type}
                        </span>
                        <span
                          className={`px-4 py-1.5 text-sm rounded-full border
                                    ${projects[selectedProject].status === "Completed" ? "bg-emerald-900/30 text-emerald-400 border-emerald-500/30" : "bg-amber-900/30 text-amber-400 border-amber-500/30"}`}
                        >
                          {projects[selectedProject].status}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-neutral-100 mb-4">{projects[selectedProject].title}</h2>
                        <p className="text-neutral-400 leading-relaxed">{projects[selectedProject].description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {projects[selectedProject].tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-neutral-700/50 text-neutral-300 
                                              text-sm rounded-full hover:bg-neutral-700 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-auto pt-6 border-t border-neutral-700 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-neutral-500">
                        <Calendar size={16} />
                        {projects[selectedProject].date}
                      </div>

                      <div className="flex gap-3">
                        {projects[selectedProject].github && (
                          <a
                            href={projects[selectedProject].github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-1.5
                              bg-neutral-700 hover:bg-neutral-600 
                              text-neutral-300 hover:text-neutral-200 
                              rounded-lg transition-all duration-300
                              text-sm"
                          >
                            <Github size={16} />
                            Source
                          </a>
                        )}
                        {projects[selectedProject].website && (
                          <a
                            href={projects[selectedProject].website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-1.5
                              bg-neutral-700 hover:bg-neutral-600
                              text-neutral-300 hover:text-neutral-200 
                              rounded-lg transition-all duration-300
                              text-sm"
                          >
                            <MonitorSmartphone size={16} />
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column - Carousel */}
            <div className="lg:w-[450px] relative">
              <motion.div className="h-[500px] relative perspective-1000" style={{ touchAction: "none" }}>
                <motion.div className="absolute inset-0 flex items-center justify-center" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={handleDragEnd} whileDrag={{ scale: 1.02 }} style={{ cursor: "grab" }} whileTap={{ cursor: "grabbing" }}>
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-[320px]"
                      animate={calculateCardStyle(index, selectedProject)}
                      whileHover={{
                        scale: selectedProject === index ? 1.05 : 0.9,
                        transition: { duration: 0.2 },
                      }}
                      onClick={() => setSelectedProject(index)}
                      style={{ transformOrigin: "center" }}
                    >
                      <div
                        className={`
                        bg-neutral-800 rounded-2xl overflow-hidden
                        shadow-[0_0_20px_rgba(0,0,0,0.3)]
                        border border-neutral-700
                        transition-all duration-300
                        ${selectedProject === index ? "ring-2 ring-neutral-500 shadow-xl" : ""}
                        hover:border-neutral-600
                      `}
                      >
                        <div className="h-48 relative">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover brightness-90" />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl font-semibold text-neutral-200 truncate">{project.title}</h3>
                            <span className="text-sm text-neutral-400">{project.status}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        ) : (
          // Grid View
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-800/20 rounded-lg border border-neutral-700/30 
                          hover:border-neutral-600/50 transition-all overflow-hidden
                          flex flex-col"
              >
                {/* Project Image */}
                <div className="h-40 relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Main Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-300 mb-2">{project.title}</h3>
                    <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{project.description}</p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-neutral-700/30 text-neutral-300 
                                 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && <span className="px-2 py-1 text-xs text-neutral-400">+{project.tech.length - 3}</span>}
                  </div>

                  {/* Bottom Section - Always at bottom */}
                  <div className="mt-auto pt-4 border-t border-neutral-700/30">
                    <div className="flex items-center justify-between">
                      {/* Left side - Status */}
                      <span
                        className={`px-3 py-1 text-xs rounded-full
                        ${project.status === "Completed" ? "bg-emerald-900/30 text-emerald-400" : "bg-amber-900/30 text-amber-400"}`}
                      >
                        {project.status}
                      </span>

                      {/* Right side - Action Buttons */}
                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-neutral-700 rounded-lg transition-colors
                                     flex items-center gap-1 text-neutral-400 hover:text-neutral-300"
                          >
                            <Github size={16} />
                            <span className="text-xs">Source</span>
                          </a>
                        )}
                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-neutral-700 rounded-lg transition-colors
                                     flex items-center gap-1 text-neutral-400 hover:text-neutral-300"
                          >
                            <MonitorSmartphone size={16} />
                            <span className="text-xs">Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
