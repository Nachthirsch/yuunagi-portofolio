import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaSoundcloud } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useRef } from "react";
const Header = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    let animationFrameId;
    let lastRender = 0;

    // Calculate responsive values
    const isMobile = window.innerWidth < 768;
    const baseRadius = isMobile ? 170 : 200; // Radius sedikit lebih kecil
    const numPoints = isMobile ? 200 : 250; // Mengurangi jumlah titik untuk efek lebih tegas
    const baseFontSize = isMobile ? 12 : 16; // Ukuran font lebih besar untuk keterbacaan neobrutalism
    const rotationSpeed = isMobile ? 0.005 : 0.007; // Rotasi lebih lambat untuk efek lebih berat

    // Menggunakan karakter yang lebih variatif dan tegas untuk gaya neobrutalism
    const BRUTALISM_CHARS = ["▓", "▒", "░", "█", "▄", "▀", "■", "□", "▢", "▣", "+", "×"];
    const points = [];
    let angleX = 2;
    let angleY = 0;

    // Generate cube points instead of sphere for brutalism effect
    const createCubePoints = () => {
      // Hapus array points yang ada
      points.length = 0;
      
      // Buat titik-titik berbentuk kubus
      const cubeSize = baseRadius * 0.8;
      const halfSize = cubeSize / 2;
      const sides = [-halfSize, halfSize]; // Koordinat sisi kubus
      
      // Tambahkan titik-titik random dalam bentuk kubus
      for (let i = 0; i < numPoints; i++) {
        // Acak posisi titik dalam batas kubus dengan sedikit variasi untuk efek tidak sempurna
        const x = Math.random() * cubeSize - halfSize;
        const y = Math.random() * cubeSize - halfSize;
        
        // Pastikan titik berada di sekitar permukaan kubus
        // Pilih sisi mana yang ingin diletakkan titik
        const side = Math.floor(Math.random() * 6);
        let z;
        
        switch(side) {
          case 0: 
            z = -halfSize + (Math.random() * 10 - 5); // Depan
            break;
          case 1: 
            z = halfSize + (Math.random() * 10 - 5); // Belakang
            break;
          case 2: 
            // Atas (dengan y tetap)
            points.push({
              x: x,
              y: -halfSize + (Math.random() * 10 - 5),
              z: Math.random() * cubeSize - halfSize,
              char: BRUTALISM_CHARS[Math.floor(Math.random() * BRUTALISM_CHARS.length)],
            });
            continue;
          case 3: 
            // Bawah (dengan y tetap)
            points.push({
              x: x,
              y: halfSize + (Math.random() * 10 - 5),
              z: Math.random() * cubeSize - halfSize,
              char: BRUTALISM_CHARS[Math.floor(Math.random() * BRUTALISM_CHARS.length)],
            });
            continue;
          case 4: 
            // Kiri (dengan x tetap)
            points.push({
              x: -halfSize + (Math.random() * 10 - 5),
              y: y,
              z: Math.random() * cubeSize - halfSize,
              char: BRUTALISM_CHARS[Math.floor(Math.random() * BRUTALISM_CHARS.length)],
            });
            continue;
          case 5: 
            // Kanan (dengan x tetap)
            points.push({
              x: halfSize + (Math.random() * 10 - 5),
              y: y,
              z: Math.random() * cubeSize - halfSize,
              char: BRUTALISM_CHARS[Math.floor(Math.random() * BRUTALISM_CHARS.length)],
            });
            continue;
        }
        
        points.push({
          x: x,
          y: y,
          z: z,
          char: BRUTALISM_CHARS[Math.floor(Math.random() * BRUTALISM_CHARS.length)],
        });
      }
    };

    createCubePoints();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = (timestamp) => {
      // Limit frame rate
      const frameInterval = isMobile ? 4 : 4;
      if (timestamp - lastRender < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastRender = timestamp;

      // Warna background lebih kontras untuk neobrutalism
      ctx.fillStyle = "rgb(23, 23, 23, 0.3)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width - baseRadius * (isMobile ? 0.3 : 0.5);
      const centerY = canvas.height - baseRadius * (isMobile ? 0.3 : 0.5);

      // Threshold untuk menyaring titik yang terlihat
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
        // Tingkatkan ukuran dan kontras untuk efek neobrutalism
        const scale = (point.z + baseRadius) / (1 * baseRadius);
        
        // Warna lebih kontras dengan hanya 3-4 level intensitas untuk neobrutalism
        let intensity;
        if (scale < 0.4) intensity = 100;
        else if (scale < 0.7) intensity = 160;
        else if (scale < 0.9) intensity = 210;
        else intensity = 255;
        
        // Tambahkan sedikit variasi warna untuk neobrutalism
        const r = intensity;
        const g = intensity;
        const b = intensity;
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

        // Ukuran font yang lebih variatif untuk neobrutalism
        const fontSize = Math.floor(baseFontSize * scale * 1.2);
        if (fontSize !== currentFontSize) {
          // Gunakan font dengan style lebih tegas/monospace untuk neobrutalism
          ctx.font = `bold ${fontSize}px "Courier New"`;
          currentFontSize = fontSize;
        }

        // Tambahkan efek shadow untuk karakter neobrutalism
        if (scale > 0.8) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 2;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
        } else {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
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
  return (
    <header className="relative h-screen font-Hanken tracking-wider overflow-hidden bg-neutral-900">
      <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1, willChange: "transform", background: "transparent" }} />
      
      {/* Neo-brutalism content container */}
      <div className="relative h-full flex flex-col justify-center px-4 sm:px-8 md:px-16 z-10">
        {/* Animated title with neo-brutalism style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true, amount: 0.3 }} 
          className="mb-4 sm:mb-6 relative"
        >
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-red-400 opacity-20 rotate-12 z-0"></div>
          <TypeAnimation
            sequence={["Hello there!", 1000, "How are you?", 1000, "Welcome to my world!", 1000]}
            wrapper="h1"
            speed={50}
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              color: "rgb(212 212 212)",
              fontWeight: "800",
              textTransform: "uppercase",
              position: "relative",
              zIndex: "1",
              textShadow: "4px 4px 0px rgba(0,0,0,0.2)",
            }}
            repeat={Infinity}
          />
        </motion.div>

        {/* Neo-brutalism divider */}
        <motion.div 
          className="w-24 h-2 bg-neutral-300 rotate-1 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]" 
          initial={{ width: 0 }} 
          whileInView={{ width: "7rem" }} 
          transition={{ duration: 1.5, ease: "easeOut" }} 
          viewport={{ once: true, amount: 0.3 }} 
        />

        {/* Bio text with neo-brutalism styles */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.3 }} 
          viewport={{ once: true, amount: 0.3 }} 
          className="max-w-3xl mt-8 bg-neutral-800 p-6 rounded-sm rotate-1 border-4 border-black shadow-[8px_8px_0px_rgb(0,0,0)]"
        >
          <p className="text-neutral-100 tracking-wider text-base sm:text-lg sm:leading-8 -rotate-1">
            I would love to introduce myself now! My name is{" "}
            <span className="text-neutral-200 font-extrabold bg-pink-400 px-2 py-1 shadow-[4px_4px_0px_rgba(0,0,0,0.8)] inline-block transform -rotate-2 mx-1">
              Handra Putratama Tanjung
            </span>
            .
            <br className="hidden sm:block" />
            <span className="block mt-4 sm:mt-2 sm:inline">
              I&apos;m a final-year student majoring in Information Technology, having an interest in Web Development, Photography, Music and Art.
            </span>
          </p>
        </motion.div>

        {/* Social media icons with neo-brutalism style */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.6 }} 
          viewport={{ once: true, amount: 0.3 }} 
          className="flex flex-wrap gap-6 mt-10 md:mt-12"
        >
          <a href="mailto:handraputratama@gmail.com" className="social-icon-wrapper group relative" aria-label="Email">
            <div className="p-4 rounded-md bg-neutral-800 border-2 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.8)]">
              <AiOutlineMail className="w-7 h-7 text-red-400" />
            </div>
            <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm py-1 px-2 rounded border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">Email</span>
          </a>

          <a href="https://www.instagram.com/nachthirsch/" className="social-icon-wrapper group relative" aria-label="Instagram">
            <div className="p-4 rounded-md bg-neutral-800 border-2 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.8)]">
              <FaInstagram className="w-7 h-7 text-pink-400" />
            </div>
            <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm py-1 px-2 rounded border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">Instagram</span>
          </a>

          <a href="https://github.com/Nachthirsch" className="social-icon-wrapper group relative" aria-label="GitHub">
            <div className="p-4 rounded-md bg-neutral-800 border-2 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.8)]">
              <FaGithub className="w-7 h-7 text-gray-300" />
            </div>
            <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm py-1 px-2 rounded border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/handra-putratama-tanjung/" className="social-icon-wrapper group relative" aria-label="LinkedIn">
            <div className="p-4 rounded-md bg-neutral-800 border-2 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.8)]">
              <FaLinkedin className="w-7 h-7 text-blue-400" />
            </div>
            <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm py-1 px-2 rounded border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">LinkedIn</span>
          </a>

          <a href="https://soundcloud.com/nachthirsch" className="social-icon-wrapper group relative" aria-label="SoundCloud">
            <div className="p-4 rounded-md bg-neutral-800 border-2 border-black shadow-[5px_5px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.8)]">
              <FaSoundcloud className="w-7 h-7 text-orange-400" />
            </div>
            <span className="icon-tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-sm py-1 px-2 rounded border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.8)] transition-opacity duration-200">SoundCloud</span>
          </a>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
