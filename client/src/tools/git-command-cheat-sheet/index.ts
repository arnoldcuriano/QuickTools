import { createElement } from 'react';
import { GitCheatSheetPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { gitCommands, type ReferenceEntry } from '../../data/developerReferences';
import { getTool } from '../../generated/toolRegistry';
import { filterReference } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('git-command-cheat-sheet'); export const run = (input: string) => filterReference(gitCommands, input);
export const examples = [
  { name: 'Find stash commands', input: 'stash', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output.length === 2 },
  { name: 'Find branch creation', input: 'create branch', validate: (output: ReferenceEntry[] | string) => Array.isArray(output) && output.some((entry) => entry.key.includes('switch -c')) },
  { name: 'Report no match', input: 'not-a-git-command', expected: 'Error: No matching entries were found.' },
] as const;
export const config = { template: 'R', live: true } as const; export const Page = () => createElement(GitCheatSheetPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, ReferenceEntry[] | string>;
