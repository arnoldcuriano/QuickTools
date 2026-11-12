import { createElement } from 'react';
import { HtmlEntitiesPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runHtmlEntities, type EncodeMode } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('html-entity-encoder-decoder'); export const run = runHtmlEntities;
export const examples = [
  { name: 'Encode markup', input: '<strong>QuickTools</strong>', options: { mode: 'encode' as const }, expected: '&lt;strong&gt;QuickTools&lt;/strong&gt;' },
  { name: 'Decode entities', input: 'Tom &amp; Jerry', options: { mode: 'decode' as const }, expected: 'Tom & Jerry' },
  { name: 'Reject empty text', input: '', options: { mode: 'encode' as const }, expected: 'Error: Enter text to transform.' },
] as const;
export const config = { template: 'T', live: false } as const; export const Page = () => createElement(HtmlEntitiesPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, { mode: EncodeMode }, string>;
