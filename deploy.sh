#!/bin/bash

# GitHub Pages Deployment Script for Jack's Lounge

set -e

echo "🚀 Building Jack's Lounge for Custom Domain (www.jackspizzahyannis.com)..."

# Build frontend with root base path for custom domain
npx vite build --base=/

echo "✅ Build complete! Output in dist/public/"
echo ""
echo "📦 Build contents:"
ls -lh dist/public/

echo ""
echo "To deploy to www.jackspizzahyannis.com:"
echo "1. Build is ready in dist/public/"
echo "2. Push to GitHub: git push origin main"
echo "3. Configure GitHub Pages in repository settings:"
echo "   - Settings > Pages > Source: Deploy from a branch"
echo "   - Branch: gh-pages / (root)"
echo "   - Custom domain: www.jackspizzahyannis.com"
echo ""
echo "The site will be available at: https://www.jackspizzahyannis.com/"
