---
name: syncing-portfolio-from-cv
description: Use when the AI/ML CV or fullstack CV changed and the portfolio website must reflect it, when the user asks to sync/update the site or portfolio from a CV, when the site's downloadable CV PDF needs regenerating, or right after updating-ai-ml-cv or updating-fullstack-cv finishes
---

# Syncing the Portfolio from the CV

## Overview

Two local-only CVs (`docs/` is gitignored — no `git diff` on them):

| CV | Path | Role on site |
|---|---|---|
| **AI/ML (primary)** | `docs/cv-variants/ai-ml/ahad_cv_ai_ml.html` | Default source. Whole-CV sync. Builds the download PDF. |
| Fullstack (secondary) | `docs/cv-variants/fullstack/ahad_cv_fullstack.html` | **Only items the user names.** Never whole-CV sync, never builds the PDF. |

The site must show the same facts, in the site's own format. Sync = compare the **whole AI/ML CV** against the site (not only latest changes), plus any fullstack items the user explicitly named, apply missing items, regenerate the PDF from AI/ML, build.

## Which CV to read

- "Sync the portfolio" / after `updating-ai-ml-cv` → AI/ML only.
- User names fullstack items ("from fullstack CV add X", "take the Volue bullets from fullstack") → AI/ML sync **plus** exactly those named items from fullstack.
- After `updating-fullstack-cv`, with no item named → take the change list from that skill's report in this conversation and ask: "Push any of these fullstack changes to the site? <list>". Default: none. No report in context → ask the user which items. This path edits only the chosen items: no AI/ML sync, no PDF rebuild, no snapshot (unless the user also asks to sync).
- Named fullstack item already on site with same facts → report "already on site", change nothing.
- Same item differs between CVs → AI/ML version wins, unless the user named the fullstack version for it. Ambiguous → ask.
- Site has fullstack-sourced content not in AI/ML CV → it was put there on purpose. Keep it; never remove as "site-only".

## Where things live

| CV section | Site file → symbol | Notes |
|---|---|---|
| Skills | `src/data/content.ts` → `skills[]` **and** `src/sections/Skills.tsx` → `CATEGORIES[].names` | A skill in `skills[]` but not in `CATEGORIES` is invisible. Names are often combined (`"PostgreSQL / MySQL"`), so a CV skill may already be covered. |
| Certifications | `src/sections/Certifications.tsx` → `CERTIFICATIONS[]` | Ordering rule below. |
| Projects + Experience feature bullets | `src/data/content.ts` → `projects[]` (`blurb`, `highlights[]`, `tech[]`) | ATS / Team Task Summarizer / Volue are site *projects* sourced from CV *experience* bullets. Update both `blurb` and the matching `highlights` entry. |
| Experience roles | `content.ts` → `experience[]` (role, org, `period` with em dash `—`) | Site has extra roles (Trainee) and different dates than CV. **Never overwrite** a mismatch; report it and ask. |
| Whole AI/ML CV | `public/cv/Md_Ahadul_Haque_CV.pdf` | Hero "Download CV" button (`Hero.tsx`, `content.ts` `cvPath`). Regenerate from AI/ML on every sync. Keep filename. |

## Certification ordering (user-set rule)

1. `"Claude Certified Architect - Foundations"` stays at index 0, always.
2. Every other cert, including other Anthropic/Claude certs, goes newest-first by `date` (DD/MM/YYYY).

Example: new AWS cert dated 08/11/2026 → index 1, not index 0.

The CV does NOT use this rule; CV certs stay strictly newest-first.

**Fields for a new cert:** copy from a sibling with the same issuer/category.

| Issuer | issuerColor | | Category | categoryColor | Icon |
|---|---|---|---|---|---|
| Anthropic | `#a855f7` | | AI | `#c084fc` | `Sparkles` |
| Udemy | `#f97316` | | BACKEND | `#4ade80` | `Server` |
| Secureflag | `#f43f5e` | | SECURITY | `#f43f5e` | `Lock`/`ShieldCheck` |
| | | | FRONTEND | `#38bdf8` | `Code2` |

New issuer/category → choose a color + lucide icon (add to the import), and list it as a proposed value. `rank`: SS only for the Claude Architect cert; `glow: true` only for flagship AI certs.

## Workflow

1. **Diff the whole AI/ML CV (+ named fullstack items) against the site**, section by section, using the table above. Build a list: *missing on site*, *different on site*, *site-only*. Match fuzzily (combined names, `&` vs `and`, `–` vs `-`).
2. **Show the list and ask** in one message:
   - which *missing* items to add (default: all);
   - values the CV doesn't have: skill `rank`/`value`, cert `rank`/category. Give a proposed value for each.
   - *different*/*site-only* items: keep site version, or take the CV version?
   If the user already said "just do it":
   - **Certs, project facts (metrics, bullets, tech):** apply every *missing* item, using the proposed values. List each one as "proposed — change?".
   - **Skills:** the site grid is a curated subset, so most CV-only skills stay off it. Auto-add only skills that are **new in the AI/ML CV since the last sync**: `diff -u docs/cv-variants/.last-sync/ahad_cv_ai_ml.html docs/cv-variants/ai-ml/ahad_cv_ai_ml.html` (no snapshot yet → treat none as new). List other CV-only skills under "not on site — add any?".
   - **Different / site-only items:** leave unchanged and list them.
   - **CV items with no site home** (e.g. experience bullets that aren't a site project): skip them and name them once in the report.
3. **Edit** with targeted edits. Keep site wording style: `highlights` are short `{ label, text }`; site-only content (sports, hero stats, about) is untouched.
4. **PDF:** `bash .claude/skills/syncing-portfolio-from-cv/build-cv-pdf.sh` — always from AI/ML (script default; never pass the fullstack file). A4, largest zoom that fits 2 pages. Exit 2 means it can't fit 2 pages; tell the user, don't trim the CV.
5. **Verify:** `npm run build` and `npx eslint <changed files>` both pass, then `graphify update .`.
6. **Snapshot** after a successful sync: `mkdir -p docs/cv-variants/.last-sync && cp docs/cv-variants/ai-ml/ahad_cv_ai_ml.html docs/cv-variants/.last-sync/`.
7. **Report:** changes per file, labeled by source CV (AI/ML / fullstack), proposed values, skipped mismatches, PDF zoom/pages. Don't commit unless asked.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Syncing only the latest CV change | Diff the whole AI/ML CV; older gaps count too |
| Whole-CV sync from fullstack | Fullstack = only items the user names |
| Building PDF from fullstack CV | Download PDF is always AI/ML |
| Removing fullstack-sourced site content as "site-only" | Keep it; user put it there |
| `git diff` on a CV file | `docs/` is gitignored; diff against `.last-sync/` snapshot |
| Skill added to `skills[]` only | Also add it to `Skills.tsx` `CATEGORIES` |
| Newest cert placed at index 0 | Claude Architect stays at 0; others by date |
| "Fixing" site experience dates to match the CV | Report the mismatch; the user decides |
| Picking a PDF zoom by hand | Use the script |
| Silent guesses for rank/value | Propose and label them |
