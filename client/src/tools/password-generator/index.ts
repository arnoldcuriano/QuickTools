import { createElement } from 'react';
import { PasswordPage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runPasswordGenerator, type PasswordOptions } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('password-generator');
export const run = runPasswordGenerator;
export const examples = [
  { name: 'Generate a strong password', input: '', options: { length: 16, lowercase: true, uppercase: true, numbers: true, symbols: true }, validate: (output: string) => output.length === 16 && /[a-z]/u.test(output) && /[A-Z]/u.test(output) && /\d/u.test(output) },
  { name: 'Generate letters only', input: '', options: { length: 12, lowercase: true, uppercase: false, numbers: false, symbols: false }, validate: (output: string) => /^[a-z]{12}$/u.test(output) },
  { name: 'Reject empty character sets', input: '', options: { length: 16, lowercase: false, uppercase: false, numbers: false, symbols: false }, expected: 'Error: Select at least one character set.' },
] as const;
export const config = { template: 'G', outputLabel: 'Password', live: false } as const;
export const Page = () => createElement(PasswordPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, PasswordOptions, string>;
