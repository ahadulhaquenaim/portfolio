import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import RankBadge from "../components/RankBadge";
import { skills } from "../data/content";
import { rankStyle } from "../lib/rank";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-7xl px-5 py-24">
      <SectionHeading kicker="ABILITIES" title="SKILL TREE" />

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s, i) => {
          const c = rankStyle[s.rank];
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24, boxShadow: "0 0 0px transparent" }}
              whileInView={{
                opacity: 1,
                y: 0,
                boxShadow: [
                  `0 0 10px ${c.glow}`,
                  `0 0 22px ${c.glow}`,
                  `0 0 12px ${c.glow}`,
                ],
              }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                opacity: { duration: 0.5, delay: i * 0.06 },
                y: { duration: 0.5, delay: i * 0.06 },
                boxShadow: {
                  duration: 1.8,
                  delay: i * 0.06 + 0.4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                },
              }}
              className="gate-card rounded-lg p-4"
            >
              {/* Floating magic sparks */}
              {[
                { left: "15%", top: "70%", size: 4, dur: "2.6s", delay: "0s" },
                { left: "40%", top: "80%", size: 3, dur: "3.2s", delay: "0.7s" },
                { left: "65%", top: "65%", size: 5, dur: "2.9s", delay: "1.4s" },
                { left: "80%", top: "75%", size: 3, dur: "3.6s", delay: "0.3s" },
                { left: "55%", top: "85%", size: 4, dur: "2.4s", delay: "1.1s" },
              ].map((sp, j) => (
                <span
                  key={j}
                  className="spark"
                  style={{
                    left: sp.left,
                    top: sp.top,
                    width: sp.size,
                    height: sp.size,
                    background: c.glow,
                    boxShadow: `0 0 6px 2px ${c.glow}`,
                    ["--dur" as string]: sp.dur,
                    ["--delay" as string]: sp.delay,
                  }}
                />
              ))}

              {/* Card content above shimmer */}
              <div className="relative z-10">
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
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
