import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import RankBadge from "../components/RankBadge";
import { experience } from "../data/content";
import { rankStyle } from "../lib/rank";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 mx-auto max-w-4xl px-5 py-24"
    >
      <SectionHeading kicker="JOURNEY" title="HUNTER RECORDS" />

      <div className="relative">
        {/* vertical mana line */}
        <span className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-mana via-arcane to-transparent md:left-1/2" />

        <div className="space-y-10">
          {experience.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5 }}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${
                i % 2 === 0
                  ? "md:pr-10"
                  : "md:ml-auto md:pl-10"
              }`}
            >
              {/* node */}
              <span
                className={`absolute left-[9px] top-2 h-3.5 w-3.5 rotate-45 bg-mana-bright shadow-[0_0_12px_#a855f7] md:left-auto ${
                  i % 2 === 0
                    ? "md:-right-[7px]"
                    : "md:-left-[7px]"
                }`}
              />

              <div
                className="gate-card rounded-xl p-7 text-left transition-shadow duration-300"
                style={{
                  boxShadow: `0 0 30px ${rankStyle[e.rank].glow}, 0 0 80px ${rankStyle[e.rank].glow}, 0 0 120px ${rankStyle[e.rank].glow}88`,
                  border: `1.5px solid ${rankStyle[e.rank].text}cc`,
                  background: `linear-gradient(135deg, ${rankStyle[e.rank].bg} 0%, rgba(10,5,20,0.85) 100%)`,
                }}
              >
                <div className="mb-2 flex items-center gap-3">
                  <RankBadge rank={e.rank} />
                  <span
                    className="text-sm tracking-widest"
                    style={{ color: "#ffffff", textShadow: "0 0 8px #ffffff, 0 0 20px #ffffffcc" }}
                  >
                    {e.period}
                  </span>
                </div>
                <h3
                  className="font-display text-xl"
                  style={{ color: rankStyle[e.rank].text, textShadow: `0 0 10px ${rankStyle[e.rank].glow}` }}
                >
                  {e.role}
                </h3>
                <p className="mt-2 text-sm text-mana-bright">{e.org}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
                  {e.points.map((pt, j) => (
                    <li key={j}>• {pt}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
