import { createElement } from 'react';
import { Base32Page } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runBase32, type EncodeMode } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('base32-encoder-decoder'); export const run = runBase32;
export const examples = [
  { name: 'Encode text', input: 'Hello', options: { mode: 'encode' as const }, expected: 'JBSWY3DP' },
  { name: 'Decode text', input: 'JBSWY3DP', options: { mode: 'decode' as const }, expected: 'Hello' },
  { name: 'Reject invalid Base32', input: 'INVALID1', options: { mode: 'decode' as const }, expected: 'Error: Enter valid RFC 4648 Base32 text.' },
] as const;
export const config = { template: 'T', live: false } as const; export const Page = () => createElement(Base32Page, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, { mode: EncodeMode }, string>;
