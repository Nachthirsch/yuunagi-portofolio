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
import lastSongs from "../../assets/LastSongs.png";
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
      title: "Last Songs",
      description: "Last Songs is a modern web application that allows you to visualize and share your music listening history from Last.fm. Create beautiful, customizable charts showing your top artists, albums, tracks, and music tags across different time periods.",
      date: "Apr 2025",
      tech: ["Vue", "TailwindCSS", "Pinia", "htmltoimage", "Vite", "Last.fm API", "Spotify API"],
      github: null,
      website: "https://lastsongs.netlify.app/",
      type: "Web App",
      image: lastSongs,
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
    <section className="min-h-screen bg-gray-50 font-light overflow-hidden py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Featured Project Section - Editorial Style */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-32">
          <div className="flex items-baseline gap-6 mb-16">
            <Code2 className="text-gray-400 text-lg mt-1 flex-shrink-0" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 tracking-wide">Featured Project</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent mb-16" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative overflow-hidden aspect-video group">
              <img src={featuredProject.image} alt={featuredProject.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-xs font-medium backdrop-blur-sm ${featuredProject.status === "Completed" ? "bg-green-100/80 text-green-800" : "bg-yellow-100/80 text-yellow-800"}`}>{featuredProject.status}</span>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4 leading-tight">{featuredProject.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{featuredProject.longDescription || featuredProject.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {featuredProject.tech.map((tech, i) => (
                  <span key={i} className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {tech}
                    {i < featuredProject.tech.length - 1 && <span className="ml-3 text-gray-300">•</span>}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-8">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={16} />
                  {featuredProject.date}
                </div>

                <div className="flex gap-6">
                  {featuredProject.github && (
                    <a
                      href={featuredProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium
                        text-gray-700 hover:text-gray-900 transition-colors duration-200"
                    >
                      <Github size={18} />
                      Source
                    </a>
                  )}
                  {featuredProject.website && (
                    <a
                      href={featuredProject.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium
                        text-gray-900 hover:text-black transition-colors duration-200"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Projects Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-20">
          <div className="flex items-baseline gap-6 mb-8">
            <LayoutGrid className="text-gray-400 text-lg mt-1 flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-wide">All Projects</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent" />
        </motion.div>

        {/* Controls - Clean Style */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-16">
          <div className="flex flex-wrap gap-6">
            <div className="hidden md:flex gap-8">
              <button onClick={() => setViewMode("carousel")} className={`text-sm font-medium transition-colors duration-200 ${viewMode === "carousel" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
                Carousel View
              </button>
              <button onClick={() => setViewMode("grid")} className={`text-sm font-medium transition-colors duration-200 ${viewMode === "grid" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}>
                Grid View
              </button>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent text-gray-700 text-sm font-medium
                focus:outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Development">In Development</option>
            </select>

            <select
              value={filterTech}
              onChange={(e) => setFilterTech(e.target.value)}
              className="bg-transparent text-gray-700 text-sm font-medium
                focus:outline-none cursor-pointer"
            >
              <option value="all">All Technologies</option>
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
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 flex flex-col order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div key={selectedProject} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex-1 flex flex-col space-y-8">
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center gap-2 text-sm text-gray-500">
                        <MonitorSmartphone size={14} />
                        {projects[selectedProject].type}
                      </span>
                      <span className={`text-sm font-medium ${projects[selectedProject].status === "Completed" ? "text-green-700" : "text-yellow-700"}`}>{projects[selectedProject].status}</span>
                    </div>

                    <div>
                      <h2 className="text-3xl font-light text-gray-900 mb-4 leading-tight">{projects[selectedProject].title}</h2>
                      <p className="text-gray-600 leading-relaxed text-lg">{projects[selectedProject].description}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {projects[selectedProject].tech.map((tech, i) => (
                        <span key={i} className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {tech}
                          {i < projects[selectedProject].tech.length - 1 && <span className="ml-3 text-gray-300">•</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar size={16} />
                      {projects[selectedProject].date}
                    </div>

                    <div className="flex gap-6">
                      {projects[selectedProject].github && (
                        <a
                          href={projects[selectedProject].github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium
                            text-gray-700 hover:text-gray-900 transition-colors duration-200"
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
                          className="inline-flex items-center gap-2 text-sm font-medium
                            text-gray-900 hover:text-black transition-colors duration-200"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:w-[450px] relative">
              <motion.div className="h-[500px] relative" style={{ touchAction: "none" }}>
                <motion.div className="absolute inset-0 flex items-center justify-center" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={handleDragEnd} whileDrag={{ scale: 1.02 }} style={{ cursor: "grab" }} whileTap={{ cursor: "grabbing" }}>
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-[320px]"
                      animate={{
                        ...calculateCardStyle(index, selectedProject),
                        filter: selectedProject === index ? "none" : "grayscale(50%)",
                      }}
                      whileHover={{
                        scale: selectedProject === index ? 1.02 : 0.92,
                        filter: "none",
                        transition: { duration: 0.2 },
                      }}
                      onClick={() => setSelectedProject(index)}
                      style={{ transformOrigin: "center" }}
                    >
                      <div className="overflow-hidden transition-all duration-300">
                        <div className="h-48 relative">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-lg font-medium text-white truncate mb-2">{project.title}</h3>
                            <span className={`text-xs px-2 py-1 backdrop-blur-sm font-medium ${project.status === "Completed" ? "bg-green-100/80 text-green-800" : "bg-yellow-100/80 text-yellow-800"}`}>{project.status}</span>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center group hover:bg-gray-100/50 
                  transition-colors duration-300 p-6 -m-6 rounded-sm"
              >
                <div className="md:col-span-1 relative overflow-hidden aspect-video">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs px-2 py-1 backdrop-blur-sm font-medium ${project.status === "Completed" ? "bg-green-100/80 text-green-800" : "bg-yellow-100/80 text-yellow-800"}`}>{project.status}</span>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {tech}
                        {i < Math.min(project.tech.length, 4) - 1 && <span className="ml-3 text-gray-300">•</span>}
                      </span>
                    ))}
                    {project.tech.length > 4 && <span className="text-xs font-medium text-gray-400">+{project.tech.length - 4} more</span>}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-gray-400">{project.date}</span>

                    <div className="flex items-center gap-6">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 transition-colors duration-200" title="Source Code">
                          <Github size={18} />
                        </a>
                      )}
                      {project.website && (
                        <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors duration-200" title="Live Demo">
                          <ExternalLink size={18} />
                        </a>
                      )}
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
