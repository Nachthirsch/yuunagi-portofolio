import { motion } from "framer-motion";
import { HiOutlineBriefcase } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";

const ExperienceCard = ({ title, company, date, label, description, index, type = "experience" }) => {
  // Generate random animation direction
  const getRandomDirection = () => (Math.random() > 0.5 ? 30 : -30);

  return (
    <motion.div initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }} className="group relative">
      {/* Experience/Education Number - Niche Touch */}
      <div className="absolute -left-16 top-0 hidden lg:block">
        <motion.span initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }} className="text-6xl font-extralight text-gray-200 select-none">
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Header Section - Editorial Style */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                className="text-xl sm:text-2xl font-light text-gray-900 leading-tight mb-3
                  hover:text-gray-600 transition-colors duration-500"
              >
                {title}
              </motion.h3>

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }} className="flex items-center gap-4 text-sm mb-2">
                <span className="text-gray-600 font-medium">{company}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-sm uppercase tracking-wider">{label}</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.2 + 0.25 }} className="text-xs text-gray-500 tracking-wider uppercase">
                {date}
              </motion.div>
            </div>
          </div>

          {/* Subtle divider */}
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }} className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent origin-left" />
        </div>

        {/* Details - Niche Typography */}
        <div className="space-y-6 pl-8 border-l border-gray-200">
          {description.map((detail, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 + 0.5 + idx * 0.1 }} className="relative group/detail">
              {/* Custom bullet */}
              <div className="absolute -left-10 top-2">
                <div
                  className="w-2 h-2 border border-gray-300 rotate-45 
                  group-hover/detail:border-gray-500 group-hover/detail:bg-gray-100 
                  transition-all duration-300"
                ></div>
              </div>

              <p
                className="text-gray-600 leading-relaxed font-light text-sm sm:text-base
                group-hover/detail:text-gray-800 transition-colors duration-300"
              >
                {detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

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

  // Generate random animation direction for header
  const getRandomDirection = () => (Math.random() > 0.5 ? 40 : -40);

  return (
    <section className="py-32 px-4 sm:px-8 md:px-16 bg-gray-50 font-light relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/6 w-96 h-96 bg-gray-100 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-gray-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Experience Header - Niche Editorial Style */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} className="mb-40">
          {/* Overline */}
          <motion.div initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <HiOutlineBriefcase className="text-gray-400 text-lg" />
              <span className="text-xs tracking-[0.3em] text-gray-400 font-medium uppercase">Professional Journey</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
          </motion.div>

          {/* Main Title */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-gray-900 
              tracking-tight leading-[1.1] mb-8"
            >
              Work &<br />
              <span className="text-gray-600">Experience</span>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-gray-600 max-w-2xl text-base leading-relaxed font-light">
            My professional journey through data processing, mapping, and web development. Each role has contributed to my understanding of technology, precision, and the importance of delivering quality work that makes a difference.
          </motion.p>
        </motion.div>

        {/* Experience Grid - Niche Layout */}
        <div className="relative">
          {/* Background grid pattern - subtle */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-gray-300 last:border-r-0" />
              ))}
            </div>
          </div>

          {/* Experience List */}
          <div className="space-y-32 relative pl-16">
            {experiences.map((experience, index) => (
              <div key={index} className="relative">
                <ExperienceCard {...experience} index={index} type="experience" />

                {/* Connecting line between experiences */}
                {index < experiences.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 + 1 }}
                    className="absolute left-0 bottom-[-16rem] w-px h-32 bg-gradient-to-b 
                      from-gray-300 to-transparent origin-top hidden lg:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education Header - Niche Editorial Style */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} className="mb-40 mt-48">
          {/* Overline */}
          <motion.div initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <IoSchoolOutline className="text-gray-400 text-lg" />
              <span className="text-xs tracking-[0.3em] text-gray-400 font-medium uppercase">Learning & Development</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
          </motion.div>

          {/* Main Title */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-gray-900 
              tracking-tight leading-[1.1] mb-8"
            >
              Education &<br />
              <span className="text-gray-600">Training</span>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-gray-600 max-w-2xl text-base leading-relaxed font-light">
            Formal education and specialized training that have shaped my technical skills and understanding of modern web development practices.
          </motion.p>
        </motion.div>

        {/* Education Grid - Same Niche Layout */}
        <div className="relative">
          {/* Background grid pattern - subtle */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-gray-300 last:border-r-0" />
              ))}
            </div>
          </div>

          {/* Education List */}
          <div className="space-y-32 relative pl-16">
            {education.map((edu, index) => (
              <div key={index} className="relative">
                <ExperienceCard {...edu} index={index} type="education" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Element - Niche Touch */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-40 text-center">
          <div className="flex items-center justify-center gap-8">
            <div className="w-16 h-px bg-gray-300" />
            <span className="text-xs tracking-[0.2em] text-gray-400 font-light uppercase">End of Experience</span>
            <div className="w-16 h-px bg-gray-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
