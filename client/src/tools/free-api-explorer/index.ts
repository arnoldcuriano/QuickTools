import FreeApiExplorer from '../../pages/tools/FreeApiExplorer';
import { getTool } from '../../generated/toolRegistry';
import { getFreeApiPreset } from '../../data/freeApis';
import { buildApiUrl } from '../../utils/apiExplorer';
import type { ToolModule } from '../types';

export interface Input { presetId: string; parameters: Record<string, string> }
export const meta = getTool('free-api-explorer');
export const run = (input: Input) => buildApiUrl(getFreeApiPreset(input.presetId), input.parameters);
export const examples = [
  { name: 'Build a public API request', input: { presetId: 'jsonplaceholder', parameters: { resource: 'todos', id: '1' } }, validate: (output: string) => output.startsWith('https://') },
] as const;
export const config = { template: 'C', inputLabel: 'Request', outputLabel: 'Response' } as const;
export const Page = FreeApiExplorer;
export default { meta, run, examples, config, Page } satisfies ToolModule<Input, undefined, string>;
