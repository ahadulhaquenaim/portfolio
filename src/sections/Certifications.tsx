import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, BadgeCheck } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badge?: string;
  category: string;
  categoryColor: string;
};

const CERTIFICATIONS: Certification[] = [
  {
    title: "Meta Front-End Developer",
    issuer: "Meta / Coursera",
    date: "2023",
    category: "FRONTEND",
    categoryColor: "#a855f7",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2022",
    category: "CORE",
    categoryColor: "#22d3ee",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2022",
    category: "FRONTEND",
    categoryColor: "#a855f7",
  },
  {
    title: "Node.js Application Development",
    issuer: "OpenJS Foundation",
    date: "2023",
    category: "BACKEND",
    categoryColor: "#4ade80",
  },
  {
    title: "React — The Complete Guide",
    issuer: "Udemy",
    date: "2023",
    category: "FRONTEND",
    categoryColor: "#a855f7",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    date: "2024",
    category: "CLOUD",
    categoryColor: "#f59e0b",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative z-10 mx-auto max-w-screen-2xl px-10 py-24">
      <SectionHeading kicker="CREDENTIALS · VERIFIED" title="Certifications" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-xl border bg-abyss/60 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
            style={{
              borderColor: `${cert.categoryColor}40`,
              boxShadow: `0 0 0 0 ${cert.categoryColor}00`,
            }}
            whileHover={{ boxShadow: `0 0 24px 4px ${cert.categoryColor}20` }}
          >
            {/* top accent bar */}
            <div
              className="absolute left-0 right-0 top-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${cert.categoryColor}, transparent)` }}
            />

            {/* category badge + icon */}
            <div className="mb-4 flex items-center justify-between">
              <span
                className="rounded px-2 py-1 text-[10px] font-bold tracking-[0.18em]"
                style={{ background: `${cert.categoryColor}22`, color: cert.categoryColor }}
              >
                {cert.category}
              </span>
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: `${cert.categoryColor}18`, color: cert.categoryColor }}
                animate={{ boxShadow: [`0 0 0px 0px ${cert.categoryColor}00`, `0 0 12px 3px ${cert.categoryColor}40`, `0 0 0px 0px ${cert.categoryColor}00`] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              >
                <Award size={18} />
              </motion.div>
            </div>

            {/* title */}
            <h3 className="mb-1 text-base font-extrabold leading-tight text-white [text-shadow:0_0_12px_rgba(255,255,255,0.3)]">
              {cert.title}
            </h3>

            {/* issuer */}
            <div className="mb-4 flex items-center gap-1.5">
              <BadgeCheck size={13} style={{ color: cert.categoryColor }} />
              <span className="text-sm font-semibold" style={{ color: cert.categoryColor }}>
                {cert.issuer}
              </span>
            </div>

            {/* date + link */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-white/50">
                <Calendar size={12} />
                <span className="text-xs tracking-wider">{cert.date}</span>
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold transition-colors hover:text-white"
                  style={{ color: cert.categoryColor }}
                >
                  VIEW <ExternalLink size={11} />
                </a>
              )}
            </div>

            {/* shimmer hover */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
