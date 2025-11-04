#!/bin/bash

# Jack's Lounge - Image Compression Script
# This script will compress all images to improve PageSpeed scores

echo "🖼️  Jack's Lounge Image Compression Script"
echo "==========================================="
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed."
    echo ""
    echo "To install:"
    echo "  - Mac: brew install imagemagick"
    echo "  - Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  - Or use online tools: https://tinypng.com/"
    exit 1
fi

echo "✅ ImageMagick found!"
echo ""

# Create backup
echo "📦 Creating backup..."
mkdir -p images_backup
cp -r images/* images_backup/
echo "✅ Backup created at images_backup/"
echo ""

# Create optimized folder
echo "🔄 Creating optimized images..."
mkdir -p images_optimized

# Counter
total=0
success=0

# Optimize JPG images
for img in images/*.jpg images/*.JPG images/*.jpeg images/*.JPEG; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        total=$((total + 1))
        
        echo "Processing: $filename"
        
        # Resize to max 1200px, compress to 82% quality, strip metadata
        convert "$img" \
            -resize 1200x1200\> \
            -quality 82 \
            -strip \
            "images_optimized/$filename" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            success=$((success + 1))
            
            # Compare sizes
            original_size=$(du -h "$img" | cut -f1)
            new_size=$(du -h "images_optimized/$filename" | cut -f1)
            echo "  ✓ $original_size → $new_size"
        else
            echo "  ✗ Failed to process $filename"
        fi
    fi
done

# Optimize PNG images
for img in images/*.png images/*.PNG; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        total=$((total + 1))
        
        echo "Processing: $filename"
        
        convert "$img" \
            -resize 1200x1200\> \
            -quality 85 \
            -strip \
            "images_optimized/$filename" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            success=$((success + 1))
            
            original_size=$(du -h "$img" | cut -f1)
            new_size=$(du -h "images_optimized/$filename" | cut -f1)
            echo "  ✓ $original_size → $new_size"
        else
            echo "  ✗ Failed to process $filename"
        fi
    fi
done

echo ""
echo "==========================================="
echo "✅ Compression complete!"
echo "   Processed: $success/$total images"
echo ""
echo "📊 Total size comparison:"
du -sh images/ images_optimized/
echo ""

# Ask to replace
echo "⚠️  Do you want to replace original images with optimized versions?"
echo "   (Backup is saved in images_backup/)"
read -p "Replace? (yes/no): " response

if [ "$response" == "yes" ] || [ "$response" == "y" ]; then
    rm -rf images
    mv images_optimized images
    echo "✅ Images replaced! Original images are in images_backup/"
else
    echo "ℹ️  Optimized images are in images_optimized/"
    echo "   You can manually replace them later."
fi

echo ""
echo "🚀 Next steps:"
echo "   1. Test the site locally"
echo "   2. Push to GitHub"
echo "   3. Test on PageSpeed Insights"
echo ""
