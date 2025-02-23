import { HiCode } from "react-icons/hi";
import { SiAdobephotoshop, SiAdobelightroom, SiPostgresql, SiQgis, SiPython, SiHtml5, SiCss3, SiPhp, SiJavascript, SiCodeigniter, SiReact, SiTailwindcss, SiExpress, SiFigma } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const DinoGame = ({ techStacks }) => {
  return (
    <div className="relative h-[400px] w-full overflow-hidden bg-neutral-800 rounded-lg">
      <motion.div
        className="absolute bottom-20 left-10"
        animate={{
          y: [0, -100, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        {/* Dino character */}
        <div className="w-16 h-16 bg-neutral-300 rounded-lg"></div>
        {/* Dust effect */}
        <motion.div
          className="absolute bottom-0 left-0"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        >
          <div className="w-2 h-2 bg-neutral-500 rounded-full"></div>
        </motion.div>
      </motion.div>

      {/* Moving ground */}
      <div className="absolute bottom-0 w-full h-20 bg-neutral-700">
        <motion.div
          className="absolute bottom-0 w-full h-1 bg-neutral-600"
          animate={{
            x: [0, -100],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Tech stack obstacles */}
      <div className="absolute bottom-20 w-full">
        <motion.div
          className="flex gap-32"
          animate={{
            x: ["100vw", "-100vw"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {techStacks.map((stack, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2"
              whileInView={{
                opacity: [1, 0],
                scale: [1, 1.2, 0],
              }}
            >
              {stack.icon}
              <span className="text-neutral-400 text-sm">{stack.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ClassicView = ({ categories }) => {
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4
      "
      >
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
  const [isGameView, setIsGameView] = useState(false);

  const techStacks = [
    { icon: <SiPython className="text-3xl text-neutral-500" />, name: "Python" },
    // Add all other tech stacks here
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-3">
              <HiCode className="text-neutral-400" />
              Tech Stack
            </h2>
            <motion.div className="w-20 h-0.5 bg-neutral-300 mt-3" initial={{ width: 0 }} whileInView={{ width: "5rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
          </motion.div>

          <button onClick={() => setIsGameView(!isGameView)} className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 transition-colors">
            {isGameView ? "Classic View" : "Game View"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={isGameView ? "game" : "classic"} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            {isGameView ? (
              <DinoGame techStacks={techStacks} />
            ) : (
              <ClassicView
                categories={
                  [
                    /* your categories */
                  ]
                }
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStack;
