"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import {
  projects,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const [active, setActive] = useState<ProjectCategory>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        active === "All" || p.categories.includes(active);
      const haystack = `${p.title} ${p.summary} ${p.tech.join(" ")}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        subtitle="A collection of things I've designed, built, and researched. Filter by category or search by tech."
      />

      {/* Controls */}
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              data-cursor="pointer"
              className={cn(
                "relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                active === cat
                  ? "text-white"
                  : "text-muted hover:text-foreground"
              )}
            >
              {active === cat && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-accent shadow-glow"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-full rounded-full glass py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-shadow placeholder:text-muted focus:shadow-glow"
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">
          No projects match your filters. Try a different category or search.
        </p>
      )}
    </section>
  );
}
