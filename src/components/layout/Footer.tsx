"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { navItems, site, socials } from "@/data/site";

/** Footer with an animated wave, quick links, socials and back-to-top. */
export function Footer() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Animated wave */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 overflow-hidden">
        <motion.svg
          viewBox="0 0 1440 120"
          className="h-full w-[200%]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          preserveAspectRatio="none"
        >
          <path
            fill="url(#footer-wave)"
            d="M0,64 C240,120 480,0 720,48 C960,96 1200,32 1440,64 L1440,120 L0,120 Z M1440,64 C1680,120 1920,0 2160,48 C2400,96 2640,32 2880,64 L2880,120 L1440,120 Z"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="footer-wave" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <div className="relative border-t border-[var(--border)] bg-surface/40 pt-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-lg border-glow glass text-gradient-accent font-display">
                {site.initials}
              </span>
              {site.name}
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">{site.description}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
              Navigate
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-cursor="pointer"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
              Connect
            </h3>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor="pointer"
                  className="grid h-10 w-10 place-items-center rounded-full glass text-muted transition-all hover:-translate-y-1 hover:text-accent-glow hover:shadow-glow"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] px-6 py-6 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            data-cursor="pointer"
            className="group flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-muted transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
