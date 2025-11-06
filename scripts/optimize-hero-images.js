import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../client/public');

// Optimize hero-0-desktop.webp (currently 392KB, target <150KB)
async function optimizeHeroImage() {
  const inputPath = path.join(publicDir, 'hero-0-desktop.webp');
  const tempPath = path.join(publicDir, 'hero-0-desktop-temp.webp');
  
  console.log('🖼️  Optimizing hero-0-desktop.webp...');
  
  try {
    await sharp(inputPath)
      .webp({ 
        quality: 75,  // Reduce from default 80
        effort: 6,     // Maximum compression effort
        smartSubsample: true
      })
      .toFile(tempPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(tempPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    // Replace original with optimized version
    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);
    
    console.log(`✅ hero-0-desktop.webp: ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB (${savings}% smaller)`);
    
    // Also optimize mobile version
    const mobileInputPath = path.join(publicDir, 'hero-0-mobile.webp');
    const mobileTempPath = path.join(publicDir, 'hero-0-mobile-temp.webp');
    
    await sharp(mobileInputPath)
      .webp({ 
        quality: 78,
        effort: 6,
        smartSubsample: true
      })
      .toFile(mobileTempPath);
    
    const mobileOriginalSize = fs.statSync(mobileInputPath).size;
    const mobileNewSize = fs.statSync(mobileTempPath).size;
    const mobileSavings = ((mobileOriginalSize - mobileNewSize) / mobileOriginalSize * 100).toFixed(1);
    
    fs.unlinkSync(mobileInputPath);
    fs.renameSync(mobileTempPath, mobileInputPath);
    
    console.log(`✅ hero-0-mobile.webp: ${(mobileOriginalSize/1024).toFixed(0)}KB → ${(mobileNewSize/1024).toFixed(0)}KB (${mobileSavings}% smaller)`);
    
    console.log('\n🎉 Hero images optimized successfully!');
    
  } catch (error) {
    console.error('❌ Error optimizing images:', error.message);
    // Cleanup temp files if they exist
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    if (fs.existsSync(mobileTempPath)) fs.unlinkSync(mobileTempPath);
    process.exit(1);
  }
}

optimizeHeroImage();
