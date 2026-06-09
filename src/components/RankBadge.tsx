import type { Rank } from "../data/content";
import { rankStyle } from "../lib/rank";

/** Hexagonal-feel rank badge (E → S) used on skills, projects, experience. */
export default function RankBadge({ rank }: { rank: Rank }) {
  const s = rankStyle[rank];
  return (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-md font-display text-lg font-bold"
      style={{
        color: s.text,
        background: s.bg,
        border: `1px solid ${s.text}`,
        boxShadow: `0 0 12px ${s.glow}, inset 0 0 10px ${s.bg}`,
      }}
    >
      {rank}
    </span>
  );
}
