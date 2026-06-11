import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Swords, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import RankBadge from "../components/RankBadge";
import { projects } from "../data/content";
import { rankStyle } from "../lib/rank";

type Project = (typeof projects)[number];

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  function openProject(p: Project) {
    setActive(p);
    setSlideIndex(0);
  }

  function prevSlide(slides: string[]) {
    setSlideIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function nextSlide(slides: string[]) {
    setSlideIndex((i) => (i + 1) % slides.length);
  }

  return (
    <section id="projects" className="relative z-10 w-full px-0 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading kicker="MY WORK" title="DUNGEON RAIDS" />
      </div>

      {/* Full-width layout with side decorations */}
      <div className="relative flex items-start gap-0">
        {/* Left side decoration */}
        <div className="hidden lg:flex flex-col items-center justify-center min-w-35 xl:min-w-45 pt-8 select-none pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-mana-bright/60" />
            <div className="rotate-90 text-[10px] tracking-[0.4em] text-mana-bright/50 font-mono">GATE SYSTEM</div>
            <div className="flex flex-col gap-1.5 items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-mana-bright/30" style={{ opacity: 1 - i * 0.12 }} />
              ))}
            </div>
            <div className="mt-2 text-[9px] tracking-[0.5em] text-system/60 font-mono">ACTIVE</div>
            <div className="h-8 w-px bg-linear-to-b from-mana-bright/40 to-transparent" />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 px-4 xl:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.button
                key={p.title}
                onClick={() => openProject(p)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="gate-card group flex flex-col rounded-xl p-7 text-left h-80"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Swords className="text-mana-bright" size={28} />
                  {"label" in p && p.label && (
                    <span
                      className="text-[12px] tracking-[0.2em] font-mono font-semibold"
                      style={{ color: rankStyle[p.difficulty].text, textShadow: `0 0 10px ${rankStyle[p.difficulty].glow}, 0 0 20px ${rankStyle[p.difficulty].glow}` }}
                    >
                      {p.label}
                    </span>
                  )}
                  <RankBadge rank={p.difficulty} />
                </div>
                <h3 className="font-display text-2xl text-slate-100">{p.title}</h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-200 line-clamp-4" style={{ textShadow: "0 0 12px rgba(255,255,255,0.25)" }}>
                  {p.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 min-h-7">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-purple-400/70 bg-purple-500/15 px-2.5 py-0.5 text-[11px] tracking-wide text-purple-200 font-medium"
                      style={{ boxShadow: "0 0 8px rgba(192,132,252,0.5), inset 0 0 6px rgba(168,85,247,0.1)", textShadow: "0 0 8px rgba(216,180,254,0.8)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-4 flex justify-center">
                  <span
                    className="text-xs tracking-widest opacity-0 transition-opacity group-hover:opacity-100 font-semibold text-blue-300"
                    style={{ textShadow: "0 0 10px rgba(147,197,253,0.9), 0 0 20px rgba(59,130,246,0.7)" }}
                  >
                    ▸ ENTER GATE
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right side decoration */}
        <div className="hidden lg:flex flex-col items-center justify-center min-w-35 xl:min-w-45 pt-8 select-none pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-px bg-linear-to-t from-mana-bright/40 to-transparent" />
            <div className="text-[9px] tracking-[0.5em] text-system/60 font-mono">ACTIVE</div>
            <div className="flex flex-col gap-1.5 items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-mana-bright/30" style={{ opacity: 0.3 + i * 0.12 }} />
              ))}
            </div>
            <div className="rotate-90 text-[10px] tracking-[0.4em] text-mana-bright/50 font-mono">RAID LOG</div>
            <div className="h-px w-16 bg-linear-to-l from-transparent to-mana-bright/60" />
          </div>
        </div>
      </div>

      {/* Click hint */}
      <div className="flex flex-col items-center gap-2 mt-6 select-none pointer-events-none">
        {/* Glowing animated line + arrow */}
        <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur1" />
              <feGaussianBlur stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
            {/* Arrowhead pointing up */}
          <motion.polyline
            points="12,14 20,4 28,14"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#glow-line)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Vertical line */}
          <motion.line
            x1="20" y1="14" x2="20" y2="32"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glow-line)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
        </svg>
        <span
          className="text-xs tracking-[0.3em] font-mono uppercase font-semibold"
          style={{
            color: "#38bdf8",
            textShadow: "0 0 6px #38bdf8, 0 0 14px #38bdf8, 0 0 30px #38bdf8, 0 0 60px #a855f7, 0 0 90px #a855f7",
          }}
        >
          Click card
        </span>
      </div>

      {/* Dungeon briefing modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-200 flex items-center justify-center bg-abyss/80 px-3 pt-20 pb-4 sm:px-8 sm:pb-8 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="system-panel w-full max-w-7xl rounded-xl max-h-[88vh] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-5 pb-4 sm:p-8 sm:pb-5">
                <div>
                  <p className="text-xs tracking-[0.3em] text-system">
                    [ DUNGEON BRIEFING ]
                  </p>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl text-glow">
                    {active.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xs tracking-widest text-slate-400">DIFFICULTY</span>
                    <RankBadge rank={active.difficulty} />
                  </div>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="text-slate-400 hover:text-white"
                  aria-label="close"
                >
                  <X />
                </button>
              </div>

              {/* Body — two columns when preview/slides exists, single column otherwise */}
              {"slides" in active && active.slides && active.slides.length > 0 ? (
                <div className="flex flex-col gap-6 px-8 pb-8 lg:flex-row lg:items-start">
                  <div className="lg:w-[63%] flex flex-col gap-4">
                    <div className="relative w-full group">
                      <img
                        src={active.slides[slideIndex] as string}
                        alt={`${active.title} screenshot ${slideIndex + 1}`}
                        className="w-full rounded-lg border border-mana/20"
                      />
                      {active.slides.length > 1 && (
                        <>
                          <button
                            onClick={() => prevSlide(active.slides as string[])}
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-abyss/70 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-500/40"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() => nextSlide(active.slides as string[])}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-abyss/70 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-500/40"
                          >
                            <ChevronRight size={20} />
                          </button>
                          <div className="mt-2 flex justify-center gap-1.5">
                            {active.slides.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSlideIndex(idx)}
                                className={`h-1.5 rounded-full transition-all ${idx === slideIndex ? "w-5 bg-purple-400" : "w-1.5 bg-slate-500"}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between lg:w-[37%]">
                    <div>
                      <p className="leading-relaxed text-white text-lg font-semibold">{active.blurb}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {active.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-purple-400 bg-purple-500/20 px-2.5 py-1 text-sm font-semibold text-white"
                            style={{ boxShadow: "0 0 10px rgba(192,132,252,0.8), 0 0 20px rgba(168,85,247,0.4)", textShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : "preview" in active && active.preview ? (
                <div className="flex flex-col gap-8 px-8 pb-8 lg:flex-row">
                  <div className="lg:w-[55%] flex flex-col gap-4">
                    <img
                      src={active.preview as string}
                      alt={active.title}
                      className="w-full rounded-lg border border-mana/20"
                    />
                    {active.link && active.link !== "#" && (
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 self-start rounded-md border border-purple-400 bg-purple-500/20 px-6 py-2.5 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-purple-500/30"
                        style={{ boxShadow: "0 0 10px rgba(192,132,252,0.8), 0 0 20px rgba(168,85,247,0.4)", textShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                      >
                        LIVE SERVER <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col justify-between lg:w-[45%]">
                    <div>
                      <p className="leading-relaxed text-white text-lg font-semibold">{active.blurb}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {active.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-purple-400 bg-purple-500/20 px-2.5 py-1 text-sm font-semibold text-white" style={{ boxShadow: "0 0 10px rgba(192,132,252,0.8), 0 0 20px rgba(168,85,247,0.4)", textShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                      {"repoLink" in active && active.repoLink && (
                        <a
                          href={active.repoLink as string}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border border-purple-400 bg-purple-500/20 px-6 py-2.5 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-purple-500/30"
                          style={{ boxShadow: "0 0 10px rgba(192,132,252,0.8), 0 0 20px rgba(168,85,247,0.4)", textShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                        >
                          REPO <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-7 pb-7">
                  <p className="leading-relaxed text-white text-lg font-semibold">{active.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {active.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-purple-400 bg-purple-500/20 px-2.5 py-1 text-sm font-semibold text-white"
                        style={{ boxShadow: "0 0 10px rgba(192,132,252,0.8), 0 0 20px rgba(168,85,247,0.4)", textShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-3">
                    {active.link && active.link !== "#" && (
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-purple-400 bg-purple-500/20 px-6 py-2.5 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-purple-500/30"
                        style={{ boxShadow: "0 0 10px rgba(192,132,252,0.8), 0 0 20px rgba(168,85,247,0.4)", textShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                      >
                        LIVE SERVER <ExternalLink size={16} />
                      </a>
                    )}
                    {"repoLink" in active && active.repoLink && (
                      <a
                        href={active.repoLink as string}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-purple-400 bg-purple-500/20 px-6 py-2.5 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-purple-500/30"
                        style={{ boxShadow: "0 0 10px rgba(192,132,252,0.8), 0 0 20px rgba(168,85,247,0.4)", textShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                      >
                        REPO <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
