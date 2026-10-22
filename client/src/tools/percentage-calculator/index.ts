import { createElement } from 'react';
import { PercentagePage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runPercentage, type PercentageMode } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('percentage-calculator');
export const run = runPercentage;
export const examples = [
  { name: 'Calculate percent of value', input: { first: 25, second: 80 }, options: { mode: 'percent-of' as const }, expected: '20' },
  { name: 'Calculate percentage change', input: { first: 50, second: 75 }, options: { mode: 'change' as const }, expected: '50%' },
  { name: 'Reject zero starting value', input: { first: 0, second: 10 }, options: { mode: 'change' as const }, expected: 'Error: The starting value cannot be zero.' },
] as const;
export const config = { template: 'C', inputLabel: 'Values', outputLabel: 'Result', live: true } as const;
export const Page = () => createElement(PercentagePage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<{ first: number; second: number }, { mode: PercentageMode }, string>;
