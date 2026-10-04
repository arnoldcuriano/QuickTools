import { useMemo, useState } from 'react';
import { analyseRegexText, buildRegexFlags, splitTextByMatches } from '../../utils/regexTools';
import { getTool } from '../../data/toolCatalog';
import { Button, Field, OutputBlock, SettingsPanel, TextInput, TextTool } from '../../components/ui/ToolPage';

const tool = getTool('regex-tester');
const options = [['global', 'g'], ['ignoreCase', 'i'], ['multiline', 'm'], ['dotAll', 's'], ['unicode', 'u']] as const;

const RegexTester = () => {
  const [pattern, setPattern] = useState('\\bQuickTools\\b');
  const [text, setText] = useState('QuickTools runs in the browser. QuickTools keeps data local.');
  const [selected, setSelected] = useState({ global: true, ignoreCase: false, multiline: false, dotAll: false, unicode: false });
  const flags = buildRegexFlags({ ...selected, sticky: false });
  const analysis = useMemo(() => analyseRegexText(text, pattern, flags), [flags, pattern, text]);
  const segments = useMemo(() => splitTextByMatches(text, analysis.matches), [analysis.matches, text]);

  return <TextTool tool={tool} settings={<SettingsPanel>
    <Field label="Flags"><div className="tool-actions">{options.map(([key, label]) => <label key={key}><input type="checkbox" checked={selected[key]} onChange={(event) => setSelected((current) => ({ ...current, [key]: event.target.checked }))} /> /{label}</label>)}</div></Field>
    <p className="tool-notice">{analysis.totalMatches} matches · /{flags}/</p>
    <Button variant="ghost" onClick={() => { setPattern(''); setText(''); }}>Reset</Button>
  </SettingsPanel>}>
    <Field label="Pattern"><input className="ui-input" value={pattern} onChange={(event) => setPattern(event.target.value)} placeholder="Enter regex pattern" /></Field>
    <div className="input-output-grid"><Field label="Test input"><TextInput value={text} onChange={(event) => setText(event.target.value)} /></Field><OutputBlock label="Highlighted preview" value=""><div className="text-input" aria-label="Highlighted matches">{segments.map((segment) => <span key={segment.key} className={segment.matched ? 'match-highlight' : ''}>{segment.text}</span>)}</div></OutputBlock></div>
    <OutputBlock label="Matches" value={String(analysis.totalMatches)}><div className="result-list">{analysis.matches.length ? analysis.matches.map((match, index) => <div key={`${match.start}-${index}`}><strong>Match {index + 1} at {match.start}-{match.end}</strong><code>{match.text}</code>{match.groups.map((group, groupIndex) => <code key={groupIndex}>Group {groupIndex + 1}: {group || 'empty'}</code>)}</div>) : <p>No matches to show.</p>}</div></OutputBlock>
    {analysis.error && <p className="tool-notice" role="alert">{analysis.error}</p>}
  </TextTool>;
};

export default RegexTester;
