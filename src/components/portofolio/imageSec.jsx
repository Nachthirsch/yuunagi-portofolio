/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import me from "../../assets/me_1.jpg";

const ImageSec = () => {
  return (
    <section className="relative py-8 sm:py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 overflow-hidden">
      {/* Decorative background elements for neobrutalism style - replacing particles */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-neutral-800 opacity-10 rotate-12"
           style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}></div>
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-neutral-800 opacity-10 -rotate-6"
           style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}></div>
      <div className="absolute top-40 right-1/4 w-16 h-16 bg-neutral-800 opacity-5 rotate-45"
           style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}></div>
      <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-neutral-800 opacity-5 -rotate-12"
           style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-10 lg:gap-12">
          {/* Description Section - Neobrutalism Style */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.7 }} 
            className="flex-1 w-full lg:w-auto"
          >
            <motion.div className="relative mb-6">
              <div className="absolute -left-3 -top-3 w-16 h-16 bg-neutral-700 opacity-20 rotate-12 z-0"></div>
              <motion.h1
                className="text-2xl sm:text-3xl text-neutral-100 font-extrabold relative z-10 uppercase text-shadow-neo"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                A little bit more info about me!
              </motion.h1>
              <motion.div 
                className="w-28 h-2 bg-neutral-300 mt-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] rotate-1" 
                initial={{ width: 0 }} 
                whileInView={{ width: "7rem" }} 
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>
            
            <div className="bg-neutral-800 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] p-6 rotate-1">
              <div className="-rotate-1">
                <p className="text-base sm:text-lg text-neutral-100 font-medium mb-4 sm:mb-6 leading-relaxed">
                  I love language exchange! I can hold daily conversations in{" "}
                  <span className="text-white font-extrabold bg-neutral-700 px-2 py-0.5 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] inline-block transform -rotate-1 border-2 border-black mx-1">
                    English
                  </span>, although I&apos;m still working on my grammar. I also know a little{" "}
                  <span className="text-white font-extrabold bg-neutral-700 px-2 py-0.5 shadow-[2px_2px_0px_rgba(0,0,0,0.8)] inline-block transform rotate-1 border-2 border-black mx-1">
                    Japanese
                  </span>, even if it&apos;s at a beginner level!
                </p>
                <p className="text-base sm:text-lg text-neutral-100 mb-4 sm:mb-6 leading-relaxed">
                  I'm always exploring how I can use{" "}
                  <span className="text-white font-extrabold border-b-2 border-neutral-500">
                    Al tools
                  </span>{" "}
                  to make my projects smarter and more efficient. Whether it's automating boring tasks or improving user experiences, I'm eager to try new things and push boundaries. Creativity and tech-savviness keep me motivated and ready for the next challenge.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card Section - Neobrutalism Style */}
          <div className="flex flex-col items-center w-full lg:w-auto p-4 sm:p-6 lg:p-10">
            {/* Image Container with Neobrutalism Effects */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.7 }} 
              className="relative group w-full max-w-[280px] sm:max-w-xs rotate-3"
            >
              {/* Main Image */}
              <div className="relative z-10">
                <img 
                  src={me} 
                  alt="Profile" 
                  className="w-full h-auto aspect-[4/5] object-cover border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-2 hover:translate-x-2 hover:shadow-[10px_10px_0px_rgba(0,0,0,0.8)]" 
                />
                
                {/* Decorative elements - neobrutalism style */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-neutral-700 z-0 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] -rotate-6"></div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-neutral-600 z-0 rotate-12"></div>
              </div>
            </motion.div>

            {/* Name Tag - Neobrutalism Style */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.7 }} 
              className="mt-8 text-center group bg-neutral-800 border-3 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.8)] p-4 -rotate-2 transform hover:rotate-0 transition-transform duration-300"
            >
              <p className="text-sm sm:text-base text-neutral-400 mt-1 pl-1 font-bold rotate-2">i see you in every poem i read</p>
              <p className="text-sm sm:text-base text-neutral-400 pl-2.5 font-bold rotate-2">i see you in every word i speak</p>
              <p className="text-sm sm:text-base text-neutral-400 pl-2.5 italic font-semibold rotate-2">
                To you who always turns toward the sun, like a{" "}
                <span className="text-amber-200 font-extrabold border-b-2 border-amber-200/50">
                  sunflower
                </span>—.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Styles untuk neobrutalism */}
      <style className="text-shadow-styles">
        {`
          .text-shadow-neo {
            text-shadow: 4px 4px 0px rgba(0,0,0,0.8);
          }
          .border-3 {
            border-width: 3px;
          }
        `}
      </style>
    </section>
  );
};

export default ImageSec;
