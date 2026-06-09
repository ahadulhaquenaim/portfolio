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
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-5 py-24">
      <SectionHeading kicker="MY WORK" title="DUNGEON RAIDS" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.button
            key={p.title}
            onClick={() => setActive(p)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="gate-card group flex flex-col rounded-xl p-6 text-left"
          >
            <div className="mb-4 flex items-center justify-between">
              <Swords className="text-mana-bright" size={26} />
              <RankBadge rank={p.difficulty} />
            </div>
            <h3 className="font-display text-xl text-slate-100">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
              {p.blurb}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded border border-mana/30 bg-mana/5 px-2 py-0.5 text-[11px] tracking-wide text-mana-bright"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-4 text-xs tracking-widest text-system opacity-0 transition-opacity group-hover:opacity-100">
              ▸ ENTER GATE
            </span>
          </motion.button>
        ))}
      </div>

      {/* Dungeon briefing modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-abyss/80 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="system-panel w-full max-w-lg rounded-xl p-7"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs tracking-[0.3em] text-system">
                    [ DUNGEON BRIEFING ]
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-glow">
                    {active.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="text-slate-400 hover:text-white"
                  aria-label="close"
                >
                  <X />
                </button>
              </div>

              <div className="my-4 flex items-center gap-3">
                <span className="text-xs tracking-widest text-slate-400">
                  DIFFICULTY
                </span>
                <RankBadge rank={active.difficulty} />
              </div>

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

              <a
                href={active.link}
                target="_blank"
                rel="noreferrer"
                className="btn-mana mt-7 inline-flex items-center gap-2 rounded-md px-6 py-2.5 text-sm font-semibold tracking-wider text-white"
              >
                VIEW PROJECT <ExternalLink size={16} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
