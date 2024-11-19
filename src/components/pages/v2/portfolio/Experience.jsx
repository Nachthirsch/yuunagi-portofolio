import { motion } from "framer-motion";
import { Calendar, MapPin, Building2, ArrowRight } from "lucide-react";


const Experience = () => {
  const experiences = [
    {
      title: "Data and Map Processing Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Sep 2022 – Nov 2022",
      type: "Contract",
      description: ["Mapped out over 1000 buildings using QGIS", "Analyzed 300+ satellite images to understand the landscape", "Studied land patterns across 200+ areas"],
      skills: ['QGIS', 'Data Analysis', 'Spatial Analysis']
    },
    {
      title: "Data Entry Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Jan 2023 – Mar 2023",
      type: "Contract",
      description: ["Accurately entered 1000+ data points monthly into the system.", "Ensuring data entry accuracy through verification against processed results.", "Conducted data validation, error correction, and reporting on input outcomes."],
      skills: ['Data Entry', 'Data Validation', 'Quality Control']
    },
    {
      title: "Data and Map Processing Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Sep 2023 – Des 2023",
      type: "Contract",
      description: ["ST2023 Spatial Framework and Wilkerstat (Wilayah Kerja Statistik) Load Update", "Processed and analyzed 1000+ building points and 300+ SLS maps using QGIS to assess land cover for 200+ areas.", "Leveraged Python programming for task automation, enhancing efficiency and accuracy."],
      skills: ['QGIS', 'Python', 'Data Analysis', 'Spatial Analysis', 'Automation']
    },
    {
      title: "Frontend Developer",
      company: "PT Bee Telematic Solutions",
      date: "Sep 2024 - Present",
      type: "Internship",
      description: ["Developing a company portfolio website showcasing completed projects using technologies like React, Tailwind CSS, and any other technologies that I'm learning.", "Ensuring responsive design and optimal user experience across devices and browsers.", "Implementing animations and interactivity to enhance engagement on the website."],
      skills: ['React', 'Tailwind CSS', 'UI/UX', 'Responsive Design']
    },
  ];

  return (
    <section className="py-32 px-7 sm:px-8 md:px-16 bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <div className="max-w-7xl mx-auto">
        {/* Elegant Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4 block">
            Career Timeline
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-neutral-800 mb-6">
            Professional <span className="font-semibold">Experience</span>
          </h2>
          <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-16 md:space-y-32">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Large Year Display */}
              <div className="absolute -left-4 sm:block hidden top-0 text-[8rem] md:text-[10rem] font-bold text-neutral-50 select-none
                            transform -translate-y-1/2 pointer-events-none z-0">
                {exp.date.split(' ')[0]}
              </div>

              {/* Type Indicator */}
              <div className="absolute -right-4 sm:block hidden top-0 text-[1.5rem] font-medium text-neutral-400/50 select-none
                            transform -translate-y-1/2 pointer-events-none z-0 uppercase tracking-widest">
                {exp.type}
              </div>

              {/* Content Container */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_2px_2fr] gap-4 md:gap-8 items-start">
                {/* Left Column - Date & Company */}
                <div className="space-y-4">
                  <div className="inline-block px-4 py-1.5 bg-white rounded-full shadow-sm
                                border border-neutral-200 text-sm text-neutral-600">
                    {exp.date}
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 size={18} className="text-neutral-400 mt-1" />
                    <div>
                      <p className="font-medium text-neutral-800">{exp.company}</p>
                      <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
                        <MapPin size={14} />
                        <span>Bogor, Indonesia</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-[2px] h-full bg-gradient-to-b from-neutral-200 via-neutral-200 to-transparent
                              self-stretch" />

                {/* Right Column - Main Content */}
                <div className="relative">
                  {/* Title and Job Type */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                    <h3 className="text-2xl font-medium text-neutral-800">
                      {exp.title}
                    </h3>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium
                                      ${exp.type === "Contract" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    {exp.description.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                        className="flex items-start gap-2 md:gap-4 group"
                      >
                        <ArrowRight size={16} className="flex-shrink-0 mt-1.5 text-neutral-300 group-hover:text-blue-500 
                                                       transition-colors duration-300" />
                        <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Skills */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3"
                  >
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-1.5 text-sm bg-white rounded-full shadow-sm
                                 text-neutral-600 border border-neutral-200 hover:border-neutral-300
                                 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </motion.div>
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
