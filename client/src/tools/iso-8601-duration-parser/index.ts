import { createElement } from 'react';
import { IsoDurationPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runIsoDuration } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

type Mode = 'parse' | 'build' | 'date'; export const meta = getTool('iso-8601-duration-parser'); export const run = runIsoDuration;
export const examples = [
  { name: 'Parse a duration', input: 'P1DT2H30M', options: { mode: 'parse' as const }, expected: '{\n  "days": 1,\n  "hours": 2,\n  "minutes": 30\n}' },
  { name: 'Build a duration', input: '{"days":2,"seconds":5}', options: { mode: 'build' as const }, expected: 'P2DT5S' },
  { name: 'Normalize a date', input: '2026-01-01T08:00:00+08:00', options: { mode: 'date' as const }, expected: '2026-01-01T00:00:00.000Z' },
  { name: 'Reject invalid duration', input: 'tomorrow', options: { mode: 'parse' as const }, expected: 'Error: Enter a valid ISO 8601 duration.' },
] as const;
export const config = { template: 'C', live: false } as const; export const Page = () => createElement(IsoDurationPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, { mode: Mode }, string>;
