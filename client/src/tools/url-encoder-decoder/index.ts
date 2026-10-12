import { createElement } from 'react';
import { UrlCodecPage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runUrlCodec, type TextMode } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('url-encoder-decoder');
export const run = runUrlCodec;
export const examples = [
  { name: 'Encode a query value', input: 'hello world', options: { mode: 'encode' as const }, expected: 'hello%20world' },
  { name: 'Decode a query value', input: 'name%3DQuickTools', options: { mode: 'decode' as const }, expected: 'name=QuickTools' },
  { name: 'Reject invalid encoding', input: '%E0%A4%A', options: { mode: 'decode' as const }, expected: 'Error: The encoded value is invalid.' },
] as const;
export const config = { template: 'T', inputLabel: 'Input', outputLabel: 'Output', live: true } as const;
export const Page = () => createElement(UrlCodecPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, { mode: TextMode }, string>;
