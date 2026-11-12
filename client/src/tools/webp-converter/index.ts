import WebPConverter from '../../pages/tools/WebPConverter';
import { getTool } from '../../generated/toolRegistry';
import { SUPPORTED_WEBP_SOURCE_TYPES } from '../../utils/webpConverter';
import type { ToolModule } from '../types';

export interface Options { quality: number }
export interface FileDescriptor { name: string; type: string }
export const meta = getTool('webp-converter');
export const run = (input: readonly FileDescriptor[]) => input.filter((file) => SUPPORTED_WEBP_SOURCE_TYPES.includes(file.type)).map((file) => file.name);
export const examples = [
  { name: 'Accept supported images', input: [{ name: 'photo.jpg', type: 'image/jpeg' }], options: { quality: 80 }, expected: ['photo.jpg'] },
] as const;
export const config = { template: 'F', inputLabel: 'Images', outputLabel: 'Converted files' } as const;
export const Page = WebPConverter;
export default { meta, run, examples, config, Page } satisfies ToolModule<readonly FileDescriptor[], Options, readonly string[]>;
