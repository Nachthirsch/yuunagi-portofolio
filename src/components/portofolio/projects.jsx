import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Code2, Github, MonitorSmartphone, Calendar, LayoutGrid, Rows, Filter, Star, ExternalLink } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import weather from "../../assets/weather-app.jpg";
import ngutang from "../../assets/ngutang-yuk.jpg";
import portofolio from "../../assets/portofolio-app.jpg";
import movie from "../../assets/movie-app.jpg";
import news from "../../assets/news-app.png";
import bee from "../../assets/bee.png";
import imditor from "../../assets/imditor.png";
import yorushika from "../../assets/yorushika.gif";

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? "grid" : "carousel";
    }
    return "grid";
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTech, setFilterTech] = useState("all");
  const x = useMotionValue(0);
  const carouselRef = useRef(null);
  const projects = [
    {
      title: "Yorushika Fanzone",
      description: "Interactive fan website dedicated to Yorushika, the Japanese indie rock duo. Features artist information, discography, music analysis, and a community forum with rich media sharing capabilities.",
      date: "March 2025",
      tech: ["React 19", "Tailwind CSS", "Vite", "Supabase", "React Router", "Framer Motion", "Google AI", "Recaptcha"],
      github: "",
      website: "https://yorushikafanzone.netlify.app/",
      type: "Fan Website",
      image: yorushika,
      status: "Completed",
      featured: true,
      longDescription: "Yorushika Fanzone is an immersive and interactive platform dedicated to celebrating the artistry of Yorushika, the acclaimed Japanese indie rock duo. This passion project serves as a comprehensive portal for fans to explore the band's musical journey, artistic evolution, and lyrical depth.\n\nThe site features a meticulous discography section with album analyses, interactive lyrics with translations, and audio previews. Users can explore the artistic themes that define Yorushika's work through visual timelines and thematic explorations. The community forum encourages fans to share interpretations, artwork, and covers, creating a vibrant space for cultural exchange.",
    },
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
      featured: false,
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
    {
      title: "Image Editor",
      description: "A quick image editor Website to easily edit your pictures.",
      date: "Apr 2025",
      tech: ["Vue", "TailwindCSS", "Pinia", "Vue Router", "vue-advanced-cropper", "html2canvas", "Vite"],
      github: null,
      website: "https://imditor.netlify.app/",
      type: "Web App",
      image: imditor,
      status: "Completed",
    },
  ];

  // Find featured project
  const featuredProject = projects.find((project) => project.featured) || projects[0];

  // Get unique tech stacks for filter
  const allTechStacks = [...new Set(projects.flatMap((p) => p.tech))];

  const filteredProjects = projects.filter((project) => {
    const statusMatch = filterStatus === "all" || project.status === filterStatus;
    const techMatch = filterTech === "all" || project.tech.includes(filterTech);
    return statusMatch && techMatch;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("grid");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
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

  // Modified card style calculation for neobrutalism
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
        boxShadow: "8px 8px 0px rgba(0,0,0,0.8)",
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
        {/* Featured Project Section - Neobrutalism Style */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16 mt-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
            <div className="absolute -left-3 -top-3 w-16 h-16 bg-green-400 opacity-20 rotate-12 z-0"></div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-neutral-200 tracking-wider flex items-center gap-2 mb-8 sm:gap-3 relative z-10 text-shadow-neo">
              <div className="p-3 bg-neutral-800 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
                <Code2 className="text-neutral-300" />
              </div>
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-neutral-800 p-6 sm:p-8 rounded-none border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] rotate-1">
            <div className="relative overflow-hidden aspect-video group -rotate-1">
              <img src={featuredProject.image} alt={featuredProject.title} className="w-full h-full object-cover border-3 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.8)]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <span
                  className={`px-3 py-1 text-xs font-extrabold inline-block border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)]
                  ${featuredProject.status === "Completed" ? "bg-emerald-600 text-white" : "bg-amber-500 text-black"}`}
                >
                  {featuredProject.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col -rotate-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-100 mb-3 uppercase text-shadow-neo">{featuredProject.title}</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {featuredProject.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-neutral-700 text-neutral-300 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] transform rotate-1">
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-neutral-400 mb-6 leading-relaxed">{featuredProject.longDescription || featuredProject.description}</p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-400 font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] px-3 py-1 bg-neutral-800">
                  <Calendar size={16} />
                  {featuredProject.date}
                </div>

                <div className="flex gap-3">
                  {featuredProject.github && (
                    <a
                      href={featuredProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2
                        bg-neutral-700 text-neutral-300
                        border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                        hover:-translate-y-1 hover:shadow-[4px_6px_0px_rgba(0,0,0,0.8)]
                        transition-all duration-200
                        font-bold text-sm"
                    >
                      <Github size={16} />
                      Source
                    </a>
                  )}
                  {featuredProject.website && (
                    <a
                      href={featuredProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2
                        bg-neutral-700 text-neutral-300
                        border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                        hover:-translate-y-1 hover:shadow-[4px_6px_0px_rgba(0,0,0,0.8)]
                        transition-all duration-200
                        font-bold text-sm"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header with Controls - Neobrutalism Style */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-10 sm:mb-12">
          <div className="flex flex-wrap gap-4 sm:gap-5">
            <div className="hidden md:flex bg-neutral-800 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] p-1">
              <button onClick={() => setViewMode("carousel")} className={`p-2 font-bold ${viewMode === "carousel" ? "bg-neutral-700 text-white rotate-2" : "text-neutral-400"}`}>
                <Rows size={20} />
              </button>
              <button onClick={() => setViewMode("grid")} className={`p-2 font-bold ${viewMode === "grid" ? "bg-neutral-700 text-white rotate-2" : "text-neutral-400"}`}>
                <LayoutGrid size={20} />
              </button>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-neutral-800 text-neutral-200 px-3 py-2 text-sm font-bold
                border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                appearance-none cursor-pointer transform rotate-1"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Development">In Development</option>
            </select>

            <select
              value={filterTech}
              onChange={(e) => setFilterTech(e.target.value)}
              className="bg-neutral-800 text-neutral-200 px-3 py-2 text-sm font-bold
                border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                appearance-none cursor-pointer transform -rotate-1"
            >
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
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            <div className="flex-1 flex flex-col order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-neutral-800 rounded-none p-6 sm:p-8 
                    border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)]
                    transform rotate-1 flex-1 flex flex-col"
                >
                  <div className="flex flex-col h-full gap-4 sm:gap-8 -rotate-1">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-wrap gap-3 sm:gap-4">
                        <span
                          className="px-4 py-1.5 bg-neutral-700 text-neutral-300 text-sm font-bold
                            border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)]
                            flex items-center gap-2 transform rotate-1"
                        >
                          <MonitorSmartphone size={14} />
                          {projects[selectedProject].type}
                        </span>
                        <span
                          className={`px-4 py-1.5 text-sm font-bold
                            border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)]
                            transform -rotate-1
                            ${projects[selectedProject].status === "Completed" ? "bg-emerald-600 text-white" : "bg-amber-500 text-black"}`}
                        >
                          {projects[selectedProject].status}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-2xl font-extrabold text-neutral-100 mb-4 uppercase text-shadow-neo">{projects[selectedProject].title}</h2>
                        <p className="text-neutral-400 leading-relaxed">{projects[selectedProject].description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {projects[selectedProject].tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-neutral-700 text-neutral-300 
                              text-sm font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]
                              transform rotate-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t-4 border-black flex items-center justify-between">
                      <div className="flex items-center gap-2 text-neutral-400 font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] px-3 py-1 bg-neutral-800">
                        <Calendar size={16} />
                        {projects[selectedProject].date}
                      </div>

                      <div className="flex gap-3">
                        {projects[selectedProject].github && (
                          <a
                            href={projects[selectedProject].github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2
                              bg-neutral-700 text-neutral-300
                              border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                              hover:-translate-y-1 hover:shadow-[4px_6px_0px_rgba(0,0,0,0.8)]
                              transition-all duration-200
                              font-bold text-sm"
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
                            className="inline-flex items-center gap-2 px-4 py-2
                              bg-neutral-700 text-neutral-300
                              border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]
                              hover:-translate-y-1 hover:shadow-[4px_6px_0px_rgba(0,0,0,0.8)]
                              transition-all duration-200
                              font-bold text-sm"
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
                        bg-neutral-800 rounded-none overflow-hidden
                        border-4 border-black
                        ${selectedProject === index ? "shadow-[8px_8px_0px_rgba(0,0,0,0.8)]" : "shadow-[5px_5px_0px_rgba(0,0,0,0.6)]"}
                        transition-all duration-300
                        transform ${index % 2 === 0 ? "rotate-2" : "-rotate-2"}
                      `}
                      >
                        <div className="h-48 relative">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl font-extrabold text-neutral-200 truncate">{project.title}</h3>
                            <span
                              className={`text-sm px-2 py-0.5 font-bold
                              ${project.status === "Completed" ? "bg-emerald-600 text-white" : "bg-amber-500 text-black"}`}
                            >
                              {project.status}
                            </span>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-neutral-800 rounded-none overflow-hidden
                  border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)]
                  flex flex-col transform ${index % 2 === 0 ? "rotate-1" : "-rotate-1"}
                  hover:-translate-y-2 transition-all duration-200`}
              >
                <div className="h-40 relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-extrabold text-neutral-300 mb-2 uppercase text-shadow-small">{project.title}</h3>
                    <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-neutral-700 text-neutral-300 
                                 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && <span className="px-2 py-1 text-xs font-bold text-neutral-400 border-2 border-dashed border-neutral-700">+{project.tech.length - 3}</span>}
                  </div>

                  <div className="mt-auto pt-4 border-t-2 border-black">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]
                        ${project.status === "Completed" ? "bg-emerald-600 text-white" : "bg-amber-500 text-black"}`}
                      >
                        {project.status}
                      </span>

                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-700 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]
                              hover:-translate-y-1 hover:shadow-[2px_4px_0px_rgba(0,0,0,0.8)]
                              transition-all duration-200
                              flex items-center gap-1 text-neutral-300"
                          >
                            <Github size={16} />
                            <span className="text-xs font-bold">Source</span>
                          </a>
                        )}
                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-700 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]
                              hover:-translate-y-1 hover:shadow-[2px_4px_0px_rgba(0,0,0,0.8)]
                              transition-all duration-200
                              flex items-center gap-1 text-neutral-300"
                          >
                            <MonitorSmartphone size={16} />
                            <span className="text-xs font-bold">Demo</span>
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

      <style jsx global>{`
        .text-shadow-neo {
          text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.8);
        }
        .text-shadow-small {
          text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </section>
  );
};

export default ProjectSection;
