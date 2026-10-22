import { createElement } from 'react';
import { CurlToFetchPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runCurlToFetch } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('curl-to-fetch-converter'); export const run = runCurlToFetch;
export const examples = [
  { name: 'Convert GET request', input: 'curl https://example.com/data', expected: 'fetch("https://example.com/data");' },
  { name: 'Convert POST request', input: "curl -X POST -H 'Content-Type: application/json' -d '{\"ok\":true}' https://example.com", validate: (output: string) => output.includes('method: "POST"') && output.includes('Content-Type') && output.includes('body:') },
  { name: 'Reject unsupported option', input: 'curl --user name:secret https://example.com', expected: 'Error: Unsupported cURL option: --user.' },
] as const;
export const config = { template: 'T', live: false } as const; export const Page = () => createElement(CurlToFetchPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, string>;
