import { useEffect, useMemo, useRef, useState } from 'react';
import { getTool } from '../../data/toolCatalog';
import {
  Button,
  CalculatorTool,
  DataTool,
  Dropzone,
  Field,
  FileList,
  FileTool,
  GeneratorTool,
  OutputBlock,
  ReferenceTool,
  SettingsPanel,
  TextInput,
  TextTool,
} from '../ui/ToolPage';
import type { CaseMode, HttpStatus, PasswordOptions, PercentageMode, TextMode, TimestampMode, UuidOptions } from '../../tools/pilotLogic';

const copy = (value: string) => navigator.clipboard.writeText(value);
const errorText = (value: string) => value.startsWith('Error:') ? value : '';

interface TextTransformProps<Mode extends string> {
  toolId: string;
  modes: readonly { value: Mode; label: string }[];
  initialMode: Mode;
  inputLabel?: string;
  outputLabel?: string;
  run: (input: string, options: { mode: Mode }) => string;
}
export const TextTransformPage = <Mode extends string>({ toolId, modes, initialMode, inputLabel = 'Input', outputLabel = 'Output', run }: TextTransformProps<Mode>) => {
  const tool = getTool(toolId); const [input, setInput] = useState(''); const [mode, setMode] = useState(initialMode);
  const output = useMemo(() => input ? run(input, { mode }) : '', [input, mode, run]);
  return <TextTool tool={tool} settings={<SettingsPanel>
    <Field label="Mode"><select value={mode} onChange={(event) => setMode(event.target.value as Mode)}>{modes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></Field>
    <Button variant="secondary" onClick={() => void copy(output)} disabled={!output || Boolean(errorText(output))}>Copy output</Button>
    <Button variant="ghost" onClick={() => setInput('')} disabled={!input}>Clear</Button>
  </SettingsPanel>}>
    <div className="input-output-grid"><Field label={inputLabel}><TextInput value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label={outputLabel} value={output} onCopy={output && !errorText(output) ? () => void copy(output) : undefined} /></div>
    {errorText(output) && <p className="tool-notice" role="alert">{output}</p>}
  </TextTool>;
};

export const UrlCodecPage = ({ run }: { run: (input: string, options: { mode: TextMode }) => string }) => <TextTransformPage toolId="url-encoder-decoder" modes={[{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }]} initialMode="encode" run={run} />;
export const CaseConverterPage = ({ run }: { run: (input: string, options: { mode: CaseMode }) => string }) => <TextTransformPage toolId="case-converter" modes={[{ value: 'upper', label: 'UPPER CASE' }, { value: 'lower', label: 'lower case' }, { value: 'title', label: 'Title Case' }, { value: 'camel', label: 'camelCase' }, { value: 'snake', label: 'snake_case' }]} initialMode="title" run={run} />;

export const WordCounterPage = ({ run }: { run: (input: string) => { words: number; characters: number; sentences: number; paragraphs: number } | string }) => {
  const tool = getTool('word-counter'); const [input, setInput] = useState(''); const result = input ? run(input) : null; const counts = typeof result === 'object' && result ? result : { words: 0, characters: 0, sentences: 0, paragraphs: 0 };
  const output = `Words: ${counts.words}\nCharacters: ${counts.characters}\nSentences: ${counts.sentences}\nParagraphs: ${counts.paragraphs}`;
  return <TextTool tool={tool} settings={<SettingsPanel><p className="tool-notice">Counts update as you type.</p><Button variant="ghost" onClick={() => setInput('')} disabled={!input}>Clear</Button></SettingsPanel>}>
    <div className="input-output-grid"><Field label="Text"><TextInput value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Counts" value={output} /></div>
    {typeof result === 'string' && <p className="tool-notice" role="alert">{result}</p>}
  </TextTool>;
};

export const QueryParserPage = ({ run }: { run: (input: string) => string }) => {
  const tool = getTool('query-string-parser'); const [input, setInput] = useState(''); const output = input ? run(input) : '';
  return <DataTool tool={tool} settings={<SettingsPanel><p className="tool-notice">Repeated keys become arrays.</p><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || Boolean(errorText(output))}>Copy JSON</Button><Button variant="ghost" onClick={() => setInput('')} disabled={!input}>Clear</Button></SettingsPanel>}>
    <div className="input-output-grid"><Field label="Query string"><TextInput value={input} onChange={(event) => setInput(event.target.value)} placeholder="?page=2&amp;sort=name" /></Field><OutputBlock label="Parsed JSON" value={output} /></div>
    {errorText(output) && <p className="tool-notice" role="alert">{output}</p>}
  </DataTool>;
};

