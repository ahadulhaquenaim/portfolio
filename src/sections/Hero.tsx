import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown, Download, Zap, Code2, Trophy, Layers, Brain, Star, Cpu } from "lucide-react";
import { identity } from "../data/content";

// Deterministic pseudo-random based on index to avoid hydration drift
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: 30 + seededRandom(i * 3) * 55,      // cluster around character (30–85%)
  y: 5 + seededRandom(i * 3 + 1) * 90,
  size: 2 + seededRandom(i * 3 + 2) * 4,
  duration: 3 + seededRandom(i * 7) * 5,
  delay: seededRandom(i * 11) * 4,
  driftX: (seededRandom(i * 13) - 0.5) * 60,
  driftY: -(30 + seededRandom(i * 17) * 60), // always float upward
  opacity: 0.4 + seededRandom(i * 19) * 0.6,
}));

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  // The gate overlay is `position: fixed` and covers the whole viewport, so it
  // MUST always be torn down — even if GSAP never runs. We unmount it from
  // React (not just display:none) once the intro is done or skipped.
  const [showGate, setShowGate] = useState(true);

  // Mouse parallax — raw mouse position normalised to [-1, 1]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

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

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

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

      {/* ---- Full-bleed character (video if available, else image) ---- */}
      <CharacterLayer
        imageSrc={identity.heroBackground ?? null}
        videoSrc={identity.heroVideo ?? null}
        springX={springX}
        springY={springY}
      />

      {/* ---- Floating purple spark particles ---- */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, #e879f9 0%, #a855f7 60%, transparent 100%)`,
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(168,85,247,0.8)`,
            }}
            animate={{
              x: [0, p.driftX * 0.5, p.driftX],
              y: [0, p.driftY * 0.5, p.driftY],
              opacity: [0, p.opacity, 0],
              scale: [0.4, 1.2, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              repeatDelay: seededRandom(p.id * 23) * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Legibility overlays:
          - left→right dark gradient so the headline text stays readable
          - bottom fade so the hero blends into the next section
          - subtle mana tint */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(100deg,rgba(5,3,12,0.92)_0%,rgba(5,3,12,0.6)_28%,rgba(5,3,12,0.0)_42%,rgba(5,3,12,0.0)_70%,rgba(5,3,12,0.4)_100%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(109,40,217,0.25),transparent_65%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-t from-abyss to-transparent" />

      {/* Left-to-right spotlight — soft beam across the character */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.04) 42%, rgba(220,180,255,0.06) 55%, transparent 70%)",
        }}
      />
      {/* Aura glow — subtle purple halo around the body */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 42% 68% at 57% 52%, rgba(168,85,247,0.12) 0%, rgba(109,40,217,0.06) 50%, transparent 75%)",
          mixBlendMode: "screen",
        }}
      />


      <div className="relative z-10 mx-auto grid min-h-screen w-full grid-cols-1 items-center gap-8 px-8 pt-24 pb-16 lg:grid-cols-[1.2fr_0.8fr] xl:px-20 2xl:px-32 lg:pl-32 xl:pl-48">
        {/* ---- LEFT: headline text ---- */}
        <div className="hero-text">
          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-mana-bright [text-shadow:0_0_16px_rgba(168,85,247,1),0_0_32px_rgba(168,85,247,0.6)]">
            {identity.tagline}
          </p>
          <h1 className="font-display text-7xl font-black leading-none text-glow md:text-8xl">
            {identity.name}
          </h1>
          <p className="mt-4 text-xl tracking-[0.2em] text-white [text-shadow:0_0_12px_rgba(168,85,247,0.8)]">
            {identity.roles.join("  |  ")}
          </p>
          <p className="mt-5 max-w-md font-semibold leading-relaxed text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
            {identity.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="btn-mana rounded-md px-7 py-3 font-semibold tracking-wider text-white"
            >
              VIEW MY WORK ›
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv/ahad-cv.pdf`}
              download="ahad-cv.pdf"
              className="flex items-center gap-2 rounded-md border-2 px-7 py-3 font-bold tracking-wider text-[#22d3ee] backdrop-blur-sm transition-all duration-300 hover:bg-[#22d3ee22]"
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

