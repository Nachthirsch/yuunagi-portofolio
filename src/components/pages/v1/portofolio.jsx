// src/components/main/Portfolio.jsx
import Header from "../../portofolio/header";
import Experience from "../../portofolio/experience";
import ImageSection from "../../portofolio/imageSec";
import CertificatesSection from "../../portofolio/certificates";
import ActivitiesTimeline from "../../portofolio/activities";
import ProjectSection from "../../portofolio/projects";
import TechStack from "../../portofolio/tech_stacks";
import Footer from "../../portofolio/footer";

const Portfolio = () => {
  return (
    <div className="select-none">
      <Header />
      <div id="experience">
        <Experience />
      </div>
      <div id="imageSection">
        <ImageSection />
      </div>
      <div id="certificates">
        <CertificatesSection />
      </div>
      <div id="activities">
        <ActivitiesTimeline />
      </div>
      <div id="projects">
        <ProjectSection />
      </div>
      <div id="techStacks">
        <TechStack />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
