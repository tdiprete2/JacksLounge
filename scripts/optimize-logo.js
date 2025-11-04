import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

async function optimizeLogo() {
  console.log('🎨 Optimizing logo...\n');

  const inputPath = '/tmp/logo-original.png';
  const outputDir = join(rootDir, 'attached_assets/optimized');

  // Ensure output directory exists
  mkdirSync(outputDir, { recursive: true });

  try {
    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`📏 Original dimensions: ${metadata.width}x${metadata.height}`);

    // Standard logo (1x) - WebP format for better quality and compression
    await sharp(inputPath)
      .webp({ quality: 95, effort: 6 })
      .toFile(join(outputDir, 'logo-1x.webp'));
    console.log('✅ Created logo-1x.webp (standard resolution)');

    // Retina logo (2x) - Higher quality for high-DPI displays
    await sharp(inputPath)
      .resize(Math.round(metadata.width * 2), Math.round(metadata.height * 2), {
        kernel: 'lanczos3',
        fit: 'inside'
      })
      .webp({ quality: 95, effort: 6 })
      .toFile(join(outputDir, 'logo-2x.webp'));
    console.log('✅ Created logo-2x.webp (retina/2x resolution)');

    // PNG fallback for older browsers (standard size)
    await sharp(inputPath)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(join(outputDir, 'logo-1x.png'));
    console.log('✅ Created logo-1x.png (PNG fallback)');

    console.log('\n✨ Logo optimization complete!');
    console.log(`📁 Optimized logos saved to: ${outputDir}`);
  } catch (error) {
    console.error('❌ Error optimizing logo:', error);
    process.exit(1);
  }
}

optimizeLogo();
