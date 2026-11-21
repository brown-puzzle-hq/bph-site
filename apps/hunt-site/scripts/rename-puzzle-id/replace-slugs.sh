#!/usr/bin/env bash
# Replace old puzzle slugs (IDs) in tracked text files.

# Usage:
#   ./replace-slugs.sh           # dry-run
#   ./replace-slugs.sh --apply   # edit in place
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HUNT_SITE="$(cd "${SCRIPT_DIR}/../.." && pwd)"
GIT_ROOT="$(git -C "$HUNT_SITE" rev-parse --show-toplevel)"
if [[ "$HUNT_SITE" == "$GIT_ROOT" ]]; then
  PREFIX=""
else
  PREFIX="${HUNT_SITE#$GIT_ROOT/}/"
fi
CSV="${HUNT_SITE}/scripts/rename-puzzle-id/renaming.csv"

DRY_RUN=1
[[ "${1:-}" == "--apply" ]] && DRY_RUN=0

[[ -f "$CSV" ]] || { echo "Missing $CSV" >&2; exit 1; }

BLUE=$'\033[34m'
RESET=$'\033[0m'

# Files that match any of these globs will NOT be highlighted
NOT_HIGHLIGHT_GLOBS=(
  "*/server.ts"
  "*/data.tsx"
  "*/puzzle-locations.json"
)

should_highlight_file() {
  local file="$1"
  local glob
  for glob in "${NOT_HIGHLIGHT_GLOBS[@]}"; do
    if [[ "$file" == $glob ]]; then
      return 1 # no highlight
    fi
  done
  return 0 # highlight
}

replace_file() {
  local file="$1" old_text="$2" new_text="$3"
  [[ -z "$old_text" || "$old_text" == "$new_text" ]] && return 0
  grep -Fq -- "$old_text" "$file" 2>/dev/null || return 0

  local pretty_file="$file"
  if should_highlight_file "$file"; then
    pretty_file="${BLUE}${file}${RESET}"
  fi
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "Would edit: $pretty_file ($old_text -> $new_text)"
  else
    PUZZLE_OLD="$old_text" PUZZLE_NEW="$new_text" perl -i -pe \
      's/\Q$ENV{PUZZLE_OLD}\E/$ENV{PUZZLE_NEW}/g' "$file"
  fi
}

mapfile -t files < <(git -C "$GIT_ROOT" ls-files -- "${PREFIX}" | sed "s|^|$GIT_ROOT/|")

for file in "${files[@]}"; do
  [[ -f "$file" ]] || continue
  # Don't rewrite the renaming scripts/CSV themselves.
  if [[ "$file" == "$GIT_ROOT/${PREFIX}scripts/rename-puzzle-id/"* ]]; then
    continue
  fi
  if ! LC_ALL=C grep -Iq . "$file"; then
    continue
  fi

  while IFS=$'\t' read -r old_id new_id _ _; do
    replace_file "$file" "$old_id" "$new_id"
  done < <(
    python3 - "$CSV" <<'PY'
import csv, sys
with open(sys.argv[1], newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(
            "\t".join(
                [
                    row.get("old id", ""),
                    row.get("new id", ""),
                    "",
                    "",
                ]
            )
        )
PY
  )
done

[[ "$DRY_RUN" -eq 1 ]] && echo "Dry run only. Re-run with --apply."
