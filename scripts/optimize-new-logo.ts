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

  // Target dimensions for 3x larger logo
  // Original was h-14 (56px), 3x = 168px
  // New logo is square (1250x1250), so width = height
  const desktopHeight = 168; // h-42 = 168px (3x original)
  const desktopWidth = 168; // Square logo

  // Mobile version (smaller but still prominent)
  const mobileHeight = 120;
  const mobileWidth = 120;

  try {
    // 1. Desktop 1x WebP (168x168)
    await sharp(inputPath)
      .resize(desktopWidth, desktopHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90 })
      .toFile(join(outputDir, 'logo-1x.webp'));
    console.log(`✓ Created logo-1x.webp (${desktopWidth}x${desktopHeight})`);

    // 2. Desktop 2x WebP for Retina (336x336)
    await sharp(inputPath)
      .resize(desktopWidth * 2, desktopHeight * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 90 })
      .toFile(join(outputDir, 'logo-2x.webp'));
    console.log(`✓ Created logo-2x.webp (${desktopWidth * 2}x${desktopHeight * 2}) for Retina displays`);

    // 3. Mobile WebP (optimized for smaller screens)
    await sharp(inputPath)
      .resize(mobileWidth, mobileHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85 })
      .toFile(join(outputDir, 'logo-mobile.webp'));
    console.log(`✓ Created logo-mobile.webp (${mobileWidth}x${mobileHeight})`);

    // 4. PNG Fallback (168x168)
    await sharp(inputPath)
      .resize(desktopWidth, desktopHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90 })
      .toFile(join(outputDir, 'logo-1x.png'));
    console.log(`✓ Created logo-1x.png (${desktopWidth}x${desktopHeight} PNG fallback)`);

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
