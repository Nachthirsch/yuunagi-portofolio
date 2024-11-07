/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const MorseCode = () => {
  const morseMessage = ".. / ... - .. .-.. .-.. / .-.. --- ...- . / -.-- --- ..- --..-- / .... .. -. .- - .-";

  return (
    <div className="flex flex-wrap items-center justify-center w-full max-w-[280px] sm:max-w-2xl gap-1 px-2 sm:px-4">
      <TypeAnimation
        sequence={[morseMessage]}
        wrapper="div"
        cursor={false}
        repeat={0}
        speed={150}
        style={{
          fontFamily: "monospace",
          fontSize: "clamp(8px, 2.5vw, 10px)",
          color: "#fff",
          letterSpacing: "1px",
          wordBreak: "break-all",
          textAlign: "center",
          padding: "0.5rem",
        }}
      />
    </div>
  );
};

const LoadingScreen = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 bg-neutral-900 flex flex-col items-center justify-center z-50">
          <MorseCode />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
