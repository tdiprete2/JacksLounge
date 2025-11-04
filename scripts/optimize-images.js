import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../attached_assets');
const OUTPUT_DIR = path.join(__dirname, '../attached_assets/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Define size presets for different use cases
// Reduced quality for mobile-first performance (targeting PageSpeed 100)
const PRESETS = {
  hero: { width: 1920, height: 1080, quality: 75 }, // Hero carousel
  heroMobile: { width: 768, height: 600, quality: 70 },
  featured: { width: 800, height: 600, quality: 75 }, // Featured items
  featuredMobile: { width: 400, height: 300, quality: 70 },
  gallery: { width: 600, height: 600, quality: 75 }, // Food gallery
  section: { width: 1200, height: 800, quality: 75 }, // Section images
  sectionMobile: { width: 600, height: 400, quality: 70 },
};

async function optimizeImage(inputPath, outputBaseName, preset) {
  const ext = path.extname(inputPath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    console.log(`Skipping non-image file: ${inputPath}`);
    return null;
  }

  try {
    const outputPath = path.join(OUTPUT_DIR, `${outputBaseName}.webp`);
    
    await sharp(inputPath)
      .resize(preset.width, preset.height, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: preset.quality })
      .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);

    console.log(`✅ Optimized ${path.basename(inputPath)}`);
    console.log(`   → ${outputBaseName}.webp (${(outputStats.size / 1024).toFixed(0)}KB, saved ${savings}%)`);
    
    return outputPath;
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function generateResponsiveSet(inputPath, baseName, desktopPreset, mobilePreset) {
  const results = [];
  
  // Generate desktop version
  const desktopPath = await optimizeImage(inputPath, `${baseName}-desktop`, desktopPreset);
  if (desktopPath) results.push({ size: 'desktop', path: desktopPath });
  
  // Generate mobile version
  const mobilePath = await optimizeImage(inputPath, `${baseName}-mobile`, mobilePreset);
  if (mobilePath) results.push({ size: 'mobile', path: mobilePath });
  
  return results;
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  // Hero carousel images (6 images)
  const heroImages = [
    '20251029_101841_1762190095054.jpg',
    'IMG_6484_1762190095056.jpg',
    'IMG_6613_1762190095056.jpg',
    '20251029_102232_1762190095054.jpg',
    'IMG_6756_1762190095057.jpg',
    'IMG_7054_1762190095057.jpg',
  ];

  console.log('📸 Optimizing hero carousel images...');
  for (let i = 0; i < heroImages.length; i++) {
    const inputPath = path.join(ASSETS_DIR, heroImages[i]);
    if (fs.existsSync(inputPath)) {
      await generateResponsiveSet(inputPath, `hero-${i}`, PRESETS.hero, PRESETS.heroMobile);
    }
  }

  // Featured items (6 images)
  const featuredImages = [
    { file: 'Cheese Pizza_1762221409404.jpg', name: 'featured-build-your-own' },
    { file: 'IMG_8582_1762221466002.jpg', name: 'featured-quesadilla' },
    { file: 'Gemini_Generated_Image_36xxm236xxm236xx_1762221978465.png', name: 'featured-boneless-wings' },
    { file: 'Gemini_Generated_Image_hqogmrhqogmrhqog_1762222224152.png', name: 'featured-garlic-bread' },
    { file: 'Gemini_Generated_Image_aej4hbaej4hbaej4_1762222579202.png', name: 'featured-meat-lovers' },
    { file: 'IMG_7117 (1)_1762221533727.jpg', name: 'featured-wings' },
  ];

  console.log('\n🍕 Optimizing featured items...');
  for (const item of featuredImages) {
    const inputPath = path.join(ASSETS_DIR, item.file);
    if (fs.existsSync(inputPath)) {
      await generateResponsiveSet(inputPath, item.name, PRESETS.featured, PRESETS.featuredMobile);
    }
  }

  // Food gallery images
  const galleryImages = [
    { file: 'IMG_7117 (1)_1762190095052.jpg', name: 'gallery-wings' },
    { file: 'IMG_7550_1762190095052.jpg', name: 'gallery-salad' },
    { file: 'IMG_8292_1762190095053.jpg', name: 'gallery-ribs' },
    { file: 'IMG_8582_1762190095053.jpg', name: 'gallery-quesadilla' },
    { file: '1761751831936_1762190095056.jpg', name: 'gallery-pizza-spread' },
    { file: 'IMG_6715_1762190095057.jpg', name: 'gallery-pasta' },
  ];

  console.log('\n🍽️  Optimizing gallery images...');
  for (const item of galleryImages) {
    const inputPath = path.join(ASSETS_DIR, item.file);
    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath, item.name, PRESETS.gallery);
    }
  }

  // Section images
  const sectionImages = [
    { file: '20251029_102232_1762190095054.jpg', name: 'section-neighborhood' },
    { file: 'Cheese Pizza_1762190095056.jpg', name: 'section-rewards' },
    { file: '20251029_102404_1762190095055.jpg', name: 'section-events' },
    { file: 'IMG_8304_1762190095053.jpg', name: 'section-italian-favorites' },
  ];

  console.log('\n🏪 Optimizing section images...');
  for (const item of sectionImages) {
    const inputPath = path.join(ASSETS_DIR, item.file);
    if (fs.existsSync(inputPath)) {
      await generateResponsiveSet(inputPath, item.name, PRESETS.section, PRESETS.sectionMobile);
    }
  }

  console.log('\n✨ Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
