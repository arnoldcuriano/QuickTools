import { createElement } from 'react';
import { UuidPage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runUuidGenerator, type UuidOptions } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('uuid-generator');
export const run = runUuidGenerator;
export const examples = [
  { name: 'Generate one UUID v4', input: '', options: { version: 'v4' as const, count: 1 }, validate: (output: string) => /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/u.test(output) },
  { name: 'Generate two UUID v7 values', input: '', options: { version: 'v7' as const, count: 2 }, validate: (output: string) => output.split('\n').length === 2 && output.split('\n').every((value) => /^[\da-f]{8}-[\da-f]{4}-7[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/u.test(value)) },
  { name: 'Reject invalid count', input: '', options: { version: 'v4' as const, count: 0 }, expected: 'Error: Count must be between 1 and 100.' },
] as const;
export const config = { template: 'G', outputLabel: 'UUIDs', live: false } as const;
export const Page = () => createElement(UuidPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, UuidOptions, string>;
