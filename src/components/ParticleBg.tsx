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
            number: { value: 55, density: { enable: true } },
            color: { value: ["#8b5cf6", "#a855f7", "#38bdf8"] },
            opacity: {
              value: { min: 0.15, max: 0.7 },
              animation: { enable: true, speed: 0.6, sync: false },
            },
            size: { value: { min: 1, max: 3.5 } },
            move: {
              enable: true,
              speed: 0.6,
              direction: "top",
              outModes: { default: "out" },
              random: true,
            },
            shadow: { enable: true, color: "#a855f7", blur: 6 },
            links: {
              enable: true,
              distance: 130,
              color: "#6d28d9",
              opacity: 0.12,
              width: 1,
            },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "grab" } },
            modes: { grab: { distance: 160, links: { opacity: 0.3 } } },
          },
        }}
      />
    </ParticlesProvider>
  );
}
