/* ============================================================================
   ✦ THEME PALETTE — single source of truth for inline-styled colors ✦
   The CSS-variable / Tailwind-token side lives in index.css (the `[data-theme]`
   blocks). THIS file mirrors those values for the many components that build
   colors inside JS `style={{ ... }}` (glows, sparkles, gradients) and therefore
   can't reference CSS vars cleanly.

   Read it through `useTheme()` -> `palette` so a component never hardcodes a
   purple/blue/gold literal again.
   ============================================================================ */

export type ThemeName = "solo" | "dbz";

/* Per-theme display tuning for the hero background video. Each clip has its own
   aspect ratio / focal point, so framing, crop and grading are kept independent
   instead of forcing one shared set of values onto both. */
export type HeroVideoStyle = {
  objectFit: "cover" | "contain";
  objectPosition: string; // e.g. "left center", "50% 40%"
  scale: number; // >1 crops outward from transformOrigin
  transformOrigin: string; // anchor the scale, e.g. "left center"
  opacity: number;
  filter: string; // full CSS filter string
};

export type Palette = {
  /* primary accent (purple in Solo / orange in DBZ) */
  primary: string; // solid hex
  primaryBright: string; // brighter glow variant
  primaryDeep: string; // deep/border variant
  primaryRGB: string; // "r,g,b" for rgba() composition

  /* secondary / "system" accent (sky-blue in Solo / ki-blue in DBZ) */
  system: string;
  systemRGB: string;

  /* tertiary accent used for sparkles / highlights (fuchsia in Solo / yellow in DBZ) */
  spark: string;
  sparkRGB: string;

  /* gold / S-rank highlight (gold stays warm in both, but DBZ leans pure SSJ yellow) */
  gold: string;
  goldRGB: string;

  /* the cyan CTA "download cv" accent */
  cyan: string;
  cyanRGB: string;

  /* per-section background videos */
  heroVideo: string;
  heroVideoStyle: HeroVideoStyle;
  sportsVideo: string;
  contactVideo: string;
};

export const PALETTES: Record<ThemeName, Palette> = {
  /* -------------------------------------------------------------- SOLO LEVELING
     The existing look: arcane purple + system blue + S-rank gold. */
  solo: {
    primary: "#8b5cf6",
    primaryBright: "#a855f7",
    primaryDeep: "#6d28d9",
    primaryRGB: "168,85,247",

    system: "#38bdf8",
    systemRGB: "56,189,248",

    spark: "#e879f9",
    sparkRGB: "232,121,249",

    gold: "#fbbf24",
    goldRGB: "251,191,36",

    cyan: "#22d3ee",
    cyanRGB: "34,211,238",

    heroVideo:
      "https://res.cloudinary.com/dumsdgz85/video/upload/f_auto,q_auto/v1781101679/hero-character_xacc6j.mp4",
    heroVideoStyle: {
      objectFit: "contain",
      objectPosition: "center center",
      scale: 1.12, // gentle zoom, character kept centered
      transformOrigin: "center center",
      opacity: 0.9,
      filter: "saturate(1) brightness(0.80) contrast(1.1)",
    },
    sportsVideo:
      "https://res.cloudinary.com/dumsdgz85/video/upload/v1781154392/dungeon_xbtdta.mp4",
    contactVideo:
      "https://res.cloudinary.com/dumsdgz85/video/upload/f_auto,q_auto/v1781101707/meet_exwzv8.mp4",
  },

  /* ----------------------------------------------------------------- DRAGON BALL Z
     Goku / Super-Saiyan: orange gi as primary, SSJ yellow energy as spark/gold,
     ki-blue (kamehameha) as the system accent. */
  dbz: {
    primary: "#f97316", // gi orange
    primaryBright: "#fb923c", // bright orange glow
    primaryDeep: "#c2410c", // deep burnt orange (borders)
    primaryRGB: "249,115,22",

    system: "#38bdf8", // kamehameha ki-blue (kept blue intentionally)
    systemRGB: "56,189,248",

    spark: "#fde047", // SSJ yellow sparkle energy
    sparkRGB: "253,224,71",

    gold: "#facc15", // SSJ aura yellow
    goldRGB: "250,204,21",

    cyan: "#38bdf8", // ki-blue CTA to match the energy beams
    cyanRGB: "56,189,248",

    heroVideo:
      "https://res.cloudinary.com/dumsdgz85/video/upload/v1781248710/I_want_to_create_a_animation_f_but0jy.mp4",
    heroVideoStyle: {
      objectFit: "contain",
      objectPosition: "center center",
      scale: 1, // DBZ clip framed independently — tune freely
      transformOrigin: "center center",
      opacity: 0.9,
      filter: "saturate(1.05) brightness(0.85) contrast(1.05)",
    },
    sportsVideo:
      "https://res.cloudinary.com/dumsdgz85/video/upload/v1781248618/turning_goku_aa7bdk.mp4",
    // No DBZ-specific contact clip supplied — reuse the hero energy clip so the
    // contact section still reads as DBZ rather than falling back to Solo art.
    contactVideo:
      "https://res.cloudinary.com/dumsdgz85/video/upload/v1781248710/I_want_to_create_a_animation_f_but0jy.mp4",
  },
};
