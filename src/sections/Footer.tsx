import { useState, useEffect, useRef } from "react";
import { socials, identity } from "../data/content";

const iconStyles: Record<string, { color: string; glow: string; ring: string; sparkleColor: string }> = {
  GitHub: {
    color: "text-white",
    glow: "shadow-[0_0_14px_4px_rgba(255,255,255,0.45)]",
    ring: "ring-white/40",
    sparkleColor: "255,255,255",
  },
  LinkedIn: {
    color: "text-sky-400",
    glow: "shadow-[0_0_14px_4px_rgba(56,189,248,0.55)]",
    ring: "ring-sky-400/50",
    sparkleColor: "56,189,248",
  },
  Facebook: {
    color: "text-blue-500",
    glow: "shadow-[0_0_14px_4px_rgba(59,130,246,0.55)]",
    ring: "ring-blue-500/50",
    sparkleColor: "99,140,255",
  },
  Email: {
    color: "text-fuchsia-400",
    glow: "shadow-[0_0_14px_4px_rgba(232,121,249,0.55)]",
    ring: "ring-fuchsia-400/50",
    sparkleColor: "232,121,249",
  },
};

type Sparkle = { id: number; x: number; y: number; size: number; duration: number; delay: number };

function SparkleIcon({ label, children }: { label: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const counterRef = useRef(0);
  const style = iconStyles[label] ?? iconStyles["Email"];

  function spawnSparkle(): Sparkle {
    const angle = Math.random() * Math.PI * 2;
    const radius = 18 + Math.random() * 16;
    return {
      id: counterRef.current++,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      size: Math.random() * 3 + 2,
      duration: 700 + Math.random() * 400,
      delay: 0,
    };
  }

  useEffect(() => {
    // spawn 1-2 sparkles every 300ms continuously
    intervalRef.current = setInterval(() => {
      const count = Math.random() < 0.5 ? 1 : 2;
      const batch = Array.from({ length: count }, spawnSparkle);
      setSparkles((prev) => [...prev.slice(-12), ...batch]);
    }, 300);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // remove expired sparkles
  useEffect(() => {
    if (sparkles.length === 0) return;
    const maxDuration = Math.max(...sparkles.map((s) => s.duration)) + 50;
    const t = setTimeout(() => {
      const cutoff = counterRef.current - 14;
      setSparkles((prev) => prev.filter((s) => s.id >= cutoff));
    }, maxDuration);
    return () => clearTimeout(t);
  }, [sparkles]);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* continuous sparkle particles */}
      {sparkles.map((sp) => (
        <span
          key={sp.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: sp.size,
            height: sp.size,
            left: `calc(50% + ${sp.x}px)`,
            top: `calc(50% + ${sp.y}px)`,
            background: `rgb(${style.sparkleColor})`,
            boxShadow: `0 0 5px 2px rgba(${style.sparkleColor},0.8)`,
            animation: `sparkle-orbit ${sp.duration}ms ease-out forwards`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* icon button */}
      <a
        href={(socials.find((s) => s.label === label) as { href: string })?.href ?? "#"}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className={[
          "relative flex items-center justify-center w-10 h-10 rounded-full",
          "bg-white/5 border border-white/10 ring-1 transition-all duration-300",
          style.color,
          hovered ? `${style.glow} ${style.ring} scale-125 bg-white/10` : "ring-transparent scale-100",
        ].join(" ")}
      >
        {children}
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <style>{`
        @keyframes sparkle-orbit {
          0%   { opacity: 0;   transform: translate(-50%, -50%) scale(0.4); }
          25%  { opacity: 1;   transform: translate(-50%, -50%) scale(1); }
          75%  { opacity: 0.7; transform: translate(-50%, -50%) scale(0.8); }
          100% { opacity: 0;   transform: translate(-50%, -50%) scale(0.2); }
        }
      `}</style>
      <footer className="relative z-10 border-t border-mana/20 bg-void/60 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 text-center">
          <div className="flex gap-14 items-center">
            {socials.map((s) => (
              <SparkleIcon key={s.label} label={s.label}>
                <s.icon size={18} />
              </SparkleIcon>
            ))}
          </div>
          <p className="text-xs tracking-widest text-white">
            © {identity.fullName} · Forged in the shadows with React + GSAP
          </p>
        </div>
      </footer>
    </>
  );
}
