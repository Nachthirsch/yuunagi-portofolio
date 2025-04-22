import { motion, AnimatePresence } from "framer-motion";
import { IoPersonOutline, IoLinkOutline, IoTimeOutline } from "react-icons/io5";
import { useState } from "react";
import { SectionCard } from "./mbti/SectionCard";
import { TraitProgress } from "./mbti/TraitProgress";
import { TraitDescriptionsCard } from "./mbti/TraitDescriptionsCard";
import { traitColors, testData, traitDescriptions } from "../../data/mbtiData";

// Simplified animation variants for performance
const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

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
    <section className="py-12 px-4 sm:px-6 bg-neutral-900 font-Hanken tracking-wider relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-neutral-800 opacity-20 rotate-12" 
           style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}></div>
      <div className="absolute bottom-40 right-10 w-32 h-32 bg-neutral-800 opacity-10 -rotate-6"
           style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div {...fadeIn} className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-300 tracking-wider flex items-center gap-3 text-shadow-neo">
              <div className="p-3 bg-neutral-800 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] rotate-2">
                <IoPersonOutline className="text-neutral-400" />
              </div>
              Personality Profile
            </h2>
            <motion.div className="h-2 w-24 bg-neutral-300 mt-4 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] rotate-1" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative">
              <SectionCard 
                items={cardItems} 
                activeIndex={activeCardIndex} 
                setActiveIndex={setActiveCardIndex} 
              />
              
              {/* Neobrutalism corner accent */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-neutral-700 border-2 border-black rotate-12 z-0"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neutral-700 border-2 border-black -rotate-6 z-0"></div>
            </div>
            
            <AnimatePresence mode="wait">
              <TraitDescriptionsCard 
                key={activeTraitInfo.trait} 
                traitType={activeTraitInfo.type} 
                traitName={activeTraitInfo.trait} 
                percentage={activeTraitInfo.percentage} 
                description={activeTraitInfo.description} 
                color={traitColors[activeTraitInfo.trait]} 
              />
            </AnimatePresence>
            
            <div className="flex items-center px-2 justify-between">
              <a 
                href="https://www.16personalities.com/profiles/b560acc3a3d53" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-neutral-400 hover:text-neutral-300 inline-flex items-center gap-2 
                           p-2 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] bg-neutral-800
                           hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_rgba(0,0,0,0.8)] 
                           active:translate-y-[0px] active:shadow-[3px_3px_0px_rgba(0,0,0,0.8)]
                           transition-all duration-200"
              >
                <IoLinkOutline />
                Full Profile
              </a>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowHistory(!showHistory)} 
                  className="flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-300
                             p-2 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] 
                             bg-neutral-800 hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_rgba(0,0,0,0.8)] 
                             active:translate-y-[0px] active:shadow-[3px_3px_0px_rgba(0,0,0,0.8)]
                             transition-all duration-200"
                >
                  <IoTimeOutline />
                  {showHistory ? "View Current" : "View History"}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2 mb-4">
              <h3 className="text-base font-extrabold text-neutral-100 uppercase text-shadow-small border-b-2 border-neutral-700 pb-1">
                Personality Traits
              </h3>
              <span className="text-xs text-neutral-400 font-bold px-3 py-1 bg-neutral-800 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                Test: {activeTest.date}
              </span>
            </div>
            
            <div className="space-y-3">
              {activeTest.traits.map((item, index) => (
                <TraitProgress 
                  key={index} 
                  trait={item.trait} 
                  opposite={item.opposite} 
                  percentage={item.percentage} 
                  index={index} 
                  color={traitColors[item.trait]} 
                  onHover={setActiveTraitInfo} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Global neobrutalism styles */}
      <style className="global-styles">
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
        `}
      </style>
    </section>
  );
};

export default MBTI;
