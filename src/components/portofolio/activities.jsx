/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { HiOutlineUserGroup, HiOutlineClock, HiOutlineBriefcase } from "react-icons/hi";

const ActivityCard = ({ title, role, date, details }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="group relative bg-neutral-800 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] p-5
                hover:translate-y-[-4px] hover:shadow-[6px_10px_0px_rgba(0,0,0,0.8)]
                transition-all duration-300 overflow-hidden"
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-neutral-700 opacity-20"
           style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>
      
      <div className="relative z-10">
        {/* Title area with role badge */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-extrabold text-neutral-300 text-shadow-small pr-2">{title}</h3>
          <div className="px-2 py-1 bg-neutral-700 text-neutral-300 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)] rotate-2 text-xs font-bold">
            {role}
          </div>
        </div>
        
        {/* Date with icon */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1 mb-4 border-b-2 border-neutral-700 pb-3">
          <div className="p-1 bg-neutral-700 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
            <HiOutlineClock className="text-neutral-300" />
          </div>
          <span className="font-medium">{date}</span>
        </div>
        
        {/* Details with improved styling */}
        <ul className="mt-4 space-y-3">
          {details.map((detail, idx) => (
            <li key={idx} className="text-sm text-neutral-400 tracking-wide flex items-start">
              <div className="w-1.5 h-1.5 bg-neutral-600 mt-1.5 mr-3 flex-shrink-0 border-1 border-black transform rotate-45"></div>
              <span className="group-hover:text-neutral-300 transition-colors">{detail}</span>
            </li>
          ))}
        </ul>
        
        {/* Decorative bottom element - replacing button */}
        <div className="h-1 w-full bg-neutral-700 mt-6 border-t-1 border-b-1 border-black opacity-50"></div>
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
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider relative overflow-hidden">
      {/* Decorative background elements for neobrutalism style */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-neutral-800 opacity-5 rotate-12"
           style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-neutral-800 opacity-5 -rotate-6"
           style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="mb-12"
        >
          <div className="relative mb-6">
            <div className="absolute -left-3 -top-3 w-16 h-16 bg-neutral-700 opacity-10 rotate-12 z-0"></div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-300 tracking-wider flex items-center gap-3 relative z-10 text-shadow-neo">
              <div className="p-3 bg-neutral-800 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] rotate-2">
                <HiOutlineUserGroup className="text-neutral-400" />
              </div>
              Activities
            </h2>
            <motion.div 
              className="h-2 w-24 bg-neutral-300 mt-4 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] rotate-1" 
              initial={{ width: 0 }} 
              whileInView={{ width: "6rem" }} 
              transition={{ duration: 0.8, delay: 0.3 }} 
            />
          </div>
          
          <p className="text-neutral-400 max-w-2xl ml-8 text-sm sm:text-base border-l-4 border-neutral-700 pl-4">
            Organizations and activities that have shaped my leadership skills and community involvement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>
      </div>
      
      {/* Styles for neobrutalism */}
      <style className="text-shadow-styles">
        {`
          .text-shadow-neo {
            text-shadow: 4px 4px 0px rgba(0,0,0,0.8);
          }
          .text-shadow-small {
            text-shadow: 2px 2px 0px rgba(0,0,0,0.8);
          }
          .border-3 {
            border-width: 3px;
          }
          .border-1 {
            border-width: 1px;
          }
        `}
      </style>
    </section>
  );
};

export default ActivitiesSection;
