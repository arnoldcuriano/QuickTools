import { createElement } from 'react';
import { HttpStatusPage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runHttpStatusSearch, type HttpStatus } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('http-status-codes');
export const run = runHttpStatusSearch;
export const examples = [
  { name: 'Find not found', input: '404', validate: (output: ReturnType<typeof run>) => Array.isArray(output) && output[0]?.name === 'Not Found' },
  { name: 'Find server errors', input: 'server', validate: (output: ReturnType<typeof run>) => Array.isArray(output) && output.length >= 3 },
  { name: 'Report no match', input: '999 unknown', expected: 'Error: No matching HTTP status codes.' },
] as const;
export const config = { template: 'R', inputLabel: 'Search', outputLabel: 'Status codes', live: true } as const;
export const Page = () => createElement(HttpStatusPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, HttpStatus[] | string>;
