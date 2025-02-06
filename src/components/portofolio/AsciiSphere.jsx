import { useEffect, useRef } from "react";

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

    const NUMBERS = ["0", "1"];
    const points = [];
    let angleX = 1;
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
      const frameInterval = isMobile ? 16 : 20;
      if (timestamp - lastRender < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastRender = timestamp;

      ctx.fillStyle = "rgb(23, 23, 23)"; // Solid color instead of rgba
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
        const scale = (point.z + baseRadius) / (2 * baseRadius);
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

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1, willChange: "transform" }} />;
};

export default AsciiSphere;
