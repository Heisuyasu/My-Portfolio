"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";

/**
 * Intro loading screen with an animated logo + progress bar.
 * Auto-dismisses after assets settle (or a max timeout).
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 18;
      setProgress(Math.min(value, 100));
      if (value >= 100) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 350);
      }
    }, 140);

    // Safety timeout so we never trap the user behind the loader.
    const failSafe = setTimeout(() => setDone(true), 3500);
    return () => {
      clearInterval(interval);
      clearTimeout(failSafe);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-8 grid h-20 w-20 place-items-center rounded-2xl border-glow glass text-2xl font-bold text-gradient-accent font-display"
          >
            {site.initials}
            <span className="absolute inset-0 rounded-2xl shadow-glow-lg animate-pulse-glow" />
          </motion.div>

          <div className="h-[3px] w-52 overflow-hidden rounded-full bg-[var(--fill-strong)]">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent-glow"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">
            {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
