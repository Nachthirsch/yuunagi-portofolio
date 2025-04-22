import { HiCode } from "react-icons/hi";
import { SiAdobephotoshop, SiAdobelightroom, SiPostgresql, SiQgis, SiPython, SiHtml5, SiCss3, SiPhp, SiJavascript, SiCodeigniter, SiReact, SiTailwindcss, SiExpress, SiFigma } from "react-icons/si";
import { motion } from "framer-motion";

const TechItem = ({ icon: Icon, name, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, x: -2 }}
      className="flex items-center gap-3 p-2 group"
    >
      <div className="p-2 bg-neutral-800 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] rotate-1 group-hover:rotate-0 transition-all duration-300">
        <Icon className="text-xl text-neutral-300" />
      </div>
      <span className="text-neutral-300 font-medium group-hover:translate-x-1 transition-transform duration-200">{name}</span>
    </motion.div>
  );
};

const TechGroup = ({ title, children, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, delay }} 
      className="relative border-4 border-black bg-neutral-800 shadow-[6px_6px_0px_rgba(0,0,0,0.8)] p-5 hover:shadow-[8px_8px_0px_rgba(0,0,0,0.8)] transition-all duration-300"
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-neutral-700 opacity-20"
           style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}></div>
      
      <h3 className="text-xl font-extrabold text-neutral-300 mb-4 text-shadow-small pb-2 border-b-2 border-neutral-700 rotate-[-1deg]">{title}</h3>
      <div className="space-y-3 mt-4">
        {children}
      </div>
      
      {/* Bottom decorative element */}
      <div className="absolute bottom-2 left-4 right-4 h-1 bg-neutral-700 opacity-30"></div>
    </motion.div>
  );
};

const ClassicView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Design Tools */}
      <TechGroup title="Design Tools" delay={0}>
        <TechItem icon={SiAdobephotoshop} name="Adobe Photoshop" delay={0.1} />
        <TechItem icon={SiAdobelightroom} name="Adobe Lightroom" delay={0.15} />
        <TechItem icon={SiFigma} name="Figma" delay={0.2} />
      </TechGroup>

      {/* Programming Languages */}
      <TechGroup title="Programming Languages" delay={0.1}>
        <TechItem icon={SiPython} name="Python" delay={0.1} />
        <TechItem icon={SiHtml5} name="HTML" delay={0.15} />
        <TechItem icon={SiCss3} name="CSS" delay={0.2} />
        <TechItem icon={SiPhp} name="PHP" delay={0.25} />
        <TechItem icon={SiJavascript} name="Javascript" delay={0.3} />
      </TechGroup>

      {/* Frameworks */}
      <TechGroup title="Frameworks" delay={0.2}>
        <TechItem icon={SiCodeigniter} name="CodeIgniter 3" delay={0.1} />
        <TechItem icon={SiReact} name="React" delay={0.15} />
        <TechItem icon={SiTailwindcss} name="TailwindCSS" delay={0.2} />
        <TechItem icon={SiExpress} name="ExpressJS" delay={0.25} />
      </TechGroup>

      {/* Database */}
      <TechGroup title="Database" delay={0.3}>
        <TechItem icon={SiPostgresql} name="PostgreSql" delay={0.1} />
      </TechGroup>

      {/* Other Tools */}
      <TechGroup title="Other Tools" delay={0.4}>
        <TechItem icon={SiQgis} name="QGIS" delay={0.1} />
      </TechGroup>
    </div>
  );
};

const TechStack = () => {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 font-Hanken tracking-wider relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-40 left-20 w-48 h-48 bg-neutral-800 opacity-5 rotate-12"
           style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}></div>
      <div className="absolute bottom-20 right-40 w-32 h-32 bg-neutral-800 opacity-5 -rotate-12"
           style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative mb-6">
              <div className="absolute -left-3 -top-3 w-16 h-16 bg-neutral-700 opacity-10 rotate-12 z-0"></div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-300 tracking-wider flex items-center gap-3 relative z-10 text-shadow-neo">
                <div className="p-3 bg-neutral-800 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)] rotate-2">
                  <HiCode className="text-neutral-400" />
                </div>
                Tech Stack
              </h2>
              <motion.div 
                className="h-2 w-24 bg-neutral-300 mt-4 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] rotate-1" 
                initial={{ width: 0 }} 
                whileInView={{ width: "6rem" }} 
                transition={{ duration: 0.8, delay: 0.3 }} 
              />
            </div>  
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ClassicView />
        </motion.div>
      </div>
      
      {/* Styles for neobrutalism */}
      <style className="text-shadow-styles">
        {`
          .text-shadow-neo {
            text-shadow: 4px 4px 0px rgba(0,0,0,0.8);
          }
          .text-shadow-small {
            text-shadow: 2px 2px 0px rgba(0,0,0,0.8);
          }
          .border-3 {
            border-width: 3px;
          }
        `}
      </style>
    </section>
  );
};

export default TechStack;
