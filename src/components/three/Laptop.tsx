"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural, low-poly futuristic laptop built from primitives (no GLTF).
 *
 * Correct hinge: the screen is a child of a pivot group placed at the BACK
 * edge of the deck; the screen itself is offset upward inside that pivot so
 * it swings open cleanly instead of folding through the base.
 *
 * The whole unit is offset to the right so it sits beside the hero text.
 */

// Static "code" lines drawn on the screen (left-aligned, varied widths).
const CODE_LINES = [
  { y: 0.62, w: 1.5, accent: true },
  { y: 0.42, w: 0.9, accent: false },
  { y: 0.22, w: 1.7, accent: false },
  { y: 0.02, w: 1.1, accent: true },
  { y: -0.18, w: 1.5, accent: false },
  { y: -0.38, w: 0.8, accent: false },
  { y: -0.58, w: 1.25, accent: true },
];

export function Laptop() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle 3/4-view idle sway (time-based → frame-rate independent).
    group.current.rotation.y = -0.45 + Math.sin(t * 0.3) * 0.12;
    group.current.rotation.x = 0.06 + Math.sin(t * 0.4) * 0.02;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group} scale={0.82} position={[1.9, -0.25, 0]}>
        {/* Base / keyboard deck */}
        <RoundedBox args={[3.2, 0.16, 2.2]} radius={0.08} smoothness={3}>
          <meshStandardMaterial color="#0e1626" metalness={0.8} roughness={0.35} />
        </RoundedBox>

        {/* Keyboard inset */}
        <mesh position={[0, 0.09, 0.15]}>
          <boxGeometry args={[2.7, 0.02, 1.5]} />
          <meshStandardMaterial
            color="#0b1220"
            metalness={0.5}
            roughness={0.6}
            emissive="#3B82F6"
            emissiveIntensity={0.06}
          />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, 0.095, 0.78]}>
          <boxGeometry args={[1.0, 0.01, 0.55]} />
          <meshStandardMaterial color="#111a2e" metalness={0.4} roughness={0.5} />
        </mesh>

        {/* Screen assembly — pivot at the back edge of the deck */}
        <group position={[0, 0.08, -1.05]} rotation={[-0.32, 0, 0]}>
          {/* Screen offset upward so it swings open from the hinge */}
          <group position={[0, 1.05, 0]}>
            {/* Bezel */}
            <RoundedBox args={[3.3, 2.1, 0.1]} radius={0.08} smoothness={3}>
              <meshStandardMaterial color="#0b1220" metalness={0.8} roughness={0.35} />
            </RoundedBox>

            {/* Emissive display panel */}
            <mesh position={[0, 0, 0.056]}>
              <planeGeometry args={[3.0, 1.8]} />
              <meshStandardMaterial
                color="#0a1836"
                emissive="#2563EB"
                emissiveIntensity={0.5}
                toneMapped={false}
              />
            </mesh>

            {/* On-screen code lines */}
            <group position={[0, 0, 0.062]}>
              {CODE_LINES.map((line, i) => (
                <mesh key={i} position={[-1.3 + line.w / 2, line.y, 0]}>
                  <planeGeometry args={[line.w, 0.06]} />
                  <meshBasicMaterial
                    color={line.accent ? "#60A5FA" : "#93c5fd"}
                    transparent
                    opacity={line.accent ? 0.55 : 0.35}
                    toneMapped={false}
                  />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </group>
    </Float>
  );
}
