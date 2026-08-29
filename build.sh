#!/usr/bin/env bash
# Build VIDHI (Twine / SugarCube) with Tweego.
set -e

TWEEGO="${TWEEGO:-$HOME/tweego/tweego}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
SRC="$ROOT/game"
OUTDIR="$ROOT/dist"
OUT="$OUTDIR/index.html"

if [ ! -x "$TWEEGO" ]; then
  echo "tweego not found at $TWEEGO   set TWEEGO=/path/to/tweego" >&2
  exit 1
fi

mkdir -p "$OUTDIR"
# only feed tweego the source subfolders (never the whole repo / output dir)
"$TWEEGO" -f sugarcube-2 -o "$OUT" \
  "$SRC/_story.twee" "$SRC/boot.twee" \
  "$SRC/css" "$SRC/js" "$SRC/systems" "$SRC/days"

# static assets   kept OUTSIDE game/ so tweego never sees them; copied next to
# the compiled HTML so `images/...` URLs resolve at runtime.
rm -rf "$OUTDIR/images"
cp -r "$ROOT/images" "$OUTDIR/images"
find "$OUTDIR/images" -name '.DS_Store' -delete 2>/dev/null || true

echo "built -> $OUT"

if command -v node >/dev/null 2>&1; then
  node "$ROOT/tools/linkcheck.js" "$SRC" || true
fi
