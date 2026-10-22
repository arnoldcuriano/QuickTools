import JSONConverter from '../../pages/tools/JSONConverter';
import { getTool } from '../../generated/toolRegistry';
import { convertJson, type JSONConverterOptions } from '../../utils/jsonConverter';
import type { ToolModule } from '../types';

export type Options = JSONConverterOptions;
export const meta = getTool('json-converter');
export const run = async (input: string, options: Options = { mode: 'beautify', indent: 2 }) => (await convertJson(input, options)).result;
export const examples = [
  { name: 'Minify JSON', input: '{ "ready": true }', options: { mode: 'minify' as const }, expected: '{"ready":true}' },
] as const;
export const config = { template: 'D', inputLabel: 'Input JSON', outputLabel: 'Formatted JSON' } as const;
export const Page = JSONConverter;
export default { meta, run, examples, config, Page } satisfies ToolModule<string, Options, string>;
