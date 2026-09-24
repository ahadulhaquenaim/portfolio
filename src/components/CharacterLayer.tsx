import { motion, useSpring, useTransform } from "framer-motion";
import { posterFor, useVideoInView } from "../lib/useVideoInView";
import type { Palette } from "../theme/palette";

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Lightning bolt paths — positioned around the character silhouette
const LIGHTNING_BOLTS = [
  { id: 0, x: "52%", y: "8%",  rotate: 15,  delay: 0,    dur: 2.8 },
  { id: 1, x: "72%", y: "22%", rotate: 40,  delay: 1.1,  dur: 3.2 },
  { id: 2, x: "78%", y: "55%", rotate: 70,  delay: 0.4,  dur: 2.5 },
  { id: 3, x: "65%", y: "80%", rotate: 120, delay: 1.7,  dur: 3.6 },
  { id: 4, x: "38%", y: "78%", rotate: 200, delay: 0.8,  dur: 2.9 },
  { id: 5, x: "28%", y: "50%", rotate: 250, delay: 2.1,  dur: 3.1 },
  { id: 6, x: "35%", y: "18%", rotate: 310, delay: 0.3,  dur: 2.6 },
];

/**
 * Full-bleed parallax "character" background with aura pulses + lightning bolts.
 * Shared between sections so the animated treatment can move from Hero to Sports.
 * Pass spring motion values for mouse parallax; omit them to render static.
 */
export default function CharacterLayer({
  imageSrc,
  videoSrc,
  springX,
  springY,
  palette,
  fullWidth = false,
}: {
  imageSrc: string | null;
  videoSrc: string | null;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  palette: Palette;
  /** When true, the video fills the section edge-to-edge (object-cover)
   *  instead of sitting as a centered, height-locked column. */
  fullWidth?: boolean;
}) {
  const x = useTransform(springX, [-1, 1], [-8, 8]);
  const y = useTransform(springY, [-1, 1], [-5, 5]);
  const videoRef = useVideoInView<HTMLVideoElement>();

  return (
    <motion.div className="absolute inset-0 z-0" style={{ x, y }}>
      {/* Video takes priority over static image */}
      {videoSrc ? (
        <div className="hero-character absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            // Below the fold — fetch nothing until useVideoInView plays it.
            // "metadata" still opens a connection during the hero intro and
            // steals bandwidth from the animation.
            preload="none"
            poster={posterFor(videoSrc)}
            style={
              fullWidth
                ? {
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 30%",
                    willChange: "transform",
                  }
                : {
                    position: "absolute",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-45%)",
                    height: "100%",
                    width: "auto",
                    minWidth: "60%",
                    willChange: "transform",
                  }
            }
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      ) : imageSrc ? (
        <motion.div
          className="hero-character absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "110%",
            backgroundPosition: "0% 15%",
            transformOrigin: "50% 75%",
          }}
          animate={{ scale: [1, 1.012, 1, 1.008, 1], y: [0, -6, 0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] }}
        />
      ) : null}

      {/* Aura pulse layer 1 — wide slow breathe.
          Opacity-only CSS loop (compositor) so the full-screen gradient never
          re-rasters; mix-blend stays but the layer just cross-fades. */}
      <div
        className="fx-pulse absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 38% 62% at 57% 50%, rgba(${palette.primaryRGB},0.22) 0%, rgba(${palette.primaryRGB},0.1) 45%, transparent 70%)`,
          mixBlendMode: "screen",
          "--fx-dur": "5s",
          "--fx-o0": "0.6",
        } as React.CSSProperties}
      />

      {/* Aura pulse layer 2 — tighter faster flicker */}
      <div
        className="fx-aura-flicker absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 22% 40% at 57% 48%, rgba(${palette.sparkRGB},0.28) 0%, rgba(${palette.primaryRGB},0.1) 50%, transparent 70%)`,
          mixBlendMode: "screen",
        }}
      />

      {/* Lightning bolts around the silhouette. Outer div holds the static
          rotation; inner div runs the CSS strike loop, whose idle tail stands
          in for framer's repeatDelay (strike = first 60% of the cycle). */}
      {LIGHTNING_BOLTS.map((bolt) => (
        <div
          key={bolt.id}
          className="absolute pointer-events-none"
          style={{ left: bolt.x, top: bolt.y, transform: `rotate(${bolt.rotate}deg)` }}
        >
        <div
          className="fx-bolt"
          style={{
            "--fx-dur": `${(bolt.dur + seededRandom(bolt.id * 31) * 2.5 + 0.5).toFixed(2)}s`,
            "--fx-delay": `${bolt.delay}s`,
          } as React.CSSProperties}
        >
          <svg width="14" height="36" viewBox="0 0 14 36" fill="none">
            <path
              d={`M8 0L2 16H7L0 36L14 14H8L13 0Z`}
              fill={`url(#bolt-grad-${bolt.id})`}
              filter={`url(#bolt-glow-${bolt.id})`}
            />
            <defs>
              <linearGradient id={`bolt-grad-${bolt.id}`} x1="7" y1="0" x2="7" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={palette.spark} />
                <stop offset="100%" stopColor={palette.primaryDeep} />
              </linearGradient>
              <filter id={`bolt-glow-${bolt.id}`} x="-80%" y="-20%" width="260%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
          </svg>
        </div>
        </div>
      ))}
    </motion.div>
  );
}
