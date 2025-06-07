import { motion } from "framer-motion";
import { SiAdobephotoshop, SiAdobelightroom, SiPostgresql, SiQgis, SiPython, SiHtml5, SiCss3, SiPhp, SiJavascript, SiCodeigniter, SiReact, SiTailwindcss, SiExpress, SiFigma, SiNodedotjs, SiMysql } from "react-icons/si";
import { FaVuejs } from "react-icons/fa";

const TechStack = () => {
  const techCategories = [
    {
      category: "Frontend",
      techs: [
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: SiCss3, color: "#1572B6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Vue.js", icon: FaVuejs, color: "#4FC08D" },
        { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
      ],
    },
    {
      category: "Backend",
      techs: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", icon: SiExpress, color: "#000000" },
        { name: "PHP", icon: SiPhp, color: "#777BB4" },
        { name: "CodeIgniter", icon: SiCodeigniter, color: "#EF4223" },
      ],
    },
    {
      category: "Database",
      techs: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
        { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      ],
    },
    {
      category: "Design & Tools",
      techs: [
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
        { name: "Lightroom", icon: SiAdobelightroom, color: "#31A8FF" },
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "QGIS", icon: SiQgis, color: "#589632" },
      ],
    },
  ];

  return (
    <section className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-16 bg-neutral-900 font-Hanken tracking-wider overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header with enhanced animations */}
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.15 } },
            exit: { transition: { staggerChildren: 0.08 } },
          }}
          className="mb-8"
        >
          <motion.h2
            variants={{
              initial: { y: -40, x: -30, opacity: 0, filter: "blur(10px)" },
              animate: {
                y: 0,
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.8,
                },
              },
              exit: {
                y: 40,
                x: 30,
                opacity: 0,
                filter: "blur(8px)",
                transition: { duration: 0.4, ease: [0.4, 0.0, 0.6, 1] },
              },
            }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight"
          >
            TECH STACK
          </motion.h2>
          <motion.p
            variants={{
              initial: { y: 40, x: 30, opacity: 0, filter: "blur(10px)" },
              animate: {
                y: 0,
                x: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 0.8,
                  delay: 0.1,
                },
              },
              exit: {
                y: -40,
                x: -30,
                opacity: 0,
                filter: "blur(8px)",
                transition: { duration: 0.4, ease: [0.4, 0.0, 0.6, 1] },
              },
            }}
            className="text-neutral-300 text-base sm:text-lg"
          >
            Technologies and tools I work with
          </motion.p>
        </motion.div>

        {/* Content area */}
        <div className="h-[calc(100vh-300px)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Tech Categories */}
            <div className="flex flex-col h-full lg:col-span-2">
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto h-full pr-2 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
                  {techCategories.map((category, categoryIndex) => (
                    <motion.div key={category.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: categoryIndex * 0.1 }} viewport={{ once: true }} className="space-y-4">
                      {/* Category Header */}
                      <div className="border-b border-neutral-700 pb-3">
                        <h3 className="text-base font-medium text-neutral-200">{category.category}</h3>
                      </div>

                      {/* Tech Items Grid */}
                      <div className="space-y-2">
                        {category.techs.map((tech, techIndex) => (
                          <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.4,
                              delay: categoryIndex * 0.1 + techIndex * 0.05,
                              type: "spring",
                              stiffness: 100,
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                              scale: 1.02,
                              transition: { duration: 0.2 },
                            }}
                            className="group flex items-center gap-2 py-1 transition-all duration-300"
                          >
                            {/* Icon */}
                            <tech.icon className="text-lg transition-all duration-300 group-hover:scale-110" style={{ color: tech.color }} />

                            {/* Tech Name */}
                            <span className="text-white font-medium text-sm group-hover:text-neutral-100 transition-colors">{tech.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
