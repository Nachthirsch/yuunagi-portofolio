import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";

// Ripple Effect Component
const RippleEffect = ({ x, y }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ scale: 0, opacity: 0.5 }}
      animate={{
        scale: [0, 3],
        opacity: [0.5, 0],
      }}
      transition={{ duration: 1.5 }}
      style={{
        left: x - 50,
        top: y - 50,
        width: 100,
        height: 100,
        borderRadius: '50%',
        border: '2px solid rgba(147, 51, 234, 0.3)',
      }}
    />
  );
};

// Magnetic Field Lines
const MagneticField = ({ points }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {points.map((point, i) => (
        <motion.circle
          key={`field-${point.id}`}
          cx={point.x}
          cy={point.y}
          r="50"
          fill="none"
          stroke="rgba(147, 51, 234, 0.1)"
          strokeWidth="1"
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            opacity: [0.3, 0.1, 0],
          }}
          transition={{ duration: 2 }}
        />
      ))}
    </svg>
  );
};

// Energy Beam Component
const EnergyBeam = ({ start, end }) => {
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <defs>
        <linearGradient id={`gradient-${start.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
        </linearGradient>
      </defs>
      <motion.path
        d={`M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${(start.y + end.y) / 2 - 50} ${end.x} ${end.y}`}
        stroke={`url(#gradient-${start.id})`}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
        transition={{ duration: 0.8 }}
      />
    </motion.svg>
  );
};

const InteractiveAnimationImageSec = ({ children }) => {
  const [ripples, setRipples] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [energyPoints, setEnergyPoints] = useState([]);
  const [energyBeams, setEnergyBeams] = useState([]);
  const containerRef = useRef(null);

  const handleMouseMove = useCallback((event) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }, []);

  const handleClick = useCallback((event) => {
    const rect = containerRef.current.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      id: Date.now(),
    };

    // Add ripple effect
    setRipples(prev => [...prev, point]);

    // Add energy point
    setEnergyPoints(prev => {
      const newPoints = [...prev, point];
      if (newPoints.length > 3) newPoints.shift();
      return newPoints;
    });

    // Create energy beams between points
    if (energyPoints.length > 0) {
      const lastPoint = energyPoints[energyPoints.length - 1];
      setEnergyBeams(prev => [
        ...prev,
        {
          id: `beam-${point.id}`,
          start: lastPoint,
          end: point,
        }
      ]);
    }
  }, [energyPoints]);

  // Cleanup effects
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setRipples(prev => prev.filter(point => now - point.id < 1500));
      setEnergyBeams(prev => prev.filter(beam => now - parseInt(beam.id.split('-')[1]) < 3000));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.05) 0%, transparent 50%)`,
        }}
        transition={{ type: "spring", damping: 15 }}
      />

      {/* Ripple Effects */}
      <AnimatePresence>
        {ripples.map(point => (
          <RippleEffect key={point.id} x={point.x} y={point.y} />
        ))}
      </AnimatePresence>

      {/* Magnetic Field */}
      <MagneticField points={energyPoints} />

      {/* Energy Beams */}
      <AnimatePresence>
        {energyBeams.map(beam => (
          <EnergyBeam key={beam.id} start={beam.start} end={beam.end} />
        ))}
      </AnimatePresence>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default InteractiveAnimationImageSec;
