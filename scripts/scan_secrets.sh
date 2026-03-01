#!/usr/bin/env bash
set -euo pipefail

PATTERN='(api[_-]?key|secret|token|password\s*=|private[._-]?key|BEGIN [A-Z ]+PRIVATE KEY|sk_live|pk_live|AKIA[0-9A-Z]{16})'

echo "Scanning tracked files for potential secrets..."

if git grep -nE "$PATTERN" -- \
  ':!README.md' \
  ':!README_NEW.md' \
  ':!POCKETBASE_SETUP.md' \
  ':!SETUP_SUMMARY.md' \
  ':!scripts/scan_secrets.sh' \
  ':!pb_data/types.d.ts' \
  ':!*.md'
then
  echo ""
  echo "Potential sensitive strings found. Review before commit."
  exit 1
fi

echo "No obvious secrets found in tracked source files."
