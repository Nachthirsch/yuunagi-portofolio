// src/components/main/Portfolio.jsx
import { useState, useEffect } from "react";
import Header from "../../portofolio/header";
import Experience from "../../portofolio/experience";
import ImageSection from "../../portofolio/imageSec";
import CertificatesSection from "../../portofolio/certificates";
import ActivitiesTimeline from "../../portofolio/activities";
import ProjectSection from "../../portofolio/projects";
import TechStack from "../../portofolio/tech_stacks";
import IntroToExperience from "../../portofolio/introToExperience";
import IntroToProjects from "../../portofolio/introToProjects";
import IntroToActivities from "../../portofolio/introToActivities";
import MBTI from "../../portofolio/mbti";
import OutroPortfolio from "../../portofolio/outroPortfolio";

const Portfolio = () => {
  // Function to handle animation events (now just for logging)
  const handleAnimationStart = (sectionId) => {
    console.log(`Animation starting in section: ${sectionId}`);
  };

  const handleAnimationComplete = (sectionId) => {
    console.log(`Animation completed in section: ${sectionId}`);
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
      <div id="outroPortfolio">
        <OutroPortfolio onAnimationStart={() => handleAnimationStart("outroPortfolio")} onAnimationComplete={() => handleAnimationComplete("outroPortfolio")} />
      </div>
    </div>
  );
};

export default Portfolio;
