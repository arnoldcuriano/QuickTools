import { createElement } from 'react';
import { HexPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runHex, type EncodeMode } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('hex-encoder-decoder'); export const run = runHex;
export const examples = [
  { name: 'Encode text', input: 'Hi', options: { mode: 'encode' as const }, expected: '4869' },
  { name: 'Decode text', input: '517569636b546f6f6c73', options: { mode: 'decode' as const }, expected: 'QuickTools' },
  { name: 'Reject odd-length input', input: 'abc', options: { mode: 'decode' as const }, expected: 'Error: Enter an even number of hexadecimal digits.' },
] as const;
export const config = { template: 'T', live: false } as const; export const Page = () => createElement(HexPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, { mode: EncodeMode }, string>;
