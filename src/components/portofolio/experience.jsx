import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

// Modal Component - Works for both Experience and Education
const DetailModal = ({ item, closeModal }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-1">{item.company}</p>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-xs text-gray-500">{item.date}</p>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-xs font-medium text-gray-500">{item.label}</span>
            </div>
          </div>

          <button onClick={closeModal} className="text-gray-400 hover:text-gray-900 transition-colors">
            <IoClose size={20} />
          </button>
        </div>

        <div className="w-full h-px bg-gray-100 my-5"></div>

        <div className="space-y-4">
          {item.description.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-gray-400 text-xs mt-1.5">•</span>
              <p className="text-sm text-gray-600">{detail}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Timeline Dot Component
const TimelineDot = ({ index, openModal, experience, position, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.3 }} // Increased delay for better timing
      className="group absolute cursor-pointer z-10"
      onClick={() => openModal(experience)}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Index number always visible */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full">
        <span className="text-gray-800 font-medium text-xs">{index + 1}</span>
      </div>

      {/* Dot */}
      <div className={`w-3 h-3 ${type === "experience" ? "bg-gray-800" : "bg-gray-500"} rounded-full group-hover:scale-150 transition-all duration-300`}></div>

      {/* Tooltip on hover */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-2 rounded shadow-md w-48 z-20">
        <p className="text-xs font-medium text-gray-900">{experience.title}</p>
        <p className="text-xs text-gray-600">{experience.company}</p>
        <p className="text-xs text-gray-500">{experience.date}</p>
      </div>
    </motion.div>
  );
};

// Improved Connection Line Component with dashed lines for animation
const ConnectionLine = ({ start, end, index }) => {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, delay: index * 0.3 + 0.3 },
        opacity: { duration: 0.01, delay: index * 0.3 + 0.3 },
      },
    },
  };

  return <motion.path d={`M${start.x},${start.y} L${end.x},${end.y}`} stroke="#1e2b3b" strokeWidth="0.05" fill="none" variants={pathVariants} initial="hidden" animate="visible" />;
};

// SVG Path Component - completely revised for better animations
const ConnectionLines = ({ positions }) => {
  // Calculate viewport coordinates from percentages for SVG drawing
  const svgPoints = positions.map((pos) => ({
    x: pos.x, // These are percentage values we'll use as SVG viewBox coordinates
    y: pos.y,
  }));

  return (
    <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
      {svgPoints.map((point, index) => {
        if (index < svgPoints.length - 1) {
          const nextPoint = svgPoints[index + 1];
          return <ConnectionLine key={`line-${index}`} start={point} end={nextPoint} index={index} />;
        }
        return null;
      })}
    </svg>
  );
};

// Skills Item Component
const SkillItem = ({ skill }) => <span className="text-xs py-1 px-3 bg-gray-50 text-gray-600 rounded-full">{skill}</span>;

