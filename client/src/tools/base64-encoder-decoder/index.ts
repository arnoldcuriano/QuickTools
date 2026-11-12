import Base64Tool from '../../pages/tools/Base64Tool';
import { getTool } from '../../generated/toolRegistry';
import type { ToolModule } from '../types';

export interface Options { mode: 'encode' | 'decode' }
export const meta = getTool('base64-encoder-decoder');
export const run = (input: string, options: Options = { mode: 'encode' }) => options.mode === 'encode'
  ? btoa(unescape(encodeURIComponent(input)))
  : decodeURIComponent(escape(atob(input)));
export const examples = [
  { name: 'Encode plain text', input: 'QuickTools', options: { mode: 'encode' as const }, expected: 'UXVpY2tUb29scw==' },
] as const;
export const config = { template: 'T', inputLabel: 'Text', outputLabel: 'Result', live: true } as const;
export const Page = Base64Tool;
export default { meta, run, examples, config, Page } satisfies ToolModule<string, Options, string>;
