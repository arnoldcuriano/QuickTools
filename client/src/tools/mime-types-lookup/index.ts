import { createElement } from 'react';
import { MimeLookupPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { mimeTypes, type ReferenceEntry } from '../../data/developerReferences';
import { getTool } from '../../generated/toolRegistry';
import { filterReference } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('mime-types-lookup'); export const run = (input: string) => filterReference(mimeTypes, input);
export const examples = [
  { name: 'Find JSON', input: '.json', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output[0]?.name === 'application/json' },
  { name: 'Find image types', input: 'image', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output.length >= 5 },
  { name: 'Report no match', input: 'unknown-extension', expected: 'Error: No matching entries were found.' },
] as const;
export const config = { template: 'R', live: true } as const; export const Page = () => createElement(MimeLookupPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, ReferenceEntry[] | string>;
