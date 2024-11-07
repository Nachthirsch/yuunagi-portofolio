import { motion } from "framer-motion";
import yorushika from "../../assets/yorushika.svg";
import me from "../../assets/me_1.jpg";

const ImageSec = () => (
  <section className="py-8 sm:py-16 px-4 sm:px-8 md:px-16 bg-neutral-900">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8">
        {/* Description Section */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1 w-full lg:w-auto">
          <motion.h1
            className="text-2xl sm:text-3xl text-neutral-400 mb-4 sm:mb-6 leading-relaxed relative inline-block"
            initial={{ backgroundSize: "0 2px" }}
            whileInView={{ backgroundSize: "100% 2px" }}
            transition={{ duration: 0.7 }}
            style={{
              backgroundImage: "linear-gradient(currentColor, currentColor)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 100%",
              letterSpacing: ".1em",
            }}
          >
            A little bit more info about me!
          </motion.h1>
          <p className="text-base sm:text-lg text-neutral-400 mb-4 sm:mb-6 leading-relaxed">
            I love language exchange! I can hold daily conversations in <span className="text-white">English</span> , although I&apos;m still working on my grammar. I also know a little <span className="text-white">Japanese</span>, even if it&apos;s at a beginner level!
          </p>
          <p className="text-base sm:text-lg text-neutral-400 mb-4 sm:mb-6 leading-relaxed">I love listen to music! I listen to a lot of different genres, but my favorite are Indie-rock, ambient, or indie folk!. Such artists as Novo Amor, Reruntuh, and Iron & Wine are some of my favorites.</p>
          <p className="text-base sm:text-lg text-neutral-400 mb-4 sm:mb-6 leading-relaxed">
            But! My top artist all the time is ヨルシカ！
            <span className="inline-table ml-2">
              <img src={yorushika} alt="Yorushika Icon" className="w-8.5 h-7 align-middle filter invert" />
            </span>
          </p>
          <div className="max-w-3xl w-full space-y-8">
            {/* Japanese Verse */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="relative">
              <div className="absolute -left-4 top-0 h-full w-1 bg-neutral-500/20" />
              <blockquote className="text-xl sm:text-2xl font-Hina text-neutral-300 mb-6 leading-relaxed tracking-wider pl-6">
                君に茜差す日々の歌を
                <br />
                美しい夜が知りたいのだ
                <br />
                花惑う夏を待つ僕に差す月明かり
              </blockquote>
            </motion.div>

            {/* English Translation */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }} className="relative">
              <div className="absolute -left-4 top-0 h-full w-1 bg-neutral-500/20" />
              <blockquote className="text-lg sm:text-xl font-Hina text-neutral-400 leading-relaxed italic pl-6">
                Through this song of those days with you
                <br />
                aglow in the red of the sunset
                <br />
                I want to know a beautiful night
                <br />
                Lost in flowers, waiting for the summer,
                <br />
                the moon leaves me glowing in its light
              </blockquote>
            </motion.div>
          </div>
        </motion.div>

        {/* Card Section */}
        <div className="flex flex-col items-center w-full lg:w-auto p-4 sm:p-6 lg:p-10">
          {/* Image Container with Effects */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative group w-full max-w-[280px] sm:max-w-xs">
            {/* Background Shape */}
            <motion.div
              className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-neutral-600 to-neutral-800 opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            {/* Main Image */}
            <div className="relative">
              <img src={me} alt="Profile" className="w-full h-auto aspect-[4/5] object-cover rounded-lg hover:grayscale-0 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          {/* Name Tag */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="mt-4 sm:mt-6 text-center group">
            <p className="text-sm sm:text-base text-neutral-400 mt-1 pl-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">i see you in every poem i read</p>
            <p className="text-sm sm:text-base text-neutral-400 pl-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">i see you in every word i speak</p>
            <p className="text-sm sm:text-base text-neutral-400 pl-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 italic font-semibold">
              To you who always turns toward the sun, like a <span className="text-amber-200">sunflower</span>—.
            </p>
            /
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default ImageSec;
