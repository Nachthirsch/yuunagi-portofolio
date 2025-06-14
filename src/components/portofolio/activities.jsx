/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { HiOutlineUserGroup, HiOutlineClock } from "react-icons/hi";

const ActivityCard = ({ title, role, date, details, index }) => {
  // Generate random animation direction
  const getRandomDirection = () => (Math.random() > 0.5 ? 30 : -30);

  return (
    <motion.div initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.2 }} className="group relative">
      {/* Activity Number - Niche Touch */}
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

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }} className="flex items-center gap-4 text-sm">
                <span className="text-gray-600 font-medium">{role}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <div className="flex items-center gap-2 text-gray-500">
                  <HiOutlineClock className="text-xs" />
                  <span className="text-xs tracking-wider uppercase">{date}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Subtle divider */}
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }} className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent origin-left" />
        </div>

        {/* Details - Niche Typography */}
        <div className="space-y-6 pl-8 border-l border-gray-200">
          {details.map((detail, idx) => (
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

const ActivitiesSection = () => {
  const activities = [
    {
      title: "Karang Taruna Mutiara Bogor City",
      role: "Leader",
      date: "Aug 2022 – Nov 2022",
      details: ["Led youth organization in organizing Indonesian Independence Day celebration", "Managed event planning and proposal drafting", "Coordinated community outreach initiatives"],
    },
    {
      title: "Training and Workshop Committee",
      role: "Member",
      date: "July 2024",
      details: ["Served as a committee member for digital marketing training", "Facilitated Canva workshops for KWT Pancasona", "Supported participant engagement and learning outcomes"],
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
        {/* Header - Niche Editorial Style */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }} className="mb-40">
          {/* Overline */}
          <motion.div initial={{ opacity: 0, x: getRandomDirection() }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <HiOutlineUserGroup className="text-gray-400 text-lg" />
              <span className="text-xs tracking-[0.3em] text-gray-400 font-medium uppercase">Community & Leadership</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
          </motion.div>

          {/* Main Title */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-gray-900 
              tracking-tight leading-[1.1] mb-8"
            >
              Activities &<br />
              <span className="text-gray-600">Engagements</span>
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-gray-600 max-w-2xl text-base leading-relaxed font-light">
            Organizations and activities that have shaped my leadership skills and community involvement. Each experience represents a step in understanding collaboration, responsibility, and the art of bringing people together.
          </motion.p>
        </motion.div>

        {/* Activities Grid - Niche Layout */}
        <div className="relative">
          {/* Background grid pattern - subtle */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-gray-300 last:border-r-0" />
              ))}
            </div>
          </div>

          {/* Activities List */}
          <div className="space-y-32 relative pl-16">
            {activities.map((activity, index) => (
              <div key={index} className="relative">
                <ActivityCard {...activity} index={index} />

                {/* Connecting line between activities */}
                {index < activities.length - 1 && (
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

        {/* Footer Element - Niche Touch */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mt-40 text-center">
          <div className="flex items-center justify-center gap-8">
            <div className="w-16 h-px bg-gray-300" />
            <span className="text-xs tracking-[0.2em] text-gray-400 font-light uppercase">End of Activities</span>
            <div className="w-16 h-px bg-gray-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
