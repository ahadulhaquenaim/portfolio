import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

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

  const size = clicking ? 68 : hovering ? 96 : 82;
  const filter = clicking
    ? "drop-shadow(0 0 8px #a855f7) drop-shadow(0 0 16px #7c3aed) drop-shadow(0 0 32px #6d28d9) drop-shadow(0 0 48px rgba(139,92,246,0.7)) brightness(1.2) saturate(1.3) hue-rotate(200deg)"
    : hovering
    ? "drop-shadow(0 0 10px #c084fc) drop-shadow(0 0 22px #a855f7) drop-shadow(0 0 44px #7c3aed) drop-shadow(0 0 60px rgba(168,85,247,0.6)) brightness(1.3) saturate(1.5) hue-rotate(200deg)"
    : "drop-shadow(0 0 6px #a855f7) drop-shadow(0 0 14px #7c3aed) drop-shadow(0 0 28px rgba(139,92,246,0.5)) brightness(1.1) saturate(1.2) hue-rotate(200deg)";

  return (
    <motion.div
      className="pointer-events-none fixed z-9999"
      style={{
        x,
        y,
        /* hotspot at blade tip — upper-right corner of image */
        translateX: "-74px",
        translateY: "-8px",
        transformOrigin: "top right",
      }}
      animate={{
        rotate: clicking ? 5 : 0,
        scale: clicking ? 0.88 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <img
        src="/portfolio/sword-cursor.png"
        width={size}
        height={size}
        style={{
          filter,
          transition: "filter 0.2s ease, width 0.15s ease, height 0.15s ease",
          display: "block",
          userSelect: "none",
          WebkitUserDrag: "none" as never,
        }}
        alt=""
        draggable={false}
      />
    </motion.div>
  );
}
