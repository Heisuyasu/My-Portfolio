/**
 * Skill groups rendered in the Skills section.
 * `level` (0-100) drives the animated proficiency bar.
 * Add or edit freely — the UI adapts to any number of categories/skills.
 */
export type Skill = { name: string; level: number };
export type SkillCategory = { title: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 82 },
      { name: "Three.js / R3F", level: 75 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "REST & API Design", level: 84 },
      { name: "Python (FastAPI)", level: 80 },
      { name: "Java (Spring)", level: 72 },
    ],
  },
  {
    title: "Mobile",
    skills: [
      { name: "React Native", level: 74 },
      { name: "Flutter", level: 65 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL / MySQL", level: 82 },
      { name: "MongoDB", level: 80 },
      { name: "Firebase", level: 78 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "Vercel / Netlify", level: 88 },
      { name: "Docker", level: 70 },
      { name: "Git & GitHub Actions", level: 84 },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", level: 92 },
      { name: "Python", level: 85 },
      { name: "Java", level: 78 },
      { name: "C / C++", level: 70 },
    ],
  },
  {
    title: "AI & Data",
    skills: [
      { name: "Machine Learning", level: 72 },
      { name: "Computer Vision", level: 68 },
      { name: "Data Analysis", level: 75 },
    ],
  },
  {
    title: "IoT & Hardware",
    skills: [
      { name: "Arduino", level: 80 },
      { name: "ESP32 / LoRa", level: 76 },
      { name: "Sensor Integration", level: 74 },
    ],
  },
  {
    title: "Design & Tools",
    skills: [
      { name: "Figma", level: 86 },
      { name: "UI/UX Design", level: 84 },
      { name: "VS Code", level: 95 },
    ],
  },
];
