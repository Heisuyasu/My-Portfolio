"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Download, FolderGit2, Sparkles } from "lucide-react";
import { site, socials } from "@/data/site";
import { useTypewriter } from "@/hooks/useTypewriter";
import { MagneticButton } from "@/components/ui/MagneticButton";

// Load the WebGL scene only on the client, after paint.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const typed = useTypewriter(site.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 3D background scene */}
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>

      {/* Ambient glow blobs + grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="glow-blob pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-accent/40" />
      <div className="glow-blob pointer-events-none absolute -right-40 bottom-10 -z-10 h-96 w-96 rounded-full bg-accent-glow/30" />

      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-accent-glow"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Available for work & collaborations
          </motion.span>

          <motion.p variants={item} className="mb-2 text-lg text-muted">
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-gradient">{site.name}</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-4 flex h-10 items-center text-xl font-medium text-foreground sm:text-2xl"
          >
            <span className="text-muted">I&apos;m a&nbsp;</span>
            <span className="text-gradient-accent">{typed}</span>
            <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-accent-glow" />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-base text-muted">
            {site.description}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <MagneticButton href="#projects">
              <FolderGit2 className="h-4 w-4" />
              View Projects
            </MagneticButton>
            <MagneticButton
              href={site.resumeUrl}
              variant="ghost"
              download
              ariaLabel="Download resume"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center gap-3">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-cursor="pointer"
                whileHover={{ y: -4 }}
                animate={{ y: [0, -4, 0] }}
                transition={{
                  y: { duration: 3, repeat: Infinity, delay: i * 0.2 },
                }}
                className="grid h-11 w-11 place-items-center rounded-full glass text-muted transition-colors hover:text-accent-glow hover:shadow-glow"
              >
                <s.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        data-cursor="pointer"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
