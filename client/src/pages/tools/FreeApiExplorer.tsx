import { useEffect, useMemo, useRef, useState } from 'react';
import { getTool, toolCategories, type ToolCategory } from '../../data/toolCatalog';
import { freeApiPresets, getFreeApiPreset } from '../../data/freeApis';
import { ApiExplorerError, buildRequestSnippet, createParameterValues, sendApiRequest, type ApiExplorerResult } from '../../utils/apiExplorer';
import { formatFileSize } from '../../utils/formatFileSize';
import { Button, DataTool, Field, OutputBlock, SettingsPanel } from '../../components/ui/ToolPage';

const tool = getTool('free-api-explorer');
type CategoryFilter = 'All' | ToolCategory;
const errorLabels = {
  cors: 'CORS blocked', network: 'Network error', 'rate-limit': 'Rate limited', timeout: 'Request timeout', 'invalid-json': 'Invalid JSON', request: 'Request failed',
};

const FreeApiExplorer = () => {
  const [presetId, setPresetId] = useState(freeApiPresets[0].id);
  const [values, setValues] = useState(createParameterValues(freeApiPresets[0]));
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [response, setResponse] = useState<ApiExplorerResult | null>(null);
  const [error, setError] = useState<{ label: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [snippetFormat, setSnippetFormat] = useState<'fetch' | 'curl'>('fetch');
  const [imageUrl, setImageUrl] = useState('');
  const imageUrlRef = useRef('');
  const preset = getFreeApiPreset(presetId);

  const filteredPresets = useMemo(() => freeApiPresets.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const searchText = `${item.name} ${item.description} ${item.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.trim().toLowerCase());
  }), [category, query]);

  const groupedPresets = useMemo(() => toolCategories
    .filter((item): item is ToolCategory => item !== 'All')
    .map((item) => ({ category: item, presets: filteredPresets.filter((presetItem) => presetItem.category === item) }))
    .filter((group) => group.presets.length), [filteredPresets]);

  const replaceImageUrl = (blob?: Blob) => {
    if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    const nextUrl = blob ? URL.createObjectURL(blob) : '';
    imageUrlRef.current = nextUrl;
    setImageUrl(nextUrl);
  };

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    };
  }, []);

  const selectPreset = (nextId: string) => {
    const next = getFreeApiPreset(nextId);
    setPresetId(nextId);
    setValues(createParameterValues(next));
    setResponse(null);
    setError(null);
    replaceImageUrl();
  };

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);
    replaceImageUrl();
    try {
      const nextResponse = await sendApiRequest(preset, values);
      setResponse(nextResponse);
      replaceImageUrl(nextResponse.blob);
    }
    catch (caught) {
      const apiError = caught instanceof ApiExplorerError ? caught : new ApiExplorerError('network', 'The request failed.');
      setError({ label: errorLabels[apiError.kind], message: apiError.message });
    } finally { setLoading(false); }
  };

  const snippet = buildRequestSnippet(preset, values, snippetFormat);
  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${preset.id}.${response?.blob?.type.includes('svg') ? 'svg' : 'jpg'}`;
    link.click();
  };

  return <DataTool
    tool={tool}
    activityLabel={`Sends requests to ${preset.name}`}
    settings={<SettingsPanel>
      <div className="preset-details">
        <strong>Preset: {preset.name}</strong>
        <p>{preset.description}</p>
        <dl><div><dt>Method</dt><dd>{preset.method}</dd></div><div><dt>CORS</dt><dd>{preset.cors === 'yes' ? 'Yes' : 'No'}</dd></div><div><dt>Example path</dt><dd>{preset.exampleResponsePath}</dd></div></dl>
        <p>{preset.rateLimitNote}</p>
        <a className="ui-button ui-button-secondary" href={preset.docsUrl} target="_blank" rel="noopener noreferrer">Provider docs<span className="sr-only"> (opens in a new tab)</span></a>
      </div>
      <Field label="Snippet format"><div className="tool-actions"><Button variant={snippetFormat === 'fetch' ? 'primary' : 'secondary'} onClick={() => setSnippetFormat('fetch')}>fetch</Button><Button variant={snippetFormat === 'curl' ? 'primary' : 'secondary'} onClick={() => setSnippetFormat('curl')}>curl</Button></div></Field>
      <pre className="request-snippet" tabIndex={0}>{snippet}</pre>
      <Button variant="secondary" data-sound="copied" onClick={() => navigator.clipboard.writeText(snippet)}>Copy as {snippetFormat}</Button>
    </SettingsPanel>}
  >
    <section className="request-builder" aria-labelledby="request-builder-title">
      <div className="output-block-header"><h2 id="request-builder-title">Request builder</h2></div>
      <div className="request-builder-content">
        <div className="preset-filters">
          <Field label="Search presets"><input className="ui-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></Field>
          <Field label="Category"><select value={category} onChange={(event) => setCategory(event.target.value as CategoryFilter)}>{toolCategories.map((item) => <option key={item}>{item}</option>)}</select></Field>
        </div>
        <div className="preset-picker" role="group" aria-label="API presets">
          {groupedPresets.map((group) => <div className="preset-group" key={group.category}>
            <strong>{group.category}</strong>
            <div className="preset-group-items">
              {group.presets.map((item) => <Button key={item.id} variant={item.id === presetId ? 'primary' : 'secondary'} aria-pressed={item.id === presetId} onClick={() => selectPreset(item.id)}>{item.name}</Button>)}
            </div>
          </div>)}
          {!filteredPresets.length && <p className="tool-notice">No presets match this filter.</p>}
        </div>
        <div className="parameter-grid">
          {preset.parameters.map((parameter) => <Field label={parameter.label} key={parameter.name}><input className="ui-input" type={parameter.type} value={values[parameter.name] ?? ''} onChange={(event) => setValues((current) => ({ ...current, [parameter.name]: event.target.value }))} /></Field>)}
        </div>
        <Button variant="primary" onClick={() => void sendRequest()} disabled={loading}>{loading ? 'Sending...' : 'Send request'}</Button>
        <p className="tool-notice">Only the values shown above are sent to {preset.name} when you choose Send request.</p>
      </div>
    </section>

    {error && <p className="api-error" role="alert"><strong>{error.label}.</strong> {error.message}</p>}
    <OutputBlock label="Response" value={response?.text ?? ''} onCopy={response?.text ? () => navigator.clipboard.writeText(response.text ?? '') : undefined}>
      {response ? <>
        <div className="response-meta" aria-label="Response details"><span>Status {response.status}</span><span>{response.timeMs} ms</span><span>{formatFileSize(response.size)}</span>{response.cached && <span>60s cache</span>}</div>
        {response.responseType === 'image' && imageUrl ? <div className="api-image-preview"><img src={imageUrl} alt={`${preset.name} response`} /><Button variant="secondary" onClick={downloadImage}>Download image</Button></div> : <pre tabIndex={0}>{response.text}</pre>}
      </> : <p className="output-empty">Send a request to inspect the response.</p>}
    </OutputBlock>
  </DataTool>;
};

export default FreeApiExplorer;
