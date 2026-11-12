import { useMemo, useState, type ReactNode } from 'react';
import { emojiEntries, specialCharacters } from '../../data/textReferences';
import { getTool } from '../../data/toolCatalog';
import type { ReferenceEntry } from '../../data/developerReferences';
import { socialLimits, type FancyStyle, type ReverseMode, type SocialPlatform, type TransformMode } from '../../utils/textBatchOne';
import { Button, CalculatorTool, Field, OutputBlock, ReferenceTool, SettingsPanel, TextInput, TextTool } from '../ui/ToolPage';

const copy = (value: string) => navigator.clipboard.writeText(value);
const isError = (value: string) => value.startsWith('Error:');

interface SimpleTextPageProps<Options> {
  toolId: string;
  run: (input: string, options: Options) => string;
  options: Options;
  settings?: ReactNode;
  note?: string;
  inputLabel?: string;
  outputLabel?: string;
}
const SimpleTextPage = <Options,>({ toolId, run, options, settings, note, inputLabel = 'Input', outputLabel = 'Output' }: SimpleTextPageProps<Options>) => {
  const tool = getTool(toolId); const [input, setInput] = useState(''); const output = input ? run(input, options) : '';
  return <TextTool tool={tool} settings={<SettingsPanel>{settings}{note && <p className="tool-notice">{note}</p>}<Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy output</Button><Button variant="ghost" onClick={() => setInput('')} disabled={!input}>Clear</Button></SettingsPanel>}>
    <div className="input-output-grid"><Field label={inputLabel}><TextInput value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label={outputLabel} value={output} onCopy={output && !isError(output) ? () => void copy(output) : undefined} /></div>
    {isError(output) && <p className="tool-notice" role="alert">{output}</p>}
  </TextTool>;
};

type StringRun = (input: string) => string;
export const XmlFormatterPage = ({ run }: { run: StringRun }) => <SimpleTextPage toolId="xml-formatter" run={(input) => run(input)} options={undefined} inputLabel="XML" outputLabel="Formatted XML" />;
export const CharacterCounterPage = ({ run }: { run: StringRun }) => <SimpleTextPage toolId="character-counter" run={(input) => run(input)} options={undefined} outputLabel="Counts" />;
export const RemoveExtraSpacesPage = ({ run }: { run: StringRun }) => <SimpleTextPage toolId="remove-extra-spaces" run={(input) => run(input)} options={undefined} />;
export const RemoveLineBreaksPage = ({ run }: { run: StringRun }) => <SimpleTextPage toolId="remove-line-breaks" run={(input) => run(input)} options={undefined} />;
export const ReadabilityPage = ({ run }: { run: StringRun }) => <SimpleTextPage toolId="readability-score" run={(input) => run(input)} options={undefined} note="Uses the English Flesch Reading Ease and Flesch-Kincaid Grade Level formulas." outputLabel="English readability" />;
export const KeywordDensityPage = ({ run }: { run: StringRun }) => <SimpleTextPage toolId="keyword-density" run={(input) => run(input)} options={undefined} outputLabel="Density by word" />;
export const WordFrequencyPage = ({ run }: { run: StringRun }) => <SimpleTextPage toolId="word-frequency-counter" run={(input) => run(input)} options={undefined} outputLabel="Ranked words" />;
export const NatoPage = ({ run }: { run: StringRun }) => <SimpleTextPage toolId="nato-phonetic-alphabet" run={(input) => run(input)} options={undefined} outputLabel="NATO spelling" />;
export const HtmlToTextPage = ({ run }: { run: StringRun }) => <SimpleTextPage toolId="html-to-text" run={(input) => run(input)} options={undefined} inputLabel="HTML" outputLabel="Readable text" />;
export const PalindromePage = ({ run }: { run: StringRun }) => <SimpleTextPage toolId="palindrome-checker" run={(input) => run(input)} options={undefined} outputLabel="Result" />;
export const BionicPage = ({ run }: { run: StringRun }) => {
  const tool = getTool('bionic-reading-converter'); const [input, setInput] = useState(''); const output = input ? run(input) : '';
  return <TextTool tool={tool} settings={<SettingsPanel><p className="tool-notice">The copied output is safe HTML with the first half of each word wrapped in strong tags.</p><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy HTML</Button><Button variant="ghost" onClick={() => setInput('')} disabled={!input}>Clear</Button></SettingsPanel>}><div className="input-output-grid"><Field label="Text"><TextInput value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Preview" value={output} onCopy={output && !isError(output) ? () => void copy(output) : undefined}>{output && !isError(output) ? <p dangerouslySetInnerHTML={{ __html: output }} /> : <pre tabIndex={0}>Output appears here.</pre>}</OutputBlock></div>{isError(output) && <p className="tool-notice" role="alert">{output}</p>}</TextTool>;
};

