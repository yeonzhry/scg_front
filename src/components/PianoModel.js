import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Name from "./Name";

const Model = ({ glbPath, scale, position, onClick }) => {
  const { scene } = useGLTF(glbPath);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      const rot = modelRef.current.rotation.y % (Math.PI * 2);
      const speed = rot < Math.PI ? 0.01 : 0.015;
      modelRef.current.rotation.y += speed;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
      position={position}
      onClick={onClick}
    />
  );
};

const PianoModel = () => {
  const [selectedModel, setSelectedModel] = useState("piano");
  const [showOverlay, setShowOverlay] = useState(false);

  const handlePrev = () =>
    setSelectedModel((prev) => (prev === "piano" ? "drum" : "piano"));
  const handleNext = () =>
    setSelectedModel((prev) => (prev === "drum" ? "piano" : "drum"));

  const handleModelClick = () => {
    setShowOverlay(true); // 악기 클릭 → Overlay 올라옴
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false); // Name 컴포넌트에서 버튼 클릭 → Overlay 내려감
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <Canvas camera={{ position: [0, 1.5, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 2]} intensity={2} />

        {selectedModel === "piano" && (
          <Model
            glbPath="/piano_final_rotate.glb"
            scale={0.16}
            position={[0, -0.8, 0]}
            onClick={handleModelClick}
          />
        )}

        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>

      {/* 좌우 화살표 */}
      <img
        src="/images/arrow_left.svg"
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: 200,
          top: "50%",
          cursor: "pointer",
          width: 30,
        }}
        alt="prev"
      />
      <img
        src="/images/arrow_right.svg"
        onClick={handleNext}
        style={{
          position: "absolute",
          right: 200,
          top: "50%",
          cursor: "pointer",
          width: 30,
        }}
        alt="next"
      />

      {/* Name 컴포넌트 (Overlay) */}
      {showOverlay && (
        <Name
          onClose={handleCloseOverlay}
        />
      )}
    </div>
  );
};

export default PianoModel;
