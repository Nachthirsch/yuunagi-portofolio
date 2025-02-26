import { HiCode } from "react-icons/hi";
import { SiAdobephotoshop, SiAdobelightroom, SiPostgresql, SiQgis, SiPython, SiHtml5, SiCss3, SiPhp, SiJavascript, SiCodeigniter, SiReact, SiTailwindcss, SiExpress, SiFigma } from "react-icons/si";
import { motion } from "framer-motion";

const ClassicView = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Design Tools */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-400">Design Tools</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <SiAdobephotoshop className="text-xl text-neutral-500" />
            <span className="text-neutral-300">Adobe Photoshop</span>
          </div>
          <div className="flex items-center gap-3">
            <SiAdobelightroom className="text-xl text-neutral-500" />
            <span className="text-neutral-300">Adobe Lightroom</span>
          </div>
          <div className="flex items-center gap-3">
            <SiFigma className="text-xl text-neutral-500" />
            <span className="text-neutral-300">Figma</span>
          </div>
        </div>
      </motion.div>

      {/* Programming Languages */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-400">Programming Languages</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <SiPython className="text-xl text-neutral-500" />
            <span className="text-neutral-300">Python</span>
          </div>
          <div className="flex items-center gap-3">
            <SiHtml5 className="text-xl text-neutral-500" />
            <span className="text-neutral-300">HTML</span>
          </div>
          <div className="flex items-center gap-3">
            <SiCss3 className="text-xl text-neutral-500" />
            <span className="text-neutral-300">CSS</span>
          </div>
          <div className="flex items-center gap-3">
            <SiPhp className="text-xl text-neutral-500" />
            <span className="text-neutral-300">PHP</span>
          </div>
          <div className="flex items-center gap-3">
            <SiJavascript className="text-xl text-neutral-500" />
            <span className="text-neutral-300">Javascript</span>
          </div>
        </div>
      </motion.div>

      {/* Frameworks */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-400">Frameworks</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <SiCodeigniter className="text-xl text-neutral-500" />
            <span className="text-neutral-300">CodeIgniter 3</span>
          </div>
          <div className="flex items-center gap-3">
            <SiReact className="text-xl text-neutral-500" />
            <span className="text-neutral-300">React</span>
          </div>
          <div className="flex items-center gap-3">
            <SiTailwindcss className="text-xl text-neutral-500" />
            <span className="text-neutral-300">TailwindCSS</span>
          </div>
          <div className="flex items-center gap-3">
            <SiExpress className="text-xl text-neutral-500" />
            <span className="text-neutral-300">ExpressJS</span>
          </div>
        </div>
      </motion.div>

      {/* Database */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-400">Database</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <SiPostgresql className="text-xl text-neutral-500" />
            <span className="text-neutral-300">PostgreSql</span>
          </div>
        </div>
      </motion.div>

      {/* Other Tools */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-400">Other Tools</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <SiQgis className="text-xl text-neutral-500" />
            <span className="text-neutral-300">QGIS</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TechStack = () => {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-3">
              <HiCode className="text-neutral-400" />
              Tech Stack
            </h2>
            <motion.div className="w-20 h-0.5 bg-neutral-300 mt-3" initial={{ width: 0 }} whileInView={{ width: "5rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ClassicView />
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
