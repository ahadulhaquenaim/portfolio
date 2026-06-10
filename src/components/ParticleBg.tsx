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
          fpsLimit: 60,
          detectRetina: true,
          particles: {
            number: { value: 30, density: { enable: true } },
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
