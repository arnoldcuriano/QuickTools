import { createElement } from 'react';
import { TimestampPage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runTimestamp, type TimestampMode } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('unix-timestamp-converter');
export const run = runTimestamp;
export const examples = [
  { name: 'Convert Unix epoch', input: '0', options: { mode: 'to-date' as const }, expected: '1970-01-01T00:00:00.000Z' },
  { name: 'Convert date to timestamp', input: '1970-01-01T00:00:01Z', options: { mode: 'to-timestamp' as const }, expected: '1' },
  { name: 'Reject invalid date', input: 'not-a-date', options: { mode: 'to-timestamp' as const }, expected: 'Error: Enter a valid date.' },
] as const;
export const config = { template: 'C', inputLabel: 'Value', outputLabel: 'Result', live: true } as const;
export const Page = () => createElement(TimestampPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, { mode: TimestampMode }, string>;
