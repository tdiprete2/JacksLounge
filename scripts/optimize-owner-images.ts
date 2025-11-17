import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { copyFile } from 'fs/promises';

async function optimizeImages() {
  console.log('🖼️  Optimizing owner.com replacement images...\n');

  const outputDir = "client/public/images";
  await mkdir(join(outputDir, 'hero'), { recursive: true });
  await mkdir(join(outputDir, 'social'), { recursive: true });

  try {
    // 1. Optimize hero image (large, for background)
    console.log('Optimizing hero image...');
    await sharp('client/public/images/hero/main-hero.jpg')
      .resize(3840, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(join(outputDir, 'hero/main-hero.webp'));
    console.log('✓ Created hero/main-hero.webp (3840px wide, WebP)');

    // Also create a JPG version for fallback
    await sharp('client/public/images/hero/main-hero.jpg')
      .resize(3840, null, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(join(outputDir, 'hero/main-hero-optimized.jpg'));
    console.log('✓ Created hero/main-hero-optimized.jpg (3840px wide, JPG fallback)');

    // 2. Create OG/social media image from existing pizza spread gallery image
    console.log('\nCreating social media preview images...');
    await sharp('attached_assets/optimized/gallery-pizza-spread.webp')
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(join(outputDir, 'social/og-image.webp'));
    console.log('✓ Created social/og-image.webp (1200x630, WebP)');

    // JPG version for compatibility
    await sharp('attached_assets/optimized/gallery-pizza-spread.webp')
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 85 })
      .toFile(join(outputDir, 'social/og-image.jpg'));
    console.log('✓ Created social/og-image.jpg (1200x630, JPG fallback)');

    // 3. Create sitemap image from featured meat lovers
    await sharp('attached_assets/optimized/featured-meat-lovers-desktop.webp')
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .webp({ quality: 80 })
      .toFile(join(outputDir, 'social/sitemap-featured.webp'));
    console.log('✓ Created social/sitemap-featured.webp (800x600, WebP)');

    await sharp('attached_assets/optimized/featured-meat-lovers-desktop.webp')
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 80 })
      .toFile(join(outputDir, 'social/sitemap-featured.jpg'));
    console.log('✓ Created social/sitemap-featured.jpg (800x600, JPG)');

    console.log('\n✅ Image optimization complete!');
    console.log('\nOptimized files saved to: client/public/images/');

    // Show file sizes
    const files = [
      'hero/main-hero.webp',
      'hero/main-hero-optimized.jpg',
      'social/og-image.webp',
      'social/og-image.jpg',
      'social/sitemap-featured.webp',
      'social/sitemap-featured.jpg'
    ];
    
    console.log('\nFile sizes:');
    for (const file of files) {
      try {
        const metadata = await sharp(join(outputDir, file)).metadata();
        console.log(`  ${file}: ${(metadata.size! / 1024).toFixed(1)}KB (${metadata.width}x${metadata.height})`);
      } catch (e) {
        console.log(`  ${file}: error reading file`);
      }
    }
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();
