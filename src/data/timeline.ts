import type { LucideIcon } from "lucide-react";
import { GraduationCap, Code2, FlaskConical, Cpu, Trophy } from "lucide-react";

export type TimelineItem = {
  year: string;
  title: string;
  place: string;
  description: string;
  icon: LucideIcon;
};

/** Education + experience milestones for the About timeline. */
export const timeline: TimelineItem[] = [
  {
    year: "2023 — Present",
    title: "BS Computer Science",
    place: "University",
    description:
      "Pursuing a Computer Science degree with focus on software engineering, AI, and IoT systems.",
    icon: GraduationCap,
  },
  {
    year: "2026",
    title: "Full Stack Developer",
    place: "Freelance & Academic Projects",
    description:
      "Designed and shipped full-stack web apps with Next.js, TypeScript, and modern databases.",
    icon: Code2,
  },
  {
    year: "2024",
    title: "Undergraduate Researcher",
    place: "Capstone / Research",
    description:
      "Leading research on offline LoRa mesh emergency communication and applied machine learning.",
    icon: FlaskConical,
  },
  {
    year: "2023",
    title: "AI & IoT Builder",
    place: "Personal Lab",
    description:
      "Built Arduino/ESP32 IoT prototypes and trained ML models for real-world problems.",
    icon: Cpu,
  },
  {
    year: "2023",
    title: "Recognitions",
    place: "Academic & Hackathons",
    description:
      "Recognized for academic performance and project work across multiple showcases.",
    icon: Trophy,
  },
];
