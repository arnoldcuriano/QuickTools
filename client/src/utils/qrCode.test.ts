import * as QRCode from 'qrcode';
import { expect, test, vi } from 'vitest';
import { generateQrCodeDataUrl } from './qrCode';

vi.mock('qrcode', () => ({
  toDataURL: vi.fn(),
}));

test('generateQrCodeDataUrl passes style options to qrcode', async () => {
  const mockedToDataURL = vi.mocked(QRCode.toDataURL);
  mockedToDataURL.mockResolvedValue('data:image/png;base64,QR');

  const dataUrl = await generateQrCodeDataUrl('https://quicktools.dev', {
    size: 256,
    margin: 2,
    darkColor: '#111111',
    lightColor: '#ffffff',
    errorCorrectionLevel: 'M',
  });

  expect(dataUrl).toBe('data:image/png;base64,QR');
  expect(mockedToDataURL).toHaveBeenCalledWith(
    'https://quicktools.dev',
    expect.objectContaining({
      width: 256,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#111111',
        light: '#ffffff',
      },
    }),
  );
});
