import { useMemo, useState } from 'react';
import { saveAs } from 'file-saver';
import { type DelimitedFormat, convertDelimitedText, parseDelimitedText, summarizeDelimitedRows } from '../../utils/delimitedText';
import { getTool } from '../../data/toolCatalog';
import { Button, DataTool, Field, OutputBlock, SettingsPanel, TextInput } from '../../components/ui/ToolPage';

const tool = getTool('csv-tsv-converter');
const sample = 'name,role,location\n"QuickTools","Browser app","Local machine"';

const CSVTSVConverter = () => {
  const [input, setInput] = useState(sample);
  const [source, setSource] = useState<DelimitedFormat>('csv');
  const [target, setTarget] = useState<DelimitedFormat>('tsv');
  const result = useMemo(() => { try { const rows = parseDelimitedText(input, source); return { output: input.trim() ? convertDelimitedText(input, source, target) : '', rows, error: '' }; } catch (error) { return { output: '', rows: [], error: error instanceof Error ? error.message : 'Unable to parse delimited text.' }; } }, [input, source, target]);
  const summary = summarizeDelimitedRows(result.rows);

  return <DataTool tool={tool} settings={<SettingsPanel>
    <Field label="Source format"><select value={source} onChange={(event) => setSource(event.target.value as DelimitedFormat)}><option value="csv">CSV</option><option value="tsv">TSV</option></select></Field>
    <Field label="Output format"><select value={target} onChange={(event) => setTarget(event.target.value as DelimitedFormat)}><option value="csv">CSV</option><option value="tsv">TSV</option></select></Field>
    <Button variant="secondary" onClick={() => { setSource(target); setTarget(source); }}>Swap formats</Button>
    <Button variant="secondary" onClick={() => navigator.clipboard.writeText(result.output)} disabled={!result.output}>Copy output</Button>
    <Button variant="secondary" onClick={() => saveAs(new Blob([result.output], { type: 'text/plain' }), `quicktools.${target}`)} disabled={!result.output}>Download</Button>
    <Button variant="ghost" onClick={() => setInput('')} disabled={!input}>Clear</Button>
    <p className="tool-notice">{summary.rowCount} rows · {summary.columnCount} columns</p>
  </SettingsPanel>}>
    <div className="input-output-grid"><Field label="Input"><TextInput value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Converted output" value={result.output} /></div>
    <div className="tool-actions"><Button variant="ghost" onClick={() => { setSource('csv'); setTarget('tsv'); setInput(sample); }}>Load sample CSV</Button><Button variant="ghost" onClick={() => { setSource('tsv'); setTarget('csv'); setInput('name\trole\tlocation\nQuickTools\tBrowser app\tLocal machine'); }}>Load sample TSV</Button></div>
    <OutputBlock label="Table preview" value={result.output}><div className="table-preview"><table><tbody>{result.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div></OutputBlock>
    {result.error && <p className="tool-notice" role="alert">{result.error}</p>}
  </DataTool>;
};

export default CSVTSVConverter;
