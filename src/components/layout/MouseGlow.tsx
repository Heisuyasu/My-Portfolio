"use client";

import { useEffect } from "react";

/**
 * Writes the pointer position to CSS variables on <body> so a fixed
 * radial-gradient layer can follow the cursor site-wide (mouse-follow
 * lighting). Disabled for coarse pointers.
 */
export function MouseGlow() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const handle = (e: MouseEvent) => {
      document.body.style.setProperty("--mx", `${e.clientX}px`);
      document.body.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(59,130,246,0.07), transparent 65%)",
      }}
    />
  );
}
