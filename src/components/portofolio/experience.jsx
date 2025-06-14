import { motion } from "framer-motion";
import { HiOutlineBriefcase } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";

const Experience = () => {
  const experiences = [
    {
      title: "Data and Map Processing Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Sep 2022 – Nov 2022",
      label: "Contract",
      description: ["Processed and analyzed ST2023 results, including over 1000 building points and 300+ SLS maps using QGIS to determine land cover for 200+ areas.", "Leveraged Python programming for task automation, improving efficiency and accuracy."],
    },
    {
      title: "Data Entry Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Jan 2023 – Mar 2023",
      label: "Contract",
      description: ["Accurately entered 1000+ data points monthly into the system.", "Ensuring data entry accuracy through verification against processed results.", "Conducted data validation, error correction, and reporting on input outcomes."],
    },
    {
      title: "Data and Map Processing Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Sep 2023 – Des 2023",
      label: "Contract",
      description: ["ST2023 Spatial Framework and Wilkerstat (Wilayah Kerja Statistik) Load Update", "Processed and analyzed 1000+ building points and 300+ SLS maps using QGIS to assess land cover for 200+ areas.", "Leveraged Python programming for task automation, enhancing efficiency and accuracy."],
    },
    {
      title: "Frontend Developer",
      company: "PT Bee Telematic Solutions",
      date: "Sep 2024 - Dec 2024",
      label: "Internship",
      description: ["Developing a company portfolio website showcasing completed projects using technologies like React, Tailwind CSS, and any other technologies that I'm learning.", "Ensuring responsive design and optimal user experience across devices and browsers.", "Implementing animations and interactivity to enhance engagement on the website."],
    },
  ];

  const education = [
    {
      title: "ReactJS for Front-end Website Developer",
      company: "Hacktiv8 Indonesia",
      date: "Sep 2024 – Dec 2024",
      label: "Bootcamp",
      description: ["Completed intensive front-end development bootcamp focusing on React.js", "Built multiple real-world projects using React, Redux, and modern JavaScript", "Implemented responsive design principles and component-based architecture", "Collaborated with peers on group projects using Git and Agile methodologies"],
    },
  ];

  // Minimalist animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Subtle hover animation for minimalist design
  const hoverAnimation = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.01, y: -2, transition: { duration: 0.3, ease: "easeOut" } },
  };

  // Random animation directions
  const getRandomDirection = () => (Math.random() > 0.5 ? 30 : -30);

  return (
    <section className="py-32 px-4 sm:px-8 md:px-16 bg-gray-50 font-light">
      <div className="max-w-4xl mx-auto">
        {/* Experience Header - Ultra Minimalist */}
        <motion.div initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-32">
          <div className="flex items-baseline gap-8 mb-8">
            <HiOutlineBriefcase className="text-gray-400 text-lg mt-1 flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-wide">Experience</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent" />
        </motion.div>

        {/* Experience Items - Floating Layout */}
        <div className="space-y-24 relative">
          {/* Subtle vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: index * 0.1 }} className="relative group">
              {/* Timeline dot */}
              <motion.div className="absolute left-7 md:left-7 w-2 h-2 bg-gray-300 rounded-full transition-all duration-300 group-hover:bg-gray-500 group-hover:scale-125" whileHover={{ scale: 1.5, backgroundColor: "#6b7280" }} />

              {/* Content Area */}
              <div className="ml-16 md:ml-20 space-y-4">
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-2 lg:gap-8">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-normal text-gray-900 tracking-wide">{exp.title}</h3>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-600 font-light">{exp.company}</p>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{exp.label}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-light tracking-wider lg:text-right whitespace-nowrap">{exp.date}</p>
                </div>

                {/* Description with Custom Bullets */}
                <div className="space-y-3 max-w-3xl">
                  {exp.description.map((item, idx) => (
                    <motion.div key={idx} className="flex items-start gap-4 group/item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }} viewport={{ once: true }}>
                      <div className="flex-shrink-0 mt-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full transition-all duration-300 group-hover/item:bg-gray-600 group-hover/item:scale-150" />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-light">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Header - Ultra Minimalist */}
        <motion.div initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-32 mt-48">
          <div className="flex items-baseline gap-8 mb-8">
            <IoSchoolOutline className="text-gray-400 text-lg mt-1 flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-wide">Education</h2>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent" />
        </motion.div>

        {/* Education Items - Same Style */}
        <div className="space-y-24 relative">
          {/* Subtle vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

          {education.map((edu, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: index * 0.1 }} className="relative group">
              {/* Timeline dot */}
              <motion.div className="absolute left-7 md:left-7 w-2 h-2 bg-gray-300 rounded-full transition-all duration-300 group-hover:bg-gray-500 group-hover:scale-125" whileHover={{ scale: 1.5, backgroundColor: "#6b7280" }} />

              {/* Content Area */}
              <div className="ml-16 md:ml-20 space-y-4">
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-2 lg:gap-8">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-normal text-gray-900 tracking-wide">{edu.title}</h3>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-600 font-light">{edu.company}</p>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{edu.label}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-light tracking-wider lg:text-right whitespace-nowrap">{edu.date}</p>
                </div>

                {/* Description with Custom Bullets */}
                <div className="space-y-3 max-w-3xl">
                  {edu.description.map((item, idx) => (
                    <motion.div key={idx} className="flex items-start gap-4 group/item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }} viewport={{ once: true }}>
                      <div className="flex-shrink-0 mt-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full transition-all duration-300 group-hover/item:bg-gray-600 group-hover/item:scale-150" />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-light">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
