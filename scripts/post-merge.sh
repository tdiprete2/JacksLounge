#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Reinstall only when the dependency manifests differ from the last successful
# setup. Keep the marker in node_modules, not in version control.
manifest_hash="$(sha256sum package.json package-lock.json | sha256sum | cut -d ' ' -f 1)"
marker="node_modules/.post-merge-manifests"
if [[ ! -f "$marker" ]] || [[ "$(cat "$marker")" != "$manifest_hash" ]]; then
  npm ci --no-audit --no-fund
  printf '%s\n' "$manifest_hash" > "$marker"
fi

npm run check
npm test
npm run build
npm run test:menu-build

# Do not publish or run automatic database migrations here. Those require
# separate approval; this hook only prepares and verifies the merged workspace.
