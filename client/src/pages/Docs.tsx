import { useMemo, useState } from 'react';
import AppHeader from '../components/ui/AppHeader';
import DocsLayout, { type DocsNavGroup } from '../components/docs/DocsLayout';
import { freeApiDirectory } from '../data/freeApis';
import { toolCatalog, type ToolCategory } from '../data/toolCatalog';

const categories: ToolCategory[] = ['Developer', 'Data', 'Content', 'Media'];
const categoryDescriptions: Record<ToolCategory, string> = {
  Developer: 'Testing, package registries, CDNs, diagrams, and network utilities for building and debugging apps.',
  Data: 'Sample data, currency, weather, and open research data. Good inputs for the JSON Converter.',
  Content: 'Dictionaries, translation, placeholder text, and public-domain writing. Pairs with the Text Formatter.',
  Media: 'Images, icons, colors, QR codes, avatars, and open art collections. Pairs with the WebP Converter.',
};

const exampleRequest = `fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then(console.log);`;

const Docs = () => {
  const [apiSearch, setApiSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const visibleApis = useMemo(() => {
    const query = apiSearch.trim().toLowerCase();
    return query ? freeApiDirectory.filter((api) => `${api.name} ${api.description} ${api.category}`.toLowerCase().includes(query)) : freeApiDirectory;
  }, [apiSearch]);

  const groups: DocsNavGroup[] = [
    {
      label: 'Getting started',
      items: [
        { id: 'overview', label: 'Overview' },
        { id: 'using', label: 'Using the APIs' },
      ],
    },
    {
      label: 'Free APIs',
      items: categories.map((category) => ({
        id: `api-${category.toLowerCase()}`,
        label: category,
        count: visibleApis.filter((api) => api.category === category).length,
      })),
    },
    {
      label: 'Tools',
      items: toolCatalog.map((tool) => ({ id: `tool-${tool.id}`, label: tool.name })),
    },
  ];

  return (
    <div className="brand-page">
      <AppHeader />
      <div className="container" id="top">
        <DocsLayout groups={groups} search={apiSearch} onSearch={setApiSearch}>
          <div className="crumb">Docs</div>
          <h1>Docs and free APIs</h1>
          <p className="lede">How QuickTools works, plus a hand-picked list of free APIs for each category that you can use in your own projects without an account.</p>

          <section id="overview">
            <h2>Overview</h2>
            <p>QuickTools runs its current utilities in your browser. Tool inputs are processed locally, without an account or QuickTools backend upload.</p>
            <ul className="plain">
              <li>Tools are grouped into Developer, Data, Content, and Media categories.</li>
              <li>Each tool has a dedicated route and documentation entry generated from the tool registry.</li>
              <li>External API terms, limits, and availability remain controlled by their providers.</li>
            </ul>
          </section>

          <section id="using">
            <h2>Using the APIs</h2>
            <p>Most listed endpoints support documented public use without an API key. Provider-specific requirements are shown below; QuickTools stores no API keys and does not send requests to presets that require one.</p>
            <h3>Example</h3>
            <pre tabIndex={0}><code>{exampleRequest}</code><button className="copy" type="button" data-sound="copied" onClick={async () => {
              await navigator.clipboard.writeText(exampleRequest);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1500);
            }}>{copied ? 'Copied' : 'Copy'}</button></pre>
            <div className="note"><strong>Source:</strong> Entries are curated from the <a href="https://github.com/public-apis/public-apis" target="_blank" rel="noopener noreferrer">public-apis list<span className="sr-only"> (opens in a new tab)</span></a>. Provider status was not live checked.</div>
          </section>

          {categories.map((category) => {
            const categoryApis = visibleApis.filter((api) => api.category === category);
            return (
              <section id={`api-${category.toLowerCase()}`} key={category}>
                <div className="sec-head"><h2>{category} APIs</h2><span className="count">{categoryApis.length} of {freeApiDirectory.filter((api) => api.category === category).length}</span></div>
                <p>{categoryDescriptions[category]}</p>
                {categoryApis.length ? (
                  <ul className="apis">
                    {categoryApis.map((api) => (
                      <li key={api.name}>
                        <a className="api" href={api.docsUrl} target="_blank" rel="noopener noreferrer">
                          <span className="name">{api.name}</span>
                          <span className="desc">{api.description}</span>
                          <span className="meta">No key <span aria-hidden="true">&middot;</span> CORS {api.cors === 'unknown' ? '?' : api.cors}<span className="sr-only"> (opens in a new tab)</span></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : <p className="empty">No APIs match your search.</p>}
              </section>
            );
          })}

          {toolCatalog.map((tool) => (
            <section id={`tool-${tool.id}`} key={tool.id}>
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
            </section>
          ))}
        </DocsLayout>
      </div>
    </div>
  );
};

export default Docs;
