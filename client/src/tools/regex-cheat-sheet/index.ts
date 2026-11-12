import { createElement } from 'react';
import { RegexCheatSheetPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { regexSyntax, type ReferenceEntry } from '../../data/developerReferences';
import { getTool } from '../../generated/toolRegistry';
import { filterReference } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('regex-cheat-sheet'); export const run = (input: string) => filterReference(regexSyntax, input);
export const examples = [
  { name: 'Find digit syntax', input: 'digit', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output.length >= 2 },
  { name: 'Find lookbehind', input: 'lookbehind', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output.length === 2 },
  { name: 'Report no match', input: 'not-regex-syntax', expected: 'Error: No matching entries were found.' },
] as const;
export const config = { template: 'R', live: true } as const; export const Page = () => createElement(RegexCheatSheetPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, ReferenceEntry[] | string>;
