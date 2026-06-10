import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { skills } from "../data/content";

const GOLD = "#fbbf24";
const GOLD_GLOW = "rgba(251,191,36,0.6)";
const TRUNK_COLOR = GOLD;
const LINE_GLOW = `0 0 6px ${GOLD_GLOW}, 0 0 14px rgba(251,191,36,0.35)`;

const CATEGORIES = [
  { label: "Languages",     names: ["JavaScript", "TypeScript", "Python", "C / C++"] },
  { label: "Frontend",      names: ["React / Next.js", "HTML / Bootstrap", "Tailwind / CSS", "Redux Toolkit", "React Query"] },
  { label: "Backend",       names: ["Node.js / Nest.js", "FastAPI / Django", "REST APIs", "Microservices", "GraphQL", "Testing (Jest/pytest)"] },
  { label: "Database",      names: ["PostgreSQL / MySQL", "MongoDB", "Redis", "Prisma / SQLAlchemy"] },
  { label: "DevOps & Cloud",names: ["Docker", "Git / CI-CD", "GCP", "AWS", "NGINX", "Vercel / Netlify", "Hostinger", "Prometheus / Grafana"] },
  { label: "Data & AI",     names: ["LLM / AI Automation", "n8n Workflow", "Apache Airflow", "ETL Pipelines", "Pandas / BeautifulSoup4"] },
];

export default function Skills() {
  const byName = Object.fromEntries(skills.map((s) => [s.name, s]));

  return (
    <section id="skills" className="relative z-10 mx-auto max-w-7xl px-5 py-24">
      <SectionHeading kicker="ABILITIES" title="SKILL TREE" />

      <div className="relative flex flex-col items-center">

        {/* Root trunk down to root node */}
        <motion.div
          className="w-px"
          style={{ background: TRUNK_COLOR, height: 40, boxShadow: LINE_GLOW }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        />

        {/* Root node */}
        <motion.div
          className="relative z-10 rounded-sm border px-8 py-3"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            borderColor: GOLD_GLOW,
            boxShadow: `0 0 20px ${GOLD_GLOW}, 0 0 40px rgba(251,191,36,0.3), inset 0 0 10px rgba(251,191,36,0.08)`,
            background: "rgba(251,191,36,0.06)",
          }}
        >
          <span
            className="font-display text-base tracking-[0.25em] uppercase"
            style={{ color: GOLD, textShadow: `0 0 10px ${GOLD_GLOW}, 0 0 20px rgba(251,191,36,0.5)` }}
          >
            Core Abilities
          </span>
        </motion.div>

        {/* Trunk continuing down */}
        <motion.div
          className="w-px"
          style={{ background: TRUNK_COLOR, height: 32, boxShadow: LINE_GLOW }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.5 }}
        />

        {/* Horizontal bar + category columns */}
        <div className="relative w-full">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-px"
            style={{ background: TRUNK_COLOR, width: "95%", boxShadow: LINE_GLOW }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.65 }}
          />

          <div
            className="grid pt-0"
            style={{ gridTemplateColumns: `repeat(${CATEGORIES.length}, 1fr)` }}
          >
            {CATEGORIES.map((cat, catIdx) => {
              const delay = 0.7 + catIdx * 0.1;
              const catSkills = cat.names
                .map((n) => byName[n])
                .filter(Boolean);

              return (
                <div key={cat.label} className="flex flex-col items-center">

                  {/* Stem to category node */}
                  <motion.div
                    className="w-px"
                    style={{ background: TRUNK_COLOR, height: 28, boxShadow: LINE_GLOW }}
                    initial={{ scaleY: 0, originY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay }}
                  />

                  {/* Category node */}
                  <motion.div
                    className="relative z-10 rounded border px-5 py-2.5 text-center"
                    style={{
                      borderColor: GOLD_GLOW,
                      background: "rgba(251,191,36,0.1)",
                      boxShadow: `0 0 16px ${GOLD_GLOW}, 0 0 32px rgba(251,191,36,0.25)`,
                    }}
                    initial={{ opacity: 0, y: -8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: delay + 0.1 }}
                  >
                    <span
                      className="font-display text-sm tracking-widest uppercase whitespace-nowrap"
                      style={{ color: GOLD, textShadow: `0 0 8px ${GOLD_GLOW}` }}
                    >
                      {cat.label}
                    </span>
                  </motion.div>

                  {/* Stem to skill list */}
                  <motion.div
                    className="w-px"
                    style={{ background: TRUNK_COLOR, height: 24, boxShadow: LINE_GLOW }}
                    initial={{ scaleY: 0, originY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: delay + 0.2 }}
                  />

                  {/* Skill cards */}
                  <div className="flex flex-col items-center gap-0 pb-4">
                    {catSkills.map((s, si) => {
                      const skillDelay = delay + 0.25 + si * 0.07;
                      return (
                        <div key={s.name} className="flex flex-col items-center">
                          {si > 0 && (
                            <motion.div
                              className="w-px"
                              style={{ background: TRUNK_COLOR, height: 8, boxShadow: LINE_GLOW }}
                              initial={{ scaleY: 0, originY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.2, delay: skillDelay }}
                            />
                          )}

                          <motion.div
                            className="group relative overflow-hidden rounded border"
                            style={{
                              borderColor: "rgba(251,191,36,0.45)",
                              background: "rgba(251,191,36,0.07)",
                              width: 190,
                              padding: "10px 16px",
                            }}
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: skillDelay }}
                            whileHover={{ scale: 1.04, boxShadow: `0 0 14px ${GOLD_GLOW}` }}
                          >
                            {/* hover glow */}
                            <div
                              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: "radial-gradient(ellipse at center, rgba(251,191,36,0.13) 0%, transparent 70%)" }}
                            />

                            <div className="relative z-10 flex items-center justify-center">
                              <span
                                className="font-display text-[14px] leading-tight text-center"
                                style={{ color: GOLD }}
                              >
                                {s.name}
                              </span>
                            </div>

                            {/* Magic line */}
                            <div className="relative z-10 mt-1.5 h-0.75 w-full overflow-hidden rounded-full bg-abyss">
                              <motion.div
                                className="h-full rounded-full"
                                style={{
                                  background: `linear-gradient(90deg, ${GOLD}, rgba(251,191,36,0.6))`,
                                  boxShadow: `0 0 5px ${GOLD_GLOW}`,
                                }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${s.value}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.0, ease: "easeOut", delay: skillDelay + 0.1 }}
                              />
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