// Lightning bolt paths — positioned around the character silhouette
const LIGHTNING_BOLTS = [
  { id: 0, x: "52%", y: "8%",  rotate: 15,  delay: 0,    dur: 2.8 },
  { id: 1, x: "72%", y: "22%", rotate: 40,  delay: 1.1,  dur: 3.2 },
  { id: 2, x: "78%", y: "55%", rotate: 70,  delay: 0.4,  dur: 2.5 },
  { id: 3, x: "65%", y: "80%", rotate: 120, delay: 1.7,  dur: 3.6 },
  { id: 4, x: "38%", y: "78%", rotate: 200, delay: 0.8,  dur: 2.9 },
  { id: 5, x: "28%", y: "50%", rotate: 250, delay: 2.1,  dur: 3.1 },
  { id: 6, x: "35%", y: "18%", rotate: 310, delay: 0.3,  dur: 2.6 },
];

function CharacterLayer({
  imageSrc,
  videoSrc,
  springX,
  springY,
}: {
  imageSrc: string | null;
  videoSrc: string | null;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(springX, [-1, 1], [-18, 18]);
  const y = useTransform(springY, [-1, 1], [-10, 10]);

  return (
    <motion.div className="absolute inset-0 z-0" style={{ x, y }}>
      {/* Video takes priority over static image */}
      {videoSrc ? (
        <motion.div
          className="hero-character absolute inset-0 overflow-hidden"
          style={{ transformOrigin: "50% 75%" }}
          animate={{ scale: [1, 1.012, 1, 1.008, 1], y: [0, -6, 0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-45%)",
              height: "100%",
              width: "auto",
              minWidth: "60%",
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>
      ) : imageSrc ? (
        <motion.div
          className="hero-character absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "110%",
            backgroundPosition: "0% 15%",
            transformOrigin: "50% 75%",
          }}
          animate={{ scale: [1, 1.012, 1, 1.008, 1], y: [0, -6, 0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
        />
      ) : null}

      {/* Aura pulse layer 1 — wide slow breathe */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 38% 62% at 57% 50%, rgba(168,85,247,0.22) 0%, rgba(109,40,217,0.1) 45%, transparent 70%)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aura pulse layer 2 — tighter faster flicker */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 22% 40% at 57% 48%, rgba(232,121,249,0.28) 0%, rgba(168,85,247,0.1) 50%, transparent 70%)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.4, 0.9, 0.5, 1, 0.4], scale: [1, 1.04, 0.98, 1.05, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rim light flicker — edge glow on the character */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 80% at 57% 50%, transparent 55%, rgba(168,85,247,0.18) 75%, rgba(232,121,249,0.12) 85%, transparent 95%)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.5, 1, 0.6, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.5, 0.8, 1] }}
      />

      {/* Lightning bolts around the silhouette */}
      {LIGHTNING_BOLTS.map((bolt) => (
        <motion.div
          key={bolt.id}
          className="absolute pointer-events-none"
          style={{ left: bolt.x, top: bolt.y, rotate: bolt.rotate }}
          animate={{
            opacity: [0, 0, 1, 0.6, 1, 0],
            scaleY: [0.4, 1, 0.8, 1.1, 0.6, 0],
          }}
          transition={{
            duration: bolt.dur,
            delay: bolt.delay,
            repeat: Infinity,
            repeatDelay: seededRandom(bolt.id * 31) * 2.5 + 0.5,
            ease: "easeOut",
          }}
        >
          <svg width="14" height="36" viewBox="0 0 14 36" fill="none">
            <path
              d="M8 0L2 16H7L0 36L14 14H8L13 0Z"
              fill="url(#bolt-grad)"
              filter="url(#bolt-glow)"
            />
            <defs>
              <linearGradient id="bolt-grad" x1="7" y1="0" x2="7" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f0abfc" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <filter id="bolt-glow" x="-80%" y="-20%" width="260%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
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
    desc: "Consistent growth, zero days wasted",
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
