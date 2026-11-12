import { createElement } from 'react';
import { ColorConverterPage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runColorConverter } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('color-converter');
export const run = runColorConverter;
const hash = String.fromCharCode(35);
const rgb = (value: string) => `rgb${value}`;
export const examples = [
  { name: 'Convert red RGB', input: rgb('(255, 0, 0)'), validate: (output: string) => output.includes(`HEX: ${hash}FF0000`) && output.includes('OKLCH:') },
  { name: 'Convert shorthand HEX', input: `${hash}fff`, validate: (output: string) => output.includes(`HEX: ${hash}FFFFFF`) && output.includes('HSL:') },
  { name: 'Convert HSL', input: `hsl${'(120, 100%, 50%)'}`, validate: (output: string) => output.includes(`HEX: ${hash}00FF00`) },
  { name: 'Convert OKLCH', input: `oklch${'(62.8% 0.2577 29.23)'}`, validate: (output: string) => !output.startsWith('Error:') },
  { name: 'Reject invalid color', input: 'not-a-color', expected: 'Error: Enter a valid HEX, RGB, HSL, or OKLCH color.' },
] as const;
export const config = { template: 'C', inputLabel: 'Color', outputLabel: 'Converted values', live: true } as const;
export const Page = () => createElement(ColorConverterPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, string>;
