import { Code2, Heart, Github, ExternalLink } from "lucide-react";
import { SiVite, SiTailwindcss, SiAnthropic, SiFramer } from "react-icons/si";
import { motion } from "framer-motion";

const TechBadge = ({ icon: Icon, label }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full
               border border-neutral-200 shadow-sm hover:border-blue-200 
               transition-colors duration-300"
  >
    <Icon className="text-neutral-600" size={14} />
    <span className="text-xs font-medium text-neutral-600">{label}</span>
  </motion.div>
);

const Footer = () => {
  return (
    <footer className="relative py-20 px-4 sm:px-8 md:px-16 overflow-hidden
                     bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-light text-neutral-800">
                Let's <span className="font-semibold">Connect</span>
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Feel free to reach out for collaborations or just a friendly hello
              </p>
            </div>

            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="https://github.com/Nachthirsch"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-xl border border-neutral-200 
                         hover:border-blue-200 transition-colors duration-300"
              >
                <Github size={20} className="text-neutral-600" />
              </motion.a>
              {/* Add more social links as needed */}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-light text-neutral-800">
                Built <span className="font-semibold">With</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                <TechBadge icon={SiVite} label="Vite" />
                <TechBadge icon={SiTailwindcss} label="Tailwind" />
                <TechBadge icon={SiFramer} label="Framer Motion" />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <span>Powered by</span>
              <a 
                href="https://anthropic.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 
                         bg-white rounded-full border border-neutral-200
                         hover:border-blue-200 transition-colors duration-300"
              >
                <SiAnthropic size={14} className="text-neutral-600" />
                <span className="text-xs font-medium text-neutral-600">Claude</span>
                <ExternalLink size={12} className="text-neutral-400" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 pt-6 border-t border-neutral-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-blue-500" />
              <span className="text-sm text-neutral-600">
                <span className="font-medium">yuunagi</span>
                <span className="text-neutral-300 mx-2">/</span>
                <span>Handra Putratama Tanjung</span>
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-sm text-neutral-500">
              <Heart size={14} className="text-red-400" />
              <span>© {new Date().getFullYear()} All rights reserved</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 
                   bg-gradient-to-tr from-blue-50/30 to-purple-50/30 
                   rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 
                   bg-gradient-to-bl from-purple-50/30 to-blue-50/30 
                   rounded-full blur-3xl" />
    </footer>
  );
};

export default Footer;