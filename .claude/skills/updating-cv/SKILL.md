---
name: updating-cv
description: Use when the user shares a new skill, certification, job, project, achievement, award, or education change and wants their CV or resume updated, or mentions docs/ahad_cv.html
---

# Updating the CV

## Overview

`docs/ahad_cv.html` is the single source of truth for Ahad's CV (and, later, the portfolio site). Every update is a small, targeted edit that matches the existing HTML conventions exactly, records only facts the user stated, and is verified by rendering.

## Workflow

1. **Read** `docs/ahad_cv.html` fully. Map each piece of user input to a section (table below).
2. **Duplicate check — every item, before any edit.** Search the whole CV (all sections, case-insensitive, incl. aliases like "Postgres"/"PostgreSQL", "K8s"/"Kubernetes", "Claude Code"/"Claude Code (Agentic Coding)") for each item the user gave. Classify each:
   - **Exact duplicate** (same skill / cert / project / bullet meaning already present) → don't add. Report "already in CV: <section> → <existing text>".
   - **Partial match** (same thing, new info: newer date, real link, metric, extra detail) → treat as an *update* of the existing entry, not a new entry. Ask if it's unclear whether it's the same thing.
   - **New** → continue below.
   Same item in two sections is fine only when roles differ (Skills list vs. a role's Tools line); never twice in the same list.
3. **Check input before editing.** Ask once, in one message, when any of these hold:
   - Impact is vague ("cut time a lot", "improved performance") → ask for a number or concrete before/after. If none exists, write the plain fact without "significantly"/"greatly".
   - A link looks like a placeholder (`abc123`, `xxx`, `example.com`, ID shorter than siblings) → ask for the real link.
   - Role, date, issuer, or company is ambiguous.
   Anything clear → edit now; don't block clear items on unclear ones.
4. **Edit** with targeted `Edit` calls. Never rewrite the file.
5. **Verify** (commands below): HTML still parses, page count compared to before.
6. **Report** a short changelog: section → exact text added/changed, duplicates skipped, plus every *inferred* addition labeled "inferred — remove?".

## Section Conventions

| Section | Markup | Rules |
|---|---|---|
| Skills | `<li><strong>Category:</strong> a, b, c</li>` in `.skills-list` | Append to best-fit existing category; new category only if none fits. No duplicates (check case-insensitively, incl. aliases like "Postgres"/"PostgreSQL"). |
| Experience | `.entry` → `.entry-top` (title + date), `.entry-org`, optional `.entry-tools`, `.entry-list` | Newest role first. Dates `Month YYYY – Present`. Bullet = action verb + what + result. Feature-level items may use `<strong>Name:</strong>` lead. |
| Tools line | `<div class="entry-tools"><strong>Tools:</strong> …</div>` | Add a tool only when the user says it was used in *that* role. |
| Projects | `.project` → `.project-header` (title-line with `<span>` + link, `.project-year`), `.project-tags` of `<span class="tag">`, `.project-list` | Newest first. Title format `Name — Short Descriptor`. 3–4 bullets. |
| Certifications | `<li><strong>Title</strong> – Issuer &nbsp;\|&nbsp; Date: DD/MM/YYYY &nbsp;\|&nbsp; <a href="URL">Link</a></li>` | Newest first by date. Resolve relative dates ("yesterday") against today. |
| Education | `.edu-row` block | Rarely changes; copy existing block structure. |
| Awards | `.award-list` (CSS exists, no section yet) | When first award arrives, add `<!-- AWARDS -->` section after Certifications using same `.section` / `.section-title` pattern. |

**HTML:** escape `&` as `&amp;` in text. Use en dash `–` for ranges and the `–` separator in certs; em dash `—` in project titles. Match surrounding 2-space indentation.

## Scope Rules

- Add exactly what the user stated. Inferred extras (e.g. adding "WebSockets" to Skills because a bullet mentions it) are allowed only if listed in the report as inferred.
- Never invent metrics, team sizes, dates, or links.
- Don't reorder, reword, or "fix" existing content unless asked. Report suspected issues (e.g. overlapping dates) instead.
- Don't touch the portfolio site (`src/`) in this skill. After reporting, offer to sync the site: **REQUIRED SUB-SKILL:** syncing-portfolio-from-cv.

## Verify

```bash
S=$(mktemp -d)
google-chrome --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=$S/before.pdf "file://$PWD/docs/ahad_cv.html"   # run BEFORE editing
# ...edit...
google-chrome --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=$S/after.pdf "file://$PWD/docs/ahad_cv.html"
pdfinfo $S/before.pdf | grep Pages; pdfinfo $S/after.pdf | grep Pages
python3 -c "import html.parser,sys;html.parser.HTMLParser().feed(open('docs/ahad_cv.html').read())"
git diff --stat docs/ahad_cv.html
```

Page count grew → tell the user (don't trim on your own). `git diff` must show only intended lines.

## Common Mistakes

| Mistake | Fix |
|---|---|
| "Significantly reduced…" to paper over vague impact | Ask for the number; else state plain fact |
| Using an obviously fake link as given | Ask for real link before adding |
| Silently adding related tech to Skills/Tools | Allowed only if reported as inferred |
| Adding item already in CV (maybe worded differently) | Run duplicate check first; update existing entry instead |
| Cert appended at bottom | List is newest-first; insert by date |
| Raw `&` in text | `&amp;` |
