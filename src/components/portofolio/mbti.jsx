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
    <section className="py-32 px-4 sm:px-8 md:px-16 bg-gray-50 font-light">
      <div className="max-w-5xl mx-auto">
        {/* Header - Ultra Minimalist */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-32">
          <div className="flex items-baseline gap-8 mb-12">
            <IoPersonOutline className="text-gray-400 text-base mt-1 flex-shrink-0" />
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-wide">Personality Profile</h2>
          </div>
          <div className="w-20 h-px bg-gray-300" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-24">
          {/* Left Column */}
          <div className="space-y-16">
            <div className="relative">
              <SectionCard items={cardItems} activeIndex={activeCardIndex} setActiveIndex={setActiveCardIndex} />
            </div>

            <AnimatePresence mode="wait">
              <TraitDescriptionsCard key={activeTraitInfo.trait} traitType={activeTraitInfo.type} traitName={activeTraitInfo.trait} percentage={activeTraitInfo.percentage} description={activeTraitInfo.description} color={traitColors[activeTraitInfo.trait]} />
            </AnimatePresence>

            {/* Action Links */}
            <div className="flex items-center justify-between pt-8">
              <a
                href="https://www.16personalities.com/profiles/b560acc3a3d53"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium
                  text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <IoLinkOutline className="text-sm" />
                Full Profile
              </a>

              <button
                onClick={() => setShowHistory(!showHistory)}
                className="inline-flex items-center gap-2 text-xs font-medium
                  text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <IoTimeOutline className="text-sm" />
                {showHistory ? "Current" : "History"}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-base font-medium text-gray-900">Traits</h3>
              <span className="text-xs text-gray-500">{activeTest.date}</span>
            </div>

            <div className="space-y-8">
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
