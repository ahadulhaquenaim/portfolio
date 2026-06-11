import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Calendar, ShieldCheck, Cpu, Lock, Code2, Server, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

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
  S: "#fbbf24",
  A: "#a855f7",
  B: "#38bdf8",
};

/* ── floating rune particles ── */
const RUNES = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ"];

function FloatingRunes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {RUNES.map((r, i) => (
        <motion.span
          key={i}
          className="absolute select-none font-display text-xs"
          style={{
            left: `${(i * 6.25) % 100}%`,
            top: `${(i * 17 + 5) % 90}%`,
            color: i % 3 === 0 ? "#8b5cf620" : i % 3 === 1 ? "#38bdf815" : "#4ade8012",
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, i % 2 === 0 ? 15 : -15, 0],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.25,
          }}
        >
          {r}
        </motion.span>
      ))}
    </div>
  );
}

/* ── credential counter ── */
function CredentialCounter() {
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
        <motion.div
          className="absolute h-28 w-28 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #8b5cf6, #38bdf8, #4ade80, #f43f5e, #fbbf24, #8b5cf6)",
            filter: "blur(8px)",
            opacity: 0.4,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2"
          style={{
            background: "radial-gradient(circle, #130c26 60%, #05030c)",
            borderColor: "#fbbf2460",
          }}
        >
          <motion.span
            className="font-display text-3xl font-black leading-none"
            style={{ color: "#fbbf24", textShadow: "0 0 20px #fbbf2480" }}
            animate={{ textShadow: ["0 0 20px #fbbf2480", "0 0 40px #fbbf24cc", "0 0 20px #fbbf2480"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {CERTIFICATIONS.length}
          </motion.span>
          <span className="font-display text-[8px] tracking-[0.2em] text-white/50">SCROLLS</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #fbbf24)" }} />
        <span className="font-display text-[11px] tracking-[0.35em]" style={{ color: "#fbbf24" }}>
          CREDENTIALS ACQUIRED
        </span>
        <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #fbbf24, transparent)" }} />
      </div>
    </motion.div>
  );
}



/* ── carousel ── */
function CertCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const total = CERTIFICATIONS.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActive((prev) => (prev + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 4000);
    return () => clearInterval(id);
  }, [paused, go]);

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

  const SPRING = { type: "spring" as const, stiffness: 280, damping: 30, mass: 0.85 };

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
          const rankColor = RANK_COLORS[cert.rank] ?? "#8b5cf6";

          return (
            <motion.div
              key={cert.title}
              className="absolute w-full md:w-[52%] max-w-140"
              animate={SLOT[slot]}
              transition={SPRING}
              style={{ transformStyle: "preserve-3d", pointerEvents: isCenter ? "auto" : "none" }}
            >
              {/* breathing glow — only on center */}
              {isCenter && (
                <motion.div
                  className="absolute -inset-4 rounded-2xl pointer-events-none"
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: `radial-gradient(ellipse, ${cert.categoryColor}55, transparent 70%)`,
                    filter: "blur(18px)",
                    zIndex: -1,
                  }}
                />
              )}

              {/* trail streak on side cards */}
              {!isCenter && (
                <motion.div
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
                  background: "linear-gradient(135deg, #0a0716ee 0%, #130c26ee 100%)",
                  border: `1px solid ${isCenter ? cert.categoryColor + "70" : cert.categoryColor + "35"}`,
                  boxShadow: isCenter
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
                    background: `linear-gradient(90deg, transparent 0%, ${cert.categoryColor} 35%, ${rankColor} 65%, transparent 100%)`,
                  }}
                />
                {/* corner runes */}
                <span className="absolute right-3 top-4 font-display text-[10px] opacity-20" style={{ color: cert.categoryColor }}>ᚠᚱ</span>
                <span className="absolute bottom-4 left-3 font-display text-[10px] opacity-20" style={{ color: cert.categoryColor }}>ᚷᚹ</span>

                <div className="relative z-10 p-8 flex flex-col">
                  {/* header */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded px-2.5 py-1 font-display text-[11px] font-bold tracking-[0.2em]"
                        style={{ background: `${cert.categoryColor}18`, color: cert.categoryColor, border: `1px solid ${cert.categoryColor}35` }}
                      >
                        {cert.category}
                      </span>
                      <span
                        className="rounded px-2 py-1 font-display text-[11px] font-black tracking-[0.15em]"
                        style={{ background: `${rankColor}18`, color: rankColor, border: `1px solid ${rankColor}40` }}
                      >
                        {cert.rank}-RANK
                      </span>
                    </div>
                    <motion.div
                      className="relative flex h-13 w-13 items-center justify-center rounded-lg"
                      style={{ background: `radial-gradient(circle, ${cert.categoryColor}22, ${cert.categoryColor}08)`, border: `1px solid ${cert.categoryColor}35` }}
                      animate={isCenter ? {
                        boxShadow: [
                          `0 0 0px 0px ${cert.categoryColor}00`,
                          `0 0 16px 4px ${cert.categoryColor}50`,
                          `0 0 0px 0px ${cert.categoryColor}00`,
                        ],
                      } : {}}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <cert.CategoryIcon size={22} style={{ color: cert.categoryColor }} />
                      {isCenter && (
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          style={{ border: `1px solid ${cert.categoryColor}` }}
                          animate={{ opacity: [0, 0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* title */}
                  <h3
                    className="mb-4 font-display text-[18px] font-bold leading-snug text-white"
                    style={{ textShadow: isCenter ? `0 0 16px ${cert.categoryColor}40` : "none" }}
                  >
                    {cert.title}
                  </h3>

                  {/* issuer */}
                  <div className="mb-5 flex items-center gap-2">
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black"
                      style={{ background: `${cert.issuerColor}25`, color: cert.issuerColor, border: `1px solid ${cert.issuerColor}50` }}
                    >
                      {cert.issuer[0]}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: cert.issuerColor }}>{cert.issuer}</span>
                    <Cpu size={12} style={{ color: cert.issuerColor, opacity: 0.6 }} />
                  </div>

                  {/* divider */}
                  <div className="mb-4 h-px" style={{ background: `linear-gradient(90deg, ${cert.categoryColor}40, transparent)` }} />

                  {/* footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-white" />
                      <span className="font-body text-[13px] tracking-widest text-white">{cert.date}</span>
                    </div>
                    <motion.a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative flex items-center gap-2 overflow-hidden rounded-md px-5 py-2.5 font-display text-[13px] font-semibold tracking-[0.18em]"
                      style={{
                        background: `${cert.categoryColor}28`,
                        color: cert.categoryColor,
                        border: `1.5px solid ${cert.categoryColor}80`,
                        boxShadow: `0 0 8px 1px ${cert.categoryColor}30`,
                      }}
                      whileHover={{ background: `${cert.categoryColor}45`, boxShadow: `0 0 20px 4px ${cert.categoryColor}60` }}
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
              background: "linear-gradient(135deg, #130c26, #0a0716)",
              border: "1px solid #8b5cf640",
              boxShadow: "0 0 12px #8b5cf615",
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid #8b5cf6" }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
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
              background: "linear-gradient(135deg, #130c26, #0a0716)",
              border: "1px solid #8b5cf640",
              boxShadow: "0 0 12px #8b5cf615",
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid #8b5cf6" }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
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
        {!paused && (
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
  return (
    <section id="certifications" className="relative z-10 mx-auto max-w-screen-2xl overflow-hidden px-6 py-24 md:px-10">
      <FloatingRunes />

      {/* background arcane glow blobs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)", filter: "blur(60px)" }}
      />

      <SectionHeading kicker="CREDENTIALS · VERIFIED" title="Certifications" />

      <CredentialCounter />

      <CertCarousel />
    </section>
  );
}
