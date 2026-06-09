import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function SwordCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [role='button'], input, textarea, select, label"));
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  const glowIntensity = clicking ? "4" : hovering ? "6" : "3";
  const glowColor = hovering ? "#ff2020" : "#cc0000";

  return (
    <motion.div
      className="pointer-events-none fixed z-9999"
      animate={{
        scale: clicking ? 0.85 : hovering ? 1.15 : 1,
        rotate: clicking ? -30 : -45,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        x,
        y,
        /* tip at hotspot */
        translateX: "-8px",
        translateY: "-58px",
        transformOrigin: "bottom right",
      }}
    >
      <svg
        width="72"
        height="72"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blade fill — dark steel with red tint */}
          <linearGradient id="bladeBody" x1="10" y1="70" x2="60" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#1a0000" />
            <stop offset="40%"  stopColor="#2d0a0a" />
            <stop offset="80%"  stopColor="#3a1010" />
            <stop offset="100%" stopColor="#220000" />
          </linearGradient>
          {/* Red edge glow gradient */}
          <linearGradient id="edgeGlow" x1="5" y1="75" x2="65" y2="5" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#ff0000" stopOpacity="1" />
            <stop offset="50%"  stopColor="#cc0000" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff3333" stopOpacity="1" />
          </linearGradient>
          {/* Gold gradient */}
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#ffd700" />
            <stop offset="50%"  stopColor="#b8860b" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>
          {/* Grip gradient */}
          <linearGradient id="grip" x1="42" y1="20" x2="68" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#3d1a0a" />
            <stop offset="100%" stopColor="#1a0800" />
          </linearGradient>
          {/* Red glow filter */}
          <filter id="redglow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation={glowIntensity} result="blur" />
            <feFlood floodColor={glowColor} floodOpacity="0.9" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="goldglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#ffd700" floodOpacity="0.8" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── BLADE — curved scimitar shape with serrated spine ── */}
        {/* Main blade body */}
        <path
          d="
            M 62 8
            C 68 12, 72 20, 68 30
            C 64 40, 52 50, 42 58
            C 36 63, 28 68, 22 72
            C 16 76, 10 78, 8 76
            C 5 73, 8 68, 12 64
            C 18 58, 26 52, 34 44
            C 40 37, 46 30, 50 22
            C 54 14, 56 8, 62 8 Z
          "
          fill="url(#bladeBody)"
          filter="url(#redglow)"
        />

        {/* Red edge outline — outer curved edge */}
        <path
          d="
            M 62 8
            C 68 12, 72 20, 68 30
            C 64 40, 52 50, 42 58
            C 36 63, 28 68, 22 72
            C 16 76, 10 78, 8 76
          "
          stroke="url(#edgeGlow)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Serrated notches on outer edge */}
        <path d="M 58 18 L 61 14 L 64 19" stroke="#ff0000" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M 48 32 L 52 27 L 55 33" stroke="#ff0000" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M 36 46 L 40 41 L 43 47" stroke="#ff0000" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M 23 60 L 27 55 L 30 61" stroke="#ff0000" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        <path d="M 13 70 L 17 65 L 19 71" stroke="#ff0000" strokeWidth="1.5" fill="none" strokeLinejoin="round" />

        {/* Inner spine edge highlight */}
        <path
          d="M 60 10 C 60 16, 50 28, 40 40 C 32 48, 20 58, 12 66"
          stroke="rgba(255,60,60,0.35)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        {/* Blade surface sheen */}
        <path
          d="M 58 14 C 55 22, 46 34, 36 44 C 28 52, 18 62, 14 68"
          stroke="rgba(255,180,180,0.18)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* ── SKULL / CROSSGUARD ornament ── */}
        {/* Guard base plate */}
        <ellipse cx="40" cy="42" rx="8" ry="6" fill="#6b1a1a" stroke="#ff2020" strokeWidth="0.8" filter="url(#redglow)" transform="rotate(-45 40 42)" />

        {/* Skull face on guard */}
        <g transform="translate(34, 36) rotate(-45 6 6)" filter="url(#redglow)">
          {/* Skull dome */}
          <path d="M 6 1 C 2 1, 0 4, 0 7 C 0 10, 1 11, 3 12 L 3 13 L 9 13 L 9 12 C 11 11, 12 10, 12 7 C 12 4, 10 1, 6 1 Z"
            fill="#8b2020" stroke="#cc0000" strokeWidth="0.5" />
          {/* Eye sockets */}
          <ellipse cx="3.5" cy="7" rx="2" ry="2.2" fill="#1a0000" />
          <ellipse cx="8.5" cy="7" rx="2" ry="2.2" fill="#1a0000" />
          {/* Nose cavity */}
          <path d="M 5.2 10 L 6 8.5 L 6.8 10 Z" fill="#1a0000" />
          {/* Teeth */}
          <rect x="2.5" y="12.5" width="2" height="1.5" rx="0.3" fill="#cc8888" />
          <rect x="5" y="12.5" width="2" height="1.8" rx="0.3" fill="#cc8888" />
          <rect x="7.5" y="12.5" width="2" height="1.5" rx="0.3" fill="#cc8888" />
          {/* Red eye glow */}
          <ellipse cx="3.5" cy="7" rx="1" ry="1.1" fill="#ff2020" opacity="0.8" />
          <ellipse cx="8.5" cy="7" rx="1" ry="1.1" fill="#ff2020" opacity="0.8" />
          {/* Horn spikes on skull */}
          <path d="M 2 2 L 0 -2 L 3 1" fill="#8b2020" stroke="#cc0000" strokeWidth="0.4" />
          <path d="M 10 2 L 12 -2 L 9 1" fill="#8b2020" stroke="#cc0000" strokeWidth="0.4" />
        </g>

        {/* Gold crossguard wings */}
        {/* Left wing */}
        <path
          d="M 32 46 C 26 44, 22 48, 24 52 C 26 56, 30 54, 32 50 Z"
          fill="url(#gold)"
          filter="url(#goldglow)"
        />
        {/* Left wing spike */}
        <path d="M 24 52 L 18 58 L 22 56" fill="url(#gold)" filter="url(#goldglow)" />

        {/* Right wing */}
        <path
          d="M 48 38 C 52 34, 58 36, 56 40 C 54 44, 50 42, 48 38 Z"
          fill="url(#gold)"
          filter="url(#goldglow)"
        />
        {/* Right wing spike */}
        <path d="M 56 38 L 62 32 L 58 36" fill="url(#gold)" filter="url(#goldglow)" />

        {/* ── GRIP — wrapped handle ── */}
        <g filter="url(#redglow)">
          {/* Handle base shape */}
          <rect x="52" y="10" width="9" height="30" rx="4"
            fill="url(#grip)" stroke="#5a2a10" strokeWidth="0.5"
            transform="rotate(-45 56 25)"
          />
          {/* Wrap bands */}
          {Array.from({ length: 9 }).map((_, i) => {
            const t = i / 8;
            const bx = 52 + t * 18;
            const by = 38 - t * 18;
            return (
              <line
                key={i}
                x1={bx - 3} y1={by + 3}
                x2={bx + 3} y2={by - 3}
                stroke="#2a0f05"
                strokeWidth="1.2"
                strokeOpacity="0.9"
              />
            );
          })}
          {/* Grip highlight */}
          <line x1="54" y1="36" x2="66" y2="24"
            stroke="rgba(160,80,40,0.4)" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* ── POMMEL — gold top cap ── */}
        <path
          d="M 68 10 C 72 8, 76 10, 75 14 C 74 18, 70 17, 68 14 Z"
          fill="url(#gold)"
          filter="url(#goldglow)"
        />
        <circle cx="71" cy="12" r="1.5" fill="white" opacity="0.6" />

        {/* ── TIP — sharp point with red glow ── */}
        <path
          d="M 8 76 L 4 78 L 7 72 Z"
          fill="#cc0000"
          filter="url(#redglow)"
        />
      </svg>
    </motion.div>
  );
}
