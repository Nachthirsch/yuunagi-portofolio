import { motion } from "framer-motion";
import { IoPersonOutline, IoCalendarOutline, IoLinkOutline, IoTimeOutline } from "react-icons/io5";
import { useState } from "react";

const MBTI = () => {
  const [showHistory, setShowHistory] = useState(false);

  const currentTest = {
    date: "Feb 10, 2025",
    type: "INTP-A",
    personality: {
      type: "INTP-A",
      description: "As an INTP-A (Logician), I approach challenges with logical analysis and innovative thinking. My assertive nature helps me maintain emotional stability while pursuing creative solutions. I value intellectual discourse and am driven by curiosity to understand complex systems and concepts.",
    },
    role: {
      title: "Analyst",
      description: "Analysts embrace rationality and impartiality, excelling in intellectual debates and scientific or technological fields. They are fiercely independent, open-minded, and strong-willed.",
    },
    strategy: {
      title: "Confident Individualism",
      description: "Those who prefer the Confident Individualism Strategy like doing things alone, choosing to rely on their own skills and instincts instead of seeking contact with other people. They know what they are good at.",
    },
    traits: [
      { trait: "Introverted", percentage: 60, opposite: "Extroverted" },
      { trait: "Intuitive", percentage: 70, opposite: "Observant" },
      { trait: "Thinking", percentage: 67, opposite: "Feeling" },
      { trait: "Prospecting", percentage: 60, opposite: "Judging" },
      { trait: "Assertive", percentage: 65, opposite: "Turbulent" },
    ],
  };

  const historicalTest = {
    date: "Jun 22, 2023",
    type: "ESTP-A",
    personality: {
      type: "ESTP-A",
      description: "As an ESTP-A (Entrepreneur), I am energetic and action-oriented, thriving in dynamic situations. My assertive nature allows me to confidently take risks and adapt quickly to changing circumstances. I excel at practical problem-solving and enjoy hands-on experiences.",
    },
    role: {
      title: "Explorers",
      description: "Explorers are observant and practical, excelling in situations that require quick thinking and immediate action. They are masters of tools and techniques, enjoying hands-on experience and physical challenges.",
    },
    strategy: {
      title: "People Mastery",
      description: "Those with the Social Engagement strategy are proactive in the social domain, confident in their abilities and comfortable engaging with others. They actively pursue their goals and aren't afraid to improvise.",
    },
    traits: [
      { trait: "Extraverted", percentage: 60, opposite: "Introverted" },
      { trait: "Observant", percentage: 59, opposite: "Intuitive" },
      { trait: "Thinking", percentage: 54, opposite: "Feeling" },
      { trait: "Prospecting", percentage: 64, opposite: "Judging" },
      { trait: "Assertive", percentage: 67, opposite: "Turbulent" },
    ],
  };

  const activeTest = showHistory ? historicalTest : currentTest;

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-4">
                <IoPersonOutline className="text-neutral-400" />
                MBTI
              </h2>
              <motion.div className="w-24 h-0.5 bg-gradient-to-r from-neutral-300 to-transparent mt-4" initial={{ width: 0 }} whileInView={{ width: "6rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
            </div>
            <div className="flex flex-col sm:items-end gap-3">
              <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-3 text-neutral-400 hover:text-neutral-300 transition-colors">
                <IoTimeOutline className="text-lg" />
                <span className="text-sm sm:text-base">{showHistory ? "View Current" : "View History"}</span>
              </button>
              <div className="flex items-center gap-3 text-neutral-400">
                <IoCalendarOutline className="text-lg" />
                <span className="text-sm sm:text-base">Test taken: {activeTest.date}</span>
              </div>
              <a href="https://www.16personalities.com/profiles/b560acc3a3d53" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neutral-400 hover:text-neutral-300 transition-colors">
                <IoLinkOutline className="text-lg" />
                <span className="text-sm sm:text-base">View Full Profile</span>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="p-6 bg-gradient-to-br from-neutral-800/30 to-neutral-800/10 rounded-xl border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-300 h-fit">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-300 mb-4">Personality: {activeTest.personality.type}</h3>
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">{activeTest.personality.description}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="p-6 bg-gradient-to-br from-neutral-800/30 to-neutral-800/10 rounded-xl border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-300 h-fit">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-300 mb-4">Role: {activeTest.role.title}</h3>
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">{activeTest.role.description}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }} className="p-6 bg-gradient-to-br from-neutral-800/30 to-neutral-800/10 rounded-xl border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-300 h-fit">
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-300 mb-4">Strategy: {activeTest.strategy.title}</h3>
              <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">{activeTest.strategy.description}</p>
            </motion.div>
          </div>

          <div className="space-y-8">
            {activeTest.traits.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-gradient-to-r from-neutral-800/30 to-neutral-800/10 p-6 rounded-lg border border-neutral-700/30 hover:border-neutral-600/50 transition-all duration-300">
                <div className="flex justify-between mb-3">
                  <span className="text-neutral-300 font-medium">{item.trait}</span>
                  <span className="text-neutral-400">{item.opposite}</span>
                </div>
                <div className="relative h-2.5 bg-neutral-700/50 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.percentage}%` }} transition={{ duration: 1, delay: 0.5 }} className="absolute h-full bg-gradient-to-r from-neutral-300 to-neutral-400 rounded-full" />
                </div>
                <div className="mt-2 text-right">
                  <span className="text-sm font-medium text-neutral-300">{item.percentage}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MBTI;
