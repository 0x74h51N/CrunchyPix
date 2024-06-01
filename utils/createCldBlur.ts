import { getCldImageUrl } from 'next-cloudinary';

export const getCldBlurImageUrl = async (id: string): Promise<string> => {
  const imageUrl = getCldImageUrl({
    src: id,
    width: 100,
    height: 100,
    blur: 300,
    quality: 1,
  });

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');

  return `data:${response.type};base64,${base64}`;
};
