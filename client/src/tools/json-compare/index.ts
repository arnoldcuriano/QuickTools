import JSONCompare from '../../pages/tools/JSONCompare';
import { getTool } from '../../generated/toolRegistry';
import { compareJsonTexts } from '../../utils/jsonCompare';
import type { ToolModule } from '../types';

export interface Input { left: string; right: string }
export const meta = getTool('json-compare');
export const run = (input: Input) => compareJsonTexts(input.left, input.right).summary.changed;
export const examples = [
  { name: 'Find one changed value', input: { left: '{"version":1}', right: '{"version":2}' }, expected: 1 },
] as const;
export const config = { template: 'D', inputLabel: 'JSON documents', outputLabel: 'Differences', live: true } as const;
export const Page = JSONCompare;
export default { meta, run, examples, config, Page } satisfies ToolModule<Input, undefined, number>;
