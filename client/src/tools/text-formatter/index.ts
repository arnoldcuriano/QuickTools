import TextFormatter from '../../pages/tools/TextFormatter';
import { getTool } from '../../generated/toolRegistry';
import type { ToolModule } from '../types';

export interface Options { format: 'json' | 'xml' | 'html' | 'text' }
export const meta = getTool('text-formatter');
export const run = (input: string, options: Options = { format: 'text' }) => {
  const value = input.trim();
  if (options.format === 'json') return JSON.stringify(JSON.parse(value), null, 2);
  if (options.format === 'text') return value.replace(/[ \t]+/g, ' ');
  return value;
};
export const examples = [
  { name: 'Normalize plain text', input: '  QuickTools   works  ', options: { format: 'text' as const }, expected: 'QuickTools works' },
] as const;
export const config = { template: 'T', inputLabel: 'Input', outputLabel: 'Formatted output', live: true } as const;
export const Page = TextFormatter;
export default { meta, run, examples, config, Page } satisfies ToolModule<string, Options, string>;
