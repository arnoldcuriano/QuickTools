import { createElement } from 'react';
import { XmlFormatterPage } from '../../components/tool-templates/TextBatchOnePages';
import { getTool } from '../../generated/toolRegistry';
import { formatXml } from '../text-formatter';
import type { ToolModule } from '../types';
export const meta = getTool('xml-formatter'); export const run = (input: string) => input.trim() ? formatXml(input.trim()) : 'Error: Enter XML to format.';
export const examples = [{ name: 'Format nested XML', input: '<root><item>value</item></root>', expected: '<root>\n  <item>value</item>\n</root>' }, { name: 'Keep a single element', input: '<item />', expected: '<item/>' }, { name: 'Reject invalid XML', input: '<root>', expected: 'Error: Enter valid XML to format.' }, { name: 'Reject empty XML', input: '', expected: 'Error: Enter XML to format.' }] as const;
export const config = { template: 'T', live: true } as const; export const Page = () => createElement(XmlFormatterPage, { run }); export default { meta, run, examples, config, Page } satisfies ToolModule<string, undefined, string>;
