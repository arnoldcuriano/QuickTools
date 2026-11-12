import { createElement } from 'react';
import { QueryParserPage } from '../../components/tool-templates/PilotToolPages';
import { getTool } from '../../generated/toolRegistry';
import { runQueryParser } from '../pilotLogic';
import type { ToolModule } from '../types';

export const meta = getTool('query-string-parser');
export const run = runQueryParser;
export const examples = [
  { name: 'Parse two values', input: '?page=2&sort=name', expected: '{\n  "page": "2",\n  "sort": "name"\n}' },
  { name: 'Collect repeated keys', input: 'tag=a&tag=b', expected: '{\n  "tag": [\n    "a",\n    "b"\n  ]\n}' },
  { name: 'Reject empty input', input: '', expected: 'Error: Enter a query string.' },
] as const;
export const config = { template: 'D', inputLabel: 'Query string', outputLabel: 'Parsed JSON', live: true } as const;
export const Page = () => createElement(QueryParserPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, string>;
