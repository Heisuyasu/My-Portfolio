"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

/**
 * Floating holographic accents orbiting the laptop: glowing rings and a
 * wireframe icosahedron. Purely decorative; all emissive to drive bloom.
 */
export function Holograms() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ico = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z = t * 0.4;
    if (ring2.current) ring2.current.rotation.x = t * 0.5;
    if (ico.current) {
      ico.current.rotation.y = t * 0.6;
      ico.current.rotation.x = t * 0.3;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <Torus ref={ring1} args={[0.55, 0.02, 16, 64]} position={[2.6, 1.1, -0.5]}>
          <meshBasicMaterial color="#60A5FA" toneMapped={false} />
        </Torus>
      </Float>

      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.2}>
        <Torus ref={ring2} args={[0.4, 0.015, 16, 64]} position={[-2.7, 0.7, -0.3]}>
          <meshBasicMaterial color="#3B82F6" toneMapped={false} />
        </Torus>
      </Float>

      <Float speed={2.4} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron ref={ico} args={[0.42, 0]} position={[-2.3, 1.7, 0.4]}>
          <meshBasicMaterial color="#93c5fd" wireframe toneMapped={false} />
        </Icosahedron>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.6}>
        <mesh position={[2.4, -0.6, 0.6]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial color="#60A5FA" wireframe toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}
