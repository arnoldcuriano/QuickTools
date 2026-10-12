import { createElement } from 'react';
import { WordCounterPage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runWordCounter, type WordCounts } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('word-counter');
export const run = runWordCounter;
export const examples = [
  { name: 'Count a sentence', input: 'QuickTools works well.', expected: { words: 3, characters: 22, sentences: 1, paragraphs: 1 } },
  { name: 'Count paragraphs', input: 'First paragraph.\n\nSecond paragraph!', expected: { words: 4, characters: 35, sentences: 2, paragraphs: 2 } },
  { name: 'Reject empty text', input: '', expected: 'Error: Enter text to count.' },
] as const;
export const config = { template: 'T', inputLabel: 'Text', outputLabel: 'Counts', live: true } as const;
export const Page = () => createElement(WordCounterPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, WordCounts | string>;
