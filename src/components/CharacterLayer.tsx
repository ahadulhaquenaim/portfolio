import { motion, useSpring, useTransform } from "framer-motion";
import { useVideoInView } from "../lib/useVideoInView";
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
}: {
  imageSrc: string | null;
  videoSrc: string | null;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  palette: Palette;
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
            preload="metadata"
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-45%)",
              height: "100%",
              width: "auto",
              minWidth: "60%",
              willChange: "transform",
            }}
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
          Opacity-only (no scale) so the full-screen blurred gradient never
          re-rasters; mix-blend stays but the layer just cross-fades. */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 38% 62% at 57% 50%, rgba(${palette.primaryRGB},0.22) 0%, rgba(${palette.primaryRGB},0.1) 45%, transparent 70%)`,
          mixBlendMode: "screen",
          willChange: "opacity",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aura pulse layer 2 — tighter faster flicker */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 22% 40% at 57% 48%, rgba(${palette.sparkRGB},0.28) 0%, rgba(${palette.primaryRGB},0.1) 50%, transparent 70%)`,
          mixBlendMode: "screen",
          willChange: "opacity",
        }}
        animate={{ opacity: [0.4, 0.9, 0.5, 1, 0.4] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lightning bolts around the silhouette */}
      {LIGHTNING_BOLTS.map((bolt) => (
        <motion.div
          key={bolt.id}
          className="absolute pointer-events-none"
          style={{ left: bolt.x, top: bolt.y, rotate: bolt.rotate }}
          animate={{
            opacity: [0, 0, 1, 0.6, 1, 0],
            scaleY: [0.4, 1, 0.8, 1.1, 0.6, 0],
          }}
          transition={{
            duration: bolt.dur,
            delay: bolt.delay,
            repeat: Infinity,
            repeatDelay: seededRandom(bolt.id * 31) * 2.5 + 0.5,
            ease: "easeOut",
          }}
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
        </motion.div>
      ))}
    </motion.div>
  );
}
