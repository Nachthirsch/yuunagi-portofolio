import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const TOCSidebar = ({ sections, onSectionClick }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => setIsMinimized(!isMinimized);

  // Simplify the section click handling
  const handleSectionClick = (index) => {
    if (onSectionClick) {
      onSectionClick(index);
      console.log("Clicking section:", index);

      // Optional: Close sidebar on mobile
      if (window.innerWidth < 1024) {
        setIsMinimized(true);
      }
    }
  };

  return (
    <div
      className={`fixed right-0 top-[80px] transition-all duration-300 z-[100] 
      ${isMinimized ? "w-12" : "w-64"} bg-base-300 rounded-l-lg shadow-lg
      max-h-[calc(100vh-100px)] flex flex-col`}
    >
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="absolute left-0 top-2 p-2 hover:bg-base-200 rounded-full -translate-x-1/2 bg-base-300 shadow z-10">
        {isMinimized ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Header */}
      <div className={`p-4 pb-2 border-b border-base-200 ${isMinimized ? "hidden" : "block"}`}>
        <h3 className="font-bold text-base-content">Table of Contents</h3>
      </div>

      {/* Scrollable Content */}
      <div className={`${isMinimized ? "hidden" : "block"} flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-200`}>
        <div className="p-4 pt-2 space-y-1">
          {sections?.map((section, index) => (
            <button key={index} onClick={() => handleSectionClick(index)} className="block w-full text-left px-2 py-1.5 text-sm hover:bg-base-200 rounded transition-colors duration-200 active:bg-primary/20">
              <div className="font-medium line-clamp-1">{section.title || `Section ${index + 1}`}</div>
              <div className="text-xs text-base-content/60">{section.type}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TOCSidebar;
