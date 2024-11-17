import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Nav from "../../nav";
import Footer from "./portfolio/Footer";


const SectionHeader = ({ subtitle, title, highlightedWord }) => (
  <div className="mb-12 flex items-center gap-2">
    <span className="text-sm text-neutral-500">{subtitle}</span>
    <span className="text-neutral-300 mx-2">/</span>
    <span className="text-lg font-medium">{title}</span>
    <span className="text-neutral-300 mx-2">{highlightedWord}</span>
  </div>
);



const WritesV2 = () => {
  return (
    <div className="bg-gradient-to-b from-neutral-50 to-white min-h-screen">
      <Nav />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-16 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-2"
        >
          <Link 
            to="/v2"
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Portfolio</span>
          </Link>
        </motion.div>

        <SectionHeader 
          subtitle="Personal Blog"
          title="Yorushika dan"
          highlightedWord="Penulisan Liriknya"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-neutral max-w-none"
        >
          {/* Content dari WritesPage dengan styling v2 */}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WritesV2;