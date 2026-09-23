import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Calendar, ShieldCheck, Cpu, Lock, Code2, Server, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { useTheme } from "../theme/ThemeContext";

type Certification = {
  title: string;
  issuer: string;
  issuerColor: string;
  date: string;
  credentialUrl: string;
  category: string;
  categoryColor: string;
  CategoryIcon: React.ElementType;
  rank: string;
};

const CERTIFICATIONS: Certification[] = [
  {
    title: "Claude Certified Architect - Foundations",
    issuer: "Anthropic",
    issuerColor: "#a855f7",
    date: "07/09/2026",
    credentialUrl: "https://www.credly.com/badges/5989b573-5a34-4e08-865e-4f810ded2179/public_url",
    category: "AI",
    categoryColor: "#c084fc",
    CategoryIcon: Sparkles,
    rank: "SS",
  },
  {
    title: "NestJS Mastery: Build & Deploy a Production-Ready API",
    issuer: "Udemy",
    issuerColor: "#f97316",
    date: "16/03/2026",
    credentialUrl: "https://www.udemy.com/certificate/UC-297e3a18-e8c3-40a4-b70c-83caa525e478/",
    category: "BACKEND",
    categoryColor: "#4ade80",
    CategoryIcon: Server,
    rank: "S",
  },
  {
    title: "Claude Code In Action",
    issuer: "Anthropic",
    issuerColor: "#a855f7",
    date: "01/03/2026",
    credentialUrl: "http://verify.skilljar.com/c/imdyeuy6pha9",
    category: "AI",
    categoryColor: "#c084fc",
    CategoryIcon: Sparkles,
    rank: "S",
  },
  {
    title: "Intermediate Secure Coding in NodeJS",
    issuer: "Secureflag",
    issuerColor: "#f43f5e",
    date: "07/02/2026",
    credentialUrl: "https://www.secureflag.com/s?af66d4e3-e91a-42c6-a73b-a0d4cfdb870c",
    category: "SECURITY",
    categoryColor: "#f43f5e",
    CategoryIcon: Lock,
    rank: "A",
  },
  {
    title: "Complete React, Next.js & TypeScript Projects",
    issuer: "Udemy",
    issuerColor: "#f97316",
    date: "09/11/2025",
    credentialUrl: "https://www.udemy.com/certificate/UC-3994e19a-29d8-44b2-91b1-04cb6789616c/",
    category: "FRONTEND",
    categoryColor: "#38bdf8",
    CategoryIcon: Code2,
    rank: "A",
  },
  {
    title: "Python Django – The Practical Guide",
    issuer: "Udemy",
    issuerColor: "#f97316",
    date: "30/06/2025",
    credentialUrl: "https://www.udemy.com/certificate/UC-db2d1428-fb80-4b91-9dc9-20b80fd59270/",
    category: "BACKEND",
    categoryColor: "#4ade80",
    CategoryIcon: Server,
    rank: "B",
  },
  {
    title: "OWASP Top 10:2021 in Python Learning Path",
    issuer: "Secureflag",
    issuerColor: "#f43f5e",
    date: "10/09/2024",
    credentialUrl: "https://www.secureflag.com/s?e6de5204-de77-4cf2-ae6a-e5c8313e6ce7",
    category: "SECURITY",
    categoryColor: "#f43f5e",
    CategoryIcon: ShieldCheck,
    rank: "A",
  },
];

const RANK_COLORS: Record<string, string> = {
  SS: "#ffd700",
  S: "#fbbf24",
  A: "#a855f7",
  B: "#38bdf8",
};

/* The Certifications section stays on the Solo-Leveling purple accent in every
   theme — the DBZ orange washed the whole panel (background glow, runes, arrows)
   and read poorly, so we pin these to Solo values instead of `palette.primary`. */
const SECTION_ACCENT = "#8b5cf6";
const SECTION_ACCENT_RGB = "168,85,247";
const ARROW_ACCENT = SECTION_ACCENT;
const ARROW_ACCENT_RGB = SECTION_ACCENT_RGB;

/* ── floating rune particles ── */
const RUNES = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ"];