export const TimestampPage = ({ run }: { run: (input: string, options: { mode: TimestampMode }) => string }) => {
  const tool = getTool('unix-timestamp-converter'); const [input, setInput] = useState(''); const [mode, setMode] = useState<TimestampMode>('to-date'); const output = input ? run(input, { mode }) : '';
  return <CalculatorTool tool={tool} settings={<SettingsPanel><Field label="Conversion"><select value={mode} onChange={(event) => { setMode(event.target.value as TimestampMode); setInput(''); }}><option value="to-date">Timestamp to date</option><option value="to-timestamp">Date to timestamp</option></select></Field><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || Boolean(errorText(output))}>Copy result</Button></SettingsPanel>}>
    <Field label={mode === 'to-date' ? 'Unix timestamp (seconds)' : 'Date'}><input className="ui-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder={mode === 'to-date' ? '0' : '2026-01-01T00:00:00Z'} /></Field><OutputBlock label="Result" value={output} />{errorText(output) && <p className="tool-notice" role="alert">{output}</p>}
  </CalculatorTool>;
};

export const PercentagePage = ({ run }: { run: (input: { first: number; second: number }, options: { mode: PercentageMode }) => string }) => {
  const tool = getTool('percentage-calculator'); const [first, setFirst] = useState(''); const [second, setSecond] = useState(''); const [mode, setMode] = useState<PercentageMode>('percent-of');
  const output = first && second ? run({ first: Number(first), second: Number(second) }, { mode }) : '';
  const labels = mode === 'percent-of' ? ['Percent', 'Value'] : mode === 'change' ? ['Starting value', 'Final value'] : ['First value', 'Second value'];
  return <CalculatorTool tool={tool} settings={<SettingsPanel><Field label="Calculation"><select value={mode} onChange={(event) => setMode(event.target.value as PercentageMode)}><option value="percent-of">Percent of a value</option><option value="change">Percentage change</option><option value="difference">Percentage difference</option></select></Field><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || Boolean(errorText(output))}>Copy result</Button></SettingsPanel>}>
    <div className="input-output-grid"><Field label={labels[0]}><input className="ui-input" type="number" value={first} onChange={(event) => setFirst(event.target.value)} /></Field><Field label={labels[1]}><input className="ui-input" type="number" value={second} onChange={(event) => setSecond(event.target.value)} /></Field></div><OutputBlock label="Result" value={output} />{errorText(output) && <p className="tool-notice" role="alert">{output}</p>}
  </CalculatorTool>;
};

export const ColorConverterPage = ({ run }: { run: (input: string) => string }) => {
  const tool = getTool('color-converter'); const [input, setInput] = useState(''); const output = input ? run(input) : '';
  const example = `rgb${'(24, 120, 200)'}`;
  return <CalculatorTool tool={tool} settings={<SettingsPanel><p className="tool-notice">Accepts HEX, RGB, HSL, and OKLCH input.</p><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || Boolean(errorText(output))}>Copy values</Button><Button variant="ghost" onClick={() => setInput('')} disabled={!input}>Clear</Button></SettingsPanel>}>
    <Field label="Color value"><input className="ui-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder={example} /></Field><OutputBlock label="Converted values" value={output} />{errorText(output) && <p className="tool-notice" role="alert">{output}</p>}
  </CalculatorTool>;
};

export const HttpStatusPage = ({ run }: { run: (input: string) => readonly HttpStatus[] | string }) => {
  const tool = getTool('http-status-codes'); const [query, setQuery] = useState(''); const result = run(query); const results = Array.isArray(result) ? result : [];
  return <ReferenceTool tool={tool} settings={<SettingsPanel><p className="tool-notice">{results.length} matching status codes.</p><Button variant="ghost" onClick={() => setQuery('')} disabled={!query}>Clear search</Button></SettingsPanel>}>
    <Field label="Search status codes"><input className="ui-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="404 or not found" /></Field>
    <div className="reference-table-wrap"><table className="reference-table"><thead><tr><th scope="col">Code</th><th scope="col">Name</th><th scope="col">Meaning</th></tr></thead><tbody>{results.map((status) => <tr key={status.code}><td>{status.code}</td><th scope="row">{status.name}</th><td>{status.meaning}</td></tr>)}</tbody></table>{typeof result === 'string' && <p className="tool-notice" role="alert">{result}</p>}</div>
  </ReferenceTool>;
};

