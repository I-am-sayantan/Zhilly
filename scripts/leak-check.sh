#!/usr/bin/env bash
# Fails if a tracked file holds an ID or key that belongs in GitHub Secrets (README "Secrets and variables").
# Run from the repo root: bash scripts/leak-check.sh
set -u -o pipefail
skip=(':!*package-lock.json' ':!*.jpg' ':!*.jpeg' ':!*.png' ':!*.webp' ':!*.avif' ':!*.gif' ':!*.ico' ':!*.svg' ':!*.woff2')
# GTM, GA4, Turnstile site key, 32-hex keys (IndexNow), Cloudflare/Resend/GitHub/Google tokens, private keys, UUIDs (D1 id)
pat='GTM-[A-Z0-9]{5,}|\bG-[A-Z0-9]{8,}\b|0x4A{3}|\b[0-9a-fA-F]{32}\b|\bcf(ut|at|k)_[A-Za-z0-9]{10,}|\bre_[A-Za-z0-9]{16,}|\bgh[pousr]_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{20,}|AIza[0-9A-Za-z_-]{35}|BEGIN [A-Z ]*PRIVATE KEY|[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
# file names only, with 32-hex runs and UUIDs redacted, so a hit never prints a value into the CI log
redact() { sed -E 's/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/<uuid>/g; s/[0-9a-fA-F]{32}/<32-hex>/g'; }
fail=0
if git grep -IlE "$pat" -- . "${skip[@]}" | redact; then fail=1; fi
if git ls-files | grep -E "$pat" | redact; then fail=1; fi
if [ $fail = 1 ]; then echo "Leak check failed: the files above hold an ID or key. Move it to a GitHub secret." >&2; exit 1; fi
echo "Leak check passed."
