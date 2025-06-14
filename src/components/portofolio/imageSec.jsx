/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import me from "../../assets/me_1.jpg";

const ImageSec = () => {
  return (
    <section className="h-screen bg-gray-50 overflow-hidden flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-20">
        {/* Side by Side Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left Side - Large Image */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-80 h-96 lg:w-96 lg:h-[480px] relative overflow-hidden">
              <img src={me} alt="Profile" className="w-full h-full object-cover rounded-sm transition-transform duration-700 hover:scale-105" />

              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50/10 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="lg:w-1/2 space-y-6 text-left">
            {/* Bio Text */}
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed text-base">
                I love language exchange! I can hold daily conversations in <span className="font-medium text-gray-900 px-2 py-1 bg-gray-100 rounded-sm text-sm">English</span>, although I'm still working on my grammar. I also know a little <span className="font-medium text-gray-900 px-2 py-1 bg-gray-100 rounded-sm text-sm">Japanese</span>, even if it's at a beginner level!
              </p>

              <p className="text-gray-600 leading-relaxed text-base">
                I'm always exploring how I can use <span className="font-medium text-gray-900 border-b border-gray-300">AI tools</span> to make my projects smarter and more efficient. Whether it's automating boring tasks or improving user experiences, I'm eager to try new things.
              </p>

              <p className="text-gray-600 leading-relaxed text-base">Creativity and tech-savviness keep me motivated and ready for the next challenge.</p>
            </div>

            {/* Connect Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Connect:</h4>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/handra-putratama-tanjung/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  LinkedIn
                </a>
                <span className="text-gray-300">•</span>
                <a href="https://github.com/Nachthirsch" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  GitHub
                </a>
                <span className="text-gray-300">•</span>
                <a href="mailto:handraputratama@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm">
                  Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImageSec;
