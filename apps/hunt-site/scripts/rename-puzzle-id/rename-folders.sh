#!/usr/bin/env bash
# Rename puzzle leaf directories to match new slugs from renaming.txt.
#
# Usage:
#   ./rename-folders.sh # dry-run
#   ./rename-folders.sh --apply   # git mv

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HUNT_SITE="$(cd "${SCRIPT_DIR}/../.." && pwd)"
GIT_ROOT="$(git -C "$HUNT_SITE" rev-parse --show-toplevel)"
CSV="${HUNT_SITE}/scripts/rename-puzzle-id/renaming.csv"
PUZZLE_ROOT="${HUNT_SITE}/src/app/(hunt)/puzzle"

DRY_RUN=1
[[ "${1:-}" == "--apply" ]] && DRY_RUN=0

[[ -f "$CSV" ]] || { echo "Missing $CSV" >&2; exit 1; }
[[ -d "$PUZZLE_ROOT" ]] || { echo "Missing $PUZZLE_ROOT" >&2; exit 1; }

mapfile -t pairs < <(python3 - "$CSV" <<'PY'
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

for pair in "${pairs[@]}"; do
  old_id="${pair%%$'\t'*}"
  new_id="${pair#*$'\t'}"

  count=0
  old_path=""
  while IFS= read -r candidate; do
    count=$((count + 1))
    old_path="$candidate"
  done < <(find "$PUZZLE_ROOT" -mindepth 2 -maxdepth 2 -type d -name "$old_id")

  [[ "$count" -eq 1 ]] || { echo "ERROR: expected exactly one dir for '$old_id', found $count" >&2; exit 1; }

  new_path="$(dirname "$old_path")/$new_id"
  [[ ! -e "$new_path" ]] || { echo "ERROR: exists: $new_path" >&2; exit 1; }

  old_rel="${old_path#$GIT_ROOT/}"
  new_rel="${old_rel%/*}/$new_id"

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "DRY-RUN: git -C $(printf '%q' "$GIT_ROOT") mv $(printf '%q' "$old_rel") $(printf '%q' "$new_rel")"
  else
    git -C "$GIT_ROOT" mv -- "$old_rel" "$new_rel"
    echo "OK: $old_id -> $new_id"
  fi
done

[[ "$DRY_RUN" -eq 1 ]] && echo "Dry run only. Re-run with --apply."
