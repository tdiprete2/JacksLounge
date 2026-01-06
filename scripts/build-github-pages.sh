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

# Build with GitHub Pages environment variables (inline to avoid leaving .local file)
VITE_ENABLE_ADMIN=false VITE_API_URL=$(grep VITE_API_URL client/.env.production.github | cut -d '=' -f2) npx vite build --base=/

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

echo "🔗 Creating route-specific HTML files for SEO (fixes redirect errors)..."
# Create directories for each route
mkdir -p docs/menu docs/contact docs/story docs/specials docs/pizza docs/wings

# Create route-specific HTML with correct canonical URLs and metadata
# Menu page
cp docs/index.html docs/menu/index.html
sed -i 's#<link rel="canonical" href="https://www.jackspizzahyannis.com" />#<link rel="canonical" href="https://www.jackspizzahyannis.com/menu/" />#g' docs/menu/index.html
sed -i 's#<title>Best Pizza & Wings Hyannis MA | Jack'"'"'s Lounge</title>#<title>Menu - Pizza, Wings, BBQ Ribs | Jack'"'"'s Lounge Hyannis MA</title>#g' docs/menu/index.html

# Contact page
cp docs/index.html docs/contact/index.html
sed -i 's#<link rel="canonical" href="https://www.jackspizzahyannis.com" />#<link rel="canonical" href="https://www.jackspizzahyannis.com/contact/" />#g' docs/contact/index.html
sed -i 's#<title>Best Pizza & Wings Hyannis MA | Jack'"'"'s Lounge</title>#<title>Contact Jack'"'"'s Lounge Hyannis MA | Hours, Location, Phone</title>#g' docs/contact/index.html

# Story page
cp docs/index.html docs/story/index.html
sed -i 's#<link rel="canonical" href="https://www.jackspizzahyannis.com" />#<link rel="canonical" href="https://www.jackspizzahyannis.com/story/" />#g' docs/story/index.html
sed -i 's#<title>Best Pizza & Wings Hyannis MA | Jack'"'"'s Lounge</title>#<title>Our Story - Family Restaurant Since 1963 | Jack'"'"'s Lounge Hyannis</title>#g' docs/story/index.html

# Specials page
cp docs/index.html docs/specials/index.html
sed -i 's#<link rel="canonical" href="https://www.jackspizzahyannis.com" />#<link rel="canonical" href="https://www.jackspizzahyannis.com/specials/" />#g' docs/specials/index.html
sed -i 's#<title>Best Pizza & Wings Hyannis MA | Jack'"'"'s Lounge</title>#<title>Daily Specials \& Updates | Jack'"'"'s Lounge Hyannis MA</title>#g' docs/specials/index.html

echo "   ✅ Created /menu/index.html with correct canonical URL"
echo "   ✅ Created /contact/index.html with correct canonical URL"
echo "   ✅ Created /story/index.html with correct canonical URL"
echo "   ✅ Created /specials/index.html with correct canonical URL"

# Pizza page (SEO Cluster)
cp docs/index.html docs/pizza/index.html
sed -i 's#<link rel="canonical" href="https://www.jackspizzahyannis.com" />#<link rel="canonical" href="https://www.jackspizzahyannis.com/pizza/" />#g' docs/pizza/index.html
sed -i 's#<title>Best Pizza & Wings Hyannis MA | Jack'"'"'s Lounge</title>#<title>Best Pizza in Hyannis MA | Jack'"'"'s Lounge - Famous Honey Pizza</title>#g' docs/pizza/index.html

# Wings page (SEO Cluster)
cp docs/index.html docs/wings/index.html
sed -i 's#<link rel="canonical" href="https://www.jackspizzahyannis.com" />#<link rel="canonical" href="https://www.jackspizzahyannis.com/wings/" />#g' docs/wings/index.html
sed -i 's#<title>Best Pizza & Wings Hyannis MA | Jack'"'"'s Lounge</title>#<title>Best Wings in Hyannis MA | Jack'"'"'s Lounge - Crispy Buffalo Wings</title>#g' docs/wings/index.html

echo "   ✅ Created /pizza/index.html with correct canonical URL"
echo "   ✅ Created /wings/index.html with correct canonical URL"

echo ""
echo "✅ GitHub Pages deployment ready!"
echo ""
echo "Next steps:"
echo "1. Review changes: git status"
echo "2. Commit and push: git add docs && git commit -m 'Deploy updates' && git push"
