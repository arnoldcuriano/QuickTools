import { createElement } from 'react';
import { StringEscapePage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runStringEscape, type EncodeMode } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('string-escape-unescape'); export const run = runStringEscape;
export const examples = [
  { name: 'Escape a line break', input: 'line\nbreak', options: { mode: 'encode' as const }, expected: 'line\\nbreak' },
  { name: 'Unescape a line break', input: 'line\\nbreak', options: { mode: 'decode' as const }, expected: 'line\nbreak' },
  { name: 'Reject empty input', input: '', options: { mode: 'encode' as const }, expected: 'Error: Enter a string to transform.' },
] as const;
export const config = { template: 'T', live: false } as const; export const Page = () => createElement(StringEscapePage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, { mode: EncodeMode }, string>;
