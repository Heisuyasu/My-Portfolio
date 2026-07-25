import type { LucideIcon } from "lucide-react";
import { Github, Linkedin, Facebook, Mail } from "lucide-react";

/**
 * Central place for identity, roles, and links.
 * Edit these values to personalize the whole site.
 */
export const site = {
  name: "Edrian Bantog",
  shortName: "Edrian",
  initials: "EB",
  email: "edrianbantog@gmail.com",
  location: "Philippines",
  headline: "Computer Science Student & Full Stack Developer",
  description:
    "Computer Science student, software & full stack developer, UI/UX designer, researcher, and AI & IoT enthusiast. I build cinematic, performant digital experiences.",
  // Roles cycled by the hero typing animation.
  roles: [
    "Computer Science Student",
    "Software Engineer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Researcher",
    "AI & IoT Enthusiast",
  ],
  resumeUrl: "/resume.pdf", // replace public/resume.pdf with your own
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://edrianbantog.com",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Heisuyasu", icon: Github },
  {
    label: "LinkedIn",
    href: "https://ph.linkedin.com/in/edrian-bantog-82744a270",
    icon: Linkedin,
  },
  { label: "Facebook", href: "https://www.facebook.com/edrian.bantog/", icon: Facebook },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
];

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// Animated statistics shown in the About section.
export const stats: { label: string; value: number; suffix?: string }[] = [
  { label: "Projects Built", value: 25, suffix: "+" },
  { label: "Technologies", value: 30, suffix: "+" },
  { label: "Cups of Coffee", value: 999, suffix: "+" },
];
