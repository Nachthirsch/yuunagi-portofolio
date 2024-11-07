import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll"; // Custom hook yang akan kita buat
import { cn } from "../../lib/utils"; // Utility function untuk conditional className
import { getCookie, setCookie } from "../../lib/cookieUtils";

// Import images
import img1 from "../../assets/gallery/img1.jpg";
import img2 from "../../assets/gallery/img2.jpg";
import img3 from "../../assets/gallery/img3.jpg";
import img4 from "../../assets/gallery/img4.jpg";
import img5 from "../../assets/gallery/img5.jpg";
import img6 from "../../assets/gallery/img6.jpg";
import img7 from "../../assets/gallery/img7.jpg";

const ImageComponent = ({ photo }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      {/* Low quality placeholder */}
      <img
        src={`${photo.url}?w=50`} // Small placeholder
        className={`absolute inset-0 w-full h-full object-cover blur-lg transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        alt={photo.title}
      />
      
      {/* High quality image */}
      <img
        src={photo.url}
        alt={photo.title}
        className={`h-full w-full object-cover transition-opacity duration-700 
          group-hover:scale-105 brightness-90 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

const Gallery = () => {
  const baseHeight = 400; // Tinggi dasar untuk kalkulasi rasio
  
  const photos = [
    {
      id: 1,
      url: img1,
      title: "Train Bridge",
      description: "Black and white architectural study",
      ratio: "4/3",
      width: "w-[533px]",
      category: "Architecture"
    },
    {
      id: 2,
      url: img2,
      title: "Jakarta Metropolitan",
      description: "Urban landscape of Jakarta",
      ratio: "3/4",
      width: "w-[300px]",
      category: "Urban"
    },
    {
      id: 3,
      url: img3,
      title: "Nature Reflection",
      description: "Peaceful lake view with trees",
      ratio: "4/3",
      width: "w-[533px]",
      category: "Nature"
    },
    {
      id: 4,
      url: img4,
      title: "Daydream",
      description: "A moment of tranquility",
      ratio: "16/9",
      width: "w-[711px]",
      category: "Human Interest"
    },
    {
      id: 5,
      url: img5,
      title: "Sea Breeze",
      description: "A serene coastal view",
      ratio: "4/3",
      width: "w-[533px]",
      category: "Landscape"
    },
    {
      id: 6,
      url: img6,
      title: "A couple and Sea",
      description: "A peaceful moment at the beach",
      ratio: "4/3",
      width: "w-[533px]",
      category: "Human Interest"
    },
    {
      id: 7,
      url: img7,
      title: "Solitude",
      description: "A quiet moment of introspection on an empty canvas",
      ratio: "18/9",
      width: "w-[800px]",
      category: "Human Interest"
    }
  ];

  const scrollRef = useRef(null);
  useHorizontalScroll(scrollRef);

  useEffect(() => {
    // Check if images are already cached
    const cachedImages = getCookie('galleryImages');
    
    if (!cachedImages) {
      // If not cached, preload images and set cookie
      const imagePromises = photos.map(photo => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = photo.url;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(imagePromises).then(() => {
        // Set cookie to mark images as cached for 7 days
        setCookie('galleryImages', 'cached', 7);
      });
    }
  }, []);

  return (
    <section className="bg-neutral-900 min-h-screen font-Hanken relative">
      {/* Enhanced Header */}
      <div className="fixed top-8 left-8 z-40">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-neutral-200 tracking-tight">
            Photography Gallery
          </h2>
          <div className="flex items-center gap-2 text-sm text-neutral-500 mt-2">
            <Camera size={14} className="opacity-60" />
            <span className="tracking-wider uppercase text-xs">Visual Stories</span>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Gallery */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-scroll overflow-y-hidden h-screen items-center px-[20vw] scrollbar-hide"
      >
        <div className="flex gap-8 items-center">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              viewport={{ once: true, margin: "0px 0px -50% 0px" }}
              className={cn(
                "relative group",
                photo.width,
                "h-[400px] flex-shrink-0"
              )}
              style={{ aspectRatio: photo.ratio }}
            >
              <ImageComponent photo={photo} />
              
              {/* Enhanced Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <span className="text-neutral-400 text-xs tracking-wider uppercase mb-2 inline-block">
                      {photo.category}
                    </span>
                    <h3 className="text-white font-medium text-xl mb-2 leading-tight">
                      {photo.title}
                    </h3>
                    <p className="text-neutral-300 text-sm leading-relaxed opacity-80">
                      {photo.description}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Subtle Border Overlay */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-neutral-500 text-sm flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center gap-2"
        >
          <div className="w-6 h-[1px] bg-neutral-700" />
          <span className="text-xs tracking-wider uppercase">Scroll to explore</span>
          <div className="w-6 h-[1px] bg-neutral-700" />
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
