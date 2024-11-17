import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import InteractiveAnimationImageSec from "./InteractiveAnimationImageSec";
import AnimatedButton from "./DownloadResume";

const ImageSec = () => {
  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) {
      gallerySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <InteractiveAnimationImageSec>
      <section className="py-32 px-4 sm:px-8 md:px-16 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-semibold tracking-tight text-neutral-800">
              MY STORY
            </h2>
            <p className="text-sm italic text-neutral-500">
              A selection of things I've helped create.
            </p>
            <div className="w-12 h-0.5 bg-neutral-200 mx-auto mt-4" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 text-neutral-600 leading-relaxed"
          >
            <p>
            I’m all about mixing creativity with tech in the things I do. Photography isn’t just snapping photos for me—it’s about capturing stories and emotions in every shot. That same creative energy spills into my website design work, where I build beautiful, functional sites with tools like React and Tailwind CSS. I always aim for designs that feel just right and are easy to use.            </p>
            <p>
            I also enjoy making sense of data. During my time with the Indonesian Statistics Bureau, I learned how to turn complicated numbers into simple, clear insights. I like finding ways to make data work for people, keeping it straightforward and useful.
            </p>
            
            <p>
            What excites me the most is working with AI. I’m always exploring how I can use AI tools to make my projects smarter and more efficient. Whether it’s automating boring tasks or improving user experiences, I’m eager to try new things and push boundaries. Creativity and tech-savviness keep me motivated and ready for the next challenge.
            </p>
          </motion.div>

          {/* CTA Button */}
          <AnimatedButton 
            text="Check My Works" 
            onClick={scrollToGallery}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]" />
        </div>
      </section>
    </InteractiveAnimationImageSec>
  );
};

export default ImageSec;
