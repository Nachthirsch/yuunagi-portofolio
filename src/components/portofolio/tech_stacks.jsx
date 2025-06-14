import { HiCode } from "react-icons/hi";
import { SiAdobephotoshop, SiAdobelightroom, SiPostgresql, SiQgis, SiPython, SiHtml5, SiCss3, SiPhp, SiJavascript, SiCodeigniter, SiReact, SiTailwindcss, SiExpress, SiFigma } from "react-icons/si";
import { motion } from "framer-motion";
import { FaVuejs } from "react-icons/fa";

const TechCategory = ({ title, items, index }) => {
  // Generate random animation direction
  const getRandomDirection = () => (Math.random() > 0.5 ? 30 : -30);

  return (
    <motion.div initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group py-8 hover:bg-gray-100/30 transition-colors duration-300">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 tracking-wider uppercase">{items.length} Technologies</p>
        </div>

        {/* Tech Items */}
        <div className="space-y-4 pl-6">
          {items.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }} className="group/detail">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                </div>
                <div className="flex items-center gap-4 group-hover/detail:translate-x-1 transition-transform duration-300">
                  <div className="p-2 bg-gray-100 text-gray-600 rounded-sm group-hover/detail:bg-gray-200 transition-colors duration-300">
                    <item.icon className="text-lg" />
                  </div>
                  <span className="text-gray-600 font-light text-sm sm:text-base group-hover/detail:text-gray-800 transition-colors duration-300">{item.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TechStack = () => {
  const techCategories = [
    {
      title: "Design Tools",
      items: [
        { icon: SiAdobephotoshop, name: "Adobe Photoshop" },
        { icon: SiAdobelightroom, name: "Adobe Lightroom" },
        { icon: SiFigma, name: "Figma" },
      ],
    },
    {
      title: "Programming Languages",
      items: [
        { icon: SiPython, name: "Python" },
        { icon: SiHtml5, name: "HTML" },
        { icon: SiCss3, name: "CSS" },
        { icon: SiPhp, name: "PHP" },
        { icon: SiJavascript, name: "Javascript" },
      ],
    },
    {
      title: "Frameworks & Libraries",
      items: [
        { icon: SiCodeigniter, name: "CodeIgniter 3" },
        { icon: SiReact, name: "React" },
        { icon: FaVuejs, name: "Vue" },
        { icon: SiTailwindcss, name: "TailwindCSS" },
        { icon: SiExpress, name: "ExpressJS" },
      ],
    },
    {
      title: "Database & Tools",
      items: [
        { icon: SiPostgresql, name: "PostgreSQL" },
        { icon: SiQgis, name: "QGIS" },
      ],
    },
  ];

  // Generate random animation direction for header
  const getRandomDirection = () => (Math.random() > 0.5 ? 40 : -40);

  return (
    <section className="py-32 px-4 sm:px-8 md:px-16 bg-gray-50 font-light">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-32">
          <div className="flex items-baseline gap-8 mb-8">
            <HiCode className="text-gray-400 text-lg mt-1 flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-wide">Tech Stack</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent mb-8" />

          <p className="text-gray-600 max-w-2xl text-sm leading-relaxed font-light">The technologies and tools that form the foundation of my development work.</p>
        </motion.div>

        {/* Categories List */}
        <div className="space-y-16">
          {techCategories.map((category, index) => (
            <div key={index} className="relative">
              <TechCategory {...category} index={index} />

              {/* Divider - except for last item */}
              {index < techCategories.length - 1 && <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
