// src/components/main/Portfolio.jsx
import { useState, useEffect } from "react";
import Header from "../../portofolio/header";
import Experience from "../../portofolio/experience";
import ImageSection from "../../portofolio/imageSec";
import CertificatesSection from "../../portofolio/certificates";
import ActivitiesTimeline from "../../portofolio/activities";
import ProjectSection from "../../portofolio/projects";
import TechStack from "../../portofolio/tech_stacks";
import Footer from "../../portofolio/footer";
import TableOfContents from "../../portofolio/TableOfContents";
import IntroToExperience from "../../portofolio/introToExperience";
import IntroToProjects from "../../portofolio/introToProjects";
import IntroToActivities from "../../portofolio/introToActivities";
import MBTI from "../../portofolio/mbti";

const Portfolio = () => {
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Prevent scroll events
  useEffect(() => {
    const preventScroll = (e) => {
      if (isScrollLocked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const preventKeyScroll = (e) => {
      if (isScrollLocked && ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) {
        e.preventDefault();
        return false;
      }
    };

    if (isScrollLocked) {
      // Store current scroll position before locking
      setScrollPosition(window.scrollY);

      // Prevent scroll via multiple methods, but without using position:fixed which causes issues
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Add event listeners
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventKeyScroll, { passive: false });
      document.addEventListener("scroll", preventScroll, { passive: false });
    } else {
      // Restore scroll
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      // Remove event listeners
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
      document.removeEventListener("scroll", preventScroll);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
      document.removeEventListener("scroll", preventScroll);
    };
  }, [isScrollLocked]);

  // Function to handle scroll locking for intro components
  const handleAnimationStart = (sectionId) => {
    console.log(`Animation starting in section: ${sectionId}`);
    setIsScrollLocked(true);
  };

  const handleAnimationComplete = (sectionId) => {
    console.log(`Animation completed in section: ${sectionId}`);
    setIsScrollLocked(false);
  };

  return (
    <div className="select-none">
      {/* <TableOfContents /> */}
      <Header />
      <div id="introToExperience">
        <IntroToExperience onAnimationStart={() => handleAnimationStart("introToExperience")} onAnimationComplete={() => handleAnimationComplete("introToExperience")} />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="introToProjects">
        <IntroToProjects onAnimationStart={() => handleAnimationStart("introToProjects")} onAnimationComplete={() => handleAnimationComplete("introToProjects")} />
      </div>
      <div id="projects">
        <ProjectSection />
      </div>
      <div id="certificates">
        <CertificatesSection />
      </div>
      <div id="imageSection">
        <ImageSection />
      </div>
      <div id="mbti">
        <MBTI />
      </div>
      <div id="introToActivities">
        <IntroToActivities onAnimationStart={() => handleAnimationStart("introToActivities")} onAnimationComplete={() => handleAnimationComplete("introToActivities")} />
      </div>
      <div id="activities">
        <ActivitiesTimeline />
      </div>
      <div id="techStacks">
        <TechStack />
      </div>
    </div>
  );
};

export default Portfolio;
