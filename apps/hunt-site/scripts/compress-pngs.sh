#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 <folder>"
  exit 1
fi

ROOT="$1"

# macOS-compatible CPU count
if command -v nproc >/dev/null 2>&1; then
  JOBS="$(nproc)"
else
  JOBS="$(sysctl -n hw.ncpu)"
fi

find "$ROOT" -type f -iname '*.png' -print0 |
  xargs -0 -P "$JOBS" -I{} bash -c '
    file="$1"
    echo "Compressing: $file"
    pngquant --speed 1 --force --ext .png "$file" &&
    oxipng -o 6 -asr "$file"
  ' _ {}

echo "Done."