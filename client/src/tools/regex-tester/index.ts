import RegexTester from '../../pages/tools/RegexTester';
import { getTool } from '../../generated/toolRegistry';
import { analyseRegexText } from '../../utils/regexTools';
import type { ToolModule } from '../types';

export interface Input { text: string; pattern: string }
export interface Options { flags: string }
export const meta = getTool('regex-tester');
export const run = (input: Input, options: Options = { flags: 'g' }) => analyseRegexText(input.text, input.pattern, options.flags).totalMatches;
export const examples = [
  { name: 'Count global matches', input: { text: 'tool tool', pattern: 'tool' }, options: { flags: 'g' }, expected: 2 },
] as const;
export const config = { template: 'T', inputLabel: 'Test input', outputLabel: 'Matches', live: true } as const;
export const Page = RegexTester;
export default { meta, run, examples, config, Page } satisfies ToolModule<Input, Options, number>;
