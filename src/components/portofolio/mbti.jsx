/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import { motion } from "framer-motion";
import { IoPersonOutline, IoCalendarOutline, IoLinkOutline, IoTimeOutline } from "react-icons/io5";
import { useState } from "react";

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */

const SectionCard = ({ title, value, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-8 bg-neutral-800/50 rounded-lg border border-neutral-700/30 backdrop-blur-sm">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-semibold text-neutral-200">{title}</h3>
      <span className="text-neutral-400 text-sm">{value}</span>
    </div>
    {children}
  </motion.div>
);

const TraitProgress = ({ trait, opposite, percentage, index, color }) => (
  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="bg-neutral-800/50 p-5 rounded-lg border border-neutral-700/30 backdrop-blur-sm">
    <div className="flex justify-between mb-3">
      <span className="text-neutral-200 font-medium">{trait}</span>
      <span className="text-neutral-400">{opposite}</span>
    </div>
    <div className="relative h-2.5 bg-neutral-700/50 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 0.8 }}
        className="absolute h-full rounded-full"
        style={{
          backgroundColor: `#${color}`,
          boxShadow: `0 0 10px #${color}100, 0 0 20px #${color}100`,
        }}
      />
    </div>
    <div className="mt-2 text-right">
      <span className="text-sm font-medium text-neutral-300">{percentage}%</span>
    </div>
  </motion.div>
);

const MBTI = () => {
  const [showHistory, setShowHistory] = useState(false);

  const traitColors = {
    Introverted: "4298B4",
    Intuitive: "E4AE3A",
    Thinking: "33A474",
    Prospecting: "88619A",
    Assertive: "F25E62",
    Extraverted: "4298B4",
    Observant: "E4AE3A",
  };

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
    <section className="py-20 px-4 sm:px-6 bg-neutral-900 font-Hanken tracking-wider">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-12">
          <div className="grid sm:grid-cols-[1fr_auto] gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-3">
                <IoPersonOutline className="text-neutral-400 text-xl" />
                Personality Profile
              </h2>
              <p className="text-neutral-400 text-sm">{showHistory ? "Historical MBTI Analysis" : "Current MBTI Assessment"}</p>
              <motion.div className="h-0.5 bg-neutral-300 mt-3" initial={{ width: 0 }} whileInView={{ width: "5rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
            </div>

            <div className="flex flex-col gap-2 sm:text-right">
              <div className="flex items-center gap-3 text-neutral-400 text-sm">
                <IoCalendarOutline />
                <span>{activeTest.date}</span>
              </div>
              <button onClick={() => setShowHistory(!showHistory)} className="text-neutral-400 hover:text-neutral-300 transition-colors text-sm flex items-center gap-2">
                <IoTimeOutline />
                {showHistory ? "View Current" : "View History"}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <SectionCard title="Personality" value={activeTest.personality.type}>
              <p className="text-neutral-300 text-base leading-relaxed">{activeTest.personality.description}</p>
            </SectionCard>

            <SectionCard title="Primary Role" value={activeTest.role.title}>
              <p className="text-neutral-300 text-base leading-relaxed">{activeTest.role.description}</p>
            </SectionCard>

            <SectionCard title="Strategy" value={activeTest.strategy.title}>
              <p className="text-neutral-300 text-base leading-relaxed">{activeTest.strategy.description}</p>
            </SectionCard>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-100 px-2">Personality Traits</h3>
              {activeTest.traits.map((item, index) => (
                <TraitProgress key={index} trait={item.trait} opposite={item.opposite} percentage={item.percentage} index={index} color={traitColors[item.trait]} />
              ))}
            </div>

            <div className="mt-8 border-t border-neutral-800 pt-8">
              <a href="https://www.16personalities.com/profiles/b560acc3a3d53" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-neutral-300 inline-flex items-center gap-2 transition-colors">
                <IoLinkOutline className="text-base" />
                Full Personality Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MBTI;
