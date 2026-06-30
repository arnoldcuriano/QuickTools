export interface ImageData {
  filename: string;
  originalUrl: string;
  originalSize: number;
  webpUrl: string;
  webpSize: number;
  reduction: number;
  error?: string;
}

