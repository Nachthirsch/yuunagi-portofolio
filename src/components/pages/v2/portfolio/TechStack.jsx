/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { HiCode } from "react-icons/hi";
import { SiAdobephotoshop, SiAdobelightroom, SiPostgresql, SiQgis, SiPython, SiHtml5, SiCss3, SiPhp, SiJavascript, SiCodeigniter, SiReact, SiTailwindcss, SiExpress, SiFigma } from "react-icons/si";
import { motion } from "framer-motion";

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

const TechItem = ({ icon: Icon, name }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-4 bg-white rounded-xl p-4 border border-neutral-200
               hover:border-blue-200 transition-colors duration-300"
  >
    <div
      className="w-10 h-10 flex items-center justify-center rounded-lg 
                    bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <Icon className="text-xl text-blue-500" />
    </div>
    <span className="text-neutral-600 font-medium">{name}</span>
  </motion.div>
);

const TechStack = () => {
  const techCategories = [
    {
      title: "Design",
      items: [
        { icon: SiAdobephotoshop, name: "Adobe Photoshop" },
        { icon: SiAdobelightroom, name: "Adobe Lightroom" },
        { icon: SiFigma, name: "Figma" },
      ],
    },
    {
      title: "Languages",
      items: [
        { icon: SiPython, name: "Python" },
        { icon: SiHtml5, name: "HTML" },
        { icon: SiCss3, name: "CSS" },
        { icon: SiPhp, name: "PHP" },
        { icon: SiJavascript, name: "Javascript" },
      ],
    },
    {
      title: "Frameworks",
      items: [
        { icon: SiCodeigniter, name: "CodeIgniter 3" },
        { icon: SiReact, name: "React" },
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

  return (
    <section className="py-20 px-4 sm:px-8 md:px-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <SectionHeader subtitle="Technologies" title="My" highlightedWord="Tech Stack" />
        </motion.div>

        {/* Tech Categories */}
        <div className="space-y-12">
          {techCategories.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: categoryIndex * 0.1 }}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-neutral-800">{category.title}</h3>
                <div className="flex-grow h-[1px] bg-neutral-200" />
              </div>

              {/* Tech Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, itemIndex) => (
                  <motion.div key={itemIndex} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: itemIndex * 0.1 }}>
                    <TechItem {...item} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div
          className="absolute top-0 right-0 -z-10 w-1/2 h-1/2 
                     bg-gradient-to-br from-blue-50/50 to-purple-50/50 
                     rounded-full blur-3xl"
        />
        <div
          className="absolute bottom-0 left-0 -z-10 w-1/2 h-1/2 
                     bg-gradient-to-tr from-blue-50/30 to-purple-50/30 
                     rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default TechStack;
