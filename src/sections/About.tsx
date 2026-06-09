import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import SystemNotification from "../components/SystemNotification";
import { about } from "../data/content";

export default function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-5 py-24">
      <SectionHeading kicker="ABOUT ME" title={about.title} />

      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          {about.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-slate-300">
              {p}
            </p>
          ))}
          <div className="pt-2">
            <SystemNotification
              title="QUEST COMPLETED"
              message="15+ projects shipped — and counting."
              className="!mx-0"
            />
          </div>
        </motion.div>

        {/* Stat sheet panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rune-border relative overflow-hidden rounded-xl bg-void/70 p-7 scanlines"
        >
          <p className="mb-5 font-display text-lg tracking-widest text-mana-bright">
            HUNTER PROFILE
          </p>
          <ul className="space-y-4">
            {about.panel.map((row) => (
              <li
                key={row.k}
                className="flex items-center justify-between border-b border-mana/15 pb-3"
              >
                <span className="text-xs tracking-[0.25em] text-slate-400">
                  {row.k.toUpperCase()}
                </span>
                <span className="font-display text-slate-100">{row.v}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
