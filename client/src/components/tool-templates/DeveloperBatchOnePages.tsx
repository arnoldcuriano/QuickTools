import { useMemo, useState } from 'react';
import { asciiEntries, gitCommands, httpHeaders, mimeTypes, regexSyntax, type ReferenceEntry } from '../../data/developerReferences';
import { getTool } from '../../data/toolCatalog';
import type { EncodeMode, HmacAlgorithm, NumberBase } from '../../utils/developerBatchOne';
import { Button, CalculatorTool, Field, OutputBlock, ReferenceTool, SettingsPanel, TextInput, TextTool } from '../ui/ToolPage';

const copy = (value: string) => navigator.clipboard.writeText(value);
const isError = (value: string) => value.startsWith('Error:');

interface TextPageProps<Mode extends string> {
  toolId: string;
  run: (input: string, options: { mode: Mode }) => string | Promise<string>;
  modes?: readonly { value: Mode; label: string }[];
  initialMode: Mode;
  note?: string;
}
const TextPage = <Mode extends string>({ toolId, run, modes, initialMode, note }: TextPageProps<Mode>) => {
  const tool = getTool(toolId); const [input, setInput] = useState(''); const [output, setOutput] = useState(''); const [mode, setMode] = useState(initialMode);
  const execute = async () => setOutput(await run(input, { mode }));
  return <TextTool tool={tool} settings={<SettingsPanel>
    {modes && <Field label="Mode"><select value={mode} onChange={(event) => setMode(event.target.value as Mode)}>{modes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></Field>}
    {note && <p className="tool-notice">{note}</p>}
    <Button variant="primary" onClick={() => void execute()}>Run</Button><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy output</Button><Button variant="ghost" onClick={() => { setInput(''); setOutput(''); }}>Clear</Button>
  </SettingsPanel>}>
    <div className="input-output-grid"><Field label="Input"><TextInput value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock value={output} /></div>
    {isError(output) && <p className="tool-notice" role="alert">{output}</p>}
  </TextTool>;
};

const encodeModes = [{ value: 'encode', label: 'Encode' }, { value: 'decode', label: 'Decode' }] as const;
export const HtmlEntitiesPage = ({ run }: { run: TextPageProps<EncodeMode>['run'] }) => <TextPage toolId="html-entity-encoder-decoder" run={run} modes={encodeModes} initialMode="encode" />;
export const JwtDecoderPage = ({ run }: { run: (input: string) => string }) => <TextPage toolId="jwt-decoder" run={(input) => run(input)} initialMode="decode" note="Decodes header and payload only. It does not verify the signature." />;
export const CssFormatterPage = ({ run }: { run: TextPageProps<'beautify' | 'minify'>['run'] }) => <TextPage toolId="css-formatter-and-minifier" run={run} modes={[{ value: 'beautify', label: 'Beautify' }, { value: 'minify', label: 'Minify' }]} initialMode="beautify" />;
export const CurlToFetchPage = ({ run }: { run: (input: string) => string }) => <TextPage toolId="curl-to-fetch-converter" run={(input) => run(input)} initialMode="convert" />;
export const CookieParserPage = ({ run }: { run: (input: string) => string }) => <TextPage toolId="cookie-parser" run={(input) => run(input)} initialMode="parse" />;
export const StringEscapePage = ({ run }: { run: TextPageProps<EncodeMode>['run'] }) => <TextPage toolId="string-escape-unescape" run={run} modes={[{ value: 'encode', label: 'Escape' }, { value: 'decode', label: 'Unescape' }]} initialMode="encode" />;
export const Base32Page = ({ run }: { run: TextPageProps<EncodeMode>['run'] }) => <TextPage toolId="base32-encoder-decoder" run={run} modes={encodeModes} initialMode="encode" />;
export const HexPage = ({ run }: { run: TextPageProps<EncodeMode>['run'] }) => <TextPage toolId="hex-encoder-decoder" run={run} modes={encodeModes} initialMode="encode" />;

export const HmacPage = ({ run }: { run: (input: string, options: { secret: string; algorithm: HmacAlgorithm }) => Promise<string> }) => {
  const tool = getTool('hmac-generator'); const [input, setInput] = useState(''); const [secret, setSecret] = useState(''); const [algorithm, setAlgorithm] = useState<HmacAlgorithm>('SHA-256'); const [output, setOutput] = useState('');
  return <TextTool tool={tool} settings={<SettingsPanel><Field label="Secret"><input className="ui-input" type="password" value={secret} onChange={(event) => setSecret(event.target.value)} /></Field><Field label="Algorithm"><select value={algorithm} onChange={(event) => setAlgorithm(event.target.value as HmacAlgorithm)}><option>SHA-256</option><option>SHA-512</option></select></Field><Button variant="primary" onClick={() => void run(input, { secret, algorithm }).then(setOutput)}>Generate HMAC</Button><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy output</Button></SettingsPanel>}>
    <div className="input-output-grid"><Field label="Text"><TextInput value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Hex signature" value={output} /></div>{isError(output) && <p className="tool-notice" role="alert">{output}</p>}
  </TextTool>;
};

export const SlugPage = ({ run }: { run: (input: string, options: { separator: '-' | '_' }) => string }) => {
  const tool = getTool('slug-generator'); const [input, setInput] = useState(''); const [separator, setSeparator] = useState<'-' | '_'>('-'); const output = input ? run(input, { separator }) : '';
  return <TextTool tool={tool} settings={<SettingsPanel><Field label="Separator"><select value={separator} onChange={(event) => setSeparator(event.target.value as '-' | '_')}><option value="-">Hyphen</option><option value="_">Underscore</option></select></Field><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy slug</Button></SettingsPanel>}><div className="input-output-grid"><Field label="Title"><TextInput value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Slug" value={output} /></div></TextTool>;
};

interface ReferencePageProps { toolId: string; run: (input: string) => readonly ReferenceEntry[] | string; initial?: readonly ReferenceEntry[]; note?: string }
const ReferencePage = ({ toolId, run, initial = [], note }: ReferencePageProps) => {
  const tool = getTool(toolId); const [query, setQuery] = useState(''); const result = useMemo(() => query ? run(query) : initial, [initial, query, run]); const rows = Array.isArray(result) ? result : [];
  return <ReferenceTool tool={tool} settings={<SettingsPanel><p className="tool-notice">{note ?? `${rows.length} entries shown.`}</p><Button variant="ghost" onClick={() => setQuery('')} disabled={!query}>Clear search</Button></SettingsPanel>}>
    <Field label="Search"><input className="ui-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></Field>
    <div className="reference-table-wrap"><table className="reference-table"><thead><tr><th scope="col">Value</th><th scope="col">Name</th><th scope="col">Description</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.key}-${row.name}`}><td>{row.key}</td><th scope="row">{row.name}</th><td>{row.description}</td></tr>)}</tbody></table>{typeof result === 'string' && <p className="tool-notice" role="alert">{result}</p>}</div>
  </ReferenceTool>;
};

export const MimeLookupPage = ({ run }: { run: ReferencePageProps['run'] }) => <ReferencePage toolId="mime-types-lookup" run={run} initial={mimeTypes} />;
export const AsciiTablePage = ({ run }: { run: ReferencePageProps['run'] }) => <ReferencePage toolId="ascii-table" run={run} initial={asciiEntries} />;
export const UnicodeLookupPage = ({ run }: { run: ReferencePageProps['run'] }) => <ReferencePage toolId="unicode-character-lookup" run={run} note="Searches by character or code point. Unicode names are not available from browser APIs." />;
export const GitCheatSheetPage = ({ run }: { run: ReferencePageProps['run'] }) => <ReferencePage toolId="git-command-cheat-sheet" run={run} initial={gitCommands} />;
export const HttpHeadersPage = ({ run }: { run: ReferencePageProps['run'] }) => <ReferencePage toolId="http-headers-reference" run={run} initial={httpHeaders} />;
export const RegexCheatSheetPage = ({ run }: { run: ReferencePageProps['run'] }) => <ReferencePage toolId="regex-cheat-sheet" run={run} initial={regexSyntax} />;

export const ChmodPage = ({ run }: { run: (input: string, options: { mode: 'to-octal' | 'to-symbolic' }) => string }) => {
  const tool = getTool('chmod-calculator'); const [input, setInput] = useState(''); const [mode, setMode] = useState<'to-octal' | 'to-symbolic'>('to-symbolic'); const output = input ? run(input, { mode }) : '';
  return <CalculatorTool tool={tool} settings={<SettingsPanel><Field label="Conversion"><select value={mode} onChange={(event) => { setMode(event.target.value as typeof mode); setInput(''); }}><option value="to-symbolic">Octal to symbolic</option><option value="to-octal">Symbolic to octal</option></select></Field><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy result</Button></SettingsPanel>}><Field label={mode === 'to-symbolic' ? 'Octal permissions' : 'Symbolic permissions'}><input className="ui-input" value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Result" value={output} /></CalculatorTool>;
};

export const NumberBasePage = ({ run }: { run: (input: string, options: { from: NumberBase; to: NumberBase }) => string }) => {
  const tool = getTool('number-base-converter'); const [input, setInput] = useState(''); const [from, setFrom] = useState<NumberBase>(10); const [to, setTo] = useState<NumberBase>(16); const output = input ? run(input, { from, to }) : '';
  const bases: NumberBase[] = [2, 8, 10, 16];
  return <CalculatorTool tool={tool} settings={<SettingsPanel><Field label="From base"><select value={from} onChange={(event) => setFrom(Number(event.target.value) as NumberBase)}>{bases.map((base) => <option key={base} value={base}>{base}</option>)}</select></Field><Field label="To base"><select value={to} onChange={(event) => setTo(Number(event.target.value) as NumberBase)}>{bases.map((base) => <option key={base} value={base}>{base}</option>)}</select></Field><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy result</Button></SettingsPanel>}><Field label="Integer"><input className="ui-input" value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Converted value" value={output} /></CalculatorTool>;
};

export const IsoDurationPage = ({ run }: { run: (input: string, options: { mode: 'parse' | 'build' | 'date' }) => string }) => {
  const tool = getTool('iso-8601-duration-parser'); const [input, setInput] = useState(''); const [mode, setMode] = useState<'parse' | 'build' | 'date'>('parse'); const output = input ? run(input, { mode }) : '';
  const label = mode === 'parse' ? 'ISO 8601 duration' : mode === 'build' ? 'Duration JSON' : 'ISO 8601 date';
  return <CalculatorTool tool={tool} settings={<SettingsPanel><Field label="Mode"><select value={mode} onChange={(event) => { setMode(event.target.value as typeof mode); setInput(''); }}><option value="parse">Parse duration</option><option value="build">Build from JSON</option><option value="date">Normalize date</option></select></Field><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy result</Button></SettingsPanel>}><Field label={label}><TextInput value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Result" value={output} /></CalculatorTool>;
};
