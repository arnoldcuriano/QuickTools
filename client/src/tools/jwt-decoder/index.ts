import { createElement } from 'react';
import { JwtDecoderPage } from '../../components/tool-templates/DeveloperBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { runJwtDecoder } from '../../utils/developerBatchOne';
import type { ToolModule } from '../types';

export const meta = getTool('jwt-decoder'); export const run = runJwtDecoder;
export const examples = [
  { name: 'Decode header and payload', input: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjMifQ.signature', validate: (output: string) => output.includes('"alg": "none"') && output.includes('"sub": "123"') },
  { name: 'Decode an empty payload object', input: 'eyJhbGciOiJub25lIn0.e30.signature', validate: (output: string) => output.includes('"payload": {}') },
  { name: 'Reject malformed JWT', input: 'not-a-jwt', expected: 'Error: Enter a JWT with three dot-separated sections.' },
] as const;
export const config = { template: 'T', live: false } as const; export const Page = () => createElement(JwtDecoderPage, { run });
export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, string>;
