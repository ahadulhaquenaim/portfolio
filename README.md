# ✦ Ahad — Anime Animated Portfolio

A cinematic, RPG-themed personal portfolio with a **dual anime skin** — flip the
whole site between a *Solo Leveling* (arcane purple) look and a *Dragon Ball Z*
(Super-Saiyan orange) look with one toggle. It opens with a "Monarch's
Awakening" gate-crack entrance over a full-bleed character **video**, then
scrolls through Achievement-Unlocked cards, an XP **Skill Tree**, dungeon-raid
**Project** cards, a Hunter Records **timeline**, a 3D **Certifications**
carousel, a **Contact** form, and a **Conquered Dungeons** sports showcase — all
over a black aesthetic with floating mana particles and System-window UI. Every
accent color, glow, sparkle, and background video recolors per theme.

**Stack:** React 19 + Vite 7 · TypeScript · Tailwind CSS v4 · Framer Motion ·
GSAP · tsParticles · lucide-react · GitHub Pages

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

Lint:

```bash
npm run lint
```

---

## Sections

| Section | What it shows | Source |
|---|---|---|
| **Hero** | Cinematic gate intro (GSAP) over a character video + Achievement-Unlocked cards | `src/sections/Hero.tsx` |
| **About** | Bio + Solo Leveling "STATUS" window | `src/sections/About.tsx` |
| **Skills** | Branching XP "Skill Tree" across 6 categories including AI & Data Processing (LLM Integration, RAG, LangChain, Prompt Engineering, Vector DBs, Claude) | `src/sections/Skills.tsx` |
| **Projects** | Dungeon-raid cards with a detail modal/slideshow | `src/sections/Projects.tsx` |
| **Experience** | "Hunter Records" timeline | `src/sections/Experience.tsx` |
| **Certifications** | 3D coverflow carousel of credentials | `src/sections/Certifications.tsx` |
| **Contact** | Mailto form over a background video + social links | `src/sections/Contact.tsx` |
| **Sports** | "Conquered Dungeons" — expandable trophy galleries | `src/sections/Sports.tsx` |
| **Footer** | Social icons with hover sparkles | `src/sections/Footer.tsx` |

