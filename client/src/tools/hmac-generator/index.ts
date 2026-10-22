import { createElement } from 'react';
import { HmacPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runHmac, type HmacAlgorithm } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

type Options = { secret: string; algorithm: HmacAlgorithm };
export const meta = getTool('hmac-generator'); export const run = runHmac;
export const examples = [
  { name: 'Generate SHA-256 HMAC', input: 'QuickTools', options: { secret: 'secret', algorithm: 'SHA-256' as const }, validate: (output: string) => /^[\da-f]{64}$/u.test(output) },
  { name: 'Generate SHA-512 HMAC', input: 'QuickTools', options: { secret: 'secret', algorithm: 'SHA-512' as const }, validate: (output: string) => /^[\da-f]{128}$/u.test(output) },
  { name: 'Reject missing secret', input: 'QuickTools', options: { secret: '', algorithm: 'SHA-256' as const }, expected: 'Error: Enter a secret key.' },
] as const;
export const config = { template: 'T', live: false } as const; export const Page = () => createElement(HmacPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, Options, string>;
