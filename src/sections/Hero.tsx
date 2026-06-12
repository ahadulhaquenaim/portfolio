import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ChevronDown, Download, Zap, Code2, Trophy, Layers, Brain, Star, Cpu } from "lucide-react";
import { identity } from "../data/content";
import { useVideoInView } from "../lib/useVideoInView";
import { useTheme } from "../theme/ThemeContext";
import type { HeroVideoStyle } from "../theme/palette";

export default function Hero() {
  const { palette } = useTheme();
  const root = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  // The gate overlay is `position: fixed` and covers the whole viewport, so it
  // MUST always be torn down — even if GSAP never runs. We unmount it from
  // React (not just display:none) once the intro is done or skipped.
  const [showGate, setShowGate] = useState(true);

  useEffect(() => {
    const finish = () => {
      setRevealed(true);
      setShowGate(false);
    };

    // Respect reduced-motion: skip the cinematic and reveal immediately.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      finish();
      return;
    }

    // Safety net: if the timeline stalls (throttled rAF, error), clear anyway.
    const safety = window.setTimeout(finish, 6000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.clearTimeout(safety);
          finish();
        },
      });

      // 1. Screen starts black, a vertical "gate" crack of purple light opens
      tl.set(".gate-overlay", { opacity: 1 })
        .fromTo(
          ".gate-crack",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.in" }
        )
        // 2. The gate splits open, light floods, halves slide apart
        .to(".gate-half-l", { xPercent: -110, duration: 0.9, ease: "power4.inOut" })
        .to(
          ".gate-half-r",
          { xPercent: 110, duration: 0.9, ease: "power4.inOut" },
          "<"
        )
        .to(".gate-crack", { opacity: 0, duration: 0.3 }, "<")
        // 3. Background art fades + zooms in (scale from >1 so no edges show)
        .fromTo(
          ".hero-character",
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.1 },
          "-=0.5"
        )
        // 4. Text + HUD slide in
        .fromTo(
          ".hero-text > *",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.7"
        )
        .fromTo(
          ".hero-hud",
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.5"
        );
    }, root);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* ---- GSAP gate-crack overlay (cinematic entrance) ---- */}
      {showGate && (
        <div className="gate-overlay fixed inset-0 z-[60] flex">
          <div className="gate-half-l h-full w-1/2 bg-abyss border-r border-mana/30" />
          <div className="gate-crack absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-mana-bright shadow-[0_0_40px_18px_#a855f7]" />
          <div className="gate-half-r h-full w-1/2 bg-abyss border-l border-mana/30" />
        </div>
      )}

      {/* ---- Full-bleed looping video background (dungeon-style treatment) ---- */}
      <div className="hero-character absolute inset-0 z-0 overflow-hidden">
        <HeroVideoBg videoSrc={palette.heroVideo ?? null} imageSrc={identity.heroBackground ?? null} videoStyle={palette.heroVideoStyle} />
        {/* Dark scrim so the headline stays readable */}
        <div className="absolute inset-0" style={{ background: "rgba(4,2,18,0.25)" }} />
        {/* Edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(4,2,18,0.5) 70%, rgba(4,2,18,0.88) 100%)",
          }}
        />
        {/* Top/bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(4,2,18,0.85) 0%, transparent 15%, transparent 85%, rgba(4,2,18,0.85) 100%)",
          }}
        />
      </div>

      {/* Solid top band so the hero video never shows through the fixed navbar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 bg-linear-to-b from-abyss via-abyss/95 to-transparent" />

      {/* Left→right dark gradient so the headline text stays readable */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(100deg,rgba(5,3,12,0.92)_0%,rgba(5,3,12,0.6)_28%,rgba(5,3,12,0.0)_42%,rgba(5,3,12,0.0)_70%,rgba(5,3,12,0.4)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-t from-abyss to-transparent" />


      <div className="relative z-10 mx-auto grid min-h-screen w-full grid-cols-1 items-start gap-8 px-5 pt-24 pb-16 sm:px-8 lg:items-center lg:pt-28 lg:grid-cols-[1.2fr_0.8fr] xl:px-20 2xl:px-32 lg:pl-16 xl:pl-24">
        {/* ---- LEFT: headline text ---- */}
        <div className="hero-text">
          <p className="mb-3 text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.3em] text-mana-bright [text-shadow:0_0_16px_rgba(168,85,247,1),0_0_32px_rgba(168,85,247,0.6)]">
            {identity.tagline}
          </p>
          <h1 className="font-display text-5xl font-black leading-none text-glow sm:text-7xl md:text-8xl">
            {identity.name}
          </h1>
          <p className="mt-4 text-base sm:text-xl tracking-[0.15em] sm:tracking-[0.2em] text-white [text-shadow:0_0_12px_rgba(168,85,247,0.8)]">
            {identity.roles.join("  |  ")}
          </p>
          <p className="mt-5 max-w-md text-sm sm:text-base font-semibold leading-relaxed text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
            {identity.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#projects"
              className="btn-mana rounded-md px-5 py-3 text-sm sm:px-7 sm:text-base font-semibold tracking-wider text-white"
            >
              VIEW MY WORK ›
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv/ahad-cv.pdf`}
              download="ahad-cv.pdf"
              className="flex items-center gap-2 rounded-md border-2 px-5 py-3 text-sm sm:px-7 sm:text-base font-bold tracking-wider text-[#22d3ee] backdrop-blur-sm transition-all duration-300 hover:bg-[#22d3ee22]"
              style={{ background: "#22d3ee18", borderColor: "#22d3ee90", boxShadow: "0 0 20px 4px #22d3ee40" }}
            >
              <Download size={14} />
              DOWNLOAD CV
            </a>
          </div>
        </div>

        {/* ---- RIGHT: Achievement Unlocked Cards ---- */}
        <div className="hero-hud hidden flex-col gap-3 lg:flex lg:pl-28 xl:pl-40">
          <p className="mb-2 text-sm font-bold tracking-[0.3em] text-white/90">[ ACHIEVEMENTS UNLOCKED ]</p>
          {ACHIEVEMENTS.map((a, i) => (
            <AchievementCard key={a.title} achievement={a} index={i} go={revealed} />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-slate-400"
      >
        <span className="text-xs tracking-[0.3em]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ChevronDown className="text-mana-bright" />
        </motion.span>
      </motion.a>
    </section>
  );
}

// Full-bleed looping background video (dungeon-style treatment swapped in from
// the Sports section). Plain object-cover loop — overlays are layered by Hero.
function HeroVideoBg({
  videoSrc,
  imageSrc,
  videoStyle,
}: {
  videoSrc: string | null;
  imageSrc: string | null;
  videoStyle: HeroVideoStyle;
}) {
  const videoRef = useVideoInView<HTMLVideoElement>();

  if (videoSrc) {
    return (
      <video
        key={videoSrc}
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: videoStyle.objectFit,
          objectPosition: videoStyle.objectPosition,
          opacity: videoStyle.opacity,
          filter: videoStyle.filter,
          transform: `scale(${videoStyle.scale})`,
          transformOrigin: videoStyle.transformOrigin,
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }

  if (imageSrc) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
    );
  }

  return null;
}

type Achievement = {
  icon: React.ReactNode;
  rarity: string;
  rarityColor: string;
  title: string;
  desc: string;
  xp: string;
  isAI?: boolean;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    icon: <Cpu size={18} />,
    rarity: "S-RANK · AI",
    rarityColor: "#22d3ee",
    title: "AI Integration Specialist",
    desc: "LLM · Claude · Prompt Eng · N8N",
    xp: "+3000 XP",
    isAI: true,
  },
  {
    icon: <Trophy size={18} />,
    rarity: "LEGENDARY",
    rarityColor: "#f59e0b",
    title: "Full-Stack Architect",
    desc: "Shipped 15+ production apps end-to-end",
    xp: "+2500 XP",
  },
  {
    icon: <Code2 size={18} />,
    rarity: "EPIC",
    rarityColor: "#a855f7",
    title: "JavaScript Sovereign",
    desc: "React · Node.js · TypeScript mastery",
    xp: "+1800 XP",
  },
  {
    icon: <Brain size={18} />,
    rarity: "EPIC",
    rarityColor: "#a855f7",
    title: "Problem Solver S-Rank",
    desc: "Turns complex bugs into clean solutions",
    xp: "+1600 XP",
  },
  {
    icon: <Layers size={18} />,
    rarity: "RARE",
    rarityColor: "#38bdf8",
    title: "UI Craftsman",
    desc: "Pixel-perfect, animated interfaces",
    xp: "+1200 XP",
  },
  {
    icon: <Zap size={18} />,
    rarity: "RARE",
    rarityColor: "#38bdf8",
    title: "3+ Years On The Grind",
    desc: "Consistent growth, minimum stale time",
    xp: "+1000 XP",
  },
  {
    icon: <Star size={18} />,
    rarity: "UNCOMMON",
    rarityColor: "#4ade80",
    title: "100% Dedication",
    desc: "Ships with quality, every single time",
    xp: "+800 XP",
  },
];

function AchievementCard({
  achievement,
  index,
  go,
}: {
  achievement: Achievement;
  index: number;
  go: boolean;
}) {
  const { isAI, rarityColor } = achievement;

  return (
    <motion.div
      initial={{ opacity: 0, x: 48, scale: 0.92 }}
      animate={go ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.15 * index, ease: "easeOut" }}
      className="group relative flex items-center gap-4 overflow-hidden rounded-lg border bg-abyss/60 px-5 py-4 backdrop-blur-sm"
      style={{
        borderColor: `${rarityColor}${isAI ? "70" : "40"}`,
        boxShadow: isAI ? `0 0 18px 2px ${rarityColor}25, inset 0 0 24px 0px ${rarityColor}08` : undefined,
      }}
    >
      {/* AI card: animated scan line */}
      {isAI && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-[2px] opacity-40"
          style={{ background: `linear-gradient(90deg, transparent, ${rarityColor}, transparent)` }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />
      )}
      {/* left accent bar */}
      <motion.div
        className="absolute left-0 top-0 h-full w-1 rounded-l-lg"
        style={{ background: rarityColor }}
        animate={isAI ? { boxShadow: [`0 0 8px 2px ${rarityColor}50`, `0 0 20px 6px ${rarityColor}90`, `0 0 8px 2px ${rarityColor}50`] } : { boxShadow: `0 0 12px 3px ${rarityColor}70` }}
        transition={isAI ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : {}}
      />

      {/* icon bubble */}
      <motion.div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md"
        style={{ background: `${rarityColor}22`, color: rarityColor }}
        animate={isAI ? { boxShadow: [`0 0 0px 0px ${rarityColor}00`, `0 0 12px 4px ${rarityColor}50`, `0 0 0px 0px ${rarityColor}00`] } : {}}
        transition={isAI ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : {}}
      >
        {achievement.icon}
      </motion.div>

      {/* text */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold tracking-[0.18em]"
            style={{ color: rarityColor }}
          >
            {achievement.rarity}
          </span>
          <span className="text-[10px] font-semibold tracking-widest text-white/70">ACHIEVEMENT UNLOCKED</span>
        </div>
        <p className="truncate text-sm font-extrabold text-white [text-shadow:0_0_12px_rgba(255,255,255,0.4)]">{achievement.title}</p>
        <p className="truncate text-xs font-semibold text-white/80">{achievement.desc}</p>
      </div>

      {/* XP badge */}
      <span
        className="shrink-0 rounded px-2 py-1 text-[10px] font-bold tracking-wider"
        style={{ background: `${rarityColor}22`, color: rarityColor }}
      >
        {achievement.xp}
      </span>

      {/* shimmer on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </motion.div>
  );
}
