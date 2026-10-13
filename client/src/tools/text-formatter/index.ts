import TextFormatter from '../../pages/tools/TextFormatter';
import { getTool } from '../../generated/toolRegistry';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import type { ToolModule } from '../types';

export interface Options { format: 'json' | 'xml' | 'html' | 'text' }
export const meta = getTool('text-formatter');
const formatXml = (input: string) => {
  try {
    const document = new DOMParser({ onError: (level, message) => { if (level !== 'warning') throw new Error(message); } }).parseFromString(input, 'text/xml');
    const serialized = new XMLSerializer().serializeToString(document).replace(/(>)(<)(\/?)/gu, '$1\n$2$3');
    let depth = 0;
    return serialized.split('\n').map((node) => {
      if (/^<\//u.test(node)) depth = Math.max(0, depth - 1);
      const line = `${'  '.repeat(depth)}${node}`;
      if (/^<[^!?/][^>]*[^/]>$/u.test(node)) depth += 1;
      return line;
    }).join('\n');
  } catch { return 'Error: Enter valid XML to format.'; }
};
export const run = (input: string, options: Options = { format: 'text' }) => {
  const value = input.trim();
  if (!value) return 'Error: Enter content to format.';
  if (options.format === 'json') return JSON.stringify(JSON.parse(value), null, 2);
  if (options.format === 'text') return value.replace(/[ \t]+/g, ' ');
  if (options.format === 'xml') return formatXml(value);
  return value;
};
export const examples = [
  { name: 'Normalize plain text', input: '  QuickTools   works  ', options: { format: 'text' as const }, expected: 'QuickTools works' },
  { name: 'Format XML', input: '<root><item>value</item></root>', options: { format: 'xml' as const }, expected: '<root>\n  <item>value</item>\n</root>' },
  { name: 'Reject invalid XML', input: '<root>', options: { format: 'xml' as const }, expected: 'Error: Enter valid XML to format.' },
  { name: 'Reject empty input', input: '', options: { format: 'text' as const }, expected: 'Error: Enter content to format.' },
] as const;
export const config = { template: 'T', inputLabel: 'Input', outputLabel: 'Formatted output', live: true } as const;
export const Page = TextFormatter;
export default { meta, run, examples, config, Page } satisfies ToolModule<string, Options, string>;
