import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

/**
 * Floating purple "mana" particles — the Solo Leveling ambient background.
 * Renders fixed behind all content (z-0). Pointer-events disabled so it
 * never blocks clicks.
 *
 * @tsparticles/react v4 uses <ParticlesProvider init={...}> which loads the
 * engine once, then <Particles options={...}> renders into it.
 */
const init = async (engine: Engine) => {
  await loadSlim(engine);
};

export default function ParticleBg() {
  return (
    <ParticlesProvider init={init}>
      <Particles
        id="mana-particles"
        className="fixed inset-0 z-0 pointer-events-none"
        options={{
          fullScreen: { enable: false },
          // Cap at 30fps + skip retina doubling: ambient particles don't need
          // 60fps and retina detection 2-4x's the per-frame physics work on
          // HiDPI screens. This is a large, invisible CPU win.
          fpsLimit: 30,
          detectRetina: false,
          particles: {
            number: { value: 22, density: { enable: true } },
            color: { value: ["#8b5cf6", "#a855f7", "#38bdf8"] },
            opacity: {
              value: { min: 0.1, max: 0.5 },
              animation: { enable: true, speed: 0.4, sync: false },
            },
            size: { value: { min: 1, max: 2.5 } },
            move: {
              enable: true,
              speed: 0.4,
              direction: "top",
              outModes: { default: "out" },
              random: true,
            },
            shadow: { enable: false },
            links: { enable: false },
          },
          interactivity: {
            events: { onHover: { enable: false } },
          },
        }}
      />
    </ParticlesProvider>
  );
}
