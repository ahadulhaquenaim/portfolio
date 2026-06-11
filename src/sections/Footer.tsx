import { useState, useEffect, useRef } from "react";
import { socials, identity } from "../data/content";

const iconStyles: Record<string, { color: string; glow: string; ring: string }> = {
  GitHub: {
    color: "text-white",
    glow: "shadow-[0_0_14px_4px_rgba(255,255,255,0.45)]",
    ring: "ring-white/40",
  },
  LinkedIn: {
    color: "text-sky-400",
    glow: "shadow-[0_0_14px_4px_rgba(56,189,248,0.55)]",
    ring: "ring-sky-400/50",
  },
  Facebook: {
    color: "text-blue-500",
    glow: "shadow-[0_0_14px_4px_rgba(59,130,246,0.55)]",
    ring: "ring-blue-500/50",
  },
  Email: {
    color: "text-fuchsia-400",
    glow: "shadow-[0_0_14px_4px_rgba(232,121,249,0.55)]",
    ring: "ring-fuchsia-400/50",
  },
};

type Sparkle = { id: number; x: number; y: number; size: number; delay: number };

function SparkleIcon({ label, children }: { label: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const style = iconStyles[label] ?? iconStyles["Email"];

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  function handleEnter() {
    setHovered(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    const burst: Sparkle[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
      size: Math.random() * 4 + 2,
      delay: i * 40,
    }));
    setSparkles(burst);
    timerRef.current = setTimeout(() => setSparkles([]), 700);
  }

  function handleLeave() {
    setHovered(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    setSparkles([]);
  }

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* sparkle particles */}
      {sparkles.map((sp) => (
        <span
          key={sp.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: sp.size,
            height: sp.size,
            left: `calc(50% + ${sp.x}px)`,
            top: `calc(50% + ${sp.y}px)`,
            background: "white",
            boxShadow: "0 0 4px 2px rgba(255,255,255,0.8)",
            animation: `sparkle-fade 0.6s ${sp.delay}ms ease-out forwards`,
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
        @keyframes sparkle-fade {
          0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
        }
      `}</style>
      <footer className="relative z-10 border-t border-mana/20 bg-void/60 py-8">
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
