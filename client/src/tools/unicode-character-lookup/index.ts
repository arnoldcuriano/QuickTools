import { createElement } from 'react';
import { UnicodeLookupPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import type { ReferenceEntry } from '../../data/developerReferences';
import { getTool } from '../../generated/toolRegistry';
import { runUnicodeLookup } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('unicode-character-lookup'); export const run = runUnicodeLookup;
export const examples = [
  { name: 'Look up a character', input: 'A', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output[0]?.key === 'U+0041' },
  { name: 'Look up a code point', input: 'U+1F600', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output[0]?.name === '😀' },
  { name: 'Reject invalid scalar', input: 'U+110000', expected: 'Error: Enter a valid Unicode scalar value.' },
] as const;
export const config = { template: 'R', live: false } as const; export const Page = () => createElement(UnicodeLookupPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, ReferenceEntry[] | string>;
