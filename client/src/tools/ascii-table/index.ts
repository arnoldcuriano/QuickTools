import { createElement } from 'react';
import { AsciiTablePage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { asciiEntries, type ReferenceEntry } from '../../data/developerReferences';
import { getTool } from '../../generated/toolRegistry';
import { filterReference } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('ascii-table'); export const run = (input: string) => filterReference(asciiEntries, input);
export const examples = [
  { name: 'Find decimal 65', input: '65', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output.some((entry) => entry.name === 'A') },
  { name: 'Find line feed', input: 'LF', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output.some((entry) => entry.key === '10' && entry.name === 'LF') },
  { name: 'Report no match', input: 'not-ascii', expected: 'Error: No matching entries were found.' },
] as const;
export const config = { template: 'R', live: true } as const; export const Page = () => createElement(AsciiTablePage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, ReferenceEntry[] | string>;
