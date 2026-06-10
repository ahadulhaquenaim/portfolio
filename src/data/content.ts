/* ============================================================================
   ✦ SINGLE SOURCE OF TRUTH ✦
   Edit THIS file to change every piece of content on the site.
   No other file needs touching for normal content updates.
   ============================================================================ */

import type React from "react";
import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
} from "../components/BrandIcons";
import selftunePreview from "../../public/projects/selftune.png";
import shikkhakoshPreview from "../../public/projects/shikkhakosh.png";
import voluePreview from "../../public/projects/volue.png";
import copai1 from "../../public/projects/copai1.png";
import copai2 from "../../public/projects/copai2.png";
import copai3 from "../../public/projects/copai3.png";
import copai4 from "../../public/projects/copai4.png";
import copai5 from "../../public/projects/copai5.png";

/** Any icon that renders from a `size` prop (lucide + our brand icons). */
export type IconComponent = (props: {
  size?: number;
  className?: string;
}) => React.ReactNode;

/* -------------------------------- IDENTITY ------------------------------- */
export const identity = {
  name: "AHAD",
  fullName: "Ahadul Haque Naim",
  tagline: "ARISE — THE MONARCH'S AWAKENING",
  roles: ["FULLSTACK DEVELOPER", "PROBLEM SOLVER"],
  intro:
    "I craft digital experiences with clean code and creative design. Turning ideas into reality, one project at a time.",
  // Full-bleed hero background image (the cinematic monarch art) in /public.
  // Set to null to fall back to the plain particle/gradient background.
  heroBackground: "character.png" as string | null,
  heroVideo: "hero-character.mp4" as string | null,
  email: "ahadul.haque@cefalo.com",
  cvPath: "/cv/ahad-cv.pdf",
};

/* --------------------------- HERO HUD STATS ------------------------------ */
// Right-side floating "system" readouts in the hero, like the reference image.
export const hudStats = [
  { label: "JavaScript", rank: "Level 10", value: 95 },
  { label: "React", rank: "Level 10", value: 92 },
  { label: "Node.js", rank: "Level 9", value: 85 },
  { label: "UI / Design", rank: "Mastery", value: 88 },
];

export const headlineStats = [
  { value: "15+", label: "PROJECTS COMPLETED" },
  { value: "2+", label: "YEARS OF EXPERIENCE" },
  { value: "100%", label: "DEDICATION" },
];

/* ---------------------------------- ABOUT -------------------------------- */
export const about = {
  title: "THE HUNTER'S ORIGIN",
  paragraphs: [
    "I am a dedicated Software Engineer with a strong passion for building reliable, scalable, and user-friendly applications.",
    "I enjoy solving complex problems and turning ideas into efficient digital solutions through clean and maintainable code. Passionate about creating innovative solutions and continuous learning.",
  ],
  panel: [
    { k: "Class", v: "Full-Stack Engineer" },
    { k: "Rank", v: "S-Class Developer" },
    { k: "Guild", v: "Cefalo Bangladesh Ltd." },
    { k: "Specialty", v: "Web · App" },
  ],
};

/* --------------------------------- SKILLS -------------------------------- */
// rank drives the badge color (E lowest → S highest). value = bar fill %.
export type Rank = "E" | "D" | "C" | "B" | "A" | "S";
export const skills: { name: string; rank: Rank; value: number }[] = [
  // Languages & Frameworks
  { name: "JavaScript", rank: "S", value: 95 },
  { name: "Python", rank: "S", value: 92 },
  { name: "TypeScript", rank: "S", value: 90 },
  { name: "React / Next.js", rank: "S", value: 94 },
  { name: "Node.js / Nest.js", rank: "A", value: 86 },
  { name: "FastAPI / Django", rank: "A", value: 84 },
  { name: "C / C++", rank: "B", value: 75 },
  { name: "GraphQL", rank: "B", value: 78 },
  // Database & ORM
  { name: "PostgreSQL / MySQL", rank: "A", value: 85 },
  { name: "MongoDB", rank: "A", value: 83 },
  { name: "Redis", rank: "B", value: 78 },
  { name: "Prisma / SQLAlchemy", rank: "A", value: 82 },
  // Frontend
  { name: "Tailwind / CSS", rank: "A", value: 88 },
  { name: "Redux Toolkit", rank: "A", value: 84 },
  { name: "React Query", rank: "A", value: 83 },
  { name: "HTML / Bootstrap", rank: "S", value: 92 },
  // Cloud & DevOps
  { name: "Docker", rank: "A", value: 85 },
  { name: "GCP", rank: "B", value: 76 },
  { name: "AWS", rank: "B", value: 75 },
  { name: "NGINX", rank: "B", value: 76 },
  { name: "Vercel / Netlify", rank: "A", value: 88 },
  { name: "Hostinger", rank: "A", value: 82 },
  { name: "Git / CI-CD", rank: "A", value: 84 },
  { name: "Testing (Jest/pytest)", rank: "A", value: 82 },
  // Data & AI
  { name: "Apache Airflow", rank: "A", value: 85 },
  { name: "ETL Pipelines", rank: "A", value: 86 },
  { name: "Pandas / BeautifulSoup4", rank: "A", value: 84 },
  { name: "LLM / AI Automation", rank: "B", value: 80 },
  { name: "n8n Workflow", rank: "B", value: 78 },
  { name: "Prometheus / Grafana", rank: "B", value: 76 },
  { name: "Zustand", rank: "A", value: 85 },
  { name: "Ant / Shadcn UI", rank: "A", value: 84 },
  { name: "Microservices", rank: "A", value: 83 },
  { name: "REST APIs", rank: "S", value: 91 },
];

