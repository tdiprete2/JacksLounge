#!/bin/bash

echo "📦 Migrating all optimized images to client/public/images/..."

# Create directory structure
mkdir -p client/public/images/{logo,featured,gallery,sections,badges}

# Copy logo images
echo "📸 Copying logo images..."
cp attached_assets/optimized/logo-*.{png,webp} client/public/images/logo/ 2>/dev/null

# Copy featured items
echo "🍕 Copying featured item images..."
cp attached_assets/optimized/featured-*.webp client/public/images/featured/

# Copy gallery images  
echo "🖼️  Copying gallery images..."
cp attached_assets/optimized/gallery-*.webp client/public/images/gallery/

# Copy section images (neighborhood, italian-favorites, rewards, events)
echo "📐 Copying section images..."
cp attached_assets/optimized/section-*.webp client/public/images/sections/
cp attached_assets/optimized/rewards-*.webp client/public/images/sections/
cp attached_assets/optimized/event-*.webp client/public/images/sections/

# Copy app badges
echo "📱 Copying app store badges..."
cp attached_assets/optimized/app-store-badge*.* client/public/images/badges/
cp attached_assets/optimized/google-play-badge*.* client/public/images/badges/

echo ""
echo "✅ Migration complete! Summary:"
echo "   Logo images: $(ls client/public/images/logo/ | wc -l) files"
echo "   Featured items: $(ls client/public/images/featured/ | wc -l) files"
echo "   Gallery images: $(ls client/public/images/gallery/ | wc -l) files"
echo "   Section images: $(ls client/public/images/sections/ | wc -l) files"
echo "   App badges: $(ls client/public/images/badges/ | wc -l) files"
echo ""
echo "📊 Total size breakdown:"
du -sh client/public/images/*
