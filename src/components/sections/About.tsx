"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { stats, site } from "@/data/site";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        eyebrow="About Me"
        title="Turning ideas into elegant software"
        subtitle="A short introduction to who I am and what drives me."
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Intro + passion */}
        <Reveal>
          <SpotlightCard className="h-full">
            <p className="text-lg leading-relaxed text-foreground">
              I&apos;m <span className="text-gradient-accent font-semibold">{site.name}</span>, a
              Computer Science student and developer who loves building
              products that feel effortless. My work spans full-stack web
              development, UI/UX design, applied machine learning, and IoT
              hardware.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              I&apos;m driven by curiosity and craft — obsessing over the small
              details that make an interface feel alive, while keeping systems
              robust and performant. Whether it&apos;s a research prototype or a
              client product, I aim for work that&apos;s both beautiful and
              engineered to last.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Problem Solver", "Fast Learner", "Design-minded", "Research-driven"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-[var(--fill-soft)] px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Animated statistics */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <SpotlightCard className="flex h-full flex-col items-center justify-center py-8 text-center">
                <div className="text-4xl font-bold text-gradient-accent font-display">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