export const AddLineNumbersPage = ({ run }: { run: (input: string, options: { start: number; separator: string }) => string }) => {
  const [start, setStart] = useState(1); const [separator, setSeparator] = useState('. ');
  return <SimpleTextPage toolId="add-line-numbers" run={run} options={{ start, separator }} settings={<><Field label="Start"><input className="ui-input" type="number" value={start} onChange={(event) => setStart(Number(event.target.value))} /></Field><Field label="Separator"><input className="ui-input" value={separator} onChange={(event) => setSeparator(event.target.value)} /></Field></>} />;
};

export const ReverseTextPage = ({ run }: { run: (input: string, options: { mode: ReverseMode }) => string }) => {
  const [mode, setMode] = useState<ReverseMode>('characters');
  return <SimpleTextPage toolId="reverse-text" run={run} options={{ mode }} settings={<Field label="Reverse"><select value={mode} onChange={(event) => setMode(event.target.value as ReverseMode)}><option value="characters">Characters</option><option value="words">Words</option><option value="lines">Lines</option></select></Field>} />;
};

export const TextRepeaterPage = ({ run }: { run: (input: string, options: { count: number; separator: string }) => string }) => {
  const [count, setCount] = useState(2); const [separator, setSeparator] = useState('\\n');
  return <SimpleTextPage toolId="text-repeater" run={run} options={{ count, separator }} settings={<><Field label="Repeats"><input className="ui-input" type="number" min="1" max="100" value={count} onChange={(event) => setCount(Number(event.target.value))} /></Field><Field label="Separator" hint="Use \\n for a new line."><input className="ui-input" value={separator} onChange={(event) => setSeparator(event.target.value)} /></Field></>} />;
};

export const ReadingTimePage = ({ run }: { run: (input: string, options: { readingWpm: number; speakingWpm: number }) => string }) => {
  const [readingWpm, setReadingWpm] = useState(200); const [speakingWpm, setSpeakingWpm] = useState(130);
  return <SimpleTextPage toolId="reading-time-estimator" run={run} options={{ readingWpm, speakingWpm }} settings={<><Field label="Reading WPM"><input className="ui-input" type="number" min="1" value={readingWpm} onChange={(event) => setReadingWpm(Number(event.target.value))} /></Field><Field label="Speaking WPM"><input className="ui-input" type="number" min="1" value={speakingWpm} onChange={(event) => setSpeakingWpm(Number(event.target.value))} /></Field></>} outputLabel="Estimate" />;
};

export const FancyTextPage = ({ run }: { run: (input: string, options: { style: FancyStyle }) => string }) => {
  const [style, setStyle] = useState<FancyStyle>('bold');
  return <SimpleTextPage toolId="fancy-text-generator" run={run} options={{ style }} settings={<Field label="Style"><select value={style} onChange={(event) => setStyle(event.target.value as FancyStyle)}><option value="bold">Mathematical bold</option><option value="sans">Mathematical sans-serif</option><option value="monospace">Mathematical monospace</option></select></Field>} note="Uses Unicode mathematical alphanumeric characters. Some platforms and fonts may not render them." />;
};

