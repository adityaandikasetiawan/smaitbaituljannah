const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sliderDir = './public/img/slider';
const jpgFiles = [
  'SAVE_20250905_204006.jpg',
  'SAVE_20250905_204022.jpg',
  'SAVE_20250905_204031.jpg'
];

async function convertToWebP() {
  console.log('Mengkonversi gambar slider ke format WebP...');
  
  for (const file of jpgFiles) {
    const inputPath = path.join(sliderDir, file);
    const outputPath = path.join(sliderDir, file.replace('.jpg', '.webp'));
    
    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`✓ Berhasil mengkonversi ${file} ke ${file.replace('.jpg', '.webp')}`);
    } catch (error) {
      console.error(`✗ Gagal mengkonversi ${file}:`, error.message);
    }
  }
  
  console.log('Konversi selesai!');
}

convertToWebP();