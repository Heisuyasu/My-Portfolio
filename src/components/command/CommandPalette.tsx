"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Home,
  User,
  Cpu,
  FolderGit2,
  Mail,
  FileText,
  Github,
  Linkedin,
  Sun,
  Moon,
} from "lucide-react";
import { site, socials } from "@/data/site";
import { useTheme } from "@/components/providers/ThemeProvider";

type Command = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  keywords?: string;
};

/**
 * Ctrl/Cmd+K command palette for keyboard-first navigation.
 * Controlled by the parent so the navbar button can open it too.
 */
export function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const { toggleTheme, theme } = useTheme();

  const go = (hash: string) => () => {
    setOpen(false);
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  const openExternal = (url: string) => () => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const commands: Command[] = useMemo(
    () => [
      { id: "home", label: "Go to Home", icon: Home, action: go("#home") },
      { id: "about", label: "Go to About", icon: User, action: go("#about") },
      { id: "skills", label: "Go to Skills", icon: Cpu, action: go("#skills") },
      { id: "projects", label: "Go to Projects", icon: FolderGit2, action: go("#projects") },
      { id: "contact", label: "Go to Contact", icon: Mail, action: go("#contact") },
      {
        id: "resume",
        label: "Download Resume",
        icon: FileText,
        action: openExternal(site.resumeUrl),
      },
      {
        id: "theme",
        label: theme === "dark" ? "Switch to Light mode" : "Switch to Dark mode",
        icon: theme === "dark" ? Sun : Moon,
        action: () => {
          toggleTheme();
          setOpen(false);
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        icon: Github,
        action: openExternal(socials[0].href),
        keywords: "code source",
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        icon: Linkedin,
        action: openExternal(socials[1].href),
        keywords: "work profile",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const filtered = commands.filter((c) =>
    `${c.label} ${c.keywords ?? ""}`.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9997] flex items-start justify-center bg-black/50 p-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border-glow glass shadow-card"
          >
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4">
              <Search className="h-4 w-4 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-muted">
                ESC
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">
                  No results found.
                </li>
              )}
              {filtered.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={c.action}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-muted transition-colors hover:bg-[var(--fill-soft)] hover:text-foreground"
                  >
                    <c.icon className="h-4 w-4 text-accent-glow" />
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
