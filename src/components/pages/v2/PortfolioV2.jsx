import { motion } from "framer-motion";
import Hero from "./portfolio/Hero";
import Experience from "./portfolio/Experience";
import ImageSec from "./portfolio/ImageSec";
import Gallery from "./portfolio/Gallery";
import Certificates from "./portfolio/Certificates";
import Activities from "./portfolio/activities";
import Projects from "./portfolio/Projects";
import TechStack from "./portfolio/TechStack";
import Footer from "./portfolio/Footer";
import NavV2 from "../../nav";

const PortfolioV2 = () => {
  return (
    <div className="bg-white scrollbar-hide">
      <NavV2 />
      {/* Smooth Scroll Container */}
      <div className="h-screen overflow-y-auto scrollbar-hide scroll-smooth">
        {/* Fixed Background Pattern */}
        <div className="fixed inset-0 bg-grid-neutral-100 opacity-40 pointer-events-none" />
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <Experience />
          <ImageSec />
          <Gallery/>
          <Certificates />
          <Activities />
          <Projects />
          <TechStack />
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioV2;