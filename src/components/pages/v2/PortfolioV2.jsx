import { motion } from "framer-motion";
import Hero from "./portfolio/Hero";
import Experience from "./portfolio/Experience";
import ImageSec from "./portfolio/ImageSec";
import Gallery from "./portfolio/Gallery";
import Certificates from "./portfolio/Certificates";
import Activities from "./portfolio/Activities";
import Projects from "./portfolio/Projects";
import TechStack from "./portfolio/TechStack";
import Footer from "./portfolio/Footer";
import NavV2 from "../../nav";
import TableOfContents from "./portfolio/TableOfContents";

const PortfolioV2 = () => {
  return (
    <div className="bg-white scrollbar-hide">
      <NavV2 />
      <TableOfContents />
      {/* Smooth Scroll Container */}
      <div className="h-screen overflow-y-auto scrollbar-hide scroll-smooth">
        {/* Fixed Background Pattern */}
        <div className="fixed inset-0 bg-grid-neutral-100 opacity-40 pointer-events-none" />

        {/* Content */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <section id="hero">
            <Hero />
          </section>
          <section id="experience">
            <Experience />
          </section>
          <section id="story">
            <ImageSec />
          </section>
          <section id="gallery-section">
            <Gallery />
          </section>
          <section id="certificates">
            <Certificates />
          </section>
          <section id="activities">
            <Activities />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="tech-stack">
            <TechStack />
          </section>
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioV2;
