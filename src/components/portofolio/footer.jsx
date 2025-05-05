import { Code2 } from "lucide-react";
import { SiVite, SiTailwindcss, SiAnthropic, SiReact } from "react-icons/si";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-8 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider border-t border-neutral-800">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-3">
          {/* Creator Info */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <Code2 className="text-neutral-400" size={16} />
              <h2 className="text-base font-semibold text-neutral-300">Created with passion by</h2>
            </div>
            <div className="text-neutral-300 hover:text-neutral-100 transition-colors">
              <a href="https://github.com/Nachthirsch" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <span className="font-medium">yuunagi</span>
                <span className="text-neutral-400">/</span>
                <span>Handra Putratama Tanjung</span>
              </a>
            </div>
          </div>

          {/* Tech Stack Used */}
          <div className="flex justify-center items-center gap-2 text-neutral-400">
            <SiVite className="text-lg hover:text-neutral-300 transition-colors" />
            <span>+</span>
            <SiTailwindcss className="text-lg hover:text-neutral-300 transition-colors" />
            <span>+</span>
            <SiReact className="text-lg hover:text-neutral-300 transition-colors" />
          </div>

          {/* Credits */}
          <div className="text-xs text-neutral-500">
            <p className="inline">Special thanks to </p>
            <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">
              <SiAnthropic className="text-lg inline" />
            </a>
            <span> for development assistance</span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-neutral-600 pt-2">© {new Date().getFullYear()} All rights reserved</div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
