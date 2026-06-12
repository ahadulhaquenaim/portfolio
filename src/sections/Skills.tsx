import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { skills } from "../data/content";
import { useTheme } from "../theme/ThemeContext";

const CATEGORIES = [
  { label: "Languages",     names: ["JavaScript", "TypeScript", "Python", "C / C++"] },
  { label: "Frontend",      names: ["React / Next.js", "HTML / Bootstrap", "Tailwind / CSS", "Redux Toolkit", "React Query", "Zustand", "Ant / Shadcn UI"] },
  { label: "Backend",       names: ["Node.js / Nest.js", "FastAPI / Django", "REST APIs", "Microservices", "GraphQL", "Testing (Jest/pytest)"] },
  { label: "Database",      names: ["PostgreSQL / MySQL", "MongoDB", "Redis", "Prisma / SQLAlchemy"] },
  { label: "DevOps & Cloud",names: ["Docker", "Git / CI-CD", "GCP", "AWS", "NGINX", "Vercel / Netlify", "Hostinger", "Prometheus / Grafana"] },
  { label: "Data & AI",     names: ["LLM / AI Automation", "n8n Workflow", "Apache Airflow", "ETL Pipelines", "Pandas / BeautifulSoup4"] },
];

export default function Skills() {
  const { palette } = useTheme();
  const GOLD = palette.gold;
  const GOLD_GLOW = `rgba(${palette.goldRGB},0.6)`;
  const TRUNK_COLOR = GOLD;
  const LINE_GLOW = `0 0 6px ${GOLD_GLOW}, 0 0 14px rgba(${palette.goldRGB},0.35)`;

  const byName = Object.fromEntries(skills.map((s) => [s.name, s]));

  return (
    <section id="skills" className="relative z-10 w-full px-4 py-12 sm:px-16 md:overflow-x-auto">
      <SectionHeading kicker="ABILITIES" title="SKILL TREE" />

      <div className="relative flex flex-col items-center">

        {/* Root trunk down to root node */}
        <motion.div
          className="hidden md:block w-px"
          style={{ background: TRUNK_COLOR, height: 16, boxShadow: LINE_GLOW }}
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
            boxShadow: `0 0 20px ${GOLD_GLOW}, 0 0 40px rgba(${palette.goldRGB},0.3), inset 0 0 10px rgba(${palette.goldRGB},0.08)`,
            background: `rgba(${palette.goldRGB},0.06)`,
          }}
        >
          <span
            className="font-display text-base tracking-[0.25em] uppercase"
            style={{ color: GOLD, textShadow: `0 0 10px ${GOLD_GLOW}, 0 0 20px rgba(${palette.goldRGB},0.5)` }}
          >
            Core Abilities
          </span>
        </motion.div>

        {/* Trunk continuing down */}
        <motion.div
          className="hidden md:block w-px"
          style={{ background: TRUNK_COLOR, height: 32, boxShadow: LINE_GLOW }}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.5 }}
        />

        {/* Horizontal bar + category columns */}
        <div className="relative w-full">
          <motion.div
            className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 h-px"
            style={{ background: TRUNK_COLOR, width: "95%", boxShadow: LINE_GLOW }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.65 }}
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-0 md:[grid-template-columns:repeat(6,1fr)]">
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
                      background: `rgba(${palette.goldRGB},0.1)`,
                      boxShadow: `0 0 16px ${GOLD_GLOW}, 0 0 32px rgba(${palette.goldRGB},0.25)`,
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
                  <div className="flex w-full flex-col items-center gap-0 pb-4 px-2">
                    {catSkills.map((s, si) => {
                      const skillDelay = delay + 0.25 + si * 0.07;
                      return (
                        <div key={s.name} className="flex w-full max-w-[260px] flex-col items-center md:w-auto md:max-w-none">
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
                            className="skill-card group relative w-full overflow-hidden rounded border md:w-[190px]"
                            style={{
                              borderColor: `rgba(${palette.goldRGB},0.45)`,
                              background: `rgba(${palette.goldRGB},0.07)`,
                              padding: "10px 16px",
                              transition: "transform 0.15s ease, box-shadow 0.15s ease",
                            }}
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: skillDelay }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${GOLD_GLOW}, 0 0 48px rgba(${palette.goldRGB},0.4)`;
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                              (e.currentTarget as HTMLElement).style.boxShadow = "none";
                            }}
                          >
                            {/* top-to-bottom scan glow — CSS animation, no JS loop */}
                            <div
                              className="pointer-events-none absolute left-0 right-0 skill-scan"
                              style={{
                                height: "40%",
                                background: `linear-gradient(180deg, rgba(${palette.goldRGB},0.18) 0%, rgba(${palette.goldRGB},0.06) 60%, transparent 100%)`,
                                borderRadius: 4,
                                animationDelay: `${skillDelay}s`,
                              }}
                            />

                            {/* sparkles — CSS animation */}
                            {[
                              { left: "10%", top: "20%", dur: 1.8, delay: 0.0 },
                              { left: "80%", top: "15%", dur: 2.2, delay: 0.5 },
                              { left: "55%", top: "70%", dur: 1.6, delay: 1.0 },
                              { left: "25%", top: "75%", dur: 2.0, delay: 0.8 },
                              { left: "90%", top: "55%", dur: 1.9, delay: 0.3 },
                            ].map((sp, j) => (
                              <div
                                key={j}
                                className="pointer-events-none absolute rounded-full skill-sparkle"
                                style={{
                                  left: sp.left,
                                  top: sp.top,
                                  width: 3,
                                  height: 3,
                                  background: GOLD,
                                  boxShadow: `0 0 4px 2px ${GOLD_GLOW}`,
                                  animationDuration: `${sp.dur}s`,
                                  animationDelay: `${skillDelay + sp.delay}s`,
                                }}
                              />
                            ))}

                            {/* hover glow */}
                            <div
                              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                              style={{ background: `radial-gradient(ellipse at center, rgba(${palette.goldRGB},0.13) 0%, transparent 70%)` }}
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
                                  background: `linear-gradient(90deg, ${GOLD}, rgba(${palette.goldRGB},0.6))`,
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
