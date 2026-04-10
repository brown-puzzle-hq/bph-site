#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CSV_PATH="${SCRIPT_DIR}/renaming.csv"
OUT_PATH="${SCRIPT_DIR}/rename-db.sql"

[[ -f "$CSV_PATH" ]] || { echo "Missing $CSV_PATH" >&2; exit 1; }

python3 - "$CSV_PATH" "$OUT_PATH" <<'PY'
import csv
import sys
from pathlib import Path

csv_path = Path(sys.argv[1])
out_path = Path(sys.argv[2])

fk_tables = [
    "hunt_site_unlock",
    "hunt_site_solve",
    "hunt_site_guess",
    "hunt_site_hint",
    "hunt_site_erratum",
    "hunt_site_answer_token",
]

def sql_quote(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"

lines: list[str] = []
lines.append("-- Renames puzzle primary keys and repoints FKs")
lines.append("")

with csv_path.open(newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    required = {"old id", "new id", "new title"}
    if not required.issubset(reader.fieldnames or set()):
        missing = ", ".join(sorted(required - set(reader.fieldnames or [])))
        raise SystemExit(f"renaming.csv missing required columns: {missing}")

    for row in reader:
        old_id = (row.get("old id") or "").strip()
        new_id = (row.get("new id") or "").strip()
        new_title = (row.get("new title") or "").strip()
        if not old_id or not new_id:
            continue
        if not new_title:
            new_title = new_id

        lines.append(f"-- {old_id} -> {new_id}")
        lines.append("INSERT INTO hunt_site_puzzle (id, name, answer)")
        lines.append(
            "SELECT "
            f"{sql_quote(new_id)}, {sql_quote(new_title)}, answer "
            f"FROM hunt_site_puzzle WHERE id = {sql_quote(old_id)};"
        )
        for table in fk_tables:
            lines.append(
                f"UPDATE {table} SET puzzle_id = {sql_quote(new_id)} "
                f"WHERE puzzle_id = {sql_quote(old_id)};"
            )
        lines.append(f"DELETE FROM hunt_site_puzzle WHERE id = {sql_quote(old_id)};")
        lines.append("")


out_path.write_text("\n".join(lines), encoding="utf-8")
print(f"Wrote {out_path}")
PY
