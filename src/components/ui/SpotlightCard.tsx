"use client";

import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Glass card with a cursor-following radial spotlight.
 * Writes pointer coords to CSS variables consumed by the ::before overlay.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass p-6 transition-transform duration-300",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100",
        "before:[background:radial-gradient(320px_circle_at_var(--mx)_var(--my),rgba(96,165,250,0.15),transparent_65%)]",
        className
      )}
    >
      {children}
    </div>
  );
}
