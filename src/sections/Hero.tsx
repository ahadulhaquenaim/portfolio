import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { identity, hudStats, headlineStats } from "../data/content";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  // The gate overlay is `position: fixed` and covers the whole viewport, so it
  // MUST always be torn down — even if GSAP never runs. We unmount it from
  // React (not just display:none) once the intro is done or skipped.
  const [showGate, setShowGate] = useState(true);

  useEffect(() => {
    const finish = () => {
      setRevealed(true);
      setShowGate(false);
    };

    // Respect reduced-motion: skip the cinematic and reveal immediately.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      finish();
      return;
    }

    // Safety net: if the timeline stalls (throttled rAF, error), clear anyway.
    const safety = window.setTimeout(finish, 6000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.clearTimeout(safety);
          finish();
        },
      });

      // 1. Screen starts black, a vertical "gate" crack of purple light opens
      tl.set(".gate-overlay", { opacity: 1 })
        .fromTo(
          ".gate-crack",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.in" }
        )
        // 2. The gate splits open, light floods, halves slide apart
        .to(".gate-half-l", { xPercent: -110, duration: 0.9, ease: "power4.inOut" })
        .to(
          ".gate-half-r",
          { xPercent: 110, duration: 0.9, ease: "power4.inOut" },
          "<"
        )
        .to(".gate-crack", { opacity: 0, duration: 0.3 }, "<")
        // 3. Background art fades + zooms in (scale from >1 so no edges show)
        .fromTo(
          ".hero-character",
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.1 },
          "-=0.5"
        )
        // 4. Text + HUD slide in
        .fromTo(
          ".hero-text > *",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.7"
        )
        .fromTo(
          ".hero-hud",
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.5"
        );
    }, root);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* ---- GSAP gate-crack overlay (cinematic entrance) ---- */}
      {showGate && (
        <div className="gate-overlay fixed inset-0 z-[60] flex">
          <div className="gate-half-l h-full w-1/2 bg-abyss border-r border-mana/30" />
          <div className="gate-crack absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-mana-bright shadow-[0_0_40px_18px_#a855f7]" />
          <div className="gate-half-r h-full w-1/2 bg-abyss border-l border-mana/30" />
        </div>
      )}

      {/* ---- Full-bleed background image (the cinematic monarch art) ---- */}
      {identity.heroBackground && (
        <div
          className="hero-character absolute inset-0 z-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}${identity.heroBackground})`,
            backgroundSize: "110%",
            backgroundPosition: "0% 15%",
          }}
        />
      )}

      {/* Legibility overlays:
          - left→right dark gradient so the headline text stays readable
          - bottom fade so the hero blends into the next section
          - subtle mana tint */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(100deg,rgba(5,3,12,0.92)_0%,rgba(5,3,12,0.6)_28%,rgba(5,3,12,0.0)_42%,rgba(5,3,12,0.0)_70%,rgba(5,3,12,0.4)_100%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(109,40,217,0.25),transparent_65%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-t from-abyss to-transparent" />

      {/* Left-to-right spotlight — soft beam across the character */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.04) 42%, rgba(220,180,255,0.06) 55%, transparent 70%)",
        }}
      />
      {/* Aura glow — subtle purple halo around the body */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 42% 68% at 57% 52%, rgba(168,85,247,0.12) 0%, rgba(109,40,217,0.06) 50%, transparent 75%)",
          mixBlendMode: "screen",
        }}
      />


      <div className="relative z-10 mx-auto grid min-h-screen w-full grid-cols-1 items-center gap-8 px-8 pt-24 pb-16 lg:grid-cols-[1.2fr_0.8fr] xl:px-20 2xl:px-32 lg:pl-32 xl:pl-48">
        {/* ---- LEFT: headline text ---- */}
        <div className="hero-text">
          <p className="mb-3 text-sm tracking-[0.3em] text-mana-bright">
            {identity.tagline}
          </p>
          <h1 className="font-display text-7xl font-black leading-none text-glow md:text-8xl">
            {identity.name}
          </h1>
          <p className="mt-4 text-lg tracking-[0.2em] text-slate-200">
            {identity.roles.join("  |  ")}
          </p>
          <p className="mt-5 max-w-md leading-relaxed text-slate-300 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
            {identity.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="btn-mana rounded-md px-7 py-3 font-semibold tracking-wider text-white"
            >
              VIEW MY WORK ›
            </a>
            <a
              href="#about"
              className="btn-ghost rounded-md bg-abyss/40 px-7 py-3 font-semibold tracking-wider text-slate-100 backdrop-blur-sm"
            >
              ABOUT ME
            </a>
          </div>
        </div>

        {/* ---- RIGHT: HUD stat panel ---- */}
        <div className="hero-hud hidden flex-col gap-6 lg:flex lg:pl-28 xl:pl-40">
          <div className="rounded-lg border border-mana/20 bg-abyss/50 p-5 backdrop-blur-sm">
            <p className="mb-3 text-xs tracking-[0.3em] text-system">EXPERIENCE</p>
            <div className="space-y-3">
              {hudStats.map((s) => (
                <HudBar key={s.label} {...s} go={revealed} />
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-mana/20 bg-abyss/50 p-5 backdrop-blur-sm">
            {headlineStats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-glow">
                  {s.value}
                </span>
                <span className="text-xs tracking-widest text-slate-300">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-slate-400"
      >
        <span className="text-xs tracking-[0.3em]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ChevronDown className="text-mana-bright" />
        </motion.span>
      </motion.a>
    </section>
  );
}

function HudBar({
  label,
  rank,
  value,
  go,
}: {
  label: string;
  rank: string;
  value: number;
  go: boolean;
}) {
  return (
    <div className="w-56 max-w-full">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-200">{label}</span>
        <span className="text-mana-bright">{rank}</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-shadow">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-arcane to-mana-bright shadow-[0_0_10px_#a855f7]"
          initial={{ width: 0 }}
          animate={{ width: go ? `${value}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
