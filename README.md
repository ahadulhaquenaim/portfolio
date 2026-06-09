# ✦ Ahad — Solo Leveling Animated Portfolio

A cinematic, RPG-themed personal portfolio inspired by *Solo Leveling*. Features a "Monarch's Awakening" black-and-purple aesthetic with a gate-crack hero entrance, floating mana particles, System notification pop-ups, XP skill bars, dungeon-raid project cards, and a Hunter Records timeline.

**Stack:** React 19 + Vite 7 · TypeScript 6 · Tailwind CSS v4 · Framer Motion · GSAP · tsParticles · lucide-react · GitHub Pages

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

---

## Editing your content

**Everything lives in one file:** [src/data/content.ts](src/data/content.ts)

Change your bio, skills, projects, experience, stats, and social links there — no other file needs touching for normal updates.

Key exports and what they control:

| Export | Controls |
|---|---|
| `identity` | Name, tagline, roles, intro, hero background image, email |
| `hudStats` | Floating skill readouts on the right side of the hero |
| `headlineStats` | The three bold stat numbers in the hero |
| `about` | Bio paragraphs and the class/rank/guild panel |
| `skills` | XP skill bars with rank badges |
| `projects` | Dungeon-raid project cards |
| `experience` | Hunter Association Records timeline |
| `socials` | GitHub, LinkedIn, Facebook, email links |
| `navLinks` | Navigation bar items |

**Rank system:** Skills, projects, and experience entries carry a `rank` (`E` → `S`). The rank drives the badge color automatically — S = gold, A = pink, B = purple, C = blue, D/E = grey.

---

## Adding your photo

The site ships with a placeholder silhouette. To use your own cutout:

1. Make a **transparent-background PNG** of yourself — [remove.bg](https://www.remove.bg) (5/month free) or Canva work well.
2. Drop the file into `public/` named **`character.png`**.
3. In [src/data/content.ts](src/data/content.ts), the `identity.heroBackground` field already points to `"character.png"` — no change needed if you use that filename.

The hero applies a glow and magic-circle treatment automatically.

---

## Deploy to GitHub Pages

The Vite `base` is set to `/portfolio/` (matching the repo name). If you rename the repo, update `base` in [vite.config.ts](vite.config.ts) **and** `homepage` in [package.json](package.json).

### Option A — automatic CI/CD (recommended)

A GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) builds and deploys on every push to `main`.

1. Create a repo named **`portfolio`** and push:
   ```bash
   git add -A && git commit -m "Solo Leveling portfolio"
   git branch -M main
   git remote add origin https://github.com/ahadulhaquenaim/portfolio.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Live at **https://ahadulhaquenaim.github.io/portfolio/**

### Option B — one-command deploy

```bash
npm run deploy
```

Then set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.

---

## Theming

Colors, fonts, and effects are CSS variables in [src/index.css](src/index.css) under `@theme` (Tailwind v4). Tweak `--color-mana`, `--color-system`, etc. to reskin the whole site.

Reusable utility classes defined there: `.system-panel`, `.gate-card`, `.btn-mana`, `.text-glow`, `.glitch`.

---

## Accessibility

The cinematic hero entrance respects `prefers-reduced-motion` — users with that setting skip straight to the revealed page.
