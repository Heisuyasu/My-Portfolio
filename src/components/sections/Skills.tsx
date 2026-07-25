"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Tools I build with"
        subtitle="A cross-section of the technologies, languages, and platforms I use to ship end-to-end."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, ci) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (ci % 3) * 0.08 }}
          >
            <SpotlightCard className="h-full">
              <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent-glow">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
                {category.title}
              </h3>

              <ul className="space-y-4">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-xs text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--fill-strong)]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-glow"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
