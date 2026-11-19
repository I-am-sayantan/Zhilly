#!/usr/bin/env bash
# Fails if a tracked file holds an ID or key that belongs in GitHub Secrets (README "Secrets and variables").
# Run from the repo root: bash scripts/leak-check.sh
set -u
skip=(':!*package-lock.json' ':!*.jpg' ':!*.jpeg' ':!*.png' ':!*.webp' ':!*.avif' ':!*.gif' ':!*.ico' ':!*.svg' ':!*.woff2')
# GTM, GA4, Turnstile site key, 32-hex keys (IndexNow), Cloudflare/Resend/GitHub tokens, private keys
pat='GTM-[A-Z0-9]{5,}|\bG-[A-Z0-9]{8,}\b|0x4A{3}|\b[0-9a-fA-F]{32}\b|\bcfut_[A-Za-z0-9]{10,}|\bre_[A-Za-z0-9]{16,}|\bgh[po]_[A-Za-z0-9]{20,}|BEGIN [A-Z ]*PRIVATE KEY'
uuid='[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
fail=0
# file names only, so a hit never prints the value into the CI log
if git grep -IlE "$pat" -- . "${skip[@]}"; then fail=1; fi
if git ls-files | grep -E "$pat"; then fail=1; fi
if git grep -IlE "$uuid" -- '*wrangler*.toml'; then fail=1; fi
if [ $fail = 1 ]; then echo "Leak check failed: the files above hold an ID or key. Move it to a GitHub secret." >&2; exit 1; fi
echo "Leak check passed."
