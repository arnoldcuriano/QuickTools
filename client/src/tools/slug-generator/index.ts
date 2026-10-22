import { createElement } from 'react';
import { SlugPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runSlug } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

type Options = { separator: '-' | '_' }; export const meta = getTool('slug-generator'); export const run = runSlug;
export const examples = [
  { name: 'Create a hyphen slug', input: 'QuickTools Developer Workbench', options: { separator: '-' as const }, expected: 'quicktools-developer-workbench' },
  { name: 'Normalize accents', input: 'Crème brûlée', options: { separator: '_' as const }, expected: 'creme_brulee' },
  { name: 'Reject empty title', input: '', options: { separator: '-' as const }, expected: 'Error: Enter a title to convert.' },
] as const;
export const config = { template: 'T', live: true } as const; export const Page = () => createElement(SlugPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, Options, string>;
