import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function optimizeLogo() {
  console.log('🎨 Optimizing logo for mobile-first performance...\n');

  const inputPath = '/tmp/logo-original.png';
  const outputDir = join(rootDir, 'attached_assets/optimized');
  
  // Mobile display size from PageSpeed: 378x98
  // We'll create a slightly larger version for flexibility
  const mobileWidth = 400;
  const mobileHeight = 104;
  
  // Desktop size
  const desktopWidth = 324;
  const desktopHeight = 84;

  // Ensure output directory exists
  mkdirSync(outputDir, { recursive: true });

  try {
    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`📏 Original dimensions: ${metadata.width}x${metadata.height}`);
    console.log(`📱 Mobile target: ${mobileWidth}x${mobileHeight}`);
    console.log(`💻 Desktop target: ${desktopWidth}x${desktopHeight}\n`);

    // Mobile logo (1x) - Optimized for 378x98 display
    await sharp(inputPath)
      .resize(mobileWidth, mobileHeight, {
        kernel: 'lanczos3',
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality: 85, effort: 6 })
      .toFile(join(outputDir, 'logo-mobile.webp'));
    console.log('✅ Created logo-mobile.webp (400x104 - mobile optimized)');

    // Desktop logo (1x) at 324x84
    await sharp(inputPath)
      .resize(desktopWidth, desktopHeight, {
        kernel: 'lanczos3',
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality: 85, effort: 6 })
      .toFile(join(outputDir, 'logo-1x.webp'));
    console.log('✅ Created logo-1x.webp (324x84 - desktop standard)');

    // Retina logo (2x) - Higher compression for performance
    await sharp(inputPath)
      .resize(desktopWidth * 2, desktopHeight * 2, {
        kernel: 'lanczos3',
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality: 80, effort: 6 })
      .toFile(join(outputDir, 'logo-2x.webp'));
    console.log('✅ Created logo-2x.webp (648x168 - retina/2x)');

    // PNG fallback (smallest size)
    await sharp(inputPath)
      .resize(desktopWidth, desktopHeight, {
        kernel: 'lanczos3',
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(join(outputDir, 'logo-1x.png'));
    console.log('✅ Created logo-1x.png (324x84 - PNG fallback)');

    // Get file sizes for comparison
    const fs = await import('fs');
    const statsMobile = fs.statSync(join(outputDir, 'logo-mobile.webp'));
    const stats1x = fs.statSync(join(outputDir, 'logo-1x.webp'));
    const stats2x = fs.statSync(join(outputDir, 'logo-2x.webp'));
    const statsPng = fs.statSync(join(outputDir, 'logo-1x.png'));

    console.log('\n📊 File sizes:');
    console.log(`   logo-mobile.webp: ${(statsMobile.size / 1024).toFixed(1)}KB`);
    console.log(`   logo-1x.webp: ${(stats1x.size / 1024).toFixed(1)}KB`);
    console.log(`   logo-2x.webp: ${(stats2x.size / 1024).toFixed(1)}KB`);
    console.log(`   logo-1x.png: ${(statsPng.size / 1024).toFixed(1)}KB`);

    console.log('\n✨ Logo optimization complete!');
    console.log(`📁 Optimized logos saved to: ${outputDir}`);
  } catch (error) {
    console.error('❌ Error optimizing logo:', error);
    process.exit(1);
  }
}

optimizeLogo();
