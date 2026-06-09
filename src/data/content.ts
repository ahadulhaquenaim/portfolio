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
    { k: "Rank", v: "S-Class Hunter" },
    { k: "Guild", v: "Cefalo" },
    { k: "Specialty", v: "Web · React · Node" },
  ],
};

/* --------------------------------- SKILLS -------------------------------- */
// rank drives the badge color (E lowest → S highest). value = bar fill %.
export type Rank = "E" | "D" | "C" | "B" | "A" | "S";
export const skills: { name: string; rank: Rank; value: number }[] = [
  { name: "React / Next.js", rank: "S", value: 94 },
  { name: "TypeScript", rank: "S", value: 90 },
  { name: "JavaScript", rank: "S", value: 95 },
  { name: "Node.js / Express", rank: "A", value: 86 },
  { name: "Tailwind / CSS", rank: "A", value: 88 },
  { name: "MongoDB / SQL", rank: "B", value: 80 },
  { name: "Git / CI-CD", rank: "A", value: 84 },
  { name: "UI / UX Design", rank: "B", value: 78 },
];

/* -------------------------------- PROJECTS ------------------------------- */
// Each project is a "dungeon raid". difficulty maps to a rank badge.
export const projects = [
  {
    title: "Project Icarus",
    difficulty: "S" as Rank,
    blurb:
      "A real-time collaboration platform with live cursors, presence and conflict-free sync.",
    tech: ["React", "WebSocket", "Node", "Redis"],
    link: "#",
  },
  {
    title: "Shadow Commerce",
    difficulty: "A" as Rank,
    blurb:
      "Full-stack e-commerce with cart, payments and an admin dashboard for inventory.",
    tech: ["Next.js", "Stripe", "MongoDB"],
    link: "#",
  },
  {
    title: "The Rune Tracker",
    difficulty: "A" as Rank,
    blurb:
      "Habit + goal tracker with streak analytics and animated progress visualizations.",
    tech: ["React", "Framer Motion", "Firebase"],
    link: "#",
  },
  {
    title: "Gate Analytics",
    difficulty: "B" as Rank,
    blurb:
      "Dashboard turning raw event data into interactive, filterable charts in real time.",
    tech: ["TypeScript", "D3", "Express"],
    link: "#",
  },
  {
    title: "Monarch Chat",
    difficulty: "B" as Rank,
    blurb:
      "End-to-end messaging app with rooms, typing indicators and read receipts.",
    tech: ["React", "Socket.io", "Node"],
    link: "#",
  },
  {
    title: "Arise Portfolio",
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
  { id: "games", label: "GAMES" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
];
