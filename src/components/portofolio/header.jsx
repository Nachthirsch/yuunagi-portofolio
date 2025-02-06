import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaSoundcloud } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

const AsciiSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for non-transparent canvas
    let animationFrameId;
    let lastRender = 0;

    // Calculate responsive values
    const isMobile = window.innerWidth < 768;
    const baseRadius = isMobile ? 180 : 220; // Slightly reduced desktop radius
    const numPoints = isMobile ? 250 : 300; // Reduced desktop points
    const baseFontSize = isMobile ? 10 : 12; // Optimized font size
    const rotationSpeed = isMobile ? 0.008 : 0.006; // Slower rotation on desktop

    const NUMBERS = ["-.--", "..-", "..-", "-.", ".-", "--.", ".."];
    const points = [];
    let angleX = 2;
    let angleY = 0;

    // Generate sphere points
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      points.push({
        x: baseRadius * Math.cos(theta) * Math.sin(phi),
        y: baseRadius * Math.sin(theta) * Math.sin(phi),
        z: baseRadius * Math.cos(phi),
        char: NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
      });
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = (timestamp) => {
      // Limit frame rate more strictly on desktop
      const frameInterval = isMobile ? 4 : 4;
      if (timestamp - lastRender < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastRender = timestamp;

      ctx.fillStyle = "rgb(23, 23, 23, 0.2)"; // Solid color instead of rgba
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width - baseRadius * (isMobile ? 0.3 : 0.5);
      const centerY = canvas.height - baseRadius * (isMobile ? 0.3 : 0.5);

      // More aggressive culling for desktop
      const visibilityThreshold = isMobile ? -baseRadius : -baseRadius * 0.7;

      // Pre-calculate sin and cos values
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const rotatedPoints = points
        .map((point) => {
          const x1 = point.x * cosY - point.z * sinY;
          const z1 = point.z * cosY + point.x * sinY;
          const y2 = point.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + point.y * sinX;

          return {
            x: x1,
            y: y2,
            z: z2,
            char: point.char,
          };
        })
        .filter((point) => point.z > visibilityThreshold)
        .sort((a, b) => b.z - a.z);

      // Batch similar font sizes
      let currentFontSize = 0;

      rotatedPoints.forEach((point) => {
        const scale = (point.z + baseRadius) / (1 * baseRadius);
        const intensity = Math.floor(scale * 255);
        ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;

        const fontSize = Math.floor(baseFontSize * scale);
        if (fontSize !== currentFontSize) {
          ctx.font = `${fontSize}px "Courier New"`;
          currentFontSize = fontSize;
        }

        ctx.fillText(point.char, centerX + point.x, centerY + point.y);
      });

      angleX += rotationSpeed;
      angleY += rotationSpeed;

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      const wasModule = window.innerWidth < 768;
      const isMobileNow = window.innerWidth < 768;

      if (wasModule !== isMobileNow) {
        // Reload component if switching between mobile and desktop
        window.location.reload();
      }
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1, willChange: "transform", background: "transparent" }} />;
};

const Header = () => {
  return (
    <header className="relative h-screen font-Hanken tracking-wider overflow-hidden bg-neutral-900">
      <AsciiSphere /> {/* Add explicit background color */}
      <div className="relative h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }} className="mb-4 sm:mb-6">
          <TypeAnimation
            sequence={["Hello there!", 1000, "How are you?", 1000, "Welcome to my world!", 1000]}
            wrapper="h1"
            speed={50}
            style={{
              fontSize: "clamp(1.25rem, 5vw, 2.25rem)",
              color: "rgb(212 212 212)",
              fontWeight: "600",
            }}
            repeat={Infinity}
          />
        </motion.div>

        <motion.div className="w-16 h-0.5 bg-neutral-300" initial={{ width: 0 }} whileInView={{ width: "5rem" }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }} />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true, amount: 0.3 }} className="max-w-3xl mt-6">
          <p className="text-neutral-100  tracking-wider text-base sm:text-lg sm:leading-8">
            I would love to introduce myself now! My name is <span className="text-neutral-200 font-medium border-b border-neutral-400">Handra Putratama Tanjung</span>
            .
            <br className="hidden sm:block" />
            <span className="block mt-2 sm:mt-0 sm:inline">I&apos;m a final-year student majoring in Information Technology, having an interest in Web Development, Photography, Music and Art.</span>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true, amount: 0.3 }} className="flex space-x-8 mt-8 md:mt-12">
          <a href="mailto:handraputratama@gmail.com" className="social-icon-wrapper group relative" aria-label="Email">
            <div className="p-3 rounded-full bg-neutral-800/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-neutral-700/50 group-hover:scale-110">
              <AiOutlineMail className="w-6 h-6 text-red-400 group-hover:text-red-300" />
            </div>
            <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm py-1 px-2 rounded transition-opacity duration-200">Email</span>
          </a>

          <a href="https://www.instagram.com/nachthirsch/" className="social-icon-wrapper group relative" aria-label="Instagram">
            <div className="p-3 rounded-full bg-neutral-800/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-neutral-700/50 group-hover:scale-110">
              <FaInstagram className="w-6 h-6 text-pink-400 group-hover:text-pink-300" />
            </div>
            <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm py-1 px-2 rounded transition-opacity duration-200">Instagram</span>
          </a>

          <a href="https://github.com/Nachthirsch" className="social-icon-wrapper group relative" aria-label="GitHub">
            <div className="p-3 rounded-full bg-neutral-800/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-neutral-700/50 group-hover:scale-110">
              <FaGithub className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </div>
            <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm py-1 px-2 rounded transition-opacity duration-200">GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/handra-putratama-tanjung/" className="social-icon-wrapper group relative" aria-label="LinkedIn">
            <div className="p-3 rounded-full bg-neutral-800/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-neutral-700/50 group-hover:scale-110">
              <FaLinkedin className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
            </div>
            <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm py-1 px-2 rounded transition-opacity duration-200">LinkedIn</span>
          </a>

          <a href="https://soundcloud.com/nachthirsch" className="social-icon-wrapper group relative" aria-label="SoundCloud">
            <div className="p-3 rounded-full bg-neutral-800/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-neutral-700/50 group-hover:scale-110">
              <FaSoundcloud className="w-6 h-6 text-orange-400 group-hover:text-orange-300" />
            </div>
            <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm py-1 px-2 rounded transition-opacity duration-200">SoundCloud</span>
          </a>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
