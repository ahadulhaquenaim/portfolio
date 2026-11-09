#!/usr/bin/env bash
# Render docs/ahad_cv_main.html -> public/cv/Md_Ahadul_Haque_CV.pdf (A4).
# Picks the largest zoom (1.00 down to 0.80) that fits MAX_PAGES (default 2).
# Usage (from repo root): bash .claude/skills/syncing-portfolio-from-cv/build-cv-pdf.sh [repo_root] [max_pages]
set -euo pipefail
ROOT="${1:-$PWD}"
MAX_PAGES="${2:-2}"
SRC="$ROOT/docs/ahad_cv_main.html"
OUT="$ROOT/public/cv/Md_Ahadul_Haque_CV.pdf"
CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || true)"
[ -n "$CHROME" ] || { echo "ERROR: no Chrome/Chromium found" >&2; exit 1; }
[ -f "$SRC" ] || { echo "ERROR: $SRC missing" >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf -- "${TMP:?}"' EXIT

for Z in 1.00 0.95 0.90 0.85 0.80; do
  sed "s#</style>#@page { size: A4; margin: 12mm 0; } @media print { .page { padding-top: 2mm !important; padding-bottom: 0 !important; } li, .entry-top, h2 { break-inside: avoid; } .entry-top, .entry-org, .entry-tools, h2 { break-after: avoid; } } html { zoom: $Z; }</style>#" "$SRC" > "$TMP/cv.html"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --user-data-dir="$TMP/profile" --print-to-pdf="$TMP/cv.pdf" "file://$TMP/cv.html" >/dev/null 2>&1
  PAGES="$(pdfinfo "$TMP/cv.pdf" | awk '/^Pages:/{print $2}')"
  if [ "$PAGES" -le "$MAX_PAGES" ]; then
    mkdir -p "$(dirname "$OUT")"
    cp "$TMP/cv.pdf" "$OUT"
    echo "OK: $OUT  zoom=$Z  pages=$PAGES"
    exit 0
  fi
done
echo "FAIL: CV does not fit $MAX_PAGES pages even at zoom 0.80 (last: $PAGES pages). PDF not written." >&2
exit 2
