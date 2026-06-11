import { useEffect, useRef } from "react";

/**
 * Pauses a looping background <video> whenever it scrolls out of view and
 * resumes it when it returns. Three autoplay-loop videos decoding at once
 * (hero, contact, sports) is a constant GPU/CPU drain even off-screen — this
 * keeps only the visible one running.
 */
export function useVideoInView<T extends HTMLVideoElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() can reject if interrupted — swallow it.
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}
