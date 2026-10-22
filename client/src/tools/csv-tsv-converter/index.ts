import CSVTSVConverter from '../../pages/tools/CSVTSVConverter';
import { getTool } from '../../generated/toolRegistry';
import { convertDelimitedText, type DelimitedFormat } from '../../utils/delimitedText';
import type { ToolModule } from '../types';

export interface Options { from: DelimitedFormat; to: DelimitedFormat }
export const meta = getTool('csv-tsv-converter');
export const run = (input: string, options: Options = { from: 'csv', to: 'tsv' }) => convertDelimitedText(input, options.from, options.to);
export const examples = [
  { name: 'Convert CSV to TSV', input: 'name,role\nQuickTools,Workbench', options: { from: 'csv' as const, to: 'tsv' as const }, expected: 'name\trole\nQuickTools\tWorkbench' },
] as const;
export const config = { template: 'D', inputLabel: 'Delimited data', outputLabel: 'Converted data' } as const;
export const Page = CSVTSVConverter;
export default { meta, run, examples, config, Page } satisfies ToolModule<string, Options, string>;