function FloatingRunes() {
  const { palette } = useTheme();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {RUNES.map((r, i) => (
        <span
          key={i}
          className="fx-rune absolute select-none font-display text-xs"
          style={{
            left: `${(i * 6.25) % 100}%`,
            top: `${(i * 17 + 5) % 90}%`,
            color: i % 3 === 0 ? `rgba(${SECTION_ACCENT_RGB},0.13)` : i % 3 === 1 ? `rgba(${palette.systemRGB},0.08)` : "#4ade8012",
            "--fx-dur": `${4 + (i % 4)}s`,
            "--fx-delay": `${i * 0.25}s`,
            "--fx-rot": i % 2 === 0 ? "15deg" : "-15deg",
          } as React.CSSProperties}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

/* ── credential counter ── */
function CredentialCounter() {
  const { palette } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "backOut" }}
      className="mx-auto mb-1 flex w-fit flex-col items-center gap-5"
    >
      <div className="relative flex items-center justify-center">
        <div
          className="fx-spin absolute h-28 w-28 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #8b5cf6, #38bdf8, #4ade80, #f43f5e, #fbbf24, #8b5cf6)",
            filter: "blur(8px)",
            opacity: 0.4,
            "--fx-dur": "8s",
          } as React.CSSProperties}
        />
        <div
          className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2"
          style={{
            background: "radial-gradient(circle, var(--t-shadow) 60%, var(--t-abyss))",
            borderColor: `${palette.gold}60`,
          }}
        >
          <span
            className="relative font-display text-3xl font-black leading-none"
            style={{ color: palette.gold, textShadow: `0 0 20px ${palette.gold}80` }}
          >
            {CERTIFICATIONS.length}
            {/* Stronger glow painted once on transparent glyphs; only its
                opacity pulses, so text-shadow is never re-painted per frame. */}
            <span
              aria-hidden
              className="fx-pulse absolute inset-0 text-transparent"
              style={{ textShadow: `0 0 40px ${palette.gold}cc`, "--fx-o0": "0" } as React.CSSProperties}
            >
              {CERTIFICATIONS.length}
            </span>
          </span>
          <span className="font-display text-[8px] tracking-[0.2em] text-white/50">SCROLLS</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${palette.gold})` }} />
        <span className="font-display text-[11px] tracking-[0.35em]" style={{ color: palette.gold }}>
          CREDENTIALS ACQUIRED
        </span>
        <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${palette.gold}, transparent)` }} />
      </div>
    </motion.div>
  );
}



