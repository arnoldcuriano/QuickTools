import JSZip from 'jszip';
import { ImageData } from '../types/imageTools';

export const MAX_WEBP_FILES = 20;
export const SUPPORTED_WEBP_SOURCE_TYPES = ['image/jpeg', 'image/png'];

export const getSupportedImageFiles = (files: FileList): File[] =>
  Array.from(files).filter((file) => SUPPORTED_WEBP_SOURCE_TYPES.includes(file.type));

export const convertToWebP = async (file: File, quality: number): Promise<ImageData> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const img = new Image();

      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return resolve({
            filename: file.name,
            originalUrl: '',
            originalSize: 0,
            webpUrl: '',
            webpSize: 0,
            reduction: 0,
            error: 'Canvas not supported.',
          });
        }

        ctx.drawImage(img, 0, 0);

        try {
          const webpDataUrl = canvas.toDataURL('image/webp', quality / 100);
          const webpBlob = await (await fetch(webpDataUrl)).blob();
          const reduction = file.size > 0 ? ((file.size - webpBlob.size) / file.size) * 100 : 0;

          resolve({
            filename: file.name.replace(/\.[^/.]+$/, '.webp'),
            originalUrl: event.target?.result as string,
            originalSize: file.size,
            webpUrl: webpDataUrl,
            webpSize: webpBlob.size,
            reduction,
          });
        } catch (err) {
          resolve({
            filename: file.name,
            originalUrl: '',
            originalSize: 0,
            webpUrl: '',
            webpSize: 0,
            reduction: 0,
            error: 'Conversion failed.',
          });
        }
      };

      img.onerror = () =>
        resolve({
          filename: file.name,
          originalUrl: '',
          originalSize: 0,
          webpUrl: '',
          webpSize: 0,
          reduction: 0,
          error: 'Invalid image.',
        });

      img.src = event.target?.result as string;
    };

    reader.onerror = () =>
      resolve({
        filename: file.name,
        originalUrl: '',
        originalSize: 0,
        webpUrl: '',
        webpSize: 0,
        reduction: 0,
        error: 'Read failed.',
      });

    reader.readAsDataURL(file);
  });
};

export const createWebPZip = async (images: ImageData[]): Promise<Blob> => {
  const zip = new JSZip();

  images.forEach((img) => {
    if (img.webpUrl) {
      const base64 = img.webpUrl.split(',')[1];
      zip.file(img.filename, base64, { base64: true });
    }
  });

  return zip.generateAsync({ type: 'blob' });
};

export const createSourceFileFromImage = async (image: ImageData): Promise<File> => {
  const blob = await (await fetch(image.originalUrl)).blob();
  return new File([blob], image.filename.replace('.webp', ''), { type: blob.type });
};

export const getImageSavingsSummary = (images: ImageData[]) => {
  const totalSavings = images.reduce((acc, img) => acc + (img.originalSize - img.webpSize), 0);
  const avgReduction =
    images.length > 0 ? images.reduce((acc, img) => acc + img.reduction, 0) / images.length : 0;

  return { totalSavings, avgReduction };
};

