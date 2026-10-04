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
const aiTeachingAssistantPreview = "https://res.cloudinary.com/dumsdgz85/image/upload/v1791147249/ai-teaching-assistant_nabzbn.png";
const shikkhakoshPreview = "https://res.cloudinary.com/dumsdgz85/image/upload/v1781118411/shikkhakosh_hpzngg.png";
const voluePreview = "https://res.cloudinary.com/dumsdgz85/image/upload/v1781118410/volue_vq5m8j.png";
const copai1 = "https://res.cloudinary.com/dumsdgz85/image/upload/v1781118406/copai1_uow8k6.png";
const copai2 = "https://res.cloudinary.com/dumsdgz85/image/upload/v1781118406/copai2_ap89da.png";
const copai3 = "https://res.cloudinary.com/dumsdgz85/image/upload/v1781118407/copai3_drowl9.png";
const copai4 = "https://res.cloudinary.com/dumsdgz85/image/upload/v1781118407/copai4_qq4jfk.png";
const copai5 = "https://res.cloudinary.com/dumsdgz85/image/upload/v1781118406/copai5_jbznpl.png";
const atsPreview = "https://res.cloudinary.com/dumsdgz85/image/upload/v1781118407/ats_sakcph.png";
const thaiCraftPreview = "https://res.cloudinary.com/dumsdgz85/image/upload/v1781118412/thai-craft_ljtwqy.png";

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
  heroBackground: null as string | null,
  heroVideo: `${import.meta.env.BASE_URL}videos/hero-character.mp4` as string | null,
  contactVideo: `${import.meta.env.BASE_URL}videos/meet.mp4` as string | null,
  email: "ahadul.haque@cefalo.com",
  cvPath: "/cv/Md_Ahadul_Haque_CV.pdf",
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
  // AI & Data
  { name: "Apache Airflow", rank: "A", value: 85 },
  { name: "ETL Pipelines", rank: "A", value: 86 },
  { name: "Pandas / BeautifulSoup4", rank: "A", value: 84 },
  { name: "LLM Integration", rank: "A", value: 85 },
  { name: "Prompt Engineering", rank: "A", value: 84 },
  { name: "RAG", rank: "A", value: 82 },
  { name: "LangChain / LangGraph", rank: "A", value: 83 },
  { name: "Vector Databases", rank: "B", value: 80 },
  { name: "Claude (Anthropic)", rank: "A", value: 85 },
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
    title: "AI Teaching Assistant",
    label: "Agentic RAG Study Platform",
    ai: true,
    difficulty: "S" as Rank,
    blurb:
      "Built an AI study platform that turns static course material (PDF/DOCX) into an interactive tutor with cited, page-level answers and auto-graded quizzes — running entirely on free tiers. Designed a Corrective RAG workflow in LangGraph that grades retrieved chunks with an LLM, rephrases weak queries, and falls back to web search to reduce hallucinations. Engineered an async ingestion pipeline with scanned-PDF detection and Gemini embeddings stored in per-document Pinecone namespaces for user data isolation, with chat history and quizzes persisted in MongoDB Atlas. Developed a provider-agnostic LLM layer with automatic Gemini → OpenRouter fallback and retry logic, secured by ownership-checked document access, prompt-injection protection for web results, and per-user upload quotas.",
    tech: ["Python", "FastAPI", "LangGraph", "LangChain", "RAG", "Gemini", "OpenRouter", "Pinecone", "MongoDB Atlas", "Streamlit", "Pytest"],
    repoLink: "https://github.com/ahadulhaquenaim/ai-teaching-assistant",
    highlights: [
      { label: "Overview", text: "AI study platform that turns static course material (PDF/DOCX) into an interactive tutor with cited, page-level answers and auto-graded quizzes — running entirely on free tiers." },
      { label: "Corrective RAG", text: "LangGraph workflow that grades retrieved chunks with an LLM, rephrases weak queries, and falls back to web search to reduce hallucinations." },
      { label: "Ingestion", text: "Async pipeline with scanned-PDF detection and Gemini embeddings stored in per-document Pinecone namespaces for user data isolation." },
      { label: "Persistence", text: "Chat history and quizzes persisted in MongoDB Atlas." },
      { label: "LLM Layer", text: "Provider-agnostic design with automatic Gemini → OpenRouter fallback and retry logic." },
      { label: "Security", text: "Ownership-checked document access, prompt-injection protection for web results, and per-user upload quotas." },
    ],
    preview: aiTeachingAssistantPreview,
  },
  {
    title: "Shikkhakosh",
    label: "Full-Stack E-Commerce",
    difficulty: "S" as Rank,
    blurb:
      "Co-founded and architected a production e-commerce platform serving real customers at shikkhakosh.com — a Turborepo monorepo with a customer storefront, admin dashboard, and REST API sharing UI components and TypeScript types. Engineered a NestJS backend of 20+ domain modules covering the full commerce lifecycle, integrated Steadfast Courier for bulk order dispatch, secured it with JWT refresh-token rotation and Google/Facebook OAuth, and shipped the containerized stack to a Hostinger VPS via Coolify with separate dev and production environments.",
    tech: ["Next.js 14", "NestJS", "TypeScript", "Prisma", "MySQL", "Tailwind CSS", "Passport.js", "JWT", "Docker", "Turborepo", "Coolify", "Hostinger"],
    link: "https://shikkhakosh.com",
    highlights: [
      { label: "Overview", text: "Co-founded and architected a production e-commerce platform live at shikkhakosh.com, owning it from data model to deployment." },
      { label: "Architecture", text: "A Turborepo monorepo where the storefront, admin dashboard and REST API share UI component and TypeScript type libraries, so types stay consistent across all apps." },
      { label: "Backend", text: "20+ NestJS modules covering the full commerce lifecycle: product variants, nested categories, coupons and rewards, review moderation, and push notifications." },
      { label: "Logistics", text: "Steadfast Courier integration for sending and cancelling orders in bulk from the admin panel." },
      { label: "Invoicing", text: "Custom invoice generation built into the order flow." },
      { label: "Auth & Security", text: "JWT login with refresh-token rotation, plus Google and Facebook sign-in through Passport.js." },
      { label: "DevOps", text: "Docker for the whole stack, deployed to a Hostinger VPS via Coolify, with separate development and production environments." },
    ],
    preview: shikkhakoshPreview,
  },
  {
    title: "Volue ASA, Norway",
    label: "Data Engineering",
    difficulty: "A" as Rank,
    blurb:
      "Engineered ETL pipelines and data workflows for power market analytics at a leading Norwegian energy tech company. Collected, preprocessed, and structured high-resolution power market data from diverse sources, and designed, maintained, and enhanced pipelines supporting forecasting models. Orchestrated complex workflows with Apache Airflow across thousands of data sources, containerized services with Docker on GCP, and set up Prometheus and Grafana monitoring to track pipeline health and detect data anomalies in real time.",
    tech: ["Python", "Apache Airflow", "Pandas", "BeautifulSoup4", "Django", "REST APIs", "Docker", "GCP", "Grafana", "Prometheus"],
    link: "https://www.volue.com/",
    highlights: [
      { label: "Overview", text: "Engineered ETL pipelines and data workflows for power market analytics at a leading Norwegian energy tech company." },
      { label: "Data Collection", text: "Collected, preprocessed, and structured high-resolution power market data from diverse sources into standardized formats." },
      { label: "Pipelines", text: "Designed, maintained, and enhanced ETL pipelines for forecasting models and energy market analytics, adding features that improved reliability, scalability, and performance." },
      { label: "Orchestration", text: "Orchestrated and scheduled complex workflows with Apache Airflow across thousands of data sources, improving observability and reducing manual intervention." },
      { label: "Data Integrity", text: "Ensured data integrity and consistency across high-volume transformation processes." },
      { label: "DevOps", text: "Containerized data services with Docker for consistent deployment across development and production on Google Cloud Platform (GCP)." },
      { label: "Monitoring", text: "Prometheus and Grafana monitoring and alerting to track pipeline health and detect data anomalies in real time." },
      { label: "Collaboration", text: "Worked with cross-functional teams to turn energy market forecasting requirements into robust data engineering solutions." },
    ],
    preview: voluePreview,
  },
  {
    title: "Team Task Summarizer",
    label: "AI-Driven Automation",
    ai: true,
    difficulty: "S" as Rank,
    blurb:
      "Developed a secure automation system to aggregate and summarize team updates from GitHub, Slack, and ClickUp using OAuth 2.0 integrations. Built a data processing pipeline leveraging local LLMs (Llama 3.2 and Gemma) with structured prompt engineering to generate high-accuracy summaries. Delivered consolidated AI-generated reports to Gmail with zero external API cost through secure local model execution.",
    tech: ["Python", "OAuth 2.0", "GitHub API", "Slack API", "ClickUp API", "Llama 3.2", "Gemma", "n8n", "Gmail API"],
    slides: [copai1, copai2, copai3, copai4, copai5],
    highlights: [
      { label: "Overview", text: "Developed a secure automation system that aggregates and summarizes team updates from GitHub, Slack, and ClickUp, so no one misses what their team shipped." },
      { label: "Integrations", text: "Secure OAuth 2.0 integrations with GitHub, Slack, and ClickUp APIs to pull commits, messages, and task updates from each platform." },
      { label: "Workflow", text: "Built the end-to-end automation pipeline in n8n, from data collection through summarization to delivery." },
      { label: "Local LLMs", text: "Data processing pipeline leveraging local LLMs (Llama 3.2 and Gemma) with structured prompt engineering to generate high-accuracy summaries." },
      { label: "Privacy & Cost", text: "Secure local model execution keeps team data in-house and runs with zero external API cost." },
      { label: "Delivery", text: "Consolidated AI-generated reports delivered straight to Gmail." },
    ],
  },
  {
    title: "AI Application Tracking System",
    label: "Applicant Tracking System",
    ai: true,
    difficulty: "S" as Rank,
    blurb:
      "Contributed as a team member to a large-scale, production-grade ATS featuring a public job portal and an internal HR/admin dashboard, supporting end-to-end recruitment workflows. Developed and extended RESTful APIs across multiple NestJS modules covering candidate management, job postings, interview scheduling, evaluations, RBAC, and ABAC. Integrated Google Calendar API for automated interview scheduling and HackerRank API for in-platform coding assessments. Implemented multi-stage candidate tracking, dynamic application forms, and bulk Excel/PDF export for HR/admin reporting. Developed an AI-powered candidate shortlisting and scoring feature that automatically evaluates applicants against job requirements, reducing manual screening effort for the HR team. Integrated ElevenLabs to build an AI-powered voice interview feature that conducts automated screening interviews with candidates, enabling HR to assess applicants at scale without scheduling live interviewers for early-stage rounds.",
    tech: ["TypeScript", "NestJS", "Next.js", "Prisma", "MySQL", "Ant Design", "Zustand", "AWS S3", "Docker", "JWT", "ElevenLabs"],
    preview: atsPreview,
    link: "https://career.cefalo.com/",
    highlights: [
      { label: "Overview", text: "Team member on a large-scale, production-grade ATS with a public job portal and an internal HR/admin dashboard for end-to-end recruitment." },
      { label: "APIs", text: "Developed and extended RESTful APIs across NestJS modules: candidate management, job postings, interview scheduling, evaluations, RBAC, and ABAC." },
      { label: "Integrations", text: "Google Calendar API for automated interview scheduling and HackerRank API for in-platform coding assessments." },
      { label: "HR Tooling", text: "Multi-stage candidate tracking, dynamic application forms, and bulk Excel/PDF export for reporting." },
      { label: "AI Shortlisting", text: "AI-powered candidate scoring against job requirements, reducing manual screening effort for HR." },
      { label: "AI Voice Interviews", text: "ElevenLabs-powered voice agent that runs automated screening interviews, letting HR assess applicants at scale without live interviewers for early-stage rounds." },
    ],
  },
  {
    title: "Thai Craft Learning",
    label: "Full-Stack CMS Platform",
    difficulty: "A" as Rank,
    blurb:
      "A full-stack content management and learning platform for Thai arts and crafts. Supports user authentication, article creation with rich-text editing, revision/publication workflows, file/image uploads with processing, collections, tags, homepage management, reporting, and daily usage statistics — served through a React frontend with an Express/Node.js REST API.",
    tech: ["Node.js", "Express.js", "TypeScript", "React 18", "Material UI", "MariaDB", "Knex.js", "JWT", "Docker", "Nginx"],
    preview: thaiCraftPreview,
    highlights: [
      { label: "Overview", text: "Full-stack content management and learning platform for Thai arts and crafts." },
      { label: "Content", text: "Article creation with rich-text editing and revision/publication workflows." },
      { label: "Media", text: "File/image uploads with processing, collections, tags, and homepage management." },
      { label: "Insights", text: "Reporting and daily usage statistics." },
      { label: "Stack", text: "React frontend backed by an Express/Node.js REST API." },
    ],
  },
];

