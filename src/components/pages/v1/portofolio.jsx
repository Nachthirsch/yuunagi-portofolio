// src/components/main/Portfolio.jsx
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
import MBTI from "../../portofolio/mbti";

const Portfolio = () => {
  return (
    <div className="select-none">
      {/* <TableOfContents /> */}
      <Header />
      <div id="introToExperience">
        <IntroToExperience />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="introToProjects">
        <IntroToProjects />
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
