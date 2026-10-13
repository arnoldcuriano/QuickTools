import { createElement } from 'react';
import { CookieParserPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runCookieParser } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('cookie-parser'); export const run = runCookieParser;
export const examples = [
  { name: 'Parse cookie pairs', input: 'theme=dark; session=abc123', expected: '{\n  "theme": "dark",\n  "session": "abc123"\n}' },
  { name: 'Preserve equals in values', input: 'token=a=b=c', expected: '{\n  "token": "a=b=c"\n}' },
  { name: 'Reject empty input', input: '', expected: 'Error: Enter a Cookie header.' },
] as const;
export const config = { template: 'T', live: false } as const; export const Page = () => createElement(CookieParserPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, string>;
