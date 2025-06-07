import { motion } from "framer-motion";
import { Github, ExternalLink, Filter, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projectsData";

const ProjectSection = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTech, setFilterTech] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  // Get unique tech stacks for filter
  const allTechStacks = [...new Set(projects.flatMap((p) => p.tech))];

  const filteredProjects = projects.filter((project) => {
    const statusMatch = filterStatus === "all" || project.status === filterStatus;
    const techMatch = filterTech === "all" || project.tech.includes(filterTech);
    return statusMatch && techMatch;
  });

  const handleProjectClick = (project) => {
    // Navigate to project detail page
    navigate(`/project/${project.id}`);
  };

  const toggleProjectDetails = (project, e) => {
    e.stopPropagation();
    setSelectedProject(selectedProject?.id === project.id ? null : project);
  };

  return (
    <section className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 bg-transparent font-Hanken tracking-wider overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">PROJECTS</h2>
          <p className="text-neutral-300 text-base sm:text-lg">Featured work and side projects</p>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-600">
          <Filter size={12} className="text-neutral-400" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-transparent text-neutral-200 text-sm border-none focus:outline-none cursor-pointer">
            <option value="all" className="bg-neutral-800">
              All Status
            </option>
            <option value="Completed" className="bg-neutral-800">
              Completed
            </option>
            <option value="In Development" className="bg-neutral-800">
              In Development
            </option>
          </select>
          <span className="text-neutral-500">|</span>
          <select value={filterTech} onChange={(e) => setFilterTech(e.target.value)} className="bg-transparent text-neutral-200 text-sm border-none focus:outline-none cursor-pointer">
            <option value="all" className="bg-neutral-800">
              All Tech
            </option>
            {allTechStacks.map((tech) => (
              <option key={tech} value={tech} className="bg-neutral-800">
                {tech}
              </option>
            ))}
          </select>
        </div>

        {/* Projects List Design - Match Experience Layout */}
        <div className="h-[calc(100vh-280px)] overflow-hidden">
          <div className="space-y-4 overflow-y-auto h-full pr-2 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
            {filteredProjects.map((project, index) => (
              <motion.div key={project.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group border-l-2 border-neutral-600 pl-4 hover:border-neutral-400 transition-colors duration-300">
                {/* Main Project Header */}
                <div className="cursor-pointer" onClick={() => handleProjectClick(project)}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-base group-hover:text-neutral-100 transition-colors duration-300">{project.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-neutral-200 text-sm">{project.type}</span>
                        <span className={`px-2 py-0.5 text-xs rounded border ${project.status === "Completed" ? "bg-neutral-600 text-neutral-300 border-neutral-600" : "bg-neutral-700 text-neutral-400 border-neutral-600"}`}>{project.status}</span>
                      </div>
                    </div>

                    {/* Right side - Date and Actions */}
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-300 text-xs whitespace-nowrap">{project.date}</span>

                      {/* Quick Action Icons */}
                      <div className="flex gap-1">
                        {project.github && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.github, "_blank");
                            }}
                            className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors"
                            title="Source Code"
                          >
                            <Github size={12} />
                          </button>
                        )}
                        {project.website && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.website, "_blank");
                            }}
                            className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink size={12} />
                          </button>
                        )}

                        {/* Preview Toggle */}
                        <button onClick={(e) => toggleProjectDetails(project, e)} className="p-1 text-neutral-500 hover:text-neutral-400 transition-colors" title="Quick Preview">
                          <Eye size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Description - Always visible, like experience */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-2">{project.description}</p>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-neutral-700/30 text-neutral-500 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && <span className="px-2 py-0.5 text-xs text-neutral-600">+{project.tech.length - 4}</span>}
                  </div>
                </div>

                {/* Expanded Details - Quick Preview */}
                {selectedProject?.id === project.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="mt-3 pt-3 border-t border-neutral-700/30">
                    {/* Full Tech Stack */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-neutral-700/40 text-neutral-400 rounded border border-neutral-600/50">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-2 items-center">
                      <button onClick={() => handleProjectClick(project)} className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors underline">
                        View Full Details
                      </button>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2 py-1 text-xs text-neutral-400 
                                   hover:text-neutral-200 transition-colors"
                        >
                          <Github size={12} />
                          Source
                        </a>
                      )}
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2 py-1 text-xs text-neutral-400 
                                   hover:text-neutral-200 transition-colors"
                        >
                          <ExternalLink size={12} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
