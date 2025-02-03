/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import AnimatedButton from "./DownloadResume";
import InteractiveAnimation from "./InteractiveAnimationImageSec";
import { Suspense, useState } from "react";

const ImageSec = () => {
  const [animationError, setAnimationError] = useState(false);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery-section");
    if (gallerySection) {
      gallerySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="py-32 px-4 sm:px-8 md:px-16 relative overflow-hidden bg-transparent">
      {/* 3D Background Scene - With Error Handling */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="flex items-center justify-center h-full text-neutral-900">Loading Animation...</div>}>{!animationError ? <InteractiveAnimation onError={() => setAnimationError(true)} /> : <div className="flex items-center justify-center h-full text-neutral-900">Failed to load animation</div>}</Suspense>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-4 bg-neutral-100/30 rounded-lg p-6">
          <h2 className="text-4xl font-semibold tracking-tight text-black">MY STORY</h2>
          <p className="text-sm italic text-neutral-900">A selection of things I've helped create.</p>
          <div className="w-12 h-0.5 bg-neutral-900 mx-auto mt-4" />
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-8 text-black font-bold leading-relaxed  bg-neutral-100/70 rounded-lg p-6">
          {" "}
          <p>I'm all about mixing creativity with tech in the things I do. Photography isn't just snapping photos for me—it's about capturing stories and emotions in every shot. That same creative energy spills into my website design work, where I build beautiful, functional sites with tools like React and Tailwind CSS. I always aim for designs that feel just right and are easy to use. </p>
          <p>I also enjoy making sense of data. During my time with the Indonesian Statistics Bureau, I learned how to turn complicated numbers into simple, clear insights. I like finding ways to make data work for people, keeping it straightforward and useful.</p>
          <p>What excites me the most is working with AI. I'm always exploring how I can use AI tools to make my projects smarter and more efficient. Whether it's automating boring tasks or improving user experiences, I'm eager to try new things and push boundaries. Creativity and tech-savviness keep me motivated and ready for the next challenge.</p>
        </motion.div>

        {/* CTA Button */}
        <div className="relative z-10">
          <AnimatedButton text="Check My Works" onClick={scrollToGallery} />
        </div>
      </div>
    </section>
  );
};

export default ImageSec;
