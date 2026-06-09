import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * The signature Solo Leveling "[System]" pop-up window.
 * Appears once when scrolled into view, with a subtle synth "ding"
 * generated via the Web Audio API (no audio file needed).
 */
export default function SystemNotification({
  title = "NOTIFICATION",
  message,
  sound = true,
  className = "",
}: {
  title?: string;
  message: string;
  sound?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!inView || played || !sound) return;
    setPlayed(true);
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch {
      /* autoplay blocked before user interaction — silently ignore */
    }
  }, [inView, played, sound]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 14 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`system-panel mx-auto max-w-md px-5 py-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-system text-xs tracking-[0.25em] font-semibold">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-system shadow-[0_0_8px_#38bdf8]" />
        [ {title} ]
      </div>
      <p className="mt-2 font-display text-base text-slate-100">{message}</p>
    </motion.div>
  );
}
