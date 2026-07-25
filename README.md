<div align="center">

# ✦ Edrian Bantog — Portfolio

### A cinematic, interactive personal portfolio built for the modern web.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)

<br/>

**[ Live Demo ](#) · [ Report Bug ](https://github.com/Heisuyasu/portfolio/issues) · [ Request Feature ](https://github.com/Heisuyasu/portfolio/issues)**

</div>

---

## 🌌 Overview

A premium, dark-first portfolio with a **3D animated hero**, smooth scrolling, magnetic interactions, a command palette, and a fully theme-aware light/dark mode. Designed to impress recruiters, clients, and thesis panels — engineered to stay fast.

> Built by **Edrian Bantog** — Computer Science student, full-stack developer, UI/UX designer, and AI & IoT enthusiast.

<br/>

## ✨ Features

| | |
|---|---|
| 🧊 **3D Hero Scene** | Interactive WebGL laptop with holograms, particles & bloom (React Three Fiber) |
| 🎬 **Motion Everywhere** | Typing roles, magnetic buttons, scroll reveals, animated counters, custom cursor |
| 🌗 **Light / Dark Mode** | Fully theme-aware — every color adapts via CSS variables |
| ⌨️ **Command Palette** | `Ctrl / ⌘ + K` for keyboard-first navigation |
| 🪟 **Glassmorphism UI** | Frosted panels, glowing accents, soft gradients |
| 🧭 **Smooth Scrolling** | Lenis-powered, with `prefers-reduced-motion` support |
| 📬 **Contact Form** | EmailJS-ready with a graceful `mailto:` fallback |
| ⚡ **Performance-first** | Offscreen render pause, adaptive DPR, quality tiers, SEO metadata |

<br/>

## 🛠️ Tech Stack

**Framework** · Next.js 14 (App Router) · React 18
**Language** · TypeScript
**Styling** · Tailwind CSS · CSS Variables
**Animation** · Framer Motion · GSAP · Lenis
**3D** · Three.js · React Three Fiber · Drei · Postprocessing
**Icons** · Lucide

<br/>

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Heisuyasu/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. (optional) configure the contact form
cp .env.example .env.local     # then add your EmailJS keys

# 4. Run the dev server
npm run dev                    # → http://localhost:3000
```

> Requires **Node 18.17+** (Node 20 LTS recommended).

<br/>

## 📁 Project Structure

```
src/
├── app/                 # routes, layout, metadata, SEO
├── components/
│   ├── sections/        # Hero · About · Skills · Projects · Contact
│   ├── three/           # 3D hero (Laptop, Holograms, Particles)
│   ├── layout/          # Navbar · Footer · ScrollProgress · Loading
│   ├── command/         # ⌘K command palette
│   ├── cursor/          # custom cursor
│   ├── providers/       # Theme + Smooth-scroll
│   └── ui/              # reusable primitives
├── data/                # site · skills · projects  ← EDIT YOUR CONTENT HERE
├── hooks/               # typewriter, media query, mouse
└── lib/                 # utilities
```

<br/>

## 🎨 Make It Yours

Everything personal lives in **`src/data/`** — no component edits needed:

- **`site.ts`** — name, roles, email, social links, resume path, stats
- **`skills.ts`** — skill categories & proficiency levels
- **`projects.ts`** — project cards (title, tech, image, GitHub, live demo)

Other quick edits: theme colors in `src/app/globals.css`, and drop your `resume.pdf` into `public/`.

<br/>

## ☁️ Deployment

<details>
<summary><b>Deploy to Vercel (recommended)</b></summary>

<br/>

1. Push this repo to GitHub.
2. Import it at **[vercel.com/new](https://vercel.com/new)** — the Next.js preset is auto-detected.
3. Add env vars (`NEXT_PUBLIC_EMAILJS_*`, `NEXT_PUBLIC_SITE_URL`) under **Settings → Environment Variables**.
4. Deploy. Every push to `main` auto-redeploys.

</details>

<details>
<summary><b>Deploy to Netlify</b></summary>

<br/>

1. **Add new site → Import an existing project** from GitHub.
2. Build command `next build`; the official **@netlify/plugin-nextjs** handles the rest.
3. Add the same environment variables under **Site settings → Environment variables**.

</details>

<br/>

## 📫 Connect

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Heisuyasu-181717?style=for-the-badge&logo=github)](https://github.com/Heisuyasu)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Edrian_Bantog-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://ph.linkedin.com/in/edrian-bantog-82744a270)
[![Email](https://img.shields.io/badge/Email-edrianbantog@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:edrianbantog@gmail.com)

</div>

<br/>

<div align="center">

### ⭐ If you like this project, consider giving it a star!

<sub>© 2026 Edrian Bantog · Built with Next.js, Three.js & a lot of coffee ☕</sub>

</div>
