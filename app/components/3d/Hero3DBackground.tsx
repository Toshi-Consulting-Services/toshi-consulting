'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function RotatingBox() {
  return (
    <mesh rotation={[0.1, 0.1, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color="#2563eb" wireframe />
    </mesh>
  );
}

function AnimatedSphere() {
  return (
    <mesh position={[4, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial color="#1e40af" />
    </mesh>
  );
}

export default function Hero3DBackground() {
  return (
    <Canvas className="absolute inset-0" camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <RotatingBox />
      <AnimatedSphere />

      <OrbitControls autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
}
