import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2 } from 'lucide-react';

const ReadingModeToggle = ({ isDark }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    
    // Toggle body class to hide other elements when in reading mode
    document.body.classList.toggle('reading-mode');
    
    // Scroll to current position to ensure content stays in view
    const currentScroll = window.scrollY;
    setTimeout(() => {
      window.scrollTo(0, currentScroll);
    }, 50);
  };

  return (
    <div className="fixed z-50 bottom-8 left-8">
      <button 
        onClick={toggleFullscreen}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
          isDark ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-white text-gray-800 hover:bg-gray-100'
        } flex items-center justify-center`}
        title={isFullscreen ? "Exit distraction-free mode" : "Enter distraction-free mode"}
      >
        {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
      </button>
      
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-0 -top-10 text-xs ${isDark ? 'text-white' : 'text-gray-800'}`}
          >
            ESC to exit
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReadingModeToggle;
