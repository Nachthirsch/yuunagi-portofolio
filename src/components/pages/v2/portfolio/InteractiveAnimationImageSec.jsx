/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import yorushikaSvg from "../../../../../public/yorushika.svg";

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

      const rotationSpeed = 0.001;
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
      materialRef.current.color.set("#000000"); // Pure black
      materialRef.current.emissiveIntensity = Math.sin(state.clock.elapsedTime) * 0.4 + 0.8;
    }
  });

  useEffect(() => {
    const loader = new SVGLoader();
    loader.load(yorushikaSvg, (data) => {
      const paths = data.paths;
      const group = groupRef.current;

      paths.forEach((path) => {
        const shapes = path.toShapes(true);
        shapes.forEach((shape) => {
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 15,
            bevelEnabled: true,
            bevelThickness: 2,
            bevelSize: 1,
            bevelSegments: 10,
          });

          const instanceMesh = new THREE.Mesh(geometry, materialRef.current);
          const scale = 0.3;
          instanceMesh.scale.set(scale, -scale, scale);
          instanceMesh.position.set(50, -40, 0);
          instanceMesh.rotation.z = Math.PI;
          group.add(instanceMesh);
        });
      });
    });

    return () => {
      groupRef.current?.children.forEach((child) => {
        child.geometry.dispose();
      });
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.color.set("#000000"); // Pure black
      materialRef.current.emissiveIntensity = Math.sin(state.clock.elapsedTime) * 0.4 + 0.8;
    }

    if (groupRef.current) {
      groupRef.current.rotation.z += 0.005;
      const scale = 0.08;
      groupRef.current.scale.set(scale, -scale, scale);
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#363636",
        metalness: 0.8,
        roughness: 0.2,
        emissive: "#363636",
        emissiveIntensity: 0.8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
        envMapIntensity: 1.5,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        iridescence: 0.5,
        iridescenceIOR: 1.5,
        sheen: 0.8,
        sheenRoughness: 0.2,
        sheenColor: new THREE.Color("#545454"),
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
      <color attach="background" args={["rgba(255, 255, 255, 0.1)"]} />
      <fog attach="fog" args={["#ffffff", 15, 30]} />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
      <spotLight position={[0, 5, 8]} intensity={1.5} angle={0.8} penumbra={1} distance={25} decay={2} />
      <YorushikaLogo />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} maxPolarAngle={Math.PI} minPolarAngle={0} enableDamping dampingFactor={0.1} rotateSpeed={1} domElement={document.querySelector(".logo-control-area")} />
    </>
  );
};

const InteractiveAnimation = ({ onError }) => {
  useEffect(() => {
    try {
      // Your Three.js initialization code
      const loader = new THREE.TextureLoader();

      // Use public URL for assets in production
      const assetUrl =
        process.env.NODE_ENV === "production"
          ? "../../../../../public/yorushika.svg" // Adjust path based on your public folder structure
          : "../../../../../public/yorushika.svg";

      loader.load(
        assetUrl,
        (texture) => {
          console.log("Texture loaded successfully");
          // Your animation setup code
        },
        undefined,
        (error) => {
          console.error("Error loading texture:", error);
          onError?.();
        }
      );
    } catch (error) {
      console.error("Animation setup error:", error);
      onError?.();
    }

    return () => {
      // Cleanup code
      // Dispose of geometries, materials, textures
    };
  }, [onError]);

  return (
    <div className="absolute inset-0 logo-control-area bg-white/10">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          stencil: false,
          depth: true,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
export default InteractiveAnimation;
