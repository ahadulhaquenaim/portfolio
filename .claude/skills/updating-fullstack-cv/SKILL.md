---
name: updating-fullstack-cv
description: Use when the user wants their fullstack, full-stack, web, or software engineer CV/resume updated with a new skill, certification, job, project, achievement, award, or education change, or mentions docs/cv-variants/fullstack/ahad_cv_fullstack.html
---

# Updating the Fullstack CV

## Overview

`docs/cv-variants/fullstack/ahad_cv_fullstack.html` is Ahad's **Fullstack** CV. It is local-only: `docs/` is gitignored, so git cannot diff or restore it. Every update is a small, targeted edit matching existing HTML conventions, records only facts the user stated, and is verified by rendering.

Sibling skill: `updating-ai-ml-cv` edits the AI/ML CV. This skill touches **only** `docs/cv-variants/fullstack/ahad_cv_fullstack.html`.

## Target File

| What | Path |
|---|---|
| This CV | `docs/cv-variants/fullstack/ahad_cv_fullstack.html` |
| Other variant (never edit here) | handled by `updating-ai-ml-cv` |

No role named ("update my CV")? Ask: Fullstack, AI/ML, or both. "Both" → run this skill, then `updating-ai-ml-cv`.

## Role Fit

This CV targets **Fullstack** roles. Emphasis: web apps end to end — frontend (React/Next.js, UI), backend/APIs, databases, DevOps/cloud, performance, product delivery.

- Item fits this role → add it.
- Item also fits AI/ML → add here, then in the report offer: "Also add to AI/ML CV? (`updating-ai-ml-cv`)". Don't edit the other file yourself.
- Item clearly off-role → still add if user asked for this CV; mention it may fit AI/ML CV better.
- Don't reorder, reword, or reframe existing content for the role unless asked.

## Workflow

1. **Backup + baseline** (Verify block, first half) BEFORE any edit.
2. **Read** `docs/cv-variants/fullstack/ahad_cv_fullstack.html` fully. Map each input to a section (table below).
3. **Duplicate check — every item.** Search whole CV case-insensitively, incl. aliases ("Postgres"/"PostgreSQL", "K8s"/"Kubernetes", "Claude Code"/"Claude Code (Agentic Coding)"). Classify:
   - **Exact duplicate** → don't add. Report "already in CV: <section> → <existing text>".
   - **Partial match** (same thing, new info) → update existing entry. Ask if unclear whether same thing.
   - **New** → continue.
4. **Check input.** Ask once, in one message, if: impact vague (ask for number; else plain fact, no "significantly"), link looks placeholder, or role/date/issuer/company ambiguous. Edit clear items now; don't block them on unclear ones.
5. **Edit** with targeted `Edit` calls. Never rewrite the file.
6. **Verify** (second half below).
7. **Report**: section → exact text added/changed, duplicates skipped, inferred additions labeled "inferred — remove?", page-count change, role-fit offer.

## Section Conventions

| Section | Markup | Rules |
|---|---|---|
| Skills | `<li><strong>Category:</strong> a, b, c</li>` in `.skills-list` | Append to best-fit category; new category only if none fits. No duplicates. |
| Experience | `.entry` → `.entry-top` (title + date), `.entry-org`, optional `.entry-tools`, `.entry-list` | Newest first. `Month YYYY – Present`. Bullet = action verb + what + result. |
| Tools line | `<div class="entry-tools"><strong>Tools:</strong> …</div>` | Add tool only if user says it was used in *that* role. |
| Projects | `.project` → `.project-header` (title-line `<span>` + link, `.project-year`), `.project-tags` of `<span class="tag">`, `.project-list` | Newest first; same year → new one above unless user says otherwise. Title `Name — Short Descriptor`. 3–4 bullets built only from user facts — fewer facts → ask for what it does, stack, results, link. |
| Certifications | `<li><strong>Title</strong> – Issuer &nbsp;\|&nbsp; Date: DD/MM/YYYY &nbsp;\|&nbsp; <a href="URL">Link</a></li>` | Newest first by date. User dates read as DD/MM/YYYY (CV format). Resolve relative dates against today. |
| Education | `.edu-row` | Copy existing structure. |
| Awards | `.award-list` (CSS exists) | First award → add `<!-- AWARDS -->` section after Certifications, same `.section`/`.section-title` pattern. |

**HTML:** `&` → `&amp;`. En dash `–` for ranges/cert separator; em dash `—` in project titles. Match 2-space indentation.

## Scope Rules

- Add exactly what user stated. Inferred extras only if reported as inferred.
- Never invent metrics, team sizes, dates, links.
- Report suspected issues (overlapping dates) instead of fixing.
- Don't touch `src/` or the other CV. After reporting, offer portfolio sync: syncing-portfolio-from-cv (check which variant it reads first).

## Verify

Run from repo root.

```bash
F=docs/cv-variants/fullstack/ahad_cv_fullstack.html
S=$(mktemp -d)
cp "$F" $S/before.html                     # BEFORE editing (git can't restore this file)
google-chrome --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=$S/before.pdf "file://$PWD/$F"
# ...edit...
google-chrome --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=$S/after.pdf "file://$PWD/$F"
pdfinfo $S/before.pdf | grep Pages; pdfinfo $S/after.pdf | grep Pages
python3 -c "import html.parser;html.parser.HTMLParser().feed(open('$F').read())"
diff -u $S/before.html "$F"                # must show only intended lines
```

Page count grew → tell user (don't trim). Bad edit → `cp $S/before.html "$F"`.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using `git diff` on the CV | File is gitignored; use backup + `diff -u` |
| Editing both CVs from this skill | Only `docs/cv-variants/fullstack/ahad_cv_fullstack.html`; offer `updating-ai-ml-cv` |
| "Significantly reduced…" for vague impact | Ask for number; else plain fact |
| Fake-looking link used as given | Ask for real link |
| Silently adding related tech | Only if reported as inferred |
| Adding item already present (reworded) | Duplicate check first; update existing |
| Cert appended at bottom | Insert by date, newest first |
| Raw `&` | `&amp;` |
