import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// `base` MUST match the GitHub repo name so assets resolve on GitHub Pages.
// Site will be served at: https://ahadulhaquenaim.github.io/portfolio/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/portfolio/",
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendors out of the app chunk: they download in parallel
        // and stay cached across content-only redeploys.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "react";
          if (/[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return "motion";
          if (id.includes("gsap")) return "gsap";
        },
      },
    },
  },
});