/* -------------------------------- PROJECTS ------------------------------- */
// Each project is a "dungeon raid". difficulty maps to a rank badge.
export const projects = [
  {
    title: "Self Tune Desktop App",
    label: "Linux Desktop App",
    difficulty: "S" as Rank,
    blurb:
      "A native desktop productivity app with a Plan → Do → Review workflow, backlog management, and a 7-day weekly report dashboard — all stored locally for full privacy.",
    tech: ["Electron.js", "React", "TypeScript", "Vite", "Node.js", "electron-builder", "CSS"],
    link: "#",
    repoLink: "https://github.com/ahadulhaquenaim/self-tune",
    preview: selftunePreview,
  },
  {
    title: "Shikkhakosh",
    label: "Full-Stack E-Commerce",
    difficulty: "S" as Rank,
    blurb:
      "Co-founded and architected a production-deployed e-commerce monorepo with a customer storefront, admin dashboard, and REST API. Features 20+ NestJS modules covering product variants, hierarchical categories, coupon/reward systems, push notifications, and custom invoice generation — deployed to Hostinger VPS via Coolify.",
    tech: ["Next.js 14", "NestJS", "TypeScript", "Prisma", "MySQL", "Tailwind CSS", "Docker", "Turborepo", "Coolify", "Hostinger"],
    link: "https://shikkhakosh.com",
    preview: shikkhakoshPreview,
  },
  {
    title: "Volue ASA, Norway",
    label: "Data Engineering",
    difficulty: "A" as Rank,
    blurb:
      "Engineered ETL pipelines and data workflows for power market analytics at a leading Norwegian energy tech company. Collected and preprocessed high-resolution power market data from diverse sources, designed and maintained scalable pipelines supporting forecasting models, and ensured data integrity across high-volume transformation processes.",
    tech: ["Python", "Apache Airflow", "Pandas", "BeautifulSoup4", "Django", "REST APIs", "Docker", "GCP", "Grafana", "Prometheus"],
    link: "https://www.volue.com/",
    preview: voluePreview,
  },
  {
    title: "Team Task Summarizer",
    label: "AI-Driven Automation",
    difficulty: "A" as Rank,
    blurb:
      "Developed a secure automation system to aggregate and summarize team updates from GitHub, Slack, and ClickUp using OAuth 2.0 integrations. Built a data processing pipeline leveraging local LLMs (Llama 3.2 and Gemma) with structured prompt engineering to generate high-accuracy summaries. Delivered consolidated AI-generated reports to Gmail with zero external API cost through secure local model execution.",
    tech: ["Python", "OAuth 2.0", "GitHub API", "Slack API", "ClickUp API", "Llama 3.2", "Gemma", "n8n", "Gmail API"],
    slides: [copai1, copai2, copai3, copai4, copai5],
  },
  {
    title: "Monarch Chat",
    label: "Real-Time Messaging",
    difficulty: "B" as Rank,
    blurb:
      "End-to-end messaging app with rooms, typing indicators and read receipts.",
    tech: ["React", "Socket.io", "Node"],
    link: "#",
  },
  {
    title: "Arise Portfolio",
    label: "Animated Portfolio",
    difficulty: "C" as Rank,
    blurb:
      "This very site — a Solo Leveling themed animated portfolio built with React + GSAP.",
    tech: ["React", "GSAP", "Tailwind"],
    link: "#",
  },
];

/* ------------------------------- EXPERIENCE ------------------------------ */
// "Hunter Association Records" — a quest log timeline.
export const experience = [
  {
    role: "Software Engineer",
    org: "Cefalo",
    period: "2024 — Present",
    rank: "A" as Rank,
    points: [
      "Build and maintain production web applications used by thousands of users.",
      "Collaborate across teams to ship features end-to-end with clean, tested code.",
    ],
  },
  {
    role: "Junior Developer",
    org: "Freelance / Open Source",
    period: "2023 — 2024",
    rank: "B" as Rank,
    points: [
      "Delivered client web projects from design to deployment.",
      "Contributed to open-source repos and grew core React/Node skills.",
    ],
  },
  {
    role: "Awakening — Began Coding",
    org: "Self-taught Journey",
    period: "2022",
    rank: "E" as Rank,
    points: [
      "Started the path: HTML, CSS, JavaScript and the fundamentals of the web.",
    ],
  },
];

/* --------------------------------- SOCIAL -------------------------------- */
export const socials: { label: string; href: string; icon: IconComponent }[] = [
  {
    label: "GitHub",
    href: "https://github.com/ahadulhaquenaim",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ahadulhaque/",
    icon: LinkedinIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ahadul.haque.naim.2025/",
    icon: FacebookIcon,
  },
  { label: "Email", href: "mailto:ahadul.haque@cefalo.com", icon: Mail },
];

/* --------------------------------- NAV ----------------------------------- */
export const navLinks = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
  { id: "games", label: "GAMES" },
];
