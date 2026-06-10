import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Calendar, ShieldCheck, Cpu, Lock, Code2, Server, Sparkles } from "lucide-react";
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
    credentialUrl: "#",
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
    credentialUrl: "#",
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
    credentialUrl: "#",
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
    credentialUrl: "#",
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
    credentialUrl: "#",
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
    credentialUrl: "#",
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

const ENTRANCE_DIRECTIONS = [
  { x: -60, y: -30 },
  { x: 0, y: -60 },
  { x: 60, y: -30 },
  { x: -60, y: 30 },
  { x: 0, y: 60 },
  { x: 60, y: 30 },
];

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
      className="mx-auto mb-16 flex w-fit flex-col items-center gap-2"
    >
      {/* outer ring */}
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

/* ── individual cert card ── */
function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const dir = ENTRANCE_DIRECTIONS[index];
  const rankColor = RANK_COLORS[cert.rank] ?? "#8b5cf6";

  return (
    <motion.article
      initial={{ opacity: 0, x: dir.x, y: dir.y, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl"
      style={{
        background: "linear-gradient(135deg, #0a071699 0%, #130c2699 100%)",
        border: `1px solid ${cert.categoryColor}30`,
      }}
    >
      {/* animated border glow on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 30px 4px ${cert.categoryColor}25, inset 0 0 30px 0px ${cert.categoryColor}08`,
        }}
      />

      {/* scanline texture */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)`,
          zIndex: 1,
        }}
      />

      {/* top gradient bar */}
      <div
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${cert.categoryColor} 35%, ${rankColor} 65%, transparent 100%)`,
        }}
      />

      {/* corner rune marks */}
      <span className="absolute right-3 top-4 font-display text-[10px] opacity-20" style={{ color: cert.categoryColor }}>
        ᚠᚱ
      </span>
      <span className="absolute bottom-4 left-3 font-display text-[10px] opacity-20" style={{ color: cert.categoryColor }}>
        ᚷᚹ
      </span>

      {/* VERIFIED holographic stamp */}
      <div
        className="pointer-events-none absolute right-4 top-8 rotate-[-28deg] select-none rounded border-2 px-2 py-0.5 text-[9px] font-black tracking-[0.3em] opacity-[0.12] group-hover:opacity-[0.22] transition-opacity duration-300"
        style={{ borderColor: cert.categoryColor, color: cert.categoryColor }}
      >
        VERIFIED
      </div>

      {/* card body */}
      <div className="relative z-10 p-6">
        {/* header row: category badge + rank badge + icon */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="rounded px-2 py-[3px] font-display text-[9px] font-bold tracking-[0.2em]"
              style={{ background: `${cert.categoryColor}18`, color: cert.categoryColor, border: `1px solid ${cert.categoryColor}35` }}
            >
              {cert.category}
            </span>
            <span
              className="rounded px-1.5 py-[3px] font-display text-[9px] font-black tracking-[0.15em]"
              style={{ background: `${rankColor}18`, color: rankColor, border: `1px solid ${rankColor}40` }}
            >
              {cert.rank}-RANK
            </span>
          </div>

          {/* pulsing icon orb */}
          <motion.div
            className="relative flex h-11 w-11 items-center justify-center rounded-lg"
            style={{ background: `radial-gradient(circle, ${cert.categoryColor}22, ${cert.categoryColor}08)`, border: `1px solid ${cert.categoryColor}35` }}
            animate={{
              boxShadow: [
                `0 0 0px 0px ${cert.categoryColor}00`,
                `0 0 16px 4px ${cert.categoryColor}50`,
                `0 0 0px 0px ${cert.categoryColor}00`,
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
          >
            <cert.CategoryIcon size={18} style={{ color: cert.categoryColor }} />
            {/* inner shimmer ring */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{ border: `1px solid ${cert.categoryColor}` }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.35 }}
            />
          </motion.div>
        </div>

        {/* title */}
        <h3
          className="mb-3 font-display text-[13px] font-bold leading-snug text-white"
          style={{ textShadow: `0 0 16px ${cert.categoryColor}40` }}
        >
          {cert.title}
        </h3>

        {/* issuer pill */}
        <div className="mb-5 flex items-center gap-2">
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black"
            style={{ background: `${cert.issuerColor}25`, color: cert.issuerColor, border: `1px solid ${cert.issuerColor}50` }}
          >
            {cert.issuer[0]}
          </div>
          <span className="text-xs font-semibold" style={{ color: cert.issuerColor }}>
            {cert.issuer}
          </span>
          <Cpu size={10} style={{ color: cert.issuerColor, opacity: 0.6 }} />
        </div>

        {/* divider */}
        <div
          className="mb-4 h-px"
          style={{ background: `linear-gradient(90deg, ${cert.categoryColor}40, transparent)` }}
        />

        {/* footer: date + view button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Calendar size={11} className="text-white/40" />
            <span className="font-body text-[11px] tracking-widest text-white/40">{cert.date}</span>
          </div>

          <motion.a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex items-center gap-1.5 overflow-hidden rounded-md px-3 py-1.5 font-display text-[10px] font-bold tracking-[0.18em] transition-colors duration-300"
            style={{
              background: `${cert.categoryColor}15`,
              color: cert.categoryColor,
              border: `1px solid ${cert.categoryColor}40`,
            }}
            whileHover={{
              background: `${cert.categoryColor}30`,
              boxShadow: `0 0 16px 2px ${cert.categoryColor}40`,
            }}
            whileTap={{ scale: 0.96 }}
          >
            {/* button shimmer */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
            <span>VIEW</span>
            <ExternalLink size={9} />
          </motion.a>
        </div>
      </div>
    </motion.article>
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, i) => (
          <CertCard key={cert.title} cert={cert} index={i} />
        ))}
      </div>

    </section>
  );
}
