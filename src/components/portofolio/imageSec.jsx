import { motion } from "framer-motion";
import me from "../../assets/me_1.jpg";

const ImageSec = () => {
  return (
    <section className="h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-16 bg-neutral-900 font-Hanken tracking-wider overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        {/* Simple header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">ABOUT</h2>
          <p className="text-neutral-300 text-base sm:text-lg">A little bit more about me</p>
        </motion.div>

        {/* Content area - compact layout */}
        <div className="h-[calc(100vh-300px)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-center">
            {/* Image section - compact */}
            <div className="lg:col-span-1 flex flex-col items-center">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative w-full max-w-[240px]">
                <img src={me} alt="Profile" className="w-full h-auto aspect-[3/4] object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-out" />
              </motion.div>

              {/* Simple quote below image */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} viewport={{ once: true }} className="mt-4 text-center max-w-[240px]">
                <p className="text-xs text-neutral-400 italic leading-relaxed">
                  "<span className="text-neutral-200 font-medium not-italic">Terang</span> yang kau dambakan, hilanglah semua yang kau <span className="text-neutral-200 font-medium not-italic">tanya</span>."
                </p>
              </motion.div>
            </div>

            {/* Content section - enhanced typography only here */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="space-y-8">
                {/* Opening statement with typography */}
                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-relaxed tracking-wide">I love language exchange and exploring new technologies</h3>

                  {/* Enhanced description paragraphs */}
                  <div className="space-y-6 text-neutral-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm leading-loose font-light">
                          I can hold daily conversations in{" "}
                          <span className="relative text-white font-medium">
                            English
                            <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white to-transparent opacity-40"></span>
                          </span>
                          , although I'm still working on my grammar. I also know a little{" "}
                          <span className="relative text-white font-medium">
                            Japanese
                            <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white to-transparent opacity-40"></span>
                          </span>
                          , even if it's at a beginner level.
                        </p>
                      </div>

                      <div>
                        <p className="text-sm leading-loose font-light">
                          I'm always exploring how I can use{" "}
                          <span className="relative text-white font-medium">
                            AI tools
                            <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white to-transparent opacity-40"></span>
                          </span>{" "}
                          to make my projects smarter and more efficient. Whether it's automating tasks or improving user experiences.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simple interests section */}
                <div className="pt-2">
                  <div className="text-neutral-500 text-xs uppercase tracking-widest mb-4 font-medium">Current Interests</div>
                  <div className="flex flex-wrap gap-2">
                    {["Web Development", "Photography", "Music Production", "AI Integration", "Language Exchange"].map((interest, index) => (
                      <motion.span
                        key={interest}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className="text-xs text-neutral-400 font-light tracking-wide hover:text-neutral-200 transition-colors duration-300 border-b border-transparent hover:border-neutral-600 pb-1"
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSec;