const CodecPage = ({ toolId, run, note }: { toolId: string; run: (input: string, options: { mode: TransformMode }) => string; note?: string }) => {
  const [mode, setMode] = useState<TransformMode>('encode');
  return <SimpleTextPage toolId={toolId} run={run} options={{ mode }} settings={<Field label="Mode"><select value={mode} onChange={(event) => setMode(event.target.value as TransformMode)}><option value="encode">Encode</option><option value="decode">Decode</option></select></Field>} note={note} />;
};
export const MorseCodePage = ({ run }: { run: (input: string, options: { mode: TransformMode }) => string }) => <CodecPage toolId="morse-code-translator" run={run} />;
export const BinaryTextPage = ({ run }: { run: (input: string, options: { mode: TransformMode }) => string }) => <CodecPage toolId="binary-text-converter" run={run} />;

export const CaesarPage = ({ run }: { run: (input: string, options: { mode: TransformMode; shift: number }) => string }) => {
  const [mode, setMode] = useState<TransformMode>('encode'); const [shift, setShift] = useState(13);
  return <SimpleTextPage toolId="rot13-and-caesar-cipher" run={run} options={{ mode, shift }} settings={<><Field label="Mode"><select value={mode} onChange={(event) => setMode(event.target.value as TransformMode)}><option value="encode">Encode</option><option value="decode">Decode</option></select></Field><Field label="Shift"><input className="ui-input" type="number" value={shift} onChange={(event) => setShift(Number(event.target.value))} /></Field></>} note="For learning only. Caesar and ROT13 are not secure encryption." />;
};

export const VigenerePage = ({ run }: { run: (input: string, options: { mode: TransformMode; key: string }) => string }) => {
  const [mode, setMode] = useState<TransformMode>('encode'); const [key, setKey] = useState('KEY');
  return <SimpleTextPage toolId="vigenere-cipher" run={run} options={{ mode, key }} settings={<><Field label="Mode"><select value={mode} onChange={(event) => setMode(event.target.value as TransformMode)}><option value="encode">Encode</option><option value="decode">Decode</option></select></Field><Field label="Keyword"><input className="ui-input" value={key} onChange={(event) => setKey(event.target.value)} /></Field></>} note="For learning only. Vigenere is not secure encryption." />;
};

const CalculatorPage = ({ toolId, run, note }: { toolId: string; run: StringRun; note?: string }) => {
  const tool = getTool(toolId); const [input, setInput] = useState(''); const output = input ? run(input) : '';
  return <CalculatorTool tool={tool} settings={<SettingsPanel>{note && <p className="tool-notice">{note}</p>}<Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy result</Button></SettingsPanel>}><Field label="Value"><input className="ui-input" value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Result" value={output} />{isError(output) && <p className="tool-notice" role="alert">{output}</p>}</CalculatorTool>;
};
export const NumberToWordsPage = ({ run }: { run: StringRun }) => <CalculatorPage toolId="number-to-words" run={run} />;
export const PesoWordsPage = ({ run }: { run: StringRun }) => <CalculatorPage toolId="peso-amount-in-words" run={run} note="Check-writing format: words, Peso/Pesos, optional Centavos, then Only." />;

export const RomanNumeralPage = ({ run }: { run: (input: string, options: { mode: 'to-roman' | 'from-roman' }) => string }) => {
  const tool = getTool('roman-numeral-converter'); const [input, setInput] = useState(''); const [mode, setMode] = useState<'to-roman' | 'from-roman'>('to-roman'); const output = input ? run(input, { mode }) : '';
  return <CalculatorTool tool={tool} settings={<SettingsPanel><Field label="Conversion"><select value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}><option value="to-roman">Number to Roman</option><option value="from-roman">Roman to number</option></select></Field><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy result</Button></SettingsPanel>}><Field label={mode === 'to-roman' ? 'Number' : 'Roman numeral'}><input className="ui-input" value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Result" value={output} />{isError(output) && <p className="tool-notice" role="alert">{output}</p>}</CalculatorTool>;
};

