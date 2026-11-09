---
name: syncing-portfolio-from-cv
description: Use when docs/ahad_cv.html changed and the portfolio website must reflect it, when the user asks to sync/update the site or portfolio from the CV, or right after the updating-cv skill finishes
---

# Syncing the Portfolio from the CV

## Overview

`docs/ahad_cv.html` is the source of truth. The site must show the same facts, in the site's own format. Sync = compare the **whole** CV against the site (not only the last commit), apply missing items, regenerate the downloadable PDF, build.

## Where things live

| CV section | Site file → symbol | Notes |
|---|---|---|
| Skills | `src/data/content.ts` → `skills[]` **and** `src/sections/Skills.tsx` → `CATEGORIES[].names` | A skill in `skills[]` but not in `CATEGORIES` is invisible. Names are often combined (`"PostgreSQL / MySQL"`), so a CV skill may already be covered. |
| Certifications | `src/sections/Certifications.tsx` → `CERTIFICATIONS[]` | Ordering rule below. |
| Projects + Experience feature bullets | `src/data/content.ts` → `projects[]` (`blurb`, `highlights[]`, `tech[]`) | ATS / Team Task Summarizer / Volue are site *projects* sourced from CV *experience* bullets. Update both `blurb` and the matching `highlights` entry. |
| Experience roles | `content.ts` → `experience[]` (role, org, `period` with em dash `—`) | Site has extra roles (Trainee) and different dates than CV. **Never overwrite** a mismatch; report it and ask. |
| Whole CV | `public/cv/Md_Ahadul_Haque_CV.pdf` | Regenerate with the script below on every sync. |

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

1. **Diff the whole CV against the site**, section by section, using the table above. Build a list: *missing on site*, *different on site*, *site-only*. Match fuzzily (combined names, `&` vs `and`, `–` vs `-`).
2. **Show the list and ask** in one message:
   - which *missing* items to add (default: all);
   - values the CV doesn't have: skill `rank`/`value`, cert `rank`/category. Give a proposed value for each.
   - *different*/*site-only* items: keep site version, or take the CV version?
   If the user already said "just do it":
   - **Certs, project facts (metrics, bullets, tech):** apply every *missing* item, using the proposed values. List each one as "proposed — change?".
   - **Skills:** the site grid is a curated subset, so most CV-only skills stay off it. Auto-add only skills that are **new in the CV since the last sync**: `git log -1 --format=%H -- public/cv/Md_Ahadul_Haque_CV.pdf` gives the last sync commit, then `git diff <that>..HEAD -- docs/ahad_cv.html` plus any uncommitted CV diff. List other CV-only skills under "not on site — add any?".
   - **Different / site-only items:** leave unchanged and list them.
   - **CV items with no site home** (e.g. experience bullets that aren't a site project): skip them and name them once in the report.
3. **Edit** with targeted edits. Keep site wording style: `highlights` are short `{ label, text }`; site-only content (sports, hero stats, about) is untouched.
4. **PDF:** `bash .claude/skills/syncing-portfolio-from-cv/build-cv-pdf.sh` (A4, largest zoom that fits 2 pages). Exit 2 means it can't fit 2 pages; tell the user, don't trim the CV.
5. **Verify:** `npm run build` and `npx eslint <changed files>` both pass, then `graphify update .`.
6. **Report:** changes per file, proposed values, skipped mismatches, PDF zoom/pages. Don't commit unless asked.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Syncing only the latest CV commit | Diff the whole CV; older gaps count too |
| Skill added to `skills[]` only | Also add it to `Skills.tsx` `CATEGORIES` |
| Newest cert placed at index 0 | Claude Architect stays at 0; others by date |
| "Fixing" site experience dates to match the CV | Report the mismatch; the user decides |
| Picking a PDF zoom by hand | Use the script |
| Silent guesses for rank/value | Propose and label them |
