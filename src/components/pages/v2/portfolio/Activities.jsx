import { motion } from "framer-motion";
import { Users, Calendar, ArrowUpRight, MapPin, Award } from "lucide-react";

// Header component yang konsisten untuk semua section
const SectionHeader = ({ subtitle, title, highlightedWord }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-24"
      >
        <span className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4 block">
          {subtitle}
        </span>
        <h2 className="text-5xl font-light text-neutral-800 mb-6">
          {title} <span className="font-semibold">{highlightedWord}</span>
        </h2>
        <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
      </motion.div>
    );
  };

const ActivityCard = ({ title, role, date, details }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg p-6 
                 border border-neutral-100 hover:border-neutral-200
                 transition-all duration-300"
    >
      {/* Header Section */}
      <div className="mb-6">
        {/* Role & Date */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-medium text-neutral-500">
            {role}
          </span>
          <span className="text-xs text-neutral-400">
            {date}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-neutral-800">
          {title}
        </h3>
      </div>

      {/* Details */}
      <div className="space-y-3">
        {details.map((detail, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
            className="flex items-start gap-2"
          >
            <div className="mt-1.5">
              <div className="w-1 h-1 rounded-full bg-neutral-300" />
            </div>
            <p className="text-sm text-neutral-600">{detail}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ActivitiesSection = () => {
  const activities = [
    {
      title: "Karang Taruna Mutiara Bogor City",
      role: "Leader",
      date: "Aug 2022",
      details: [
        "Led youth organization in organizing Indonesian Independence Day celebration",
        "Managed event planning and proposal drafting",
        "Coordinated community outreach initiatives"
      ],
    },
    {
      title: "Training and Workshop Committee",
      role: "Member",
      date: "July 2024",
      details: [
        "Served as a committee member for digital marketing training",
        "Facilitated Canva workshops for KWT Pancasona",
        "Supported participant engagement and learning outcomes"
      ],
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-8 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader 
          subtitle="Community Engagement"
          title="Community"
          highlightedWord="Activities"
        />

        {/* Activity Grid */}
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