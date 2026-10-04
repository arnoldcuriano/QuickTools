import * as QRCode from 'qrcode';
import { expect, test, vi } from 'vitest';
import { generateQrCodeDataUrl } from './qrCode';
import { QR_TEST_DARK, WHITE } from '../data/designTokens';

vi.mock('qrcode', () => ({
  toDataURL: vi.fn(),
}));

test('generateQrCodeDataUrl passes style options to qrcode', async () => {
  const mockedToDataURL = vi.mocked(QRCode.toDataURL);
  mockedToDataURL.mockResolvedValue('data:image/png;base64,QR');

  const dataUrl = await generateQrCodeDataUrl('https://quicktools.dev', {
    size: 256,
    margin: 2,
    darkColor: QR_TEST_DARK,
    lightColor: WHITE,
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
        dark: QR_TEST_DARK,
        light: WHITE,
      },
    }),
  );
});
