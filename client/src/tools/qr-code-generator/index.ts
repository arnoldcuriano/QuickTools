import QRCodeGenerator from '../../pages/tools/QRCodeGenerator';
import { getTool } from '../../generated/toolRegistry';
import { generateQrCodeDataUrl, type QrCodeOptions } from '../../utils/qrCode';
import { BLACK, WHITE } from '../../data/designTokens';
import type { ToolModule } from '../types';

export type Options = QrCodeOptions;
export const meta = getTool('qr-code-generator');
export const run = (input: string, options: Options = { size: 160, margin: 1, darkColor: BLACK, lightColor: WHITE, errorCorrectionLevel: 'M' }) => generateQrCodeDataUrl(input, options);
export const examples = [
  { name: 'Generate a QR data URL', input: 'QuickTools', options: { size: 160, margin: 1, darkColor: BLACK, lightColor: WHITE, errorCorrectionLevel: 'M' as const }, validate: (output: string) => output.startsWith('data:image/png;base64,') },
] as const;
export const config = { template: 'G', inputLabel: 'Content', outputLabel: 'Preview', live: true } as const;
export const Page = QRCodeGenerator;
export default { meta, run, examples, config, Page } satisfies ToolModule<string, Options, string>;
