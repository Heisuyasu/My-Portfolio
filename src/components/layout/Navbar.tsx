"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Command, Sun, Moon } from "lucide-react";
import { navItems, site } from "@/data/site";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

/**
 * Floating glass navbar that condenses on scroll, with a mobile sheet,
 * theme toggle, and a hint to open the command palette (Ctrl/Cmd+K).
 */
export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navItems
      .map((n) => document.querySelector(n.href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300",
          scrolled ? "glass shadow-card" : "bg-transparent"
        )}
      >
        {/* Logo */}
        <a
          href="#home"
          data-cursor="pointer"
          className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-bold"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg border-glow glass text-gradient-accent font-display">
            {site.initials}
          </span>
          <span className="hidden sm:inline text-foreground">{site.shortName}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-cursor="pointer"
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active === item.href
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--fill-strong)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            data-cursor="pointer"
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground sm:flex"
          >
            <Command className="h-3.5 w-3.5" />
            <span>Ctrl K</span>
          </button>
          <button
            onClick={toggleTheme}
            data-cursor="pointer"
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full glass text-muted transition-colors hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor="pointer"
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-full glass text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute top-20 w-[calc(100%-2rem)] max-w-5xl rounded-3xl glass p-4 shadow-card md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-[var(--fill-soft)] hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
