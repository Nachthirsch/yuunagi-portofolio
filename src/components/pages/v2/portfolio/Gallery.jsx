/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedButton from "./DownloadResume";

// Import images directly
import image1 from "../../../../assets/gallery/img1.jpg";
import image2 from "../../../../assets/gallery/img2.jpg";
import image3 from "../../../../assets/gallery/img3.jpg";
import image4 from "../../../../assets/gallery/img4.jpg";
import image5 from "../../../../assets/gallery/img5.jpg";
import image6 from "../../../../assets/gallery/img6.jpg";
import image7 from "../../../../assets/gallery/img7.jpg";
import image8 from "../../../../assets/gallery/img8.jpg";
import image9 from "../../../../assets/gallery/img9.jpg";
import image10 from "../../../../assets/gallery/img10.jpg";

const SectionHeader = ({ subtitle, title, highlightedWord }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center mb-24">
      <span className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4 block">{subtitle}</span>
      <h2 className="text-5xl font-light text-neutral-800 mb-6">
        {title} <span className="font-semibold">{highlightedWord}</span>
      </h2>
      <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
    </motion.div>
  );
};

const Gallery = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Create arrays with the correct number of images
  const desktopImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9];
  const mobileImages = [image1, image2, image3, image4, image5, image6, image7, image8, image10];

  // Separate grid positions for desktop and mobile
  const desktopGridPositions = [
    "lg:col-span-3 lg:row-span-2 col-span-2", // Train/Bridge (Large)
    "lg:col-span-1 col-span-1", // City Traffic
    "lg:col-span-1 col-span-1", // Lake/Nature
    "lg:col-span-1 col-span-1", // Building Interior
    "lg:col-span-1 col-span-1 lg:row-span-2", // Beach/Ocean
    "lg:col-span-2 col-span-2", // People at Beach
    "lg:col-span-1 col-span-1", // Hand Close-up
    "lg:col-span-1 col-span-1", // People Standing
    "lg:col-span-1 col-span-1", // Last image (desktop)
  ];

  const mobileGridPositions = [
    "col-span-2", // Train/Bridge
    "col-span-1", // City Traffic
    "col-span-1", // Lake/Nature
    "col-span-1", // Building Interior
    "col-span-1", // Beach/Ocean
    "col-span-2", // People at Beach
    "col-span-1", // Hand Close-up
    "col-span-1", // People Standing
    "col-span-2", // Last image (mobile)
  ];

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Select appropriate arrays based on device
  const images = isMobile ? mobileImages : desktopImages;
  const gridPositions = isMobile ? mobileGridPositions : desktopGridPositions;

  return (
    <div id="gallery-section" className="container mx-auto px-4 py-16">
      <SectionHeader subtitle="Gallery" title="My" highlightedWord="Works" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[300px]">
        {mounted &&
          images.map((image, index) => (
            <motion.div key={`${isMobile ? "mobile" : "desktop"}-${index}`} className={`relative overflow-hidden ${gridPositions[index]}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ scale: 1.02 }}>
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 hover:opacity-0" />
              <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </motion.div>
          ))}
      </div>
      <div className="mt-12 text-center">
        <AnimatedButton text="See More on Instagram" onClick={() => window.open("https://www.instagram.com/nachthirsch/", "_blank")} />
      </div>
    </div>
  );
};

export default Gallery;