const Experience = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [experiencePositions, setExperiencePositions] = useState([]);
  const [educationPositions, setEducationPositions] = useState([]);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  const experiences = [
    {
      title: "Data and Map Processing Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Sep 2022 – Nov 2022",
      label: "Contract",
      description: ["Processed and analyzed ST2023 results, including over 1000 building points and 300+ SLS maps using QGIS to determine land cover for 200+ areas.", "Leveraged Python programming for task automation, improving efficiency and accuracy."],
    },
    {
      title: "Data Entry Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Jan 2023 – Mar 2023",
      label: "Contract",
      description: ["Accurately entered 1000+ data points monthly into the system.", "Ensuring data entry accuracy through verification against processed results.", "Conducted data validation, error correction, and reporting on input outcomes."],
    },
    {
      title: "Data and Map Processing Operator",
      company: "Badan Pusat Statistik Bogor Regency, WJ",
      date: "Sep 2023 – Des 2023",
      label: "Contract",
      description: ["ST2023 Spatial Framework and Wilkerstat (Wilayah Kerja Statistik) Load Update", "Processed and analyzed 1000+ building points and 300+ SLS maps using QGIS to assess land cover for 200+ areas.", "Leveraged Python programming for task automation, enhancing efficiency and accuracy."],
    },
    {
      title: "Frontend Developer",
      company: "PT Bee Telematic Solutions",
      date: "Sep 2024 - Dec 2024",
      label: "Internship",
      description: ["Developing a company portfolio website showcasing completed projects using technologies like React, Tailwind CSS, and any other technologies that I'm learning.", "Ensuring responsive design and optimal user experience across devices and browsers.", "Implementing animations and interactivity to enhance engagement on the website."],
    },
  ];

  const education = [
    {
      title: "ReactJS for Front-end Website Developer",
      company: "Hacktiv8 Indonesia",
      date: "Sep 2024 – Dec 2024",
      label: "Bootcamp",
      description: ["Completed intensive front-end development bootcamp focusing on React.js", "Built multiple real-world projects using React, Redux, and modern JavaScript", "Implemented responsive design principles and component-based architecture", "Collaborated with peers on group projects using Git and Agile methodologies"],
    },
  ];

  const skills = ["React", "JavaScript", "HTML/CSS", "Tailwind CSS", "Python", "QGIS", "Data Processing", "Responsive Design", "UI/UX"];

  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "auto";
  };

  // Generate random positions for dots
  useEffect(() => {
    const generateRandomPositions = (count, existingPositions = [], margin = 10) => {
      const positions = [];

      for (let i = 0; i < count; i++) {
        let isOverlapping = true;
        let attempts = 0;
        let newPosition;

        // Try to place dots without overlap, but prevent infinite loop
        while (isOverlapping && attempts < 100) {
          attempts++;

          // Create more visual spacing across the container
          newPosition = {
            x: Math.random() * 60 + 20, // 20-80% of width for better spacing
            y: Math.random() * 60 + 20, // 20-80% of height for better spacing
          };

          isOverlapping = [...existingPositions, ...positions].some((pos) => Math.sqrt(Math.pow(pos.x - newPosition.x, 2) + Math.pow(pos.y - newPosition.y, 2)) < margin);
        }

        positions.push(newPosition);
      }

      return positions;
    };

    // Generate positions for experience dots
    const expPositions = generateRandomPositions(experiences.length);
    setExperiencePositions(expPositions);

    // Generate positions for education dots, avoiding overlap with experience dots
    const eduPositions = generateRandomPositions(education.length, expPositions, 15);
    setEducationPositions(eduPositions);
  }, [experiences.length, education.length]);

  // Add intersection observer to trigger animations when the component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  // Animation sequence for the entire component entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="w-full max-w-6xl" ref={containerRef}>
        {/* Timeline visualization - Only render animations when in view */}
        {isInView && (
          <div className="relative h-[70vh] mb-16">
            {/* SVG Lines with animated drawing effect */}
            <ConnectionLines positions={experiencePositions} />

            {/* Experience Timeline Dots */}
            {experiencePositions.map((position, index) => (
              <TimelineDot key={`exp-${index}`} index={index} openModal={openModal} experience={experiences[index]} position={position} type="experience" />
            ))}

            {/* Education Dots */}
            {educationPositions.map((position, index) => (
              <TimelineDot
                key={`edu-${index}`}
                index={experiencePositions.length + index} // Continue numbering from experiences
                openModal={openModal}
                experience={education[index]}
                position={position}
                type="education"
              />
            ))}

            {/* Legend */}
            <motion.div className="absolute bottom-4 right-4 flex items-center gap-5 px-3 py-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: experiencePositions.length * 0.3 + 0.5 }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                <span className="text-xs text-gray-600">Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Education</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* If not yet in view, show placeholder */}
        {!isInView && (
          <div className="h-[70vh] mb-16 flex items-center justify-center">
            <div className="animate-pulse w-12 h-12 rounded-full bg-gray-200"></div>
          </div>
        )}
      </div>

      {/* Modal for both experience and education */}
      {selectedItem && <DetailModal item={selectedItem} closeModal={closeModal} />}
    </motion.section>
  );
};

export default Experience;
