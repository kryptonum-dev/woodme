import { getImage } from 'astro:assets';
import type { ImageDataProps } from '../components/ui/image/index.astro';

export const optimizeImage = async (image: ImageDataProps, width: number, height: number) => {
  const optimizedImage = await getImage({
    src: image.asset.url,
    format: 'webp',
    width: width,
    height: height,
    widths: [48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  });

  return optimizedImage;
};