/* ── carousel ── */
function CertCarousel() {
  const { palette } = useTheme();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);
  // Off-screen, auto-advance would keep springing all 7 cards every 4s for
  // nobody — hold the carousel until it scrolls back into view.
  const inView = useInView(rootRef, { margin: "100px 0px" });
  const total = CERTIFICATIONS.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActive((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused || !inView) return;
    const id = setInterval(() => go(1), 4000);
    return () => clearInterval(id);
  }, [paused, inView, go]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    setDragging(true);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    const delta = dragStart.current - e.clientX;
    if (Math.abs(delta) > 40) go(delta > 0 ? 1 : -1);
  };

  const prev1  = (active - 1 + total) % total;
  const prev2  = (active - 2 + total) % total;
  const next1  = (active + 1) % total;
  const next2  = (active + 2) % total;
  /*
   * 5-slot system — every card is always rendered and spring-animates between slots.
   *
   *  far-left  ·  left  ·  CENTER  ·  right  ·  far-right
   *
   *  hidden-left / hidden-right = off-screen entry/exit points
   */
  const SLOT: Record<string, Record<string, string | number>> = {
    center: {
      x: "0%",
      scale: 1,
      rotateY: 0,
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 10,
    },
    left: {
      x: "-62%",
      scale: 0.82,
      rotateY: 22,
      opacity: 0.55,
      filter: "blur(0.8px)",
      zIndex: 6,
    },
    right: {
      x: "62%",
      scale: 0.82,
      rotateY: -22,
      opacity: 0.55,
      filter: "blur(0.8px)",
      zIndex: 6,
    },
    "far-left": {
      x: "-112%",
      scale: 0.65,
      rotateY: 38,
      opacity: 0.22,
      filter: "blur(2.5px)",
      zIndex: 2,
    },
    "far-right": {
      x: "112%",
      scale: 0.65,
      rotateY: -38,
      opacity: 0.22,
      filter: "blur(2.5px)",
      zIndex: 2,
    },
    "hidden-left": {
      x: "-160%",
      scale: 0.55,
      rotateY: 55,
      opacity: 0,
      filter: "blur(8px)",
      zIndex: 0,
    },
    "hidden-right": {
      x: "160%",
      scale: 0.55,
      rotateY: -55,
      opacity: 0,
      filter: "blur(8px)",
      zIndex: 0,
    },
  };

  // Spring the transform/opacity, but give `filter` (blur) a short tween —
  // springing blur re-rasters every card every frame for the whole settle
  // time and is the carousel's main jank source.
  const SPRING = {
    type: "spring" as const,
    stiffness: 280,
    damping: 30,
    mass: 0.85,
    filter: { type: "tween" as const, duration: 0.25, ease: "easeOut" as const },
  };

  const getSlot = (idx: number) => {
    if (idx === active) return "center";
    if (idx === prev1)  return "left";
    if (idx === next1)  return "right";
    if (idx === prev2)  return "far-left";
    if (idx === next2)  return "far-right";
    return direction > 0 ? "hidden-left" : "hidden-right";
  };

  return (
    <div
      ref={rootRef}
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* stage */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "1600px", minHeight: "360px" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => setDragging(false)}
      >
        {/* render every cert as a persistent positioned card that animates between slots */}
        {CERTIFICATIONS.map((cert, idx) => {
          const slot = getSlot(idx);
          const isCenter = slot === "center";
          const rankColor = RANK_COLORS[cert.rank] ?? palette.primary;
          const isLegendary = cert.rank === "SS";

          return (
            <motion.div
              key={cert.title}
              className="absolute w-[88%] sm:w-full md:w-[52%] max-w-140"
              animate={SLOT[slot]}
              transition={SPRING}
              style={{ transformStyle: "preserve-3d", pointerEvents: isCenter ? "auto" : "none", willChange: "transform, opacity" }}
            >
              {/* breathing glow — only on center */}
              {isCenter && (
                <div
                  className="fx-breathe absolute -inset-4 rounded-2xl pointer-events-none"
                  style={{
                    background: isLegendary
                      ? `radial-gradient(ellipse, ${RANK_COLORS.SS}70, transparent 70%)`
                      : `radial-gradient(ellipse, ${cert.categoryColor}55, transparent 70%)`,
                    filter: isLegendary ? "blur(24px)" : "blur(18px)",
                    zIndex: -1,
                    "--fx-dur": isLegendary ? "1.8s" : "2.5s",
                    "--fx-o0": isLegendary ? "0.35" : "0.2",
                    "--fx-o1": isLegendary ? "0.75" : "0.5",
                    "--fx-s1": isLegendary ? "1.08" : "1.05",
                  } as React.CSSProperties}
                />
              )}

              {/* legendary sparkle field — SS rank only */}
              {isCenter && isLegendary && (
                <div className="pointer-events-none absolute -inset-2 overflow-visible z-20">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={i}
                      className="fx-twinkle absolute rounded-full"
                      style={{
                        left: `${(i * 37) % 100}%`,
                        top: `${(i * 53) % 100}%`,
                        width: i % 3 === 0 ? 3 : 2,
                        height: i % 3 === 0 ? 3 : 2,
                        background: RANK_COLORS.SS,
                        boxShadow: `0 0 6px 1px ${RANK_COLORS.SS}`,
                        "--fx-dur": `${1.6 + (i % 5) * 0.3}s`,
                        "--fx-delay": `${(i % 7) * 0.25}s`,
                        "--fx-s1": "1.3",
                      } as React.CSSProperties}
                    />
                  ))}
                </div>
              )}

              {/* trail streak on side cards */}
              {!isCenter && (
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: `linear-gradient(${slot === "left" || slot === "far-left" ? "90deg" : "270deg"}, ${cert.categoryColor}12, transparent)`,
                    zIndex: -1,
                  }}
                />
              )}

              <div
                className="group relative overflow-hidden rounded-xl h-full cursor-grab active:cursor-grabbing"
                style={{
                  background: isLegendary
                    ? "linear-gradient(135deg, #6b5200 0%, #a8790a 35%, #ffcf3d 68%, #a8790a 100%)"
                    : "linear-gradient(135deg, var(--t-void) 0%, var(--t-shadow) 100%)",
                  border: isLegendary
                    ? `1.5px solid ${RANK_COLORS.SS}${isCenter ? "c0" : "60"}`
                    : `1px solid ${isCenter ? cert.categoryColor + "70" : cert.categoryColor + "35"}`,
                  boxShadow: isLegendary
                    ? isCenter
                      ? `0 0 40px 6px ${RANK_COLORS.SS}55, 0 0 100px 14px ${RANK_COLORS.SS}25, inset 0 0 28px 0px ${RANK_COLORS.SS}18`
                      : `0 0 20px 3px ${RANK_COLORS.SS}30`
                    : isCenter
                    ? `0 0 32px 4px ${cert.categoryColor}45, 0 0 80px 8px ${cert.categoryColor}18, inset 0 0 24px 0px ${cert.categoryColor}10`
                    : `0 0 16px 2px ${cert.categoryColor}20`,
                }}
              >
                {/* scanline */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)`,
                    zIndex: 1,
                  }}
                />
                {/* top bar */}
                <div
                  className="absolute left-0 right-0 top-0 h-0.75"
                  style={{
                    background: isLegendary
                      ? `linear-gradient(90deg, transparent 0%, ${RANK_COLORS.SS} 50%, transparent 100%)`
                      : `linear-gradient(90deg, transparent 0%, ${cert.categoryColor} 35%, ${rankColor} 65%, transparent 100%)`,
                  }}
                />
                {/* corner runes */}
                <span className="absolute right-3 top-4 font-display text-[10px] opacity-20" style={{ color: isLegendary ? "#3d2c00" : cert.categoryColor }}>ᚠᚱ</span>
                <span className="absolute bottom-4 left-3 font-display text-[10px] opacity-20" style={{ color: isLegendary ? "#3d2c00" : cert.categoryColor }}>ᚷᚹ</span>

                <div className="relative z-10 p-5 sm:p-8 flex flex-col">
                  {/* header */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded px-2.5 py-1 font-display text-[11px] font-bold tracking-[0.2em]"
                        style={
                          isLegendary
                            ? { background: "#3d2c0022", color: "#3d2c00", border: "1px solid #3d2c0055" }
                            : { background: `${cert.categoryColor}18`, color: cert.categoryColor, border: `1px solid ${cert.categoryColor}35` }
                        }
                      >
                        {cert.category}
                      </span>
                      <span
                        className="rounded px-2 py-1 font-display text-[11px] font-black tracking-[0.15em]"
                        style={
                          isLegendary
                            ? { background: "#1a1200", color: RANK_COLORS.SS, border: "1px solid #3d2c0080" }
                            : { background: `${rankColor}18`, color: rankColor, border: `1px solid ${rankColor}40` }
                        }
                      >
                        {cert.rank}-RANK
                      </span>
                    </div>
                    <div
                      className="relative flex h-13 w-13 items-center justify-center rounded-lg"
                      style={
                        isLegendary
                          ? { background: "radial-gradient(circle, #3d2c0030, #3d2c0010)", border: "1px solid #3d2c0055" }
                          : { background: `radial-gradient(circle, ${cert.categoryColor}22, ${cert.categoryColor}08)`, border: `1px solid ${cert.categoryColor}35` }
                      }
                    >
                      <cert.CategoryIcon size={22} style={{ color: isLegendary ? "#3d2c00" : cert.categoryColor }} />
                      {isCenter && (
                        <>
                          {/* glow halo: pre-painted shadow, opacity pulses */}
                          <span
                            className="fx-pulse pointer-events-none absolute inset-0 rounded-lg"
                            style={{ boxShadow: `0 0 16px 4px ${cert.categoryColor}50`, "--fx-dur": "2.5s", "--fx-o0": "0" } as React.CSSProperties}
                          />
                          <span
                            className="fx-pulse pointer-events-none absolute inset-0 rounded-lg"
                            style={{ border: `1px solid ${isLegendary ? "#3d2c00" : cert.categoryColor}`, "--fx-o0": "0", "--fx-o1": "0.5" } as React.CSSProperties}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* title */}
                  <h3
                    className="mb-4 font-display text-[18px] font-bold leading-snug"
                    style={{
                      color: isLegendary ? "#241a00" : "#ffffff",
                      textShadow: isLegendary ? "none" : isCenter ? `0 0 16px ${cert.categoryColor}40` : "none",
                    }}
                  >
                    {cert.title}
                  </h3>

                  {/* issuer */}
                  <div className="mb-5 flex items-center gap-2">
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black"
                      style={
                        isLegendary
                          ? { background: "#1a1200", color: "#ffe066", border: "1px solid #1a120060" }
                          : { background: `${cert.issuerColor}25`, color: cert.issuerColor, border: `1px solid ${cert.issuerColor}50` }
                      }
                    >
                      {cert.issuer[0]}
                    </div>
                    <span className="text-sm font-bold" style={{ color: isLegendary ? "#1a1200" : cert.issuerColor }}>{cert.issuer}</span>
                    <Cpu size={12} style={{ color: isLegendary ? "#1a1200" : cert.issuerColor, opacity: isLegendary ? 0.8 : 0.6 }} />
                  </div>

                  {/* divider */}
                  <div className="mb-4 h-px" style={{ background: isLegendary ? "linear-gradient(90deg, #3d2c0060, transparent)" : `linear-gradient(90deg, ${cert.categoryColor}40, transparent)` }} />

                  {/* footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className={isLegendary ? "" : "text-white"} style={isLegendary ? { color: "#1a1200" } : undefined} />
                      <span className={`font-body text-[13px] tracking-widest font-bold ${isLegendary ? "" : "text-white"}`} style={isLegendary ? { color: "#1a1200" } : undefined}>{cert.date}</span>
                    </div>
                    <motion.a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative flex items-center gap-2 overflow-hidden rounded-md px-5 py-2.5 font-display text-[13px] font-semibold tracking-[0.18em]"
                      style={
                        isLegendary
                          ? { background: "#1a1200", color: RANK_COLORS.SS, border: "1.5px solid #3d2c0090", boxShadow: `0 0 10px 1px ${RANK_COLORS.SS}40` }
                          : { background: `${cert.categoryColor}28`, color: cert.categoryColor, border: `1.5px solid ${cert.categoryColor}80`, boxShadow: `0 0 8px 1px ${cert.categoryColor}30` }
                      }
                      whileHover={
                        isLegendary
                          ? { background: "#2a1e00", boxShadow: `0 0 20px 4px ${RANK_COLORS.SS}70` }
                          : { background: `${cert.categoryColor}45`, boxShadow: `0 0 20px 4px ${cert.categoryColor}60` }
                      }
                      whileTap={{ scale: 0.96 }}
                    >
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
                      <span>VIEW</span>
                      <ExternalLink size={12} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* NAVIGATION ROW */}
      <div className="mt-4 flex flex-col items-center gap-5">
        {/* counter + arrows */}
        <div className="flex items-center gap-6">
          {/* left arrow */}
          <motion.button
            onClick={() => go(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--t-shadow), var(--t-void))",
              border: `1px solid rgba(${ARROW_ACCENT_RGB},0.25)`,
              boxShadow: `0 0 12px rgba(${ARROW_ACCENT_RGB},0.08)`,
            }}
          >
            <span
              className="fx-pulse absolute inset-0 rounded-full"
              style={{ border: `1px solid ${ARROW_ACCENT}`, "--fx-o0": "0.1", "--fx-o1": "0.4" } as React.CSSProperties}
            />
            <ChevronLeft size={16} className="text-white/70" />
          </motion.button>

          {/* card counter */}
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-black" style={{ color: CERTIFICATIONS[active].categoryColor, textShadow: `0 0 16px ${CERTIFICATIONS[active].categoryColor}60` }}>
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-xs text-white/30">/</span>
            <span className="font-display text-sm text-white/30">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* right arrow */}
          <motion.button
            onClick={() => go(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, var(--t-shadow), var(--t-void))",
              border: `1px solid rgba(${ARROW_ACCENT_RGB},0.25)`,
              boxShadow: `0 0 12px rgba(${ARROW_ACCENT_RGB},0.08)`,
            }}
          >
            <span
              className="fx-pulse absolute inset-0 rounded-full"
              style={{ border: `1px solid ${ARROW_ACCENT}`, "--fx-o0": "0.1", "--fx-o1": "0.4", "--fx-delay": "1s" } as React.CSSProperties}
            />
            <ChevronRight size={16} className="text-white/70" />
          </motion.button>
        </div>

        {/* dot indicators */}
        <div className="flex items-center gap-2">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > active ? 1 : -1);
                setActive(i);
              }}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? "24px" : "6px",
                height: "6px",
                background:
                  i === active
                    ? cert.categoryColor
                    : "#ffffff20",
                boxShadow: i === active ? `0 0 8px ${cert.categoryColor}` : "none",
              }}
            />
          ))}
        </div>

        {/* auto-play progress bar */}
        {!paused && inView && (
          <div className="w-32 h-0.5 rounded-full overflow-hidden" style={{ background: "#ffffff10" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: CERTIFICATIONS[active].categoryColor }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              key={active}
              transition={{ duration: 4, ease: "linear" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── section ── */
export default function Certifications() {
  const { palette } = useTheme();
  return (
    <section id="certifications" className="relative z-10 mx-auto max-w-screen-2xl overflow-hidden px-6 py-24 md:px-10">
      <FloatingRunes />

      {/* background arcane glow blobs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full opacity-[0.06]"
        style={{ background: `radial-gradient(circle, ${SECTION_ACCENT}, transparent 70%)`, filter: "blur(60px)" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full opacity-[0.05]"
        style={{ background: `radial-gradient(circle, ${palette.system}, transparent 70%)`, filter: "blur(60px)" }}
      />

      <SectionHeading kicker="CREDENTIALS · VERIFIED" title="Certifications" />

      <CredentialCounter />

      <CertCarousel />
    </section>
  );
}