/* ------------------------------- EXPERIENCE ------------------------------ */
// "Hunter Association Records" — a quest log timeline.
export const experience = [
  {
    role: "Software Engineer",
    org: "Cefalo Bangladesh LTD",
    period: "March 2026 — Present",
    rank: "A" as Rank,
    points: [],
  },
  {
    role: "Data Engineer",
    org: "Volue ASA, Norway (via Cefalo Bangladesh LTD)",
    period: "August 2024 — February 2026",
    rank: "B" as Rank,
    points: [],
  },
  {
    role: "Associate Software Engineer",
    org: "Cefalo Bangladesh LTD",
    period: "September 2023 — July 2024",
    rank: "C" as Rank,
    points: [],
  },
  {
    role: "Trainee Software Engineer",
    org: "Cefalo Bangladesh LTD",
    period: "July 2023 — September 2023",
    rank: "D" as Rank,
    points: [],
  },
];

/* --------------------------------- SPORTS -------------------------------- */
// Three dungeon categories — each holds your conquered prizes.
export const sports = [
  {
    category: "Badminton",
    achievements: [
      {
        title: "Man Of The Tournament (Singles & Doubles)",
        prize: "1st Place",
        date: "January 1, 2021",
        description: "Intra-Ict Badminton Tournament MBSTU",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/2.jpg",
      },
      {
        title: "Man Of The Tournament(Singles)",
        prize: "1st Place",
        date: "January 1, 2025",
        description: "Inter-Software Badminton Tournament 2025",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/12.jpg",
        imagePosition: "center top",
      },
      {
        title: "Runner Up(Singles)",
        prize: "Runner Up",
        date: "January 1, 2025",
        description: "Inter-Software Badminton tournament 2025",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/10.jpg",
        imageFit: "contain",
      },
      {
        title: "Champion (Singles & Doubles)",
        prize: "Champions",
        date: "January 1, 2021",
        description: "Intra-ICT Badminton Tournament",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/3.jpg",
        imagePosition: "30% 30%",
        imageFit: "contain",
      },
      {
        title: "Champion(Doubles)",
        prize: "Champions",
        date: "January 1, 2023",
        description: "Intra-Govt Colony Badminton Tournament 2023",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/7.jpg",
        imageFit: "contain",
      },
      {
        title: "Champion(Singles & Doubles)",
        prize: "Champions",
        date: "March 1, 2023",
        description: "Inter-MBSTU Badminton tournament 2023",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/8.jpg",
        imagePosition: "center 40%",
        imageFit: "contain",
      },
      {
        title: "Man Of The Tournament",
        prize: "1st Place",
        date: "March 1, 2023",
        description: "Inter-MBSTU badminton tournament 2023",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/9.jpg",
      },
    ],
  },
  {
    category: "Football",
    achievements: [
      {
        title: "Best Player",
        prize: "Best Player",
        date: "June 1, 2023",
        description: "Taking prize from VC sir",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/4.jpg",
      },
      {
        title: "Champion",
        prize: "Champions",
        date: "February 1, 2025",
        description: "Intra Cefalo Futsal Tournament 2025",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/11.jpg",
      },
      {
        title: "Man of the Tournament",
        prize: "1st Place",
        date: "May 1, 2022",
        description: "Intra-ICT Football Tournament 2022",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/1.jpg",
      },
      {
        title: "Runner Up",
        prize: "Runner Up",
        date: "July 1, 2024",
        description: "Intra-Akota Colony Football Tournament",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/football_n.jpg",
        imageFit: "contain",
      },
      {
        title: "Top Scorer",
        prize: "Top Scorer",
        date: "June 1, 2018",
        description: "Intra-ICT Football Tournament 2018",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/top_score.png",
        imagePosition: "center 30%",
        imageFit: "contain",
      },
    ],
  },
  {
    category: "Cricket",
    achievements: [
      {
        title: "Champion",
        prize: "Champions",
        date: "January 1, 2026",
        description: "Cricsoft Bd Cricket Tournament 2026",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/14.jpg",
      },
      {
        title: "Champion",
        prize: "Champions",
        date: "October 1, 2025",
        description: "Intra-ICT Cricket tournament 2025",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/13.jpg",
      },
      {
        title: "Man Of The Final",
        prize: "1st Place",
        date: "October 1, 2025",
        description: "Intra-ICT Cricket tournament 2025",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/1000025633.jpg",
      },
      {
        title: "Highest Run Scorer",
        prize: "Best Batsman",
        date: "October 1, 2023",
        description: "Intra-Cefalo Cricket Tournament 2023",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/highest_run_scorer.jpg",
      },
      {
        title: "Man Of The Final",
        prize: "1st Place",
        date: "October 1, 2023",
        description: "Intra-Cefalo Cricket Tournament 2023",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/man_of_the_final.jpg",
      },
      {
        title: "Man Of The Tournament",
        prize: "1st Place",
        date: "October 1, 2023",
        description: "Intra-Cefalo Cricket Tournament 2023",
        image: "https://bkif02lvdu10wryr.public.blob.vercel-storage.com/man_of_the_series.jpg",
      },
    ],
  },
] as const;

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
  { id: "certifications", label: "CERTIFICATIONS" },
  { id: "contact", label: "CONTACT" },
  { id: "sports", label: "SPORTS" },
];