export const UuidPage = ({ run }: { run: (input: string, options: UuidOptions) => string }) => {
  const tool = getTool('uuid-generator'); const [version, setVersion] = useState<UuidOptions['version']>('v4'); const [count, setCount] = useState(5); const [output, setOutput] = useState('');
  const generate = () => setOutput(run('', { version, count }));
  return <GeneratorTool tool={tool} settings={<SettingsPanel><Field label="Version"><select value={version} onChange={(event) => setVersion(event.target.value as UuidOptions['version'])}><option value="v4">UUID v4</option><option value="v7">UUID v7</option></select></Field><Field label="Count" value={count}><input className="ui-input" type="number" min="1" max="100" value={count} onChange={(event) => setCount(Number(event.target.value))} /></Field><Button variant="primary" onClick={generate}>Generate UUIDs</Button><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || Boolean(errorText(output))}>Copy output</Button></SettingsPanel>}>
    <OutputBlock label="Generated UUIDs" value={output} />{errorText(output) && <p className="tool-notice" role="alert">{output}</p>}
  </GeneratorTool>;
};

export const PasswordPage = ({ run }: { run: (input: string, options: PasswordOptions) => string }) => {
  const tool = getTool('password-generator'); const [options, setOptions] = useState<PasswordOptions>({ length: 16, lowercase: true, uppercase: true, numbers: true, symbols: true }); const [output, setOutput] = useState('');
  const setFlag = (key: keyof PasswordOptions, value: boolean | number) => setOptions((current) => ({ ...current, [key]: value }));
  return <GeneratorTool tool={tool} settings={<SettingsPanel><Field label="Length" value={options.length}><input className="ui-input" type="number" min="8" max="128" value={options.length} onChange={(event) => setFlag('length', Number(event.target.value))} /></Field>{(['lowercase', 'uppercase', 'numbers', 'symbols'] as const).map((key) => <label className="choice-row" key={key}><input type="checkbox" checked={options[key]} onChange={(event) => setFlag(key, event.target.checked)} /><span>{key[0].toUpperCase() + key.slice(1)}</span></label>)}<Button variant="primary" onClick={() => setOutput(run('', options))}>Generate password</Button><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || Boolean(errorText(output))}>Copy password</Button></SettingsPanel>}>
    <OutputBlock label="Generated password" value={output} />{errorText(output) && <p className="tool-notice" role="alert">{output}</p>}
  </GeneratorTool>;
};

export const JpgToPngPage = ({ run }: { run: (input: { name: string; type: string }) => string }) => {
  const tool = getTool('jpg-to-png'); const [file, setFile] = useState<File | null>(null); const [outputUrl, setOutputUrl] = useState(''); const [message, setMessage] = useState(''); const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => () => { if (outputUrl) URL.revokeObjectURL(outputUrl); }, [outputUrl]);
  const choose = (selected?: File) => { if (!selected) return; const result = run({ name: selected.name, type: selected.type }); setMessage(errorText(result)); if (!errorText(result)) setFile(selected); };
  const convert = async () => {
    if (!file) return; const name = run({ name: file.name, type: file.type });
    const image = new Image(); const source = URL.createObjectURL(file);
    image.onload = () => { const canvas = document.createElement('canvas'); canvas.width = image.naturalWidth; canvas.height = image.naturalHeight; canvas.getContext('2d')?.drawImage(image, 0, 0); canvas.toBlob((blob) => { URL.revokeObjectURL(source); if (!blob) return setMessage('Error: The browser could not convert this image.'); if (outputUrl) URL.revokeObjectURL(outputUrl); setOutputUrl(URL.createObjectURL(blob)); setMessage(name); }, 'image/png'); };
    image.onerror = () => { URL.revokeObjectURL(source); setMessage('Error: The image could not be read.'); }; image.src = source;
  };
  const download = () => { if (!outputUrl || !file) return; const anchor = document.createElement('a'); anchor.href = outputUrl; anchor.download = run({ name: file.name, type: file.type }); anchor.click(); };
  return <FileTool tool={tool} settings={<SettingsPanel><Button variant="primary" onClick={() => void convert()} disabled={!file}>Convert image</Button><Button variant="secondary" onClick={download} disabled={!outputUrl}>Download PNG</Button><Button variant="ghost" onClick={() => { setFile(null); setOutputUrl(''); setMessage(''); }} disabled={!file}>Clear</Button></SettingsPanel>}>
    <Dropzone><div><strong>Choose a JPG image</strong><p>Processing stays in your browser.</p><Button variant="secondary" onClick={() => inputRef.current?.click()}>Choose image</Button><input ref={inputRef} className="sr-only" type="file" accept="image/jpeg,.jpg,.jpeg" aria-label="Choose a JPG image" onChange={(event) => choose(event.target.files?.[0])} /></div></Dropzone>
    <FileList>{file && <p>{file.name}</p>}</FileList>{outputUrl && <OutputBlock label="PNG preview" value={message}><img src={outputUrl} alt="Converted PNG preview" /></OutputBlock>}{message && !outputUrl && <p className="tool-notice" role={errorText(message) ? 'alert' : undefined}>{message}</p>}
  </FileTool>;
};
