import { createElement } from 'react';
import { CaseConverterPage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runCaseConverter, type CaseMode } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('case-converter');
export const run = runCaseConverter;
export const examples = [
  { name: 'Create title case', input: 'quick tools workbench', options: { mode: 'title' as const }, expected: 'Quick Tools Workbench' },
  { name: 'Create camel case', input: 'quick tools workbench', options: { mode: 'camel' as const }, expected: 'quickToolsWorkbench' },
  { name: 'Reject empty text', input: '   ', options: { mode: 'snake' as const }, expected: 'Error: Enter text to convert.' },
] as const;
export const config = { template: 'T', inputLabel: 'Text', outputLabel: 'Converted text', live: true } as const;
export const Page = () => createElement(CaseConverterPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, { mode: CaseMode }, string>;
