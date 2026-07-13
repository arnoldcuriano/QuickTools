import * as QRCode from 'qrcode';

export type QrErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrCodeOptions {
  size: number;
  margin: number;
  darkColor: string;
  lightColor: string;
  errorCorrectionLevel: QrErrorCorrectionLevel;
}

export interface PremiumQrCodeOptions extends QrCodeOptions {
  logoDataUrl?: string | null;
  logoScale?: number;
  frameText?: string;
}

const loadImageFromDataUrl = async (dataUrl: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load image asset.'));
    image.src = dataUrl;
  });

const drawRoundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
};

export const generateQrCodeDataUrl = async (value: string, options: QrCodeOptions) => {
  return QRCode.toDataURL(value, {
    width: options.size,
    margin: options.margin,
    errorCorrectionLevel: options.errorCorrectionLevel,
    color: {
      dark: options.darkColor,
      light: options.lightColor,
    },
  });
};

export const generatePremiumQrCodeDataUrl = async (value: string, options: PremiumQrCodeOptions) => {
  const baseDataUrl = await generateQrCodeDataUrl(value, options);
  const hasFrameText = Boolean(options.frameText?.trim());
  const hasLogo = Boolean(options.logoDataUrl);

  if (!hasFrameText && !hasLogo) {
    return baseDataUrl;
  }

  const qrImage = await loadImageFromDataUrl(baseDataUrl);
  const framePadding = Math.max(28, Math.round(options.size * 0.08));
  const frameTextHeight = hasFrameText ? Math.max(44, Math.round(options.size * 0.18)) : 0;
  const canvasSize = options.size + framePadding * 2;
  const canvas = document.createElement('canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize + frameTextHeight;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Canvas not supported.');
  }

  context.fillStyle = options.lightColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(qrImage, framePadding, framePadding, options.size, options.size);

  if (hasLogo && options.logoDataUrl) {
    const logo = await loadImageFromDataUrl(options.logoDataUrl);
    const logoSize = Math.round(options.size * Math.max(0.16, Math.min(options.logoScale ?? 0.22, 0.34)));
    const logoX = framePadding + Math.round((options.size - logoSize) / 2);
    const logoY = framePadding + Math.round((options.size - logoSize) / 2);
    const backgroundSize = logoSize + 16;
    const backgroundX = framePadding + Math.round((options.size - backgroundSize) / 2);
    const backgroundY = framePadding + Math.round((options.size - backgroundSize) / 2);

    context.fillStyle = options.lightColor;
    drawRoundedRect(context, backgroundX, backgroundY, backgroundSize, backgroundSize, 18);
    context.fill();

    context.drawImage(logo, logoX, logoY, logoSize, logoSize);
  }

  if (hasFrameText && options.frameText) {
    const textY = canvasSize + Math.round(frameTextHeight * 0.62);
    context.fillStyle = options.darkColor;
    context.font = `600 ${Math.max(14, Math.round(options.size * 0.07))}px var(--font-display, sans-serif)`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(options.frameText.trim(), Math.round(canvas.width / 2), textY);
  }

  return canvas.toDataURL('image/png');
};
