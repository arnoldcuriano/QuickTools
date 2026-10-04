import { useMemo, useState } from 'react';
import { compareJsonTexts, formatJsonCompareValue } from '../../utils/jsonCompare';
import { getTool } from '../../data/toolCatalog';
import { Button, DataTool, Field, OutputBlock, SettingsPanel, TextInput } from '../../components/ui/ToolPage';

const tool = getTool('json-compare');
const sampleLeft = '{"name":"QuickTools","version":"1.0"}';
const sampleRight = '{"name":"QuickTools","version":"1.1"}';

const JSONCompare = () => {
  const [left, setLeft] = useState(sampleLeft);
  const [right, setRight] = useState(sampleRight);
  const result = useMemo(() => compareJsonTexts(left, right), [left, right]);
  const output = result.differences.map((difference) => `${difference.kind.toUpperCase()} ${difference.path}\n- ${formatJsonCompareValue(difference.leftValue)}\n+ ${formatJsonCompareValue(difference.rightValue)}`).join('\n\n');

  return <DataTool tool={tool} settings={<SettingsPanel>
    <p className="tool-notice">Added {result.summary.added} · Removed {result.summary.removed} · Changed {result.summary.changed}</p>
    <Button variant="secondary" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>Copy differences</Button>
    <Button variant="ghost" onClick={() => { setLeft(''); setRight(''); }}>Clear all</Button>
  </SettingsPanel>}>
    <div className="input-output-grid"><Field label="Left JSON"><TextInput value={left} onChange={(event) => setLeft(event.target.value)} /></Field><Field label="Right JSON"><TextInput value={right} onChange={(event) => setRight(event.target.value)} /></Field></div>
    <OutputBlock label="Differences" value={output} />
    {result.error && <p className="tool-notice" role="alert">{result.error}</p>}
  </DataTool>;
};

export default JSONCompare;
