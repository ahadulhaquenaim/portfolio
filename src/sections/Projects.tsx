import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Swords } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import RankBadge from "../components/RankBadge";
import { projects } from "../data/content";

type Project = (typeof projects)[number];

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative z-10 w-full px-0 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading kicker="MY WORK" title="DUNGEON RAIDS" />
      </div>

      {/* Full-width layout with side decorations */}
      <div className="relative flex items-start gap-0">
        {/* Left side decoration */}
        <div className="hidden lg:flex flex-col items-center justify-center min-w-[140px] xl:min-w-[180px] pt-8 select-none pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-mana-bright/60" />
            <div className="rotate-90 text-[10px] tracking-[0.4em] text-mana-bright/50 font-mono">GATE SYSTEM</div>
            <div className="flex flex-col gap-1.5 items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-mana-bright/30" style={{ opacity: 1 - i * 0.12 }} />
              ))}
            </div>
            <div className="mt-2 text-[9px] tracking-[0.5em] text-system/60 font-mono">ACTIVE</div>
            <div className="h-8 w-px bg-gradient-to-b from-mana-bright/40 to-transparent" />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 px-4 xl:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.button
                key={p.title}
                onClick={() => setActive(p)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="gate-card group flex flex-col rounded-xl p-7 text-left"
              >
                <div className="mb-5 flex items-center justify-between">
                  <Swords className="text-mana-bright" size={28} />
                  <RankBadge rank={p.difficulty} />
                </div>
                <h3 className="font-display text-2xl text-slate-100">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-200" style={{ textShadow: "0 0 12px rgba(255,255,255,0.25)" }}>
                  {p.blurb}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
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
                <span
                  className="mt-5 text-xs tracking-widest opacity-0 transition-opacity group-hover:opacity-100 font-semibold text-blue-300"
                  style={{ textShadow: "0 0 10px rgba(147,197,253,0.9), 0 0 20px rgba(59,130,246,0.7)" }}
                >
                  ▸ ENTER GATE
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right side decoration */}
        <div className="hidden lg:flex flex-col items-center justify-center min-w-[140px] xl:min-w-[180px] pt-8 select-none pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-px bg-gradient-to-t from-mana-bright/40 to-transparent" />
            <div className="text-[9px] tracking-[0.5em] text-system/60 font-mono">ACTIVE</div>
            <div className="flex flex-col gap-1.5 items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-mana-bright/30" style={{ opacity: 0.3 + i * 0.12 }} />
              ))}
            </div>
            <div className="rotate-90 text-[10px] tracking-[0.4em] text-mana-bright/50 font-mono">RAID LOG</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-mana-bright/60" />
          </div>
        </div>
      </div>

      {/* Dungeon briefing modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-abyss/80 p-8 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="system-panel w-full max-w-6xl rounded-xl max-h-[92vh] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-8 pb-5">
                <div>
                  <p className="text-xs tracking-[0.3em] text-system">
                    [ DUNGEON BRIEFING ]
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-glow">
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

              {/* Body — two columns when preview exists, single column otherwise */}
              {"preview" in active && active.preview ? (
                <div className="flex flex-col gap-8 px-8 pb-8 lg:flex-row">
                  <div className="lg:w-[62%]">
                    <img
                      src={active.preview as string}
                      alt={active.title}
                      className="w-full rounded-lg border border-mana/20"
                    />
                  </div>
                  <div className="flex flex-col justify-between lg:w-[38%]">
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
                      {active.link && active.link !== "#" && (
                        <a
                          href={active.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border border-purple-400 bg-purple-500/20 px-6 py-2.5 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-purple-500/30"
                          style={{ boxShadow: "0 0 10px rgba(192,132,252,0.8), 0 0 20px rgba(168,85,247,0.4)", textShadow: "0 0 8px rgba(255,255,255,0.8)" }}
                        >
                          VIEW PROJECT <ExternalLink size={16} />
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
                </div>
              ) : (
                <div className="px-7 pb-7">
                  <p className="leading-relaxed text-slate-300">{active.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {active.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-mana/30 bg-mana/5 px-2.5 py-1 text-xs text-mana-bright"
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
                        VIEW PROJECT <ExternalLink size={16} />
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
