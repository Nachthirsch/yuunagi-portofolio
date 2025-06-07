import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      title: "Frontend Developer",
      company: "PT Bee Telematic Solutions",
      date: "Sep 2024 - Dec 2024",
      label: "Internship",
      description: ["Developing a company portfolio website showcasing completed projects using technologies like React, Tailwind CSS, and any other technologies that I'm learning.", "Ensuring responsive design and optimal user experience across devices and browsers.", "Implementing animations and interactivity to enhance engagement on the website."],
    },
    {
      title: "Data and Map Processing Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Sep 2023 – Des 2023",
      label: "Contract",
      description: ["ST2023 Spatial Framework and Wilkerstat (Wilayah Kerja Statistik) Load Update", "Processed and analyzed 1000+ building points and 300+ SLS maps using QGIS to assess land cover for 200+ areas.", "Leveraged Python programming for task automation, enhancing efficiency and accuracy."],
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
      date: "Sep 2022 – Nov 2022",
      label: "Contract",
      description: ["Processed and analyzed ST2023 results, including over 1000 building points and 300+ SLS maps using QGIS to determine land cover for 200+ areas.", "Leveraged Python programming for task automation, improving efficiency and accuracy."],
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
    <section className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 bg-transparent font-Hanken tracking-wider overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">EXPERIENCE</h2>
          <p className="text-neutral-300 text-base sm:text-lg">Professional journey and educational background</p>
        </motion.div>

        {/* Filters placeholder to match Projects structure */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-600">
          <span className="text-neutral-400 text-sm">Work Experience & Education</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-280px)] overflow-hidden">
          {/* Work Experience Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-neutral-100 mb-4">Work Experience</h3>
            <div className="space-y-6 overflow-y-auto h-full pr-2 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
              {experiences.map((exp, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="group border-l-2 border-neutral-600 pl-4 hover:border-neutral-400 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-base group-hover:text-neutral-100 transition-colors duration-300">{exp.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-neutral-200 text-sm">{exp.company}</span>
                        <span className="px-2 py-0.5 text-xs bg-neutral-700 text-neutral-200 rounded border border-neutral-600">{exp.label}</span>
                      </div>
                    </div>
                    <span className="text-neutral-300 text-xs whitespace-nowrap">{exp.date}</span>
                  </div>
                  <ul className="space-y-1 text-neutral-300 text-sm">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="leading-relaxed pl-4 relative before:absolute before:content-['•'] before:text-neutral-500 before:left-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-neutral-100 mb-4">Education & Training</h3>
            <div className="space-y-6 overflow-y-auto h-full pr-2 scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
              {education.map((edu, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="group border-l-2 border-neutral-600 pl-4 hover:border-neutral-400 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-base group-hover:text-neutral-100 transition-colors duration-300">{edu.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-neutral-200 text-sm">{edu.company}</span>
                        <span className="px-2 py-0.5 text-xs bg-neutral-700 text-neutral-200 rounded border border-neutral-600">{edu.label}</span>
                      </div>
                    </div>
                    <span className="text-neutral-300 text-xs whitespace-nowrap">{edu.date}</span>
                  </div>
                  <ul className="space-y-1 text-neutral-300 text-sm">
                    {edu.description.map((item, idx) => (
                      <li key={idx} className="leading-relaxed pl-4 relative before:absolute before:content-['•'] before:text-neutral-500 before:left-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
