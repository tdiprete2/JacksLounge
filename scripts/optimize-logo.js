import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function optimizeLogo() {
  console.log('🎨 Optimizing logo to 324x84...\n');

  const inputPath = '/tmp/logo-original.png';
  const outputDir = join(rootDir, 'attached_assets/optimized');
  const targetWidth = 324;
  const targetHeight = 84;

  // Ensure output directory exists
  mkdirSync(outputDir, { recursive: true });

  try {
    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`📏 Original dimensions: ${metadata.width}x${metadata.height}`);
    console.log(`🎯 Target dimensions: ${targetWidth}x${targetHeight}\n`);

    // Standard logo (1x) at 324x84 - WebP format for better quality and compression
    await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        kernel: 'lanczos3',
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality: 95, effort: 6 })
      .toFile(join(outputDir, 'logo-1x.webp'));
    console.log('✅ Created logo-1x.webp (324x84 - standard resolution)');

    // Retina logo (2x) at 648x168 - Higher quality for high-DPI displays
    await sharp(inputPath)
      .resize(targetWidth * 2, targetHeight * 2, {
        kernel: 'lanczos3',
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({ quality: 95, effort: 6 })
      .toFile(join(outputDir, 'logo-2x.webp'));
    console.log('✅ Created logo-2x.webp (648x168 - retina/2x resolution)');

    // PNG fallback for older browsers (324x84)
    await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        kernel: 'lanczos3',
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(join(outputDir, 'logo-1x.png'));
    console.log('✅ Created logo-1x.png (324x84 - PNG fallback)');

    // Get file sizes for comparison
    const fs = await import('fs');
    const stats1x = fs.statSync(join(outputDir, 'logo-1x.webp'));
    const stats2x = fs.statSync(join(outputDir, 'logo-2x.webp'));
    const statsPng = fs.statSync(join(outputDir, 'logo-1x.png'));

    console.log('\n📊 File sizes:');
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
