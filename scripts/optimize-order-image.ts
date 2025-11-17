import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const sourceImage = 'attached_assets/IMG_7054_1762190095057.jpg';
const outputDir = 'client/public/images/sections';

async function optimizeOrderImage() {
  console.log('🖼️  Optimizing order section image...\n');

  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });

  // Load source image
  const image = sharp(sourceImage);
  const metadata = await image.metadata();
  console.log(`📐 Source: ${metadata.width}x${metadata.height}px\n`);

  // Desktop version (1200px wide, high quality)
  await image
    .clone()
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 68, effort: 6 })
    .toFile(path.join(outputDir, 'order-desktop.webp'));

  const desktopStats = await fs.stat(path.join(outputDir, 'order-desktop.webp'));
  console.log(`✅ Desktop WebP: ${Math.round(desktopStats.size / 1024)}KB`);

  // Mobile version (800px wide, optimized)
  await image
    .clone()
    .resize(800, null, { withoutEnlargement: true })
    .webp({ quality: 65, effort: 6 })
    .toFile(path.join(outputDir, 'order-mobile.webp'));

  const mobileStats = await fs.stat(path.join(outputDir, 'order-mobile.webp'));
  console.log(`✅ Mobile WebP: ${Math.round(mobileStats.size / 1024)}KB`);

  console.log('\n✅ Order image optimization complete!');
}

optimizeOrderImage().catch(console.error);
