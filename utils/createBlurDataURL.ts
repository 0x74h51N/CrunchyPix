import sharp from 'sharp';
import fs from 'fs/promises';

export async function createBlurDataURL(imagePath: string): Promise<string> {
  try {
    const imageBuffer = await fs.readFile(imagePath); 
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(10, 10)
      .blur()
      .toBuffer();

    const base64Image = resizedImageBuffer.toString('base64'); 
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}
