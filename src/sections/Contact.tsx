import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { socials, identity } from "../data/content";
import { useVideoInView } from "../lib/useVideoInView";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const videoRef = useVideoInView<HTMLVideoElement>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${f.get("name")}`);
    const body = encodeURIComponent(
      `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`
    );
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden py-24">
      {/* Full-bleed background video */}
      {identity.contactVideo && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          >
            <source src={identity.contactVideo} type="video/mp4" />
          </video>
          {/* Dark overlays for readability */}
          <div className="absolute inset-0 bg-abyss/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(109,40,217,0.2),transparent_70%)]" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-abyss to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-abyss to-transparent" />
        </div>
      )}

      {/* Content layered above video */}
      <div className="relative z-10 px-5">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-system text-sm tracking-[0.4em] font-semibold mb-3"
          >
            ✦ GET IN TOUCH ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-glow tracking-wide"
          >
            CONQUER TOGETHER
          </motion.h2>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-mana" />
            <span className="h-2 w-2 rotate-45 bg-mana-bright shadow-[0_0_12px_#a855f7]" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-mana" />
          </div>
        </div>

        <div className="mx-auto max-w-md">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-mana/60 bg-transparent p-7 shadow-[0_0_30px_rgba(168,85,247,0.5),inset_0_0_30px_rgba(168,85,247,0.05)]"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" placeholder="Your name" />
              <Field name="email" type="email" placeholder="Your email" />
            </div>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message..."
              className="mt-4 w-full resize-none rounded-md border border-white/50 bg-transparent px-4 py-3 text-slate-100 outline-none transition focus:border-white focus:shadow-[0_0_14px_rgba(255,255,255,0.4)] placeholder:text-white/80 placeholder:[text-shadow:0_0_10px_rgba(255,255,255,0.6)]"
            />
            <button
              type="submit"
              className="btn-mana mt-5 flex w-full items-center justify-center gap-2 rounded-md px-7 py-3 font-semibold tracking-wider text-white"
            >
              {sent ? "OPENING MAIL…" : "CONQUER TOGETHER"} <Send size={16} />
            </button>
          </motion.form>

          {/* Socials */}
          <div className="mt-10 flex justify-center gap-8">
            {socials.map((s) => (
              <SocialIcon key={s.label} s={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SPARKLE_POSITIONS = [
  { top: "-8px", left: "50%", delay: 0 },
  { top: "50%", left: "-8px", delay: 0.2 },
  { top: "50%", left: "calc(100% + 8px)", delay: 0.4 },
  { top: "calc(100% + 8px)", left: "50%", delay: 0.6 },
];

function SocialIcon({ s }: { s: { label: string; href: string; icon: React.ElementType } }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={s.href}
      target="_blank"
      rel="noreferrer"
      aria-label={s.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative grid h-12 w-12 place-items-center rounded-lg border border-cyan-400/50 bg-abyss/40 backdrop-blur-sm text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:text-white shadow-[0_0_12px_rgba(34,211,238,0.4),0_4px_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.8),0_4px_30px_rgba(34,211,238,0.6)]"
    >
      <s.icon size={20} />

      {/* Sparkles */}
      {SPARKLE_POSITIONS.map((pos, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
          style={{ top: pos.top, left: pos.left, translateX: "-50%", translateY: "-50%" }}
          animate={hovered ? {
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            y: [0, -10, -18],
          } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.7, delay: pos.delay, ease: "easeOut" }}
        />
      ))}

      {/* Corner sparkle dots */}
      {hovered && [0, 1, 2, 3].map((i) => (
        <motion.div
          key={`corner-${i}`}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-white"
          style={{
            top: i < 2 ? "-4px" : "calc(100% + 4px)",
            left: i % 2 === 0 ? "20%" : "80%",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], y: i < 2 ? -8 : 8 }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
        />
      ))}
    </a>
  );
}

function Field({
  name,
  type = "text",
  placeholder,
}: {
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <input
      name={name}
      type={type}
      required
      placeholder={placeholder}
      className="w-full rounded-md border border-white/50 bg-transparent px-4 py-3 text-slate-100 outline-none transition focus:border-white focus:shadow-[0_0_14px_rgba(255,255,255,0.4)] placeholder:text-white/80 placeholder:[text-shadow:0_0_10px_rgba(255,255,255,0.6)]"
    />
  );
}
