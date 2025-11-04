import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimizeLogo() {
  const inputPath = 'attached_assets/Untitled design_1762268750529.png';
  const outputDir = 'attached_assets/optimized';
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Get input file stats
    const inputStats = fs.statSync(inputPath);
    console.log(`\n🦁 Optimizing Jack's Lounge logo...`);
    console.log(`Original size: ${(inputStats.size / 1024).toFixed(2)}KB`);

    // Optimize logo for web (maintain transparency)
    await sharp(inputPath)
      .resize(200, null, { // Set width to 200px, maintain aspect ratio
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 90, alphaQuality: 100 }) // High quality for logo
      .toFile(path.join(outputDir, 'logo.webp'));

    // Get output file stats
    const outputStats = fs.statSync(path.join(outputDir, 'logo.webp'));
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`✅ Optimized logo saved: logo.webp`);
    console.log(`   Size: ${(outputStats.size / 1024).toFixed(2)}KB (saved ${savings}%)\n`);
    
  } catch (error) {
    console.error('Error optimizing logo:', error);
    process.exit(1);
  }
}

optimizeLogo();
