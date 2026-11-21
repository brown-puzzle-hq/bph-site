#!/usr/bin/env bash
# Rename files whose filename contains an old puzzle id.
#
# Usage:
#   ./rename-files.sh # dry-run
#   ./rename-files.sh --apply  # rename

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HUNT_SITE="$(cd "${SCRIPT_DIR}/../.." && pwd)"
GIT_ROOT="$(git -C "$HUNT_SITE" rev-parse --show-toplevel)"
if [[ "$HUNT_SITE" == "$GIT_ROOT" ]]; then
  PREFIX=""
else
  PREFIX="${HUNT_SITE#$GIT_ROOT/}/"
fi

CSV_PATH="${SCRIPT_DIR}/renaming.csv"
DRY_RUN=1
[[ "${1:-}" == "--apply" ]] && DRY_RUN=0

[[ -f "$CSV_PATH" ]] || { echo "Missing $CSV_PATH" >&2; exit 1; }

# Emit tab-separated old_id/new_id pairs (csv-safe; supports quoted values).
mapfile -t pairs < <(python3 - "$CSV_PATH" <<'PY'
import csv, sys
with open(sys.argv[1], newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        old_id = (row.get("old id") or "").strip()
        new_id = (row.get("new id") or "").strip()
        if not old_id or not new_id or old_id == new_id:
            continue
        print(f"{old_id}\t{new_id}")
PY
)

rename_one() {
  local src="$1" dst="$2"

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "DRY-RUN: $(printf '%q' "$src") -> $(printf '%q' "$dst")"
    return 0
  fi

  # Prefer git mv if tracked; otherwise mv.
  if git -C "$GIT_ROOT" ls-files --error-unmatch -- "$src" >/dev/null 2>&1; then
    git -C "$GIT_ROOT" mv -- "$src" "$dst"
  else
    mv -- "$src" "$dst"
  fi
}

# We scan once per mapping. It's fine at this scale (17 rows).
for pair in "${pairs[@]}"; do
  old_id="${pair%%$'\t'*}"
  new_id="${pair#*$'\t'}"

  # Find files anywhere under apps/hunt-site where the *filename* contains old_id.
  # Skip node_modules and .next.
  while IFS= read -r -d '' abs_path; do
    base="$(basename "$abs_path")"
    dir="$(dirname "$abs_path")"
    new_base="${base//"$old_id"/"$new_id"}"
    [[ "$new_base" != "$base" ]] || continue

    abs_new="$dir/$new_base"
    [[ ! -e "$abs_new" ]] || { echo "ERROR: target exists: $abs_new" >&2; exit 1; }

    # Convert absolute paths to git-root-relative for git mv.
    rel_src="${abs_path#$GIT_ROOT/}"
    rel_dst="${abs_new#$GIT_ROOT/}"

    rename_one "$rel_src" "$rel_dst"
  done < <(
    find "$HUNT_SITE" \
      -type d \( -name node_modules -o -name .next \) -prune -o \
      -type f -name "*${old_id}*" -print0
  )
done

[[ "$DRY_RUN" -eq 1 ]] && echo "Dry run only. Re-run with --apply."
