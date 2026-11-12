import { createElement } from 'react';
import { ChmodPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runChmod } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

type Mode = 'to-octal' | 'to-symbolic'; export const meta = getTool('chmod-calculator'); export const run = runChmod;
export const examples = [
  { name: 'Convert octal permissions', input: '754', options: { mode: 'to-symbolic' as const }, expected: 'rwxr-xr--' },
  { name: 'Convert symbolic permissions', input: 'rw-r-----', options: { mode: 'to-octal' as const }, expected: '640' },
  { name: 'Reject invalid octal', input: '989', options: { mode: 'to-symbolic' as const }, expected: 'Error: Enter exactly three octal digits from 0 through 7.' },
] as const;
export const config = { template: 'C', live: true } as const; export const Page = () => createElement(ChmodPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, { mode: Mode }, string>;
