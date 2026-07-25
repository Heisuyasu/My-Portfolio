"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { Laptop } from "./Laptop";
import { Holograms } from "./Holograms";
import { Particles } from "./Particles";
import { useTheme } from "@/components/providers/ThemeProvider";

type Quality = "high" | "low" | "off";

/**
 * Slowly orbits the camera and eases it toward the pointer for parallax.
 * Uses damped lerp so motion stays smooth regardless of frame rate.
 */
function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const targetX = Math.sin(t * 0.15) * 0.6 + pointer.x * 1.2;
    const targetY = 0.4 + Math.cos(t * 0.12) * 0.25 + pointer.y * 0.6;
    // Frame-rate independent damping.
    const lerp = 1 - Math.pow(0.001, delta);
    camera.position.x += (targetX - camera.position.x) * lerp;
    camera.position.y += (targetY - camera.position.y) * lerp;
    camera.position.z = 7;
    camera.lookAt(target.current);
  });

  return null;
}

/**
 * The full hero WebGL scene. Import with next/dynamic (ssr:false).
 *
 * Performance strategy:
 *  - Detects device tier (mobile / reduced-motion) and drops effects.
 *  - Pauses the render loop entirely (`frameloop="never"`) when the hero
 *    is scrolled out of view — no WebGL cost while reading the rest of
 *    the page, which removes scroll jank.
 *  - Caps DPR, disables MSAA in the composer, and uses a single cheap
 *    Bloom pass (no Depth-of-Field, which was the main cost).
 */
export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [quality, setQuality] = useState<Quality>("high");
  const [visible, setVisible] = useState(true);
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Scene colors adapt to the active theme.
  const bgColor = isLight ? "#eef2f8" : "#030712";
  // Bloom only reads well on dark backgrounds; skip it in light mode.
  const useEffects = quality !== "off" && !isLight;

  // Decide quality once on mount.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    if (reduced) setQuality("off");
    else if (mobile || cores <= 4) setQuality("low");
    else setQuality("high");
  }, []);

  // Only render while the canvas is on screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dprMax = quality === "high" ? 1.5 : 1;

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, dprMax]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.4 }}
        camera={{ position: [0, 0.4, 7], fov: 45 }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <color attach="background" args={[bgColor]} />
          <fog attach="fog" args={[bgColor, 9, 22]} />

          {/* Lighting — brighter ambient in light mode so the model reads. */}
          <ambientLight intensity={isLight ? 0.9 : 0.45} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={isLight ? 1.6 : 1.2}
            color={isLight ? "#ffffff" : "#93c5fd"}
          />
          <pointLight position={[-4, 2, 3]} intensity={isLight ? 12 : 28} color="#3B82F6" />
          <pointLight position={[4, -2, 2]} intensity={isLight ? 8 : 18} color="#60A5FA" />
          {quality === "high" && !isLight && <Environment preset="night" />}

          <Laptop />
          <Holograms />
          {quality !== "off" && (
            <Particles
              count={quality === "high" ? 450 : 200}
              opacity={isLight ? 0.35 : 0.7}
            />
          )}

          <CameraRig />

          {useEffects && (
            <EffectComposer multisampling={0} enableNormalPass={false}>
              <Bloom
                intensity={quality === "high" ? 0.8 : 0.5}
                luminanceThreshold={0.25}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.25} darkness={0.85} />
            </EffectComposer>
          )}

          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
}
