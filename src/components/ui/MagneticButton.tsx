"use client";

import { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  strength?: number;
  download?: boolean | string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

/**
 * A button/link that "magnetically" leans toward the cursor on hover.
 * Falls back gracefully — pointer offset is reset on leave.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  strength = 0.35,
  download,
  target,
  rel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setOffset({ x, y });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 will-change-transform select-none";
  const styles =
    variant === "primary"
      ? "bg-accent text-white shadow-glow hover:bg-accent-glow"
      : "glass text-foreground hover:text-accent-glow border-glow";

  const content = (
    <motion.span
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className="inline-flex items-center gap-2"
      data-cursor="pointer"
    >
      {children}
    </motion.span>
  );

  const sharedProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: cn(base, styles, className),
    "data-cursor": "pointer",
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <a href={href} onClick={onClick} download={download} target={target} rel={rel} {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} {...sharedProps}>
      {content}
    </button>
  );
}