export const AnagramPage = ({ run }: { run: (input: { first: string; second: string }) => string }) => {
  const tool = getTool('anagram-checker'); const [first, setFirst] = useState(''); const [second, setSecond] = useState(''); const output = first || second ? run({ first, second }) : '';
  return <TextTool tool={tool} settings={<SettingsPanel><Button variant="ghost" onClick={() => { setFirst(''); setSecond(''); }} disabled={!first && !second}>Clear</Button></SettingsPanel>}><div className="input-output-grid"><Field label="First word or phrase"><TextInput value={first} onChange={(event) => setFirst(event.target.value)} /></Field><Field label="Second word or phrase"><TextInput value={second} onChange={(event) => setSecond(event.target.value)} /></Field></div><OutputBlock label="Result" value={output} />{isError(output) && <p className="tool-notice" role="alert">{output}</p>}</TextTool>;
};

const PickerPage = ({ toolId, entries, run }: { toolId: string; entries: readonly ReferenceEntry[]; run: (input: string) => readonly ReferenceEntry[] | string }) => {
  const tool = getTool(toolId); const [query, setQuery] = useState(''); const result = useMemo(() => run(query), [query, run]); const rows = Array.isArray(result) ? result : [];
  return <ReferenceTool tool={tool} settings={<SettingsPanel><p className="tool-notice">Select a symbol to copy it.</p><Button variant="ghost" onClick={() => setQuery('')} disabled={!query}>Clear search</Button></SettingsPanel>}>
    <Field label="Search"><input className="ui-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></Field>
    <div className="reference-table-wrap"><table className="reference-table"><thead><tr><th scope="col">Character</th><th scope="col">Name</th><th scope="col">Description</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.key}-${row.name}`}><td><Button variant="ghost" title={`Copy ${row.name}`} onClick={() => void copy(row.key)}>{row.key}</Button></td><th scope="row">{row.name}</th><td>{row.description}</td></tr>)}</tbody></table>{typeof result === 'string' && <p className="tool-notice" role="alert">{result}</p>}</div>
    <span className="sr-only">{entries.length} available entries</span>
  </ReferenceTool>;
};
export const SpecialCharactersPage = ({ run }: { run: (input: string) => readonly ReferenceEntry[] | string }) => <PickerPage toolId="special-characters" entries={specialCharacters} run={run} />;
export const EmojiPickerPage = ({ run }: { run: (input: string) => readonly ReferenceEntry[] | string }) => <PickerPage toolId="emoji-picker" entries={emojiEntries} run={run} />;

export const SocialLimitsPage = ({ run }: { run: (input: string, options: { platform: SocialPlatform }) => string }) => {
  const tool = getTool('social-character-limits'); const [input, setInput] = useState(''); const [platform, setPlatform] = useState<SocialPlatform>('x'); const output = input ? run(input, { platform }) : '';
  return <CalculatorTool tool={tool} settings={<SettingsPanel><Field label="Platform"><select value={platform} onChange={(event) => setPlatform(event.target.value as SocialPlatform)}>{Object.entries(socialLimits).map(([id, item]) => <option key={id} value={id}>{item.name}</option>)}</select></Field><p className="tool-notice">Limits can vary by account tier and platform changes.</p><Button variant="secondary" onClick={() => void copy(output)} disabled={!output || isError(output)}>Copy result</Button></SettingsPanel>}><Field label="Text"><TextInput value={input} onChange={(event) => setInput(event.target.value)} /></Field><OutputBlock label="Limit check" value={output} />{isError(output) && <p className="tool-notice" role="alert">{output}</p>}</CalculatorTool>;
};
