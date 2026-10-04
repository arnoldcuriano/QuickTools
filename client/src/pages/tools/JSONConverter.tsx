import { useCallback, useState } from 'react';
import { saveAs } from 'file-saver';
import { convertJson, type JSONConverterOptions } from '../../utils/jsonConverter';
import { getTool } from '../../data/toolCatalog';
import { Button, DataTool, Field, OutputBlock, SettingsPanel, TextInput } from '../../components/ui/ToolPage';

const tool = getTool('json-converter');
const samples = ['{"name":"John","age":30,"city":"New York"}', '{"id":1,"title":"Hello","active":true}', '{"items":["apple","banana","orange"]}'];

const JSONConverter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'beautify' | 'minify'>('beautify');
  const [error, setError] = useState('');
  const [sizeReduction, setSizeReduction] = useState('');

  const formatJson = useCallback(async (text: string, nextMode: 'beautify' | 'minify') => {
    const options: JSONConverterOptions = { mode: nextMode, indent: 2 };
    const result = await convertJson(text, options);
    setOutput(result.result);
    setError(result.error || '');
    setSizeReduction(!result.error && nextMode === 'minify' && text.length > result.result.length ? `Size reduced by ${(((text.length - result.result.length) / text.length) * 100).toFixed(1)}% (${text.length} to ${result.result.length} characters)` : '');
  }, []);

  const setFormat = (next: 'beautify' | 'minify') => { if (mode !== next) { setMode(next); setInput(''); setOutput(''); setError(''); setSizeReduction(''); } };
  const switchFormat = () => { const next = mode === 'beautify' ? 'minify' : 'beautify'; setMode(next); if (input.trim()) void formatJson(input, next); };
  const clearAll = () => { setInput(''); setOutput(''); setError(''); setSizeReduction(''); };

  return <DataTool tool={tool} settings={<SettingsPanel>
    <Field label="Format"><div className="tool-actions"><Button variant={mode === 'beautify' ? 'primary' : 'secondary'} onClick={() => setFormat('beautify')}>Beautify</Button><Button variant="ghost" onClick={switchFormat}>Switch</Button><Button variant={mode === 'minify' ? 'primary' : 'secondary'} onClick={() => setFormat('minify')}>Minify</Button></div></Field>
    <Button variant="secondary" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>Copy output</Button>
    <Button variant="secondary" onClick={() => saveAs(new Blob([output], { type: 'application/json' }), 'quicktools.json')} disabled={!output}>Download</Button>
    <Button variant="ghost" onClick={clearAll} disabled={!input && !output}>Clear all</Button>
  </SettingsPanel>}>
    <div className="input-output-grid">
      <Field label="Input JSON" hint={`${input.length} characters`}><TextInput value={input} onChange={(event) => { setInput(event.target.value); void formatJson(event.target.value, mode); }} placeholder="Paste JSON here" /></Field>
      <OutputBlock label="Formatted JSON" value={output} />
    </div>
    <div className="tool-actions" aria-label="Sample JSON">{samples.map((sample) => <Button variant="ghost" key={sample} onClick={() => { setInput(sample); void formatJson(sample, mode); }}>{sample.slice(0, 24)}...</Button>)}</div>
    {sizeReduction && <p className="tool-notice">{sizeReduction}</p>}
    {error && <p className="tool-notice" role="alert">{error}</p>}
  </DataTool>;
};

export default JSONConverter;
