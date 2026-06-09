# ✦ Ahad — Solo Leveling Animated Portfolio

A cinematic, RPG-themed personal portfolio. Black-and-purple "Monarch's
Awakening" aesthetic with a gate-crack hero entrance, floating mana particles,
"System" notification pop-ups, XP skill bars, dungeon-raid project cards and a
Hunter Records timeline.

**Zero-cost stack:** React + Vite · Tailwind CSS v4 · Framer Motion · GSAP ·
tsParticles · lucide-react · GitHub Pages.

---

## 🚀 Quick start

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
```

> Requires Node 20.19+ or 22.12+ (you have 20.17 — it runs, but upgrade when you can).

Build & preview the production bundle:

```bash
npm run build
npm run preview
```

---

## 📝 Editing your content

**Everything lives in one file:** [`src/data/content.ts`](src/data/content.ts).

Change your bio, skills, projects, experience, stats, social links and nav
there — no other file needs touching for normal updates. Each block is
commented.

- **Skills / Projects / Experience** carry a `rank` (`E` → `S`). The rank drives
  the badge color (S = gold, A = pink, B = purple, …) automatically.
- **HUD stats** in the hero are `hudStats` and `headlineStats`.

---

## 🖼️ Adding your photo (the character)

The site ships with a placeholder silhouette. To use your real cutout:

1. Make a **transparent-background PNG** of yourself — free options:
   [remove.bg](https://www.remove.bg) (5/month) or Canva.
2. Drop it in `public/` named **`character.png`**.
3. In [`src/data/content.ts`](src/data/content.ts), change:
   ```ts
   characterImage: "character.svg",   // → "character.png"
   ```

That's it — the hero picks it up with the glow + magic-circle treatment.

---

## 🌐 Deploy to GitHub Pages

The Vite `base` is set to `/portfolio/` (matching the repo name). If you rename
the repo, update `base` in [`vite.config.ts`](vite.config.ts) **and** the
`homepage` in `package.json`.

### Option A — automatic (recommended)

A GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml))
builds and deploys on every push to `main`.

1. Create a repo named **`portfolio`** and push:
   ```bash
   git add -A && git commit -m "Solo Leveling portfolio"
   git branch -M main
   git remote add origin https://github.com/ahadulhaquenaim/portfolio.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Live at **https://ahadulhaquenaim.github.io/portfolio/**

### Option B — one command (gh-pages branch)

```bash
npm run deploy
```

Then set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.

---

## 🎨 Theming

Colors, fonts and effects are CSS variables in
[`src/index.css`](src/index.css) under `@theme` (Tailwind v4). Tweak
`--color-mana`, `--color-system`, etc. to reskin the whole site.

The reusable classes (`.system-panel`, `.gate-card`, `.btn-mana`, `.text-glow`,
`.glitch`) are defined there too.

---

## ♿ Accessibility

The cinematic hero entrance respects `prefers-reduced-motion` — users with that
setting skip straight to the revealed page.
