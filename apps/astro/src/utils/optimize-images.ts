import { getImage } from 'astro:assets';

export const optimizeImage = async (image: string, width: number, height: number) => {
  const optimizedImage = await getImage({
    src: image,
    format: 'webp',
    width: width,
    height: height,
    widths: [48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  });

  return optimizedImage;
};
