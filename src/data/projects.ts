/**
 * Project catalog powering the Projects grid + filtering + search.
 *
 * How to add a project:
 *  1. Drop an image in /public/projects (or use any URL) and set `image`.
 *  2. Pick one or more `categories` from ProjectCategory.
 *  3. Set `featured: true` to surface it in the large featured cards.
 *
 * Images below use gradient placeholders (no asset required) — replace the
 * `image` field with "/projects/your-image.jpg" whenever you're ready.
 */
export const PROJECT_CATEGORIES = [
  "All",
  "Web Development",
  "AI",
  "Machine Learning",
  "IoT",
  "Python",
  "Java",
  "Mobile",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  categories: ProjectCategory[];
  tech: string[];
  features: string[];
  image?: string; // optional; falls back to a generated gradient
  gradient: string; // tailwind gradient classes for the placeholder
  github?: string;
  demo?: string;
  featured?: boolean;
  timeline?: string;
  challenges?: string;
  lessons?: string;
};

export const projects: Project[] = [
  {
    slug: "employee-management-system",
    title: "Employee Management System",
    summary:
      "Full-stack HR platform for records, attendance, payroll and role-based access.",
    description:
      "A complete HR suite covering employee onboarding, attendance, leave, and payroll with granular role-based permissions and exportable reports.",
    categories: ["Web Development", "Java"],
    tech: ["Java", "Spring Boot", "MySQL", "React", "Tailwind"],
    features: [
      "Role-based access control",
      "Automated payroll computation",
      "Attendance & leave tracking",
      "PDF/Excel report export",
    ],
    gradient: "from-emerald-500/30 via-teal-400/20 to-blue-500/30",
    image: "/YTS PAYROLL.png",
    github: "https://github.com/Heisuyasu/Employee-Management-System.git",
    featured: true,
    timeline: "2024",
    challenges: "Modeling flexible payroll rules without hard-coding policy.",
    lessons: "A clean domain layer makes changing business rules painless.",
  },
  {
    slug: "financial-statement-system",
    title: "Financial Statement System",
    summary:
      "Accounting tool that generates balance sheets, income statements and cash-flow reports.",
    description:
      "Desktop-grade accounting application that ingests transactions and produces compliant financial statements with drill-down and audit trails.",
    categories: ["Web Development", "Java"],
    tech: ["Java", "JavaFX", "SQLite", "JasperReports"],
    features: [
      "Double-entry ledger engine",
      "Auto-generated financial statements",
      "Audit trail & versioning",
      "Printable, formatted reports",
    ],
    gradient: "from-violet-500/30 via-fuchsia-400/20 to-blue-500/30",
    image: "/FINANCIAL.png",
    github: "https://github.com/Heisuyasu/Financial-Statement-System.git",
    featured: true,
    timeline: "2023",
    challenges: "Guaranteeing ledgers always balance under concurrent edits.",
    lessons: "Invariants belong in the core, not in the UI.",
  },
  {
    slug: "yves-trucking-website",
    title: "YVES Trucking Services Website",
    summary:
      "Marketing + booking website for a logistics company with quote requests.",
    description:
      "A conversion-focused corporate site with service showcases, an online quote request flow, and an admin inbox for leads.",
    categories: ["Web Development"],
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    features: [
      "Animated service showcase",
      "Quote request form",
      "SEO-optimized pages",
      "Fully responsive",
    ],
    gradient: "from-amber-500/30 via-orange-400/20 to-rose-500/30",
    image: "/YTS WEBSITE.png",
    github: "https://github.com/Heisuyasu/YTS-Website.git",
    demo: "https://yts-website.vercel.app/",
    timeline: "2024",
  },
  {
    slug: "yts-billing-system",
    title: "Billing System",
    summary:
      "Billing and invoicing platform for generating, tracking and settling customer charges.",
    description:
      "A billing system that manages customer accounts, generates itemized invoices, and tracks payments and outstanding balances with exportable statements.",
    categories: ["Web Development"],
    tech: ["React", "Node.js", "MySQL"],
    features: [
      "Automated invoice generation",
      "Payment & balance tracking",
      "Customer account management",
      "Exportable billing statements",
    ],
    gradient: "from-sky-500/30 via-blue-400/20 to-indigo-500/30",
    image: "/BILLING.png",
    github: "https://github.com/Heisuyasu/YTS-BILLING-SYSTEM.git",
    timeline: "2024",
  },
  {
    slug: "flashai",
    title: "FlashAI",
    summary:
      "AI-powered study companion that turns your notes into smart flashcards and quizzes.",
    description:
      "FlashAI transforms study material into flashcards and practice questions automatically, using AI to summarize content and generate spaced-repetition-ready decks.",
    categories: ["AI", "Web Development"],
    tech: ["Next.js", "TypeScript", "OpenAI API"],
    features: [
      "AI-generated flashcards",
      "Auto-created quizzes",
      "Note summarization",
      "Clean, responsive UI",
    ],
    gradient: "from-fuchsia-500/30 via-purple-400/20 to-blue-500/30",
    image: "/FLASH.png",
    github: "https://github.com/Heisuyasu/FlashAI.git",
    timeline: "2025",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
