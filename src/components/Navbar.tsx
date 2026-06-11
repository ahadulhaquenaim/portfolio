import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, identity } from "../data/content";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onMouseMove={handleMouseMove}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-abyss/90 backdrop-blur-xl border-b border-mana/15"
          : "bg-transparent"
      }`}
    >
      {/* Animated top border beam */}
      <div className="absolute top-0 inset-x-0 h-px overflow-hidden">
        <motion.div
          className="absolute top-0 h-px w-40 bg-linear-to-r from-transparent via-mana-bright to-transparent"
          animate={{ x: ["-10rem", "100vw"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />
      </div>

      {/* Orb glow that follows cursor */}
      {scrolled && (
        <motion.div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ zIndex: -1 }}
        >
          <motion.div
            className="absolute w-72 h-20 rounded-full opacity-10"
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
              background: "radial-gradient(ellipse, #a855f7 0%, transparent 70%)",
              filter: "blur(16px)",
            }}
          />
        </motion.div>
      )}

      <div className="flex items-center justify-between py-5 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <button
          onClick={() => go("home")}
          className="group relative flex items-center gap-2.5 font-display text-2xl font-bold outline-none"
          style={{ textShadow: "0 0 16px rgba(168,85,247,1), 0 0 40px rgba(139,92,246,0.6), 0 0 80px rgba(109,40,217,0.3)" }}
        >
          {/* Magic sparkle particles around logo */}
          {[
            { top: "-8px",  left: "10px",  delay: 0,    dur: 2.0, size: "4px" },
            { top: "-6px",  left: "50px",  delay: 0.4,  dur: 1.7, size: "3px" },
            { top: "-10px", left: "90px",  delay: 0.9,  dur: 2.2, size: "5px" },
            { top: "-7px",  left: "130px", delay: 0.2,  dur: 1.8, size: "3px" },
            { top: "50%",   left: "4px",   delay: 0.3,  dur: 1.8, size: "3px" },
            { top: "100%",  left: "35px",  delay: 0.7,  dur: 1.6, size: "3px" },
            { top: "100%",  left: "75px",  delay: 1.2,  dur: 2.1, size: "4px" },
            { top: "100%",  left: "115px", delay: 0.6,  dur: 1.9, size: "3px" },
            { top: "-4px",  left: "60px",  delay: 1.5,  dur: 2.3, size: "2px" },
            { top: "20%",   left: "155px", delay: 1.0,  dur: 2.0, size: "3px" },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="pointer-events-none absolute rounded-full"
              style={{
                width: p.size, height: p.size,
                top: p.top, left: p.left,
                translateY: p.top === "50%" ? "-50%" : undefined,
                background: i % 3 === 0 ? "#e879f9" : i % 3 === 1 ? "#a855f7" : "#c084fc",
                boxShadow: `0 0 6px 2px ${i % 2 === 0 ? "rgba(232,121,249,0.9)" : "rgba(168,85,247,0.9)"}`,
                zIndex: 10,
              }}
              animate={{
                opacity: [0, 1, 0.7, 1, 0],
                scale: [0, 1.4, 0.7, 1.2, 0],
                y: [0, -6, -12],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Left sword */}
          <motion.svg
            width="22" height="22" viewBox="0 0 24 24" fill="none"
            className="relative shrink-0"
            style={{ filter: "drop-shadow(0 0 6px #a855f7) drop-shadow(0 0 14px rgba(168,85,247,0.7))" }}
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* blade */}
            <line x1="5" y1="19" x2="19" y2="5" stroke="#c084fc" strokeWidth="2" strokeLinecap="round"/>
            {/* tip diamond */}
            <polygon points="19,5 21,3 22,5 20,7" fill="#e879f9" stroke="#a855f7" strokeWidth="0.5"/>
            {/* crossguard */}
            <line x1="8" y1="16" x2="6" y2="18" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="10" y1="14" x2="8" y2="12" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
            {/* handle */}
            <line x1="4" y1="20" x2="2" y2="22" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"/>
          </motion.svg>

          {/* Name text */}
          <span
            className="relative text-white tracking-[0.25em]"
            style={{
              textShadow: "0 0 14px rgba(168,85,247,1), 0 0 32px rgba(168,85,247,0.6)",
            }}
          >
            {identity.name}
          </span>

          {/* Right sword (mirrored) */}
          <motion.svg
            width="22" height="22" viewBox="0 0 24 24" fill="none"
            className="relative shrink-0 scale-x-[-1]"
            style={{ filter: "drop-shadow(0 0 6px #a855f7) drop-shadow(0 0 14px rgba(168,85,247,0.7))" }}
            animate={{ rotate: [8, -8, 8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="5" y1="19" x2="19" y2="5" stroke="#c084fc" strokeWidth="2" strokeLinecap="round"/>
            <polygon points="19,5 21,3 22,5 20,7" fill="#e879f9" stroke="#a855f7" strokeWidth="0.5"/>
            <line x1="8" y1="16" x2="6" y2="18" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="10" y1="14" x2="8" y2="12" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="4" y1="20" x2="2" y2="22" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"/>
          </motion.svg>
        </button>

        {/* Desktop links */}
        <ul ref={navRef} className="hidden items-center gap-3 md:flex">
          {navLinks.map((l) => {
            const isActive = active === l.id;
            const isHovered = hovered === l.id;
            return (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  onMouseEnter={() => setHovered(l.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative px-8 py-2 text-base tracking-widest font-semibold transition-colors duration-200 group"
                  style={{
                    color: l.id === "sports"
                      ? isActive ? "#ffd700" : isHovered ? "#ffe44d" : "#f5c518"
                      : isActive ? "#fff" : isHovered ? "#fff" : "#d1c8ea",
                  }}
                >
                  {/* Hover background pill */}
                  <AnimatePresence>
                    {(isHovered && !isActive) && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.18 }}
                        className="absolute inset-0 rounded-md"
                        style={{
                          background: "rgba(139,92,246,0.08)",
                          border: "1px solid rgba(139,92,246,0.2)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Active aura background */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-bg"
                      className="absolute inset-0 rounded-md"
                      style={l.id === "sports" ? {
                        background: "linear-gradient(135deg, rgba(180,130,0,0.2), rgba(255,215,0,0.1))",
                        border: "1px solid rgba(255,215,0,0.4)",
                        boxShadow: "0 0 18px rgba(255,215,0,0.25), inset 0 0 12px rgba(200,160,0,0.15)",
                      } : {
                        background: "linear-gradient(135deg, rgba(109,40,217,0.25), rgba(168,85,247,0.15))",
                        border: "1px solid rgba(168,85,247,0.35)",
                        boxShadow: "0 0 18px rgba(168,85,247,0.25), inset 0 0 12px rgba(109,40,217,0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span
                    className="relative z-10"
                    style={l.id === "sports" ? {
                      textShadow: isActive
                        ? "0 0 10px #ffd700, 0 0 22px #ffa500, 0 0 40px rgba(255,215,0,0.5)"
                        : isHovered
                        ? "0 0 8px #ffd700, 0 0 18px rgba(255,165,0,0.6)"
                        : "0 0 6px rgba(255,215,0,0.4)",
                    } : undefined}
                  >{l.label}</span>

                  {/* Golden sparkles for Sports nav item */}
                  {l.id === "sports" && (
                    <>
                      {[
                        { top: "-8px",  left: "15%",  delay: 0,    dur: 1.8, size: "4px", color: "#ffd700" },
                        { top: "-7px",  left: "35%",  delay: 0.5,  dur: 2.1, size: "3px", color: "#ffb300" },
                        { top: "-9px",  left: "55%",  delay: 1.0,  dur: 1.6, size: "5px", color: "#ffe44d" },
                        { top: "-6px",  left: "75%",  delay: 0.3,  dur: 2.0, size: "3px", color: "#ffd700" },
                        { top: "-7px",  left: "90%",  delay: 0.8,  dur: 1.9, size: "4px", color: "#ffb300" },
                        { top: "108%", left: "20%",  delay: 0.4,  dur: 1.7, size: "3px", color: "#ffe44d" },
                        { top: "108%", left: "50%",  delay: 1.1,  dur: 2.2, size: "4px", color: "#ffd700" },
                        { top: "108%", left: "80%",  delay: 0.7,  dur: 1.8, size: "3px", color: "#ffb300" },
                        { top: "50%",  left: "-4px", delay: 0.2,  dur: 2.0, size: "3px", color: "#ffd700" },
                        { top: "50%",  left: "102%", delay: 0.9,  dur: 1.7, size: "3px", color: "#ffe44d" },
                      ].map((p, i) => (
                        <motion.span
                          key={`gold-${i}`}
                          className="pointer-events-none absolute rounded-full"
                          style={{
                            width: p.size,
                            height: p.size,
                            top: p.top,
                            left: p.left,
                            translateY: p.top === "50%" ? "-50%" : undefined,
                            background: p.color,
                            boxShadow: `0 0 6px 2px ${p.color}, 0 0 12px 3px rgba(255,215,0,0.6)`,
                            zIndex: 10,
                          }}
                          animate={{
                            opacity: [0, 1, 0.6, 1, 0],
                            scale: [0, 1.5, 0.8, 1.3, 0],
                            y: [0, -5, -10],
                          }}
                          transition={{
                            duration: p.dur,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeOut",
                          }}
                        />
                      ))}

                      {/* Rising gold sparks */}
                      {[
                        { left: "25%", delay: 0.1 },
                        { left: "50%", delay: 0.7 },
                        { left: "75%", delay: 1.3 },
                      ].map((s, i) => (
                        <motion.span
                          key={`gold-rise-${i}`}
                          className="absolute pointer-events-none rounded-full"
                          style={{
                            width: "2px",
                            height: "4px",
                            left: s.left,
                            bottom: "100%",
                            background: "linear-gradient(to top, #ffd700, #fff9c4)",
                            boxShadow: "0 0 4px 2px rgba(255,215,0,0.9)",
                          }}
                          animate={{
                            y: [0, -16, -26],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.2, 0],
                          }}
                          transition={{
                            duration: 1.3,
                            repeat: Infinity,
                            delay: s.delay,
                            ease: "easeOut",
                          }}
                        />
                      ))}

                      {/* Subtle gold shimmer background */}
                      <motion.span
                        className="absolute inset-0 rounded-md pointer-events-none"
                        style={{
                          background: "radial-gradient(ellipse at center, rgba(255,215,0,0.07) 0%, transparent 70%)",
                        }}
                        animate={{
                          opacity: [0.4, 0.9, 0.4],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </>
                  )}

                  {/* Active underline with glow */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px rounded-full"
                      style={{
                        width: "60%",
                        background: l.id === "sports"
                          ? "linear-gradient(90deg, transparent, #ffd700, transparent)"
                          : "linear-gradient(90deg, transparent, #a855f7, transparent)",
                        boxShadow: l.id === "sports"
                          ? "0 0 8px 1px #ffd700, 0 0 20px 2px rgba(255,215,0,0.6)"
                          : "0 0 8px 1px #a855f7, 0 0 20px 2px rgba(168,85,247,0.5)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Active sparkle constellation */}
                  {isActive && l.id !== "sports" && (
                    <>
                      {/* Corner sparks */}
                      {[
                        { top: "-6px", left: "6px", delay: 0, size: "5px" },
                        { top: "-6px", right: "6px", delay: 0.4, size: "5px" },
                        { bottom: "-6px", left: "10px", delay: 0.8, size: "4px" },
                        { bottom: "-6px", right: "10px", delay: 1.2, size: "4px" },
                        { top: "50%", left: "-4px", delay: 0.6, size: "3px" },
                        { top: "50%", right: "-4px", delay: 1.0, size: "3px" },
                      ].map((s, i) => (
                        <motion.span
                          key={i}
                          className="absolute rounded-full pointer-events-none"
                          style={{
                            width: s.size,
                            height: s.size,
                            top: s.top,
                            bottom: (s as any).bottom,
                            left: s.left,
                            right: (s as any).right,
                            translateY: s.top === "50%" ? "-50%" : undefined,
                            background: "#a855f7",
                            boxShadow: "0 0 6px 2px #a855f7, 0 0 12px 4px rgba(168,85,247,0.6)",
                          }}
                          animate={{
                            opacity: [0, 1, 0.6, 1, 0],
                            scale: [0, 1.2, 0.8, 1.1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: s.delay,
                            ease: "easeInOut",
                          }}
                        />
                      ))}

                      {/* Floating rising sparks */}
                      {[
                        { left: "20%", delay: 0.2 },
                        { left: "50%", delay: 0.9 },
                        { left: "80%", delay: 0.5 },
                      ].map((s, i) => (
                        <motion.span
                          key={`rise-${i}`}
                          className="absolute pointer-events-none rounded-full"
                          style={{
                            width: "3px",
                            height: "3px",
                            left: s.left,
                            bottom: "100%",
                            background: "#c084fc",
                            boxShadow: "0 0 5px 2px rgba(192,132,252,0.8)",
                          }}
                          animate={{
                            y: [0, -18, -28],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0],
                          }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            delay: s.delay,
                            ease: "easeOut",
                          }}
                        />
                      ))}

                      {/* Pulse ring */}
                      <motion.span
                        className="absolute inset-0 rounded-md pointer-events-none"
                        style={{ border: "1px solid rgba(168,85,247,0.6)" }}
                        animate={{
                          opacity: [0.6, 0, 0.6],
                          scale: [1, 1.08, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </>
                  )}

                  {/* Gold active pulse ring for Sports */}
                  {isActive && l.id === "sports" && (
                    <motion.span
                      className="absolute inset-0 rounded-md pointer-events-none"
                      style={{ border: "1px solid rgba(255,215,0,0.7)" }}
                      animate={{
                        opacity: [0.7, 0, 0.7],
                        scale: [1, 1.08, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA Button */}
        <button
          onClick={() => go("contact")}
          className="hidden md:block relative overflow-hidden rounded-md px-5 py-2 text-sm font-semibold tracking-wider text-white"
          style={{
            background: "linear-gradient(135deg, #6d28d9, #a855f7)",
            boxShadow: "0 0 20px rgba(139,92,246,0.55), 0 0 40px rgba(168,85,247,0.2)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 30px rgba(168,85,247,0.85), 0 0 60px rgba(168,85,247,0.35)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 20px rgba(139,92,246,0.55), 0 0 40px rgba(168,85,247,0.2)";
          }}
        >
          {/* Shimmer sweep */}
          <motion.span
            className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              width: "50%",
            }}
          />
          LET'S CONNECT
        </button>

        {/* Mobile toggle */}
        <motion.button
          className="text-mana-bright md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="menu"
          whileTap={{ scale: 0.9 }}
          style={{ filter: "drop-shadow(0 0 6px #a855f7)" }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <X />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <Menu />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
            style={{
              borderTop: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(5,3,12,0.96)",
              backdropFilter: "blur(20px)",
            }}
          >
            {navLinks.map((l, i) => {
              const isActive = active === l.id;
              return (
                <motion.li
                  key={l.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => go(l.id)}
                    className="flex w-full items-center gap-3 px-6 py-3.5 text-left tracking-widest text-sm"
                    style={l.id === "sports" ? {
                      color: isActive ? "#ffd700" : "#c8a800",
                      background: isActive ? "rgba(255,215,0,0.07)" : "transparent",
                      borderLeft: isActive ? "2px solid #ffd700" : "2px solid transparent",
                      textShadow: isActive ? "0 0 12px rgba(255,215,0,0.9)" : "0 0 6px rgba(255,215,0,0.3)",
                      boxShadow: isActive ? "inset 0 0 30px rgba(255,215,0,0.05)" : "none",
                    } : {
                      color: isActive ? "#fff" : "#94a3b8",
                      background: isActive ? "rgba(139,92,246,0.08)" : "transparent",
                      borderLeft: isActive ? "2px solid #a855f7" : "2px solid transparent",
                      textShadow: isActive ? "0 0 12px rgba(168,85,247,0.8)" : "none",
                      boxShadow: isActive ? "inset 0 0 30px rgba(139,92,246,0.06)" : "none",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={l.id === "sports" ? {
                          background: "#ffd700",
                          boxShadow: "0 0 6px #ffd700, 0 0 12px rgba(255,215,0,0.7)",
                        } : {
                          background: "#a855f7",
                          boxShadow: "0 0 6px #a855f7",
                        }}
                      />
                    )}
                    {l.label}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
