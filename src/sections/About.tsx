import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import SystemNotification from "../components/SystemNotification";
import { about } from "../data/content";

const panelIcons: Record<string, string> = {
  Class: "⚔",
  Rank: "★",
  Guild: "⬡",
  Specialty: "◈",
};

export default function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-screen-2xl px-10 py-24">
      <SectionHeading kicker="ABOUT ME" title={about.title} />

      <div className="grid items-center gap-20 md:grid-cols-[5fr_6fr]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <div className="sparkle-wrap relative">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-xl leading-relaxed text-glow-blue mb-6">
                {p}
              </p>
            ))}
            <span className="sparkle sparkle-1" />
            <span className="sparkle sparkle-2" />
            <span className="sparkle sparkle-3" />
            <span className="sparkle sparkle-4" />
            <span className="sparkle sparkle-5" />
          </div>
          <div className="pt-2">
            <SystemNotification
              title="QUEST COMPLETED"
              message="15+ projects shipped — and counting."
              className="!mx-0"
            />
          </div>
        </motion.div>

        {/* Solo Leveling STATUS window */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="sl-status-window relative"
        >
          {/* Outer glow frame */}
          <div className="sl-frame-outer">
            {/* Top-left corner bracket */}
            <span className="sl-corner sl-corner-tl" />
            {/* Top-right corner bracket */}
            <span className="sl-corner sl-corner-tr" />
            {/* Bottom-left corner bracket */}
            <span className="sl-corner sl-corner-bl" />
            {/* Bottom-right corner bracket */}
            <span className="sl-corner sl-corner-br" />

            {/* Inner panel */}
            <div className="sl-inner-panel scanlines">
              {/* Title bar */}
              <div className="sl-title-bar">
                <span className="sl-title-deco" />
                <span className="sl-title-text">STATUS</span>
                <span className="sl-title-deco" />
              </div>

              {/* Level + Job row */}
              <div className="sl-level-row">
                <div className="sl-level-block">
                  <span className="sl-level-num">100</span>
                  <span className="sl-level-label">LEVEL</span>
                </div>
                <div className="sl-job-block">
                  <p className="sl-job-line">
                    <span className="sl-job-key">JOB:</span>
                    <span className="sl-job-val">Shadow Monarch</span>
                  </p>
                  <p className="sl-job-line">
                    <span className="sl-job-key">TITLE:</span>
                    <span className="sl-job-val sl-job-val--sm">
                      The One Who Overcame Adversity
                    </span>
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="sl-divider" />

              {/* Stats grid */}
              <ul className="sl-stats-grid">
                {about.panel.map((row) => (
                  <li key={row.k} className="sl-stat-row">
                    <span className="sl-stat-icon">
                      {panelIcons[row.k] ?? "◆"}
                    </span>
                    <span className="sl-stat-key">{row.k.toUpperCase()}:</span>
                    <span className="sl-stat-val">{row.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
