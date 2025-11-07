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

# Build with GitHub Pages environment
cp client/.env.production.github client/.env.production.local
npx vite build --base=/

echo ""
echo "✅ Build complete! Output in dist/public/"
echo ""
echo "📦 This build:"
echo "   ✅ Excludes /admin route"
echo "   ✅ Connects to Replit backend for contact form"
echo "   ✅ Ready for www.jackspizzahyannis.com"
echo ""
echo "Next steps:"
echo "1. Publish Replit deployment first (click Publish button)"
echo "2. Update VITE_API_URL in client/.env.production.github with Replit URL"
echo "3. Rebuild with this script"
echo "4. Deploy to GitHub Pages: cp -r dist/public docs && git push"
