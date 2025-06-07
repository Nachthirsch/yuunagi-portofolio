import { motion } from "framer-motion";
import { Github, ExternalLink, Calendar, ArrowLeft, Code } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projectsData";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-900 font-Hanken flex items-center justify-center film-grain">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
          <button onClick={() => navigate("/")} className="text-neutral-400 hover:text-white transition-colors">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 font-Hanken film-grain">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-neutral-400 hover:text-white 
                   transition-colors duration-200 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Portfolio
        </motion.button>

        {/* Project Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{project.title}</h1>
              <div className="flex items-center gap-3 text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {project.date}
                </span>
                <span>•</span>
                <span>{project.type}</span>
              </div>
            </div>
            <span className={`px-3 py-1 text-sm rounded-full ${project.status === "Completed" ? "bg-neutral-600 text-neutral-300" : "bg-neutral-700 text-neutral-400"}`}>{project.status}</span>
          </div>
        </motion.div>

        {/* Project Image */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="aspect-video bg-neutral-800 rounded-lg overflow-hidden border border-neutral-700">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">About This Project</h2>
          <div className="text-neutral-300 leading-relaxed space-y-4">{project.longDescription ? project.longDescription.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>) : <p>{project.description}</p>}</div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Code size={20} />
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-neutral-800 text-neutral-300 rounded-lg
                         border border-neutral-700 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-neutral-800 
                       text-neutral-300 hover:text-white rounded-lg
                       border border-neutral-700 hover:border-neutral-600
                       transition-colors duration-200"
            >
              <Github size={20} />
              View Source Code
            </a>
          )}
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-neutral-800 
                       text-neutral-300 hover:text-white rounded-lg
                       border border-neutral-700 hover:border-neutral-600
                       transition-colors duration-200"
            >
              <ExternalLink size={20} />
              Live Demo
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
