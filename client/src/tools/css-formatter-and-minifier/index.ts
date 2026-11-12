import { createElement } from 'react';
import { CssFormatterPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runCssFormatter } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

type Mode = 'beautify' | 'minify'; export const meta = getTool('css-formatter-and-minifier'); export const run = runCssFormatter;
export const examples = [
  { name: 'Beautify a rule', input: 'main{display:grid;gap:1rem;}', options: { mode: 'beautify' as const }, validate: (output: string) => output.includes('\n  display:grid;') && output.endsWith('}') },
  { name: 'Minify a rule', input: 'main { display: grid; gap: 1rem; }', options: { mode: 'minify' as const }, expected: 'main{display:grid;gap:1rem;}' },
  { name: 'Reject unbalanced CSS', input: 'main { display: grid;', options: { mode: 'beautify' as const }, expected: 'Error: The CSS has unbalanced braces.' },
] as const;
export const config = { template: 'T', live: false } as const; export const Page = () => createElement(CssFormatterPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, { mode: Mode }, string>;
