import { Button } from '@headlessui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppHeader from '../components/ui/AppHeader';
import { toolCatalog, toolCategories } from '../data/toolCatalog';

type CategoryFilter = (typeof toolCategories)[number];

const principles = [
  ['Private by default', 'Current tools process input in your browser without an account or backend upload.'],
  ['Open and inspectable', 'MIT-licensed source, documented behavior, and explicit validation boundaries.'],
  ['Built for real work', 'Focused workflows, predictable results, and direct copy or download actions.'],
];

const QuickToolsLanding = () => {
  const location = useLocation();
  const catalogRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All');

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return toolCatalog.filter((tool) => {
      const matchesCategory = category === 'All' || tool.category === category;
      const searchableText = [tool.name, tool.description, tool.category, ...tool.tags].join(' ').toLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [category, query]);

  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (new URLSearchParams(location.search).get('focus') === 'search') {
      catalogRef.current?.scrollIntoView?.();
      searchInputRef.current?.focus();
    }
  }, [location.search]);

  return (
    <div className="brand-page">
      <AppHeader />

      <main>
        <section className="brand-shell hero-section">
          <h1 className="hero-title">QuickTools</h1>
          <p className="hero-copy">
            Precise utilities for developers, writers, students, and creative teams. Format data, convert files, and
            inspect content without adding another account to your workflow.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Button onClick={scrollToCatalog} className="brand-button px-4 py-2.5">
              Browse tools
            </Button>
            <Link to="/tools/json-converter" className="brand-button-secondary px-4 py-2.5">
              Open JSON converter
            </Link>
          </div>
          <dl className="hero-meta">
            <div>
              <dt className="sr-only">Available tools</dt>
              <dd className="font-medium text-brand">{toolCatalog.length} working tools</dd>
            </div>
            <div>
              <dt className="sr-only">Processing model</dt>
              <dd>Browser-local processing</dd>
            </div>
            <div>
              <dt className="sr-only">License</dt>
              <dd>MIT licensed</dd>
            </div>
          </dl>
        </section>

        <section ref={catalogRef} id="catalog" className="brand-shell catalog-section scroll-mt-20">
          <div className="catalog-heading">
            <div>
              <h2>Tool catalog</h2>
              <p>Search by task or narrow the catalog by category. Every result opens a dedicated, bookmarkable tool.</p>
            </div>
            <p className="catalog-count" aria-live="polite">
              Showing {filteredTools.length} of {toolCatalog.length}
            </p>
          </div>

          <div className="catalog-controls">
            <label className="catalog-search">
              <span className="sr-only">Search tools</span>
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tools, formats, or tasks"
              />
            </label>
            <div className="catalog-filters" role="group" aria-label="Filter tools by category">
              {toolCategories.map((item) => (
                <Button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className="brand-filter-button"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div id="tool-results" className="tool-list">
              {filteredTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="tool-row">
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                  <span>{tool.category}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="brand-empty-state">
              <h3>No matching tools</h3>
              <p>Try a broader term or clear the selected category.</p>
              <Button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
                className="brand-button-secondary mt-5 px-4 py-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </section>

        <section id="principles" className="principles-section">
          <div className="brand-shell principles-grid">
            {principles.map(([title, description]) => (
              <div key={title}>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand-shell flex items-center justify-between gap-6 py-7">
          <Link to="/" className="brand-wordmark" aria-label="QuickTools home">
            quicktools
          </Link>
          <p>Open-source tools for practical browser work.</p>
        </div>
      </footer>
    </div>
  );
};

export default QuickToolsLanding;
