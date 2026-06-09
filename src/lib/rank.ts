import type { Rank } from "../data/content";

/** Color + glow per hunter rank (E lowest → S highest). */
export const rankStyle: Record<Rank, { text: string; bg: string; glow: string }> = {
  E: { text: "#94a3b8", bg: "rgba(148,163,184,0.12)", glow: "rgba(148,163,184,0.4)" },
  D: { text: "#38bdf8", bg: "rgba(56,189,248,0.12)", glow: "rgba(56,189,248,0.45)" },
  C: { text: "#34d399", bg: "rgba(52,211,153,0.12)", glow: "rgba(52,211,153,0.45)" },
  B: { text: "#a855f7", bg: "rgba(168,85,247,0.14)", glow: "rgba(168,85,247,0.5)" },
  A: { text: "#f472b6", bg: "rgba(244,114,182,0.14)", glow: "rgba(244,114,182,0.5)" },
  S: { text: "#fbbf24", bg: "rgba(251,191,36,0.16)", glow: "rgba(251,191,36,0.6)" },
};
