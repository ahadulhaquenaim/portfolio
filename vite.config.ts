import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// `base` MUST match the GitHub repo name so assets resolve on GitHub Pages.
// Site will be served at: https://ahadulhaquenaim.github.io/portfolio/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/portfolio/",
});
