import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const inputPath = "attached_assets/new-logo.png";
const outputDir = "attached_assets/optimized";

async function optimizeLogo() {
  console.log('🦁 Optimizing Jack\'s Lounge logo...\n');

  // Ensure output directory exists
  await mkdir(outputDir, { recursive: true });

  // Get original image metadata
  const metadata = await sharp(inputPath).metadata();
  console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);
  console.log(`Original size: ${(metadata.size! / 1024).toFixed(2)}KB\n`);

  // Target dimensions based on current logo setup
  // Desktop: 324x84 (actual dimensions, h-14 class = 56px height)
  const desktopWidth = 324;
  const desktopHeight = 84;

  // Calculate mobile width maintaining aspect ratio (smaller for mobile)
  const mobileHeight = 56; // h-14 = 56px
  const aspectRatio = metadata.width! / metadata.height!;
  const mobileWidth = Math.round(mobileHeight * aspectRatio);

  try {
    // 1. Desktop 1x WebP (324x84)
    await sharp(inputPath)
      .resize(desktopWidth, desktopHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85 })
      .toFile(join(outputDir, 'logo-1x.webp'));
    console.log('✓ Created logo-1x.webp (324x84)');

    // 2. Desktop 2x WebP for Retina (648x168)
    await sharp(inputPath)
      .resize(desktopWidth * 2, desktopHeight * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85 })
      .toFile(join(outputDir, 'logo-2x.webp'));
    console.log('✓ Created logo-2x.webp (648x168) for Retina displays');

    // 3. Mobile WebP (optimized for smaller screens)
    await sharp(inputPath)
      .resize(mobileWidth, mobileHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 80 })
      .toFile(join(outputDir, 'logo-mobile.webp'));
    console.log(`✓ Created logo-mobile.webp (${mobileWidth}x${mobileHeight})`);

    // 4. PNG Fallback (324x84)
    await sharp(inputPath)
      .resize(desktopWidth, desktopHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 85 })
      .toFile(join(outputDir, 'logo-1x.png'));
    console.log('✓ Created logo-1x.png (PNG fallback)');

    console.log('\n✅ Logo optimization complete!');
    console.log('\nOptimized files saved to:', outputDir);

    // Show file sizes
    const files = ['logo-1x.webp', 'logo-2x.webp', 'logo-mobile.webp', 'logo-1x.png'];
    console.log('\nFile sizes:');
    for (const file of files) {
      const stats = await sharp(join(outputDir, file)).metadata();
      console.log(`  ${file}: ${(stats.size! / 1024).toFixed(2)}KB`);
    }
  } catch (error) {
    console.error('❌ Error optimizing logo:', error);
    process.exit(1);
  }
}

optimizeLogo();
