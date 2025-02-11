import { motion, AnimatePresence } from "framer-motion";
import { IoPersonOutline, IoLinkOutline, IoTimeOutline } from "react-icons/io5";
import { useState } from "react";
import { SectionCard } from "./mbti/SectionCard";
import { TraitProgress } from "./mbti/TraitProgress";
import { TraitDescriptionsCard } from "./mbti/TraitDescriptionsCard";
import { traitColors, testData, traitDescriptions } from "../../data/mbtiData";

const MBTI = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeTraitInfo, setActiveTraitInfo] = useState({
    trait: "Introverted",
    percentage: 60,
    type: "ENERGY",
    description: traitDescriptions["Introverted"],
  });

  const activeTest = showHistory ? testData.historical : testData.current;

  const cardItems = [
    {
      title: "Personality",
      value: activeTest.personality.type,
      description: activeTest.personality.description,
    },
    {
      title: "Primary Role",
      value: activeTest.role.title,
      description: activeTest.role.description,
    },
    {
      title: "Strategy",
      value: activeTest.strategy.title,
      description: activeTest.strategy.description,
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 bg-neutral-900 font-Hanken tracking-wider">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-300 tracking-wider flex items-center gap-3">
              <IoPersonOutline className="text-neutral-400" />
              Personality Profile
            </h2>
            <motion.div className="h-0.5 bg-neutral-300 mt-2" initial={{ width: 0 }} whileInView={{ width: "5rem" }} transition={{ duration: 0.8, delay: 0.3 }} />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <SectionCard items={cardItems} activeIndex={activeCardIndex} setActiveIndex={setActiveCardIndex} />
            <AnimatePresence mode="wait">
              <TraitDescriptionsCard key={activeTraitInfo.trait} traitType={activeTraitInfo.type} traitName={activeTraitInfo.trait} percentage={activeTraitInfo.percentage} description={activeTraitInfo.description} color={traitColors[activeTraitInfo.trait]} />
            </AnimatePresence>
            <div className="flex items-center px-2 justify-between">
              <a href="https://www.16personalities.com/profiles/b560acc3a3d53" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-neutral-300 inline-flex items-center gap-2 transition-colors">
                <IoLinkOutline />
                Full Profile
              </a>
              <div className="flex items-center gap-4">
                <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-300 transition-colors">
                  <IoTimeOutline />
                  {showHistory ? "View Current" : "View History"}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2 mb-4">
              <h3 className="text-base font-semibold text-neutral-100">Personality Traits</h3>
              <span className="text-xs text-neutral-400">Test: {activeTest.date}</span>
            </div>
            <div className="space-y-3">
              {activeTest.traits.map((item, index) => (
                <TraitProgress key={index} trait={item.trait} opposite={item.opposite} percentage={item.percentage} index={index} color={traitColors[item.trait]} onHover={setActiveTraitInfo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MBTI;
