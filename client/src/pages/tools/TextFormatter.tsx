import { useCallback, useState } from 'react';
import { format as prettierFormat } from 'prettier/standalone';
import babelParser from 'prettier/plugins/babel';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import { html as beautifyHtml } from 'js-beautify';
import { getTool } from '../../data/toolCatalog';
import { Button, Field, OutputBlock, SettingsPanel, TextInput, TextTool } from '../../components/ui/ToolPage';

type Format = 'json' | 'xml' | 'html' | 'text';
const tool = getTool('text-formatter');
const samples: Record<Format, string[]> = {
  json: ['{"name":"John","age":30,"city":"New York"}'],
  xml: ['<root><name>John</name><age>30</age></root>'],
  html: ['<div><h1>Welcome</h1><p>Hello</p></div>'],
  text: ['   Messy    text   with   extra    spaces.   '],
};
const formatXml = (value: string) => {
  try {
    const formatted = value.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3');
    let depth = 0;
    return formatted.split('\r\n').map((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) indent = 0;
      else if (node.match(/^<\/\w/) && depth > 0) depth -= 1;
      else if (node.match(/^<\w[^>]*[^/]>.*$/)) indent = 1;
      const line = `${'  '.repeat(depth)}${node}`;
      depth += indent;
      return line;
    }).join('\n');
  } catch { return value; }
};

const TextFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [format, setFormat] = useState<Format>('json');
  const [error, setError] = useState('');

  const run = useCallback(async (value: string, type: Format) => {
    setError('');
    const trimmed = value.trim();
    if (!trimmed) return setOutput('');
    try {
      if (type === 'json') {
        const json = JSON.stringify(JSON.parse(trimmed), null, 2);
        try { setOutput(await prettierFormat(json, { parser: 'json', plugins: [babelParser], printWidth: 80, tabWidth: 2, useTabs: false, semi: false, singleQuote: false, trailingComma: 'none' })); } catch { setOutput(json); }
      } else if (type === 'xml') {
        try { setOutput(formatXml(new XMLSerializer().serializeToString(new DOMParser().parseFromString(trimmed, 'text/xml')))); } catch { setOutput(formatXml(trimmed)); }
      } else if (type === 'html') {
        setOutput(beautifyHtml(trimmed, { indent_size: 2, indent_char: ' ', max_preserve_newlines: 2, preserve_newlines: true, indent_scripts: 'normal', end_with_newline: false, wrap_line_length: 0, indent_inner_html: false }));
      } else {
        const formatted = trimmed.split('\n').map((line) => line.trim()).filter((line, index, lines) => line !== '' || Boolean(lines[index - 1] && lines[index + 1] && lines[index - 1] !== '' && lines[index + 1] !== '')).map((line) => {
          if (!line || line.length <= 80) return line;
          const wrapped: string[] = []; let current = '';
          for (const word of line.split(' ')) { if (current.length + word.length + 1 <= 80) current += `${current ? ' ' : ''}${word}`; else { if (current) wrapped.push(current); current = word; } }
          if (current) wrapped.push(current);
          return wrapped.join('\n');
        }).join('\n').replace(/\n{3,}/g, '\n\n');
        setOutput(formatted);
      }
    } catch (caught) { setError(`Invalid ${type.toUpperCase()} input: ${caught instanceof Error ? caught.message : 'Unknown formatting error'}`); setOutput(''); }
  }, []);

  const changeFormat = (next: Format) => { setFormat(next); setInput(''); setOutput(''); setError(''); };
  return <TextTool tool={tool} settings={<SettingsPanel>
    <Field label="Mode"><select value={format} onChange={(event) => changeFormat(event.target.value as Format)}><option value="json">JSON</option><option value="xml">XML</option><option value="html">HTML</option><option value="text">Plain text</option></select></Field>
    <Button variant="secondary" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>Copy output</Button>
    <Button variant="ghost" onClick={() => { setInput(''); setOutput(''); setError(''); }}>Clear all</Button>
  </SettingsPanel>}>
    <div className="input-output-grid"><Field label="Input"><TextInput value={input} onChange={(event) => { setInput(event.target.value); void run(event.target.value, format); }} /></Field><OutputBlock label="Formatted output" value={output} /></div>
    <div className="tool-actions" aria-label="Sample inputs">{samples[format].map((sample) => <Button variant="ghost" key={sample} onClick={() => { setInput(sample); void run(sample, format); }}>Load sample {format.toUpperCase()}</Button>)}</div>
    {error && <p className="tool-notice" role="alert">{error}</p>}
  </TextTool>;
};

export default TextFormatter;
