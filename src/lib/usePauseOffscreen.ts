import { useEffect } from "react";

/**
 * Tags every <section> and <footer> with [data-offscreen] while it is well
 * outside the viewport. index.css pauses all CSS animations under that
 * attribute, so only the loops near the screen cost any GPU/CPU time.
 * The generous rootMargin resumes them before they scroll into view.
 */
export function usePauseOffscreen() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("main section, footer");
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.removeAttribute("data-offscreen");
          else e.target.setAttribute("data-offscreen", "");
        }
      },
      { rootMargin: "300px 0px" }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);
}
