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
    ? "drop-shadow(0 0 8px #ff0000) drop-shadow(0 0 16px #ff0000) drop-shadow(0 0 32px #cc0000) drop-shadow(0 0 48px rgba(255,0,0,0.6)) brightness(1.15) saturate(1.4)"
    : hovering
    ? "drop-shadow(0 0 10px #ff2020) drop-shadow(0 0 22px #ff0000) drop-shadow(0 0 44px #cc0000) drop-shadow(0 0 60px rgba(255,0,0,0.5)) brightness(1.25) saturate(1.6)"
    : "drop-shadow(0 0 6px #ff0000) drop-shadow(0 0 14px #cc0000) drop-shadow(0 0 28px rgba(200,0,0,0.5)) brightness(1.08) saturate(1.3)";

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