A **theme toggle** (`src/components/ThemeToggle.tsx`) in the navbar flips every
section between the two anime skins — see [Theming](#theming) below.

---

## Editing your content

**Most content lives in one file:** [`src/data/content.ts`](src/data/content.ts)

Change your bio, skills, projects, experience, sports, stats, and social links
there — no other file needs touching for normal updates.

Key exports and what they control:

| Export | Controls |
|---|---|
| `identity` | Name, tagline, roles, intro, email, CV path (videos live in `src/theme/palette.ts`) |
| `hudStats` | Skill readout values (Level/Mastery + percentages) |
| `headlineStats` | The bold hero stat numbers (projects / years / dedication) |
| `about` | Bio paragraphs and the class/rank/guild status panel |
| `skills` | Skill-tree abilities with rank badges and XP values — categories: Languages, Frontend, Backend, Database, DevOps & Cloud, AI & Data Processing |
| `projects` | Dungeon-raid project cards (blurb, tech, links, slides) |
| `experience` | Hunter Records timeline entries |
| `sports` | Conquered-dungeons categories and their trophies |
| `socials` | GitHub, LinkedIn, Facebook, email links |
| `navLinks` | Navigation bar items |

> **Note:** two data sets are intentionally kept inside their components rather
> than in `content.ts` — the Hero **Achievement cards** (`ACHIEVEMENTS` in
> `Hero.tsx`) and the **Certifications** list (`CERTIFICATIONS` in
> `Certifications.tsx`). Edit those arrays directly.

**Rank system:** Skills, projects, and experience entries carry a `rank`
(`E` → `S`). The rank drives the badge color automatically — S = gold, A = pink,
B = purple, C = blue, D/E = grey (see [`src/lib/rank.ts`](src/lib/rank.ts)).

---

## Media (hero, sports & contact videos)

The hero, sports, and contact backgrounds are **videos** served from Cloudinary.
Because they differ per theme, they live alongside the colors in
[`src/theme/palette.ts`](src/theme/palette.ts) — each theme defines its own
`heroVideo` / `sportsVideo` / `contactVideo`.

- To swap a video for a theme, replace its URL in that theme's palette entry
  (any direct-playable `.mp4` works).
- The hero clip also carries a per-theme `heroVideoStyle` (object-fit, focal
  point, scale, opacity, CSS filter) so each clip's framing and grading are
  tuned independently.
- All looping videos pause when scrolled out of view (see
  [`src/lib/useVideoInView.ts`](src/lib/useVideoInView.ts)) to save CPU/GPU.

---

## Theming

The site ships with **two themes** — `solo` (Solo Leveling: arcane purple +
system blue + S-rank gold) and `dbz` (Dragon Ball Z: gi orange + ki-blue + SSJ
yellow). The active theme persists to `localStorage` and is reflected on
`<html data-theme="…">`.

Colors live in **two coordinated places**, both keyed by `data-theme`:

1. **CSS variables** — the `[data-theme="solo"]` / `[data-theme="dbz"]` blocks in
   [`src/index.css`](src/index.css) drive every Tailwind token and the
   `.system-panel` / `.gate-card` / `.btn-mana` / `.text-glow` / `.glitch` /
   `.sl-*` utility classes.
2. **JS palette** — [`src/theme/palette.ts`](src/theme/palette.ts) mirrors those
   values for the many components that compose colors inline in `style={{ … }}`
   (glows, sparkles, gradients) and can't reference CSS vars cleanly. Read it
   through `useTheme().palette` so nothing hardcodes a color literal.

The provider and hook live in
[`src/theme/ThemeContext.tsx`](src/theme/ThemeContext.tsx); the navbar
[`ThemeToggle`](src/components/ThemeToggle.tsx) flips between the two.

**To add or reskin a theme:** add a key to `ThemeName`, fill in its `PALETTES`
entry (colors + per-theme videos), and add a matching `[data-theme="…"]` block in
`index.css`. Both sides must agree.

---

## Performance & accessibility

The site runs a lot of simultaneous animation, so it's tuned to stay smooth:

- **Reduced-motion:** the whole app is wrapped in Framer Motion's
  `<MotionConfig reducedMotion="user">` and a global `prefers-reduced-motion`
  CSS guard, so users with that OS setting get a calm, mostly-static page (and
  the cinematic hero intro is skipped).
- **GPU-friendly animations:** looping effects animate `transform`/`opacity`
  (compositor-only) instead of `box-shadow`/`filter`/`background-position`.
- **Off-screen savings:** background videos pause when not visible, ambient
  particles are FPS-capped, and some decorative loops only run while in view.

---

## Deploy to GitHub Pages

The Vite `base` is set to `/portfolio/` (matching the repo name). If you rename
the repo, update `base` in [`vite.config.ts`](vite.config.ts) **and** `homepage`
in [`package.json`](package.json).

### Option A — automatic CI/CD (recommended)

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

### Option B — one-command deploy

```bash
npm run deploy
```

Then set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root**.

---

## Project structure

```
src/
  animations/     Reusable Framer Motion variants (fade/stagger presets)
  components/     Shared UI (Navbar, ParticleBg, RankBadge, BrandIcons, …)
  data/           content.ts — single source of truth for most content
  theme/          palette.ts (per-theme colors + videos) + ThemeContext
  lib/            Helpers (rank colors, useVideoInView hook)
  sections/       One file per page section (Hero, About, Skills, …)
  App.tsx         Composition root + MotionConfig
  index.css       Tailwind theme tokens, custom classes, keyframes
docs/             Local-only docs (git-ignored) — see TECH_STACK.md
```
