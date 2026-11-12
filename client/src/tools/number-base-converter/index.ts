import { createElement } from 'react';
import { NumberBasePage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runNumberBase, type NumberBase } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

type Options = { from: NumberBase; to: NumberBase }; export const meta = getTool('number-base-converter'); export const run = runNumberBase;
export const examples = [
  { name: 'Decimal to hexadecimal', input: '255', options: { from: 10 as const, to: 16 as const }, expected: 'ff' },
  { name: 'Binary to decimal', input: '101010', options: { from: 2 as const, to: 10 as const }, expected: '42' },
  { name: 'Reject invalid digit', input: '102', options: { from: 2 as const, to: 10 as const }, expected: 'Error: Enter a valid base-2 integer.' },
] as const;
export const config = { template: 'C', live: true } as const; export const Page = () => createElement(NumberBasePage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, Options, string>;
