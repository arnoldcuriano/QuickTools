import { createElement } from 'react';
import { HttpHeadersPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { httpHeaders, type ReferenceEntry } from '../../data/developerReferences';
import { getTool } from '../../generated/toolRegistry';
import { filterReference } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('http-headers-reference'); export const run = (input: string) => filterReference(httpHeaders, input);
export const examples = [
  { name: 'Find content type', input: 'Content-Type', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output[0]?.name === 'Request or response' },
  { name: 'Find cache headers', input: 'cache', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output.length >= 2 },
  { name: 'Report no match', input: 'not-a-header', expected: 'Error: No matching entries were found.' },
] as const;
export const config = { template: 'R', live: true } as const; export const Page = () => createElement(HttpHeadersPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, ReferenceEntry[] | string>;
