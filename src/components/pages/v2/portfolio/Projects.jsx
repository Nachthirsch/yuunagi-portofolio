/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Github, MonitorSmartphone, ExternalLink } from "lucide-react";
// Header component yang konsisten untuk semua section
const SectionHeader = ({ subtitle, title, highlightedWord }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center mb-24">
      <span className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4 block">{subtitle}</span>
      <h2 className="text-5xl font-light text-neutral-800 mb-6">
        {title} <span className="font-semibold">{highlightedWord}</span>
      </h2>
      <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
    </motion.div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl overflow-hidden border border-neutral-200 p-6 
                   flex flex-col h-[360px]" // Fixed height container
    >
      {/* Top Section - Badges */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 
                        bg-blue-50/50 text-blue-600 text-xs font-medium rounded-full"
        >
          <MonitorSmartphone size={12} />
          Web App
        </span>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full
            ${project.status.toLowerCase() === "completed" ? "bg-green-50/50 text-green-600" : "bg-orange-50/50 text-orange-500"}`}
        >
          {project.status}
        </span>
      </div>

      {/* Middle Section - Title & Description */}
      <div className="mb-auto">
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">{project.title}</h3>
        <p className="text-neutral-600 text-[15px] leading-relaxed line-clamp-3">{project.description}</p>
      </div>

      {/* Bottom Section - Tech Stack & Buttons */}
      <div className="space-y-6">
        {/* Tech Stack - Fixed position */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-neutral-100/70 text-neutral-600 
                         text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons - Fixed position */}
        <div className="flex gap-2">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 
                       text-white rounded-lg text-sm font-medium"
          >
            <Github size={14} />
            Source
          </motion.a>
          <motion.a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 
                       text-white rounded-lg text-sm font-medium"
          >
            <ExternalLink size={14} />
            Preview
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectSection = () => {
  const projects = [
    {
      title: "Weather Dashboard",
      description: "Simple Real-time weather application with detailed forecasts. Built with React and OpenWeather API for live weather data. Features include current weather conditions, hourly forecasts, and location-based weather updates.",
      tech: ["React", "TailwindCSS", "OpenWeather API", "Express.js", "PostgreSQL"],
      github: "https://github.com/Nachthirsch/Weather-App",
      status: "In Development",
    },
    {
      title: "Ngutang Yuk!",
      description: "A simple web application for managing and tracking debts among friends.",
      tech: ["Code Igniter 3", "MySQL", "Bootstrap 4", "jQuery"],
      github: "https://github.com/Nachthirsch/Ngutang-Yuk",
      status: "In Development",
    },
    {
      title: "Portofolio Website",
      description: "A simple portofolio website to showcase my projects and skills.",
      date: "Sep 2024",
      tech: ["React", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/Nachthirsch/yuunagi-portfolio",
      website: "https://handraputratama.xyz",
      status: "Completed",
    },

    {
      title: "Movie App",
      description: "A simple movie application to search for movies and TV shows.",
      date: "Sep 2024",
      tech: ["React", "TailwindCSS", "OMDB API"],
      github: "https://github.com/Nachthirsch/movie-app",
      website: "https://assignmentmovieappmsib.netlify.app/",
      status: "Completed",
    },
    {
      title: "News App",
      description: "A simple news application to search for news articles.",
      date: "Nov 2024",
      tech: ["React", "TailwindCSS", "NY Times API", "Redux Toolkit"],
      github: "https://github.com/Nachthirsch/Capstone-Project_News-App",
      website: "capstone-project-news-app-alpha.vercel.app",
      status: "Completed",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 md:px-16 bg-neutral-50">
      <SectionHeader subtitle="Projects" title="Personal" highlightedWord="Projects" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
