// src/components/main/Portfolio.jsx
import Header from "../../portofolio/header";
import Experience from "../../portofolio/experience";
import ImageSection from "../../portofolio/imageSec";
import CertificatesSection from "../../portofolio/certificates";
import ActivitiesTimeline from "../../portofolio/activities";
import ProjectSection from "../../portofolio/projects";
import TechStack from "../../portofolio/tech_stacks";
import Footer from "../../portofolio/footer";
import MBTI from "../../portofolio/mbti";
import ScrollTransition from "../../portofolio/ScrollTransition";

const Portfolio = () => {
  const sections = [
    { id: "header", component: <Header /> },
    { id: "experience", component: <Experience /> },
    { id: "projects", component: <ProjectSection /> },
    { id: "certificates", component: <CertificatesSection /> },
    { id: "imageSection", component: <ImageSection /> },
    { id: "mbti", component: <MBTI /> },
    { id: "activities", component: <ActivitiesTimeline /> },
    { id: "techStacks", component: <TechStack /> },
  ];

  return (
    <div className="select-none">
      <ScrollTransition sections={sections} />
    </div>
  );
};

export default Portfolio;
