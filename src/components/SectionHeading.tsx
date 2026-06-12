import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";

/** Cinematic section title with a glowing rune divider. */
export default function SectionHeading({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  const { palette } = useTheme();
  return (
    <div className="text-center mb-10 sm:mb-14 px-4">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-system text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] font-semibold mb-3"
      >
        ✦ {kicker} ✦
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-glow tracking-wide"
      >
        {title}
      </motion.h2>
      <div className="mx-auto mt-5 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-mana" />
        <span className="h-2 w-2 rotate-45 bg-mana-bright" style={{ boxShadow: `0 0 12px ${palette.primaryBright}` }} />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-mana" />
      </div>
    </div>
  );
}
