#!/bin/bash

# Build script for GitHub Pages deployment
# This creates a static build WITHOUT admin panel that connects to Replit backend

set -e

echo "🚀 Building for GitHub Pages (public site only)..."

# Check if Replit URL is configured
if grep -q "YOUR-REPLIT-DEPLOYMENT-URL" client/.env.production.github; then
  echo ""
  echo "⚠️  WARNING: Please update VITE_API_URL in client/.env.production.github"
  echo "    with your actual Replit deployment URL before deploying!"
  echo ""
fi

# Build with GitHub Pages environment variables (inline to avoid leaving .local file).
# The standard build generates every public route from the shared route metadata.
VITE_ENABLE_ADMIN=false VITE_API_URL=$(grep VITE_API_URL client/.env.production.github | cut -d '=' -f2) npm run build

echo ""
echo "✅ Build complete! Output in dist/public/"
echo ""
echo "📦 This build:"
echo "   ✅ Excludes /admin route"
echo "   ✅ Connects to Replit backend for contact form"
echo "   ✅ Ready for www.jackspizzahyannis.com"
echo ""
echo "📁 Cleaning old build artifacts from docs/..."
rm -rf docs/assets
mkdir -p docs

echo "📋 Copying new build to docs/..."
cp -r dist/public/* docs/

echo "🔗 Route-specific HTML was generated from shared/site.ts."

echo ""
echo "✅ GitHub Pages deployment ready!"
echo ""
echo "Next steps:"
echo "1. Review changes: git status"
echo "2. Commit and push: git add docs && git commit -m 'Deploy updates' && git push"
