/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import me from "../../assets/me_1.jpg";
import yorushikaSvg from "../../../public/yorushika.svg";

const YorushikaLogo = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const groupRef = useRef();
  const materialRef = useRef();

  useEffect(() => {
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e) => {
      if (!isDragging || !groupRef.current) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      // Reduced rotation speed and added window size normalization
      const rotationSpeed = 0.001; // Reduced from 0.01
      const windowSizeFactor = Math.min(window.innerWidth, window.innerHeight) / 1000;
      const dampening = 0.8;

      groupRef.current.rotation.y += deltaMove.x * rotationSpeed * windowSizeFactor * dampening;
      groupRef.current.rotation.x += deltaMove.y * rotationSpeed * windowSizeFactor * dampening;

      setPreviousMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging]);

  useFrame((state) => {
    if (materialRef.current) {
      const hue = (state.clock.elapsedTime * 0.15) % 1;
      materialRef.current.color.setHSL(hue, 0.7, 0.6);
      materialRef.current.emissiveIntensity = Math.sin(state.clock.elapsedTime) * 0.4 + 0.8;
    }
  });
  useEffect(() => {
    const loader = new SVGLoader();

    // Use public URL for SVG in production
    const svgUrl =
      process.env.NODE_ENV === "production"
        ? `/yorushika.svg` // Make sure this matches your deployment URL structure
        : yorushikaSvg;

    console.log("Loading SVG from:", svgUrl); // Debug log

    loader.load(
      svgUrl,
      (data) => {
        console.log("SVG loaded successfully");
        const paths = data.paths;
        const group = groupRef.current;
        if (!group) return;

        paths.forEach((path) => {
          const shapes = path.toShapes(true);
          shapes.forEach((shape) => {
            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: 15, // Increased depth for better visibility
              bevelEnabled: true,
              bevelThickness: 2,
              bevelSize: 1,
              bevelSegments: 10,
            });

            // Create a single centered instance
            const instanceMesh = new THREE.Mesh(geometry, materialRef.current);
            const scale = 0.5; // Increased scale for better visibility
            instanceMesh.scale.set(scale, -scale, scale);
            instanceMesh.position.set(75, -50, 0); // Centered position
            instanceMesh.rotation.z = Math.PI;
            group.add(instanceMesh);
          });
        });
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading SVG:", error);
      }
    );

    return () => {
      if (groupRef.current) {
        groupRef.current.children.forEach((child) => {
          child.geometry.dispose();
          if (child.material) {
            child.material.dispose();
          }
        });
      }
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      // Dynamic color shift based on time
      const hue = (state.clock.elapsedTime * 0.1) % 1;
      materialRef.current.color.setHSL(hue, 0.7, 0.6); // Increased saturation
      materialRef.current.emissiveIntensity = Math.sin(state.clock.elapsedTime) * 0.4 + 0.8; // Increased emission range
    }

    if (groupRef.current) {
      // Constant clock-like rotation
      groupRef.current.rotation.z += 0.005;

      // Fixed scale
      const scale = 0.08;
      groupRef.current.scale.set(scale, -scale, scale);
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff", // Bright base color
        metalness: 0.8, // High metalness for shine
        roughness: 0.2, // Low roughness for better reflections
        emissive: "#ffffff", // Brighter blue emissive
        emissiveIntensity: 1.5, // Increased emission
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 2,
        envMapIntensity: 2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        reflectivity: 10,
        iridescence: 10, // Increased iridescence
        iridescenceIOR: 1.5,
        sheen: 0.5,
        sheenRoughness: 0.2,
        sheenColor: new THREE.Color("#black"),
      }),
    []
  );

  useEffect(() => {
    materialRef.current = material;
  }, [material]);

  return <group ref={groupRef} position={[0, 0, 0]} />;
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={["#171717"]} />
      <fog attach="fog" args={["#171717", 15, 30]} />
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#ffffff" />
      <spotLight position={[0, 5, 8]} intensity={2} angle={0.8} penumbra={1} distance={25} decay={2} />
      <spotLight position={[0, -5, 6]} intensity={1.5} angle={0.7} penumbra={1} distance={20} decay={2} color="#ffffff" />
      <YorushikaLogo />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} maxPolarAngle={Math.PI} minPolarAngle={0} enableDamping dampingFactor={0.1} rotateSpeed={1} domElement={document.querySelector(".logo-control-area")} />
    </>
  );
};

const ImageSec = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <section className="relative py-8 sm:py-16 px-4 sm:px-8 md:px-16 bg-neutral-900 overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 logo-control-area">
        <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Loading 3D Scene...</div>}>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 15], fov: 50 }} // Adjusted for better view
            gl={{
              antialias: true,
              alpha: false,
              stencil: false,
              depth: true,
            }}
            onCreated={() => setIsLoading(false)}
            onError={() => setHasError(true)}
          >
            {!hasError ? (
              <Scene />
            ) : (
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
              </mesh>
            )}
          </Canvas>
        </Suspense>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8">
          {/* Description Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1 w-full lg:w-auto">
            <motion.h1
              className="text-2xl sm:text-3xl text-neutral-100 mb-4 sm:mb-6 leading-relaxed relative inline-block"
              initial={{ backgroundSize: "0 2px" }}
              whileInView={{ backgroundSize: "100% 2px" }}
              transition={{ duration: 0.7 }}
              style={{
                backgroundImage: "linear-gradient(currentColor, currentColor)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 100%",
                letterSpacing: ".1em",
              }}
            >
              A little bit more info about me!
            </motion.h1>
            <p className="text-base sm:text-lg text-neutral-100 font-medium mb-4 sm:mb-6 leading-relaxed">
              I love language exchange! I can hold daily conversations in <span className="text-white">English</span>, although I&apos;m still working on my grammar. I also know a little <span className="text-white">Japanese</span>, even if it&apos;s at a beginner level!
            </p>
            <p className="text-base sm:text-lg text-neutral-100 mb-4 sm:mb-6 leading-relaxed">I'm always exploring how I can use Al tools to make my projects smarter and more efficient. Whether it's automating boring tasks or improving user experiences, I'm eager to try new things and push boundaries. Creativity and tech-savviness keep me motivated and ready for the next challenge.</p>
          </motion.div>

          {/* Card Section */}
          <div className="flex flex-col items-center w-full lg:w-auto p-4 sm:p-6 lg:p-10">
            {/* Image Container with Effects */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative group w-full max-w-[280px] sm:max-w-xs">
              {/* Background Shape */}
              <motion.div
                className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-neutral-600 to-neutral-800 opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Main Image */}
              <div className="relative">
                <img src={me} alt="Profile" className="w-full h-auto aspect-[4/5] object-cover rounded-lg hover:grayscale-0 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            {/* Name Tag */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="mt-4 sm:mt-6 text-center group">
              <p className="text-sm sm:text-base text-neutral-400 mt-1 pl-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">i see you in every poem i read</p>
              <p className="text-sm sm:text-base text-neutral-400 pl-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">i see you in every word i speak</p>
              <p className="text-sm sm:text-base text-neutral-400 pl-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 italic font-semibold">
                To you who always turns toward the sun, like a <span className="text-amber-200">sunflower</span>—.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSec;
