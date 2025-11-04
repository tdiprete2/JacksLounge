import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputImage = join(__dirname, '../attached_assets/Gemini_Generated_Image_mdwvp3mdwvp3mdwv_1762272111193.png');
const outputDir = join(__dirname, '../attached_assets/optimized');

async function optimizeEventImage() {
  try {
    console.log('Optimizing Event Orders image...');

    // Mobile variant (800px wide, optimized for mobile viewports)
    await sharp(inputImage)
      .resize(800, null, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .webp({ quality: 75, effort: 6 })
      .toFile(join(outputDir, 'event-orders-mobile.webp'));
    
    console.log('✓ Mobile variant created: event-orders-mobile.webp');

    // Desktop variant (1920px wide, optimized for desktop)
    await sharp(inputImage)
      .resize(1920, null, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .webp({ quality: 75, effort: 6 })
      .toFile(join(outputDir, 'event-orders-desktop.webp'));
    
    console.log('✓ Desktop variant created: event-orders-desktop.webp');

    // PNG fallback (desktop size)
    await sharp(inputImage)
      .resize(1920, null, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3
      })
      .png({ quality: 75, compressionLevel: 9 })
      .toFile(join(outputDir, 'event-orders-desktop.png'));
    
    console.log('✓ PNG fallback created: event-orders-desktop.png');

    // Get file sizes
    const mobileStats = await sharp(join(outputDir, 'event-orders-mobile.webp')).metadata();
    const desktopStats = await sharp(join(outputDir, 'event-orders-desktop.webp')).metadata();
    
    console.log('\nOptimization complete!');
    console.log(`Mobile: ${mobileStats.width}x${mobileStats.height}`);
    console.log(`Desktop: ${desktopStats.width}x${desktopStats.height}`);

  } catch (error) {
    console.error('Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeEventImage();
