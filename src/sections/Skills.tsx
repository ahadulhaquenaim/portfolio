import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import RankBadge from "../components/RankBadge";
import { skills } from "../data/content";
import { rankStyle } from "../lib/rank";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-7xl px-5 py-24">
      <SectionHeading kicker="ABILITIES" title="SKILL TREE" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s, i) => {
          const c = rankStyle[s.rank];
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="gate-card rounded-lg p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-lg text-slate-100">
                  {s.name}
                </span>
                <RankBadge rank={s.rank} />
              </div>

              {/* XP bar */}
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-abyss">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, var(--color-arcane), ${c.text})`,
                    boxShadow: `0 0 12px ${c.glow}`,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
                />
              </div>
              <div className="mt-1 text-right text-xs text-slate-500">
                XP {s.value}/100
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
