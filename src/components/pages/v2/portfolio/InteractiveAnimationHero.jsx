import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";

const ParticleEffect = ({ x, y, color }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        scale: [0, 4],
        opacity: [1, 0],
        rotate: [0, 180],
      }}
      transition={{ 
        duration: 1.2,
        ease: "easeOut",
      }}
      className="absolute w-4 h-4 rounded-full"
      style={{
        background: `radial-gradient(circle at center, ${color}, transparent)`,
        left: x - 8,
        top: y - 8,
        boxShadow: `0 0 20px ${color}`,
      }}
    />
  );
};

const FloatingOrb = ({ delay }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ 
        scale: [1, 1.2, 1],
        x: ["0%", "100%", "0%"],
        y: ["0%", "50%", "0%"],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute w-32 h-32 rounded-full opacity-30 blur-xl"
      style={{
        background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.3), transparent)",
      }}
    />
  );
};

const ConnectedLine = ({ start, end, color }) => {
  return (
    <motion.svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ zIndex: 0 }}
    >
      <motion.line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={color}
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
      />
      {/* Glow effect */}
      <motion.line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={color}
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        exit={{ pathLength: 0 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        style={{ filter: 'blur(4px)' }}
      />
    </motion.svg>
  );
};

const InteractiveAnimationHero = ({ children }) => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [connections, setConnections] = useState([]);
  const [clickedPoints, setClickedPoints] = useState([]);
  const containerRef = useRef(null);
  const colors = [
    "rgba(147, 51, 234, 0.5)", // Purple
    "rgba(59, 130, 246, 0.5)", // Blue
    "rgba(236, 72, 153, 0.5)", // Pink
    "rgba(16, 185, 129, 0.5)", // Green
  ];

  const handleMouseMove = useCallback((event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleClick = useCallback((event) => {
    // Get container's position
    const rect = containerRef.current.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      id: Date.now(),
    };

    // Add new point
    setClickedPoints(prev => {
      const newPoints = [...prev, point];
      // Keep only last 5 points
      if (newPoints.length > 5) {
        newPoints.shift();
      }
      return newPoints;
    });

    // Create connections between points
    setClickedPoints(prev => {
      if (prev.length >= 2) {
        const lastPoint = prev[prev.length - 1];
        const secondLastPoint = prev[prev.length - 2];
        
        setConnections(prevConnections => [
          ...prevConnections,
          {
            id: `${lastPoint.id}-${secondLastPoint.id}`,
            start: secondLastPoint,
            end: lastPoint,
            color: colors[Math.floor(Math.random() * colors.length)],
          }
        ]);
      }
      return prev;
    });

    // Existing particle effect code
    const particleCount = 3;
    const newParticles = Array.from({ length: particleCount }).map((_, index) => ({
      id: Date.now() + index,
      x: event.clientX,
      y: event.clientY,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1200);
  }, []);

  // Clean up old connections
  useEffect(() => {
    const cleanup = setInterval(() => {
      setConnections(prev => {
        const now = Date.now();
        return prev.filter(conn => now - parseInt(conn.id.split('-')[0]) < 5000);
      });
      setClickedPoints(prev => {
        const now = Date.now();
        return prev.filter(point => now - point.id < 5000);
      });
    }, 5000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden cursor-pointer"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {/* Add this floating hint text */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          y: [-20, 0, 0, 20]
        }}
        transition={{ 
          duration: 3,
          times: [0, 0.3, 0.7, 1],
          repeat: Infinity,
          repeatDelay: 3
        }}
        className="absolute top-24 right-8 hidden md:block"
      >
        <div className="flex items-center space-x-2 backdrop-blur-sm rounded-lg px-4 py-2">
          <div className="w-2 h-2 rounded-full animate-pulse" />
          <p className="text-neutral-400 text-sm font-medium">
            Click anywhere to create your constellation
          </p>
        </div>
      </motion.div>

      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-blue-100/60 via-neutral-100/60 to-pink-50/60 rounded-full blur-3xl"
          animate={{
            x: ["-25%", "5%", "-25%"],
            y: ["-25%", "5%", "-25%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-gradient-to-bl from-purple-50/60 via-neutral-100/60 to-blue-50/60 rounded-full blur-3xl"
          animate={{
            x: ["75%", "95%", "75%"],
            y: ["75%", "95%", "75%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingOrb delay={0} />
        <FloatingOrb delay={5} />
        <FloatingOrb delay={10} />
      </div>

      {/* Mouse trail effect */}
      <motion.div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
        style={{
          background: "radial-gradient(circle at center, rgba(147, 51, 234, 0.1), transparent)",
          filter: "blur(40px)",
        }}
      />

      {/* Particle effects layer */}
      <AnimatePresence>
        {particles.map((particle) => (
          <ParticleEffect
            key={particle.id}
            x={particle.x}
            y={particle.y}
            color={particle.color}
          />
        ))}
      </AnimatePresence>

      {/* Connection lines */}
      <AnimatePresence>
        {connections.map(connection => (
          <ConnectedLine
            key={connection.id}
            start={connection.start}
            end={connection.end}
            color={connection.color}
          />
        ))}
      </AnimatePresence>

      {/* Click points */}
      <AnimatePresence>
        {clickedPoints.map(point => (
          <motion.div
            key={point.id}
            className="absolute w-2 h-2 rounded-full bg-purple-500"
            style={{
              left: point.x - 4,
              top: point.y - 4,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            exit={{ scale: 0, opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default InteractiveAnimationHero;
