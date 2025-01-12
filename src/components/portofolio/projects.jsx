import { motion } from "framer-motion";
import { Code2, Github, MonitorSmartphone, Calendar } from "lucide-react";
import weather from "../../assets/weather-app.jpg";
import ngutang from "../../assets/ngutang-yuk.jpg";
import portofolio from "../../assets/portofolio-app.jpg";
import movie from "../../assets/movie-app.jpg";
import news from "../../assets/news-app.png";

const ProjectSection = () => {
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
  ];

  return (
    <section className="py-16 px-10 sm:px-8 md:px-16 bg-neutral-900 font-Hanken">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-200 tracking-wider flex items-center gap-3">
            <Code2 className="text-neutral-400" size={32} />
            Featured Projects
          </h2>
          <motion.div className="h-1 bg-gradient-to-r from-neutral-400 to-transparent mt-4 rounded-full" initial={{ width: 0 }} whileInView={{ width: "8rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group relative bg-neutral-800/20 rounded-xl overflow-hidden border border-neutral-700/30 hover:border-neutral-600/50 transition-colors h-full flex flex-col">
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Project Type & Status Badge */}
                <div className="flex gap-2 mb-4">
                  <span className="px-4 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-full border border-neutral-700/50 flex items-center gap-2">
                    <MonitorSmartphone size={12} />
                    {project.type}
                  </span>
                  <span className="px-4 py-1 bg-neutral-800/80 text-yellow-400 text-xs rounded-full border border-yellow-500/30">{project.status}</span>
                </div>

                {/* Title & Description */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-200 mb-3">{project.title}</h3>
                  <p className="text-sm text-neutral-400 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all">{project.description}</p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-neutral-700/30 text-neutral-400 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bottom Section - Fixed Position */}
                <div className="mt-auto pt-4 border-t border-neutral-700/30">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-neutral-500 text-sm mb-4">
                    <Calendar size={14} />
                    {project.date}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2
                        bg-neutral-800/80 hover:bg-neutral-700 
                        text-neutral-400 hover:text-neutral-200 
                        rounded-lg transition-all duration-300 text-sm
                        border border-neutral-700 hover:border-neutral-600
                        hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Github size={16} />
                      <span className="hidden sm:inline">Source Code</span>
                    </a>

                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2
                        bg-neutral-800/80 hover:bg-neutral-700 
                        text-neutral-400 hover:text-neutral-200 
                        rounded-lg transition-all duration-300 text-sm
                        border border-neutral-700 hover:border-neutral-600
                        hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <MonitorSmartphone size={16} />
                      <span className="hidden sm:inline">Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
