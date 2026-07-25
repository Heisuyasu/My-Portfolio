"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight, Star } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Premium project card: gradient/image cover, tech chips, spotlight glow,
 * subtle 3D tilt on hover, and quick links.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass"
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
            project.gradient
          )}
        />
        {project.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

        {project.featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full glass px-2.5 py-1 text-[10px] font-medium text-accent-glow">
            <Star className="h-3 w-3 fill-current" /> Featured
          </span>
        )}

        {/* Floating category tags */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {project.categories.slice(0, 2).map((c) => (
            <span
              key={c}
              className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-white backdrop-blur"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent-glow">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-[var(--border)] bg-[var(--fill-soft)] px-2 py-0.5 text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="rounded-md border border-[var(--border)] bg-[var(--fill-soft)] px-2 py-0.5 text-[11px] text-muted">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent-glow transition-colors hover:text-foreground"
            >
              Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Spotlight glow border on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-glow transition-opacity duration-300 group-hover:opacity-100" />
    </motion.article>
  );
}
