/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { HiOutlineUserGroup, HiOutlineClock } from "react-icons/hi";

const ActivityCard = ({ title, role, date, details }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="group relative bg-neutral-800/20 rounded-lg p-6 border border-neutral-700/30 hover:border-neutral-600/50 transition-all h-[200px] hover:h-auto hover:min-h-[200px] hover:z-10 hover:shadow-xl">
      {/* Overlay Background for Extended Content */}
      <div className="absolute inset-0 bg-neutral-800/95 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />

      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-neutral-300 line-clamp-2 group-hover:line-clamp-none transition-all">{title}</h3>
        <p className="text-sm text-neutral-400 mt-1 line-clamp-1 group-hover:line-clamp-none transition-all">{role}</p>
        <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
          <HiOutlineClock className="text-lg" />
          {date}
        </div>
        <ul className="mt-4 space-y-2 hidden group-hover:block">
          {details.map((detail, idx) => (
            <li key={idx} className="text-sm text-neutral-400 tracking-wide flex items-start">
              <span className="text-neutral-600 mr-2">•</span>
              {detail}
            </li>
          ))}
        </ul>
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

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-3">
            <HiOutlineUserGroup className="text-neutral-400" />
            Activities
          </h2>
          <motion.div className="h-0.5 bg-neutral-300 mt-3" initial={{ width: 0 }} whileInView={{ width: "5rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
