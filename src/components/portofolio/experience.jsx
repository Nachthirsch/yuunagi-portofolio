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

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-3">
            <HiOutlineBriefcase className="text-neutral-400" />
            Experience
          </h2>
          <motion.div className="w-20 h-0.5 bg-neutral-300 mt-3" initial={{ width: 0 }} whileInView={{ width: "5rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
        </motion.div>

        <div className="relative">
          {/* Vertical Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-neutral-700" />

          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} className="relative">
                {/* Diamond Shape - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-neutral-700 rotate-45"
                    whileHover={{
                      backgroundColor: "#404040",
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                      <HiOutlineBriefcase className="text-neutral-300 text-xs sm:text-sm" />
                    </div>
                  </motion.div>
                </div>

                {/* Content Box */}
                <div
                  className={`
                w-full md:w-5/12 
                ${index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"}
                p-4 sm:p-6 
                bg-neutral-800/20 md:bg-transparent 
                rounded-lg md:rounded-none
                border border-neutral-700/30 md:border-none
              `}
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-300 tracking-widest">{exp.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm sm:text-base text-neutral-400 tracking-wider">{exp.company}</p>
                        <span className="px-2.5 py-1 text-xs font-medium bg-neutral-700/50 text-neutral-300 rounded-full">{exp.label}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-500 tracking-wider mt-1 sm:mt-0">{exp.date}</p>
                    </div>
                    <ul className="mt-3 sm:mt-4 space-y-2">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="text-sm sm:text-base text-neutral-400 tracking-wide pl-4 before:content-['•'] before:text-neutral-600 before:mr-2 before:text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-3">
            <IoSchoolOutline className="text-neutral-400" />
            Education
          </h2>
          <motion.div className="w-20 h-0.5 bg-neutral-300 mt-3" initial={{ width: 0 }} whileInView={{ width: "5rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
        </motion.div>

        <div className="relative">
          {/* Vertical Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-neutral-700" />

          <div className="space-y-12 md:space-y-24">
            {education.map((edu, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} className="relative">
                {/* Diamond Shape - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-neutral-700 rotate-45"
                    whileHover={{
                      backgroundColor: "#404040",
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                      <IoSchoolOutline className="text-neutral-300 text-xs sm:text-sm" />
                    </div>
                  </motion.div>
                </div>

                {/* Content Box */}
                <div
                  className={`
                w-full md:w-5/12 
                ${index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:mr-auto md:pr-8"}
                p-4 sm:p-6 
                bg-neutral-800/20 md:bg-transparent 
                rounded-lg md:rounded-none
                border border-neutral-700/30 md:border-none
              `}
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-300 tracking-widest">{edu.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm sm:text-base text-neutral-400 tracking-wider">{edu.company}</p>
                      <span className="px-2 py-0.5 text-xs bg-neutral-700/50 text-neutral-300 rounded-full">{edu.label}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-1 tracking-wider">{edu.date}</p>
                    <ul className="mt-3 sm:mt-4 space-y-2">
                      {edu.description.map((item, idx) => (
                        <li key={idx} className="text-sm sm:text-base text-neutral-400 tracking-wide pl-4 before:content-['•'] before:text-neutral-600 before:mr-2 before:text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
