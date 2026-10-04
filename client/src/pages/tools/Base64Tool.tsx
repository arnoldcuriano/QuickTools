import { useCallback, useState } from 'react';
import { getTool } from '../../data/toolCatalog';
import { Button, Field, OutputBlock, SettingsPanel, TextInput, TextTool } from '../../components/ui/ToolPage';

const tool = getTool('base64');
const samples = {
  encode: ['Hello, World!', 'QuickTools is awesome!', 'https://example.com/api/data'],
  decode: ['SGVsbG8sIFdvcmxkIQ==', 'UXVpY2tUb29scyBpcyBhd2Vzb21lIQ=='],
};

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const processText = useCallback((text: string, operation: 'encode' | 'decode') => {
    setError('');
    if (!text.trim()) return setOutput('');
    try {
      setOutput(operation === 'encode' ? btoa(unescape(encodeURIComponent(text))) : decodeURIComponent(escape(atob(text))));
    } catch {
      setError(operation === 'decode' ? 'Invalid Base64 string.' : 'Error encoding text.');
      setOutput('');
    }
  }, []);

  const changeMode = (next: 'encode' | 'decode') => { if (mode !== next) { setMode(next); setInput(''); setOutput(''); setError(''); } };
  const switchMode = () => { const next = mode === 'encode' ? 'decode' : 'encode'; setMode(next); setInput(output); setOutput(input); if (output.trim()) processText(output, next); };
  const clearAll = () => { setInput(''); setOutput(''); setError(''); };

  return <TextTool tool={tool} settings={<SettingsPanel>
    <Field label="Mode"><div className="tool-actions"><Button variant={mode === 'encode' ? 'primary' : 'secondary'} onClick={() => changeMode('encode')}>Encode</Button><Button variant="ghost" onClick={switchMode}>Switch</Button><Button variant={mode === 'decode' ? 'primary' : 'secondary'} onClick={() => changeMode('decode')}>Decode</Button></div></Field>
    <Button variant="ghost" onClick={clearAll} disabled={!input && !output && !error}>Clear all</Button>
  </SettingsPanel>}>
    <div className="input-output-grid">
      <Field label={mode === 'encode' ? 'Text to encode' : 'Base64 to decode'} hint={`${input.length} characters`}><TextInput value={input} onChange={(event) => { setInput(event.target.value); processText(event.target.value, mode); }} placeholder="Enter text here" /></Field>
      <OutputBlock label={mode === 'encode' ? 'Base64 encoded' : 'Decoded text'} value={output} onCopy={() => navigator.clipboard.writeText(output)} />
    </div>
    <div className="tool-actions" aria-label="Sample inputs">{samples[mode].map((sample) => <Button variant="ghost" key={sample} onClick={() => { setInput(sample); processText(sample, mode); }}>{sample.length > 24 ? `${sample.slice(0, 24)}...` : sample}</Button>)}</div>
    {error && <p className="tool-notice" role="alert">{error}</p>}
  </TextTool>;
};

export default Base64Tool;
