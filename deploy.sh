#!/bin/bash

# GitHub Pages Deployment Script for Jack's Lounge

set -e

echo "🚀 Building Jack's Lounge for GitHub Pages..."

# Build frontend with GitHub Pages base path (from project root)
npx vite build --base=/JacksLounge/

echo "✅ Build complete! Output in dist/public/"
echo ""
echo "📦 Build contents:"
ls -lh dist/public/

echo ""
echo "To deploy manually:"
echo "1. Commit the GitHub Actions workflow: git add .github/workflows/deploy.yml"
echo "2. Push to GitHub: git push origin main"
echo "3. Enable GitHub Pages in repository settings (Settings > Pages > Source: GitHub Actions)"
echo ""
echo "The site will be available at: https://tdiprete2.github.io/JacksLounge/"
