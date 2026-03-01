#!/usr/bin/env bash
set -euo pipefail

echo "Scanning tracked files for potential secrets..."

PATTERNS=(
  'AKIA[0-9A-Z]{16}'
  'ghp_[A-Za-z0-9]{36}'
  'xox[baprs]-[A-Za-z0-9-]{10,}'
  'sk_live_[A-Za-z0-9]{16,}'
  'pk_live_[A-Za-z0-9]{16,}'
  'BEGIN [A-Z ]+PRIVATE KEY'
  'OPTMO_ANALYTICS_PASSWORD[[:space:]]*=[[:space:]]*['\''"'\''][^'\''"'\'']+['\''"'\'']'
  '(api[_-]?key|secret|token|password)[[:space:]]*[:=][[:space:]]*['\''"'\''][^'\''"'\'']{16,}['\''"'\'']'
)

FOUND=0

for pattern in "${PATTERNS[@]}"; do
  MATCHES=$(git grep -nE "$pattern" -- \
    ':!README.md' \
    ':!README_NEW.md' \
    ':!POCKETBASE_SETUP.md' \
    ':!SETUP_SUMMARY.md' \
    ':!js/private-config.example.js' \
    ':!scripts/scan_secrets.sh' \
    ':!pb_data/types.d.ts' \
    ':!*.md' || true)

  if [[ -n "$MATCHES" ]]; then
    echo "$MATCHES"
    FOUND=1
  fi
done

if [[ "$FOUND" -eq 1 ]]; then
  echo ""
  echo "Potential sensitive strings found. Review before commit."
  exit 1
fi

echo "No obvious secrets found in tracked source files."
