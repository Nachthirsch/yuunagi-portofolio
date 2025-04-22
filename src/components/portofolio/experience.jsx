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

  // Simplified animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Neobrutalism hover animation
  const hoverAnimation = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.02, rotate: 1, transition: { duration: 0.2 } }
  };

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider">
      <div className="max-w-6xl mx-auto">
        {/* Experience Header - Neobrutalism Style */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          variants={fadeIn}
          className="mb-16 relative"
        >
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-blue-400 opacity-20 rotate-12 z-0"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-3 relative z-10">
            <div className="p-3 bg-neutral-800 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
              <HiOutlineBriefcase className="text-neutral-300 text-lg sm:text-xl" />
            </div>
            <span className="uppercase font-extrabold text-shadow-neo">EXPERIENCE</span>
          </h2>
          <div className="w-32 h-2 bg-neutral-300 mt-4 rotate-1 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]" />
        </motion.div>

        <div className="relative">
          {/* Vertical Line - Neobrutalism Style */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-neutral-700 border-x-2 border-black" />

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                variants={fadeIn}
                className="relative"
              >
                {/* Timeline marker - Neobrutalism Style */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-12 h-12 bg-neutral-700 rotate-12 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:rotate-45">
                    <div className="absolute inset-0 flex items-center justify-center -rotate-12">
                      <HiOutlineBriefcase className="text-neutral-300 text-xl" />
                    </div>
                  </div>
                </div>

                {/* Content Box - Neobrutalism Style */}
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={hoverAnimation}
                  className={`
                  w-full md:w-5/12 
                  ${index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"}
                  p-6 
                  bg-neutral-800
                  rotate-${index % 2 === 0 ? '1' : '-1'}
                  border-4 border-black
                  shadow-[8px_8px_0px_rgba(0,0,0,0.8)]
                  transition-all duration-300
                `}
                >
                  <div className={`-rotate-${index % 2 === 0 ? '1' : '-1'}`}>
                    <h3 className="text-lg sm:text-xl font-extrabold text-neutral-300 tracking-widest uppercase">{exp.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm sm:text-base text-neutral-400 tracking-wider font-bold">{exp.company}</p>
                        <span className="px-2.5 py-1 text-xs font-extrabold bg-neutral-700 text-neutral-300 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">{exp.label}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-400 tracking-wider mt-2 sm:mt-0 font-bold">{exp.date}</p>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="text-sm sm:text-base text-neutral-400 tracking-wide pl-5 relative before:absolute before:content-['▶'] before:text-neutral-600 before:left-0 before:top-0 before:text-xs">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Header - Neobrutalism Style */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          variants={fadeIn}
          className="mb-16 mt-24 relative"
        >
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-pink-400 opacity-20 rotate-12 z-0"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-3 relative z-10">
            <div className="p-3 bg-neutral-800 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
              <IoSchoolOutline className="text-neutral-300 text-lg sm:text-xl" />
            </div>
            <span className="uppercase font-extrabold text-shadow-neo">EDUCATION</span>
          </h2>
          <div className="w-32 h-2 bg-neutral-300 mt-4 rotate-1 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]" />
        </motion.div>

        <div className="relative">
          {/* Vertical Line - Neobrutalism Style */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-neutral-700 border-x-2 border-black" />

          <div className="space-y-12 md:space-y-16">
            {education.map((edu, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                variants={fadeIn}
                className="relative"
              >
                {/* Timeline marker - Neobrutalism Style */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-12 h-12 bg-neutral-700 rotate-12 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:rotate-45">
                    <div className="absolute inset-0 flex items-center justify-center -rotate-12">
                      <IoSchoolOutline className="text-neutral-300 text-xl" />
                    </div>
                  </div>
                </div>

                {/* Content Box - Neobrutalism Style */}
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={hoverAnimation}
                  className={`
                  w-full md:w-5/12 
                  ${index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"}
                  p-6 
                  bg-neutral-800
                  rotate-${index % 2 === 0 ? '1' : '-1'}
                  border-4 border-black
                  shadow-[8px_8px_0px_rgba(0,0,0,0.8)]
                  transition-all duration-300
                `}
                >
                  <div className={`-rotate-${index % 2 === 0 ? '1' : '-1'}`}>
                    <h3 className="text-lg sm:text-xl font-extrabold text-neutral-300 tracking-widest uppercase">{edu.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm sm:text-base text-neutral-400 tracking-wider font-bold">{edu.company}</p>
                        <span className="px-2.5 py-1 text-xs font-extrabold bg-neutral-700 text-neutral-300 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">{edu.label}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-400 tracking-wider mt-2 sm:mt-0 font-bold">{edu.date}</p>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {edu.description.map((item, idx) => (
                        <li key={idx} className="text-sm sm:text-base text-neutral-400 tracking-wide pl-5 relative before:absolute before:content-['▶'] before:text-neutral-600 before:left-0 before:top-0 before:text-xs">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Untuk mendapatkan text-shadow-neo style, perlu menambahkan ke CSS global */}
      <style jsx global>{`
        .text-shadow-neo {
          text-shadow: 4px 4px 0px rgba(0,0,0,0.8);
        }
      `}</style>
    </section>
  );
};

export default Experience;
