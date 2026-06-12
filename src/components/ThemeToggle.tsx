import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";

/**
 * Theme switcher — flips the whole site between the Solo Leveling (purple/arcane)
 * and Dragon Ball Z (Goku orange / SSJ yellow) palettes. A two-stop sliding
 * pill: the knob carries the active theme's emblem and the track recolors via
 * the themed tokens so it always matches whatever is currently active.
 */
export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, palette, toggleTheme } = useTheme();
  const isDbz = theme === "dbz";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDbz ? "Solo Leveling" : "Dragon Ball Z"} theme`}
      title={isDbz ? "DRAGON BALL Z" : "SOLO LEVELING"}
      className="group relative flex shrink-0 items-center gap-1 rounded-full p-1 transition-all duration-300"
      style={{
        width: compact ? 64 : 76,
        height: compact ? 30 : 34,
        background: `linear-gradient(135deg, rgba(${palette.primaryRGB},0.18), rgba(${palette.sparkRGB},0.10))`,
        border: `1px solid rgba(${palette.primaryRGB},0.55)`,
        boxShadow: `0 0 14px rgba(${palette.primaryRGB},0.45), inset 0 0 10px rgba(${palette.primaryRGB},0.12)`,
      }}
    >
      {/* Track labels behind the knob */}
      <span
        className="absolute left-2 text-[9px] font-bold tracking-widest"
        style={{ color: palette.spark, opacity: isDbz ? 0.95 : 0.35 }}
      >
        DBZ
      </span>
      <span
        className="absolute right-2 text-[9px] font-bold tracking-widest"
        style={{ color: palette.primaryBright, opacity: isDbz ? 0.35 : 0.95 }}
      >
        SL
      </span>

      {/* Sliding knob */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: compact ? 22 : 26,
          height: compact ? 22 : 26,
          marginLeft: isDbz ? 0 : "auto",
          background: `radial-gradient(circle at 35% 30%, ${palette.primaryBright}, ${palette.primaryDeep})`,
          boxShadow: `0 0 12px rgba(${palette.primaryRGB},0.9), 0 0 22px rgba(${palette.sparkRGB},0.5)`,
        }}
      >
        {/* Emblem: a ki/energy orb for DBZ, a rune diamond for Solo Leveling */}
        {isDbz ? (
          <span
            className="block rounded-full"
            style={{
              width: compact ? 9 : 11,
              height: compact ? 9 : 11,
              background: `radial-gradient(circle at 40% 35%, #fff, ${palette.spark} 55%, ${palette.gold})`,
              boxShadow: `0 0 8px ${palette.spark}`,
            }}
          />
        ) : (
          <span
            className="block rotate-45"
            style={{
              width: compact ? 8 : 10,
              height: compact ? 8 : 10,
              background: "#fff",
              boxShadow: `0 0 8px ${palette.spark}`,
            }}
          />
        )}
      </motion.span>
    </button>
  );
}
