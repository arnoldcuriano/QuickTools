import { Button } from '@headlessui/react';
import {
  ArrowRightIcon,
  CheckBadgeIcon,
  CodeBracketSquareIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/ui/AppHeader';
import { toolCatalog, toolCategories } from '../data/toolCatalog';

type CategoryFilter = (typeof toolCategories)[number];

const principles = [
  {
    title: 'Private by default',
    description: 'Current tools process input in your browser without an account or backend upload.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Open and inspectable',
    description: 'MIT-licensed source, documented behavior, and explicit validation boundaries.',
    icon: CodeBracketSquareIcon,
  },
  {
    title: 'Built for real work',
    description: 'Focused workflows, predictable results, and direct copy or download actions.',
    icon: CheckBadgeIcon,
  },
];

const QuickToolsLanding = () => {
  const catalogRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All');

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return toolCatalog.filter((tool) => {
      const matchesCategory = category === 'All' || tool.category === category;
      const searchableText = [tool.name, tool.description, tool.category, ...tool.tags]
        .join(' ')
        .toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetCatalog = () => {
    setQuery('');
    setCategory('All');
  };

  return (
    <div className="brand-page min-h-screen">
      <AppHeader>
        <nav className="hidden items-center gap-5 text-sm font-medium text-brand-muted lg:flex" aria-label="Primary">
          <button type="button" onClick={scrollToCatalog} className="brand-nav-link">
            Catalog
          </button>
          <a href="#principles" className="brand-nav-link">
            Principles
          </a>
        </nav>
      </AppHeader>

      <main>
        <section className="brand-shell py-10 sm:py-12 lg:py-16">
          <div className="max-w-4xl">
            <p className="brand-eyebrow">Open-source browser workbench</p>
            <h1 className="mt-4 text-5xl font-bold leading-tight text-brand sm:text-6xl">QuickTools</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-muted sm:text-xl">
              Precise utilities for developers, writers, students, and creative teams. Format data, convert files,
              and inspect content without adding another account to your workflow.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button onClick={scrollToCatalog} className="brand-button px-5 py-3">
                Browse tools
                <ArrowRightIcon aria-hidden="true" className="h-5 w-5" />
              </Button>
              <Link to="/tools/json-converter" className="brand-button-secondary px-5 py-3">
                Open JSON converter
              </Link>
            </div>
            <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <dt className="sr-only">Available tools</dt>
                <dd className="font-semibold text-brand">{toolCatalog.length} working tools</dd>
              </div>
              <div>
                <dt className="sr-only">Processing model</dt>
                <dd className="text-brand-muted">Browser-local processing</dd>
              </div>
              <div>
                <dt className="sr-only">License</dt>
                <dd className="text-brand-muted">MIT licensed</dd>
              </div>
            </dl>
          </div>
        </section>

        <section ref={catalogRef} id="catalog" className="brand-shell scroll-mt-24 pb-16">
          <div className="border-t border-brand pt-10">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="brand-eyebrow">Workbench</p>
                <h2 className="mt-2 text-3xl font-bold text-brand">Tool catalog</h2>
                <p className="mt-2 max-w-2xl text-brand-muted">
                  Search by task or narrow the catalog by category. Every result opens a dedicated, bookmarkable tool.
                </p>
              </div>
              <p className="text-sm text-brand-muted" aria-live="polite">
                Showing <span className="font-semibold text-brand">{filteredTools.length}</span> of {toolCatalog.length}
              </p>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(260px,1fr)_auto] lg:items-center">
              <label className="brand-search-field">
                <span className="sr-only">Search tools</span>
                <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search tools, formats, or tasks"
                  className="min-w-0 flex-1 bg-transparent text-brand outline-none placeholder:text-brand-faint"
                />
              </label>

              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter tools by category">
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
              <div id="tool-results" className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {filteredTools.map((tool) => {
                  const Icon = tool.icon;

                  return (
                    <Link key={tool.path} to={tool.path} className="brand-tool-card group">
                      <div className="flex items-start justify-between gap-4">
                        <span className="brand-tool-icon">
                          <Icon aria-hidden="true" className="h-6 w-6" />
                        </span>
                        <ArrowRightIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-brand-faint transition-transform group-hover:translate-x-1 group-hover:text-brand-accent"
                        />
                      </div>
                      <p className="mt-6 text-xs font-semibold uppercase text-brand-faint">{tool.category}</p>
                      <h3 className="mt-2 text-lg font-semibold text-brand">{tool.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-brand-muted">{tool.description}</p>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="brand-empty-state mt-7">
                <MagnifyingGlassIcon aria-hidden="true" className="h-7 w-7 text-brand-faint" />
                <h3 className="mt-4 text-lg font-semibold text-brand">No matching tools</h3>
                <p className="mt-2 text-sm text-brand-muted">Try a broader term or clear the selected category.</p>
                <Button type="button" onClick={resetCatalog} className="brand-button-secondary mt-5 px-4 py-2">
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </section>

        <section id="principles" className="border-y border-brand bg-brand-surface">
          <div className="brand-shell grid gap-8 py-12 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <div key={principle.title} className="flex gap-4">
                  <Icon aria-hidden="true" className="mt-0.5 h-6 w-6 flex-none text-brand-accent" />
                  <div>
                    <h2 className="text-base font-semibold text-brand">{principle.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-brand-muted">{principle.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer>
        <div className="brand-shell flex flex-col gap-4 py-8 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="QuickTools home">
            <span aria-hidden="true" className="brand-mark-icon h-7 w-7" />
            <span className="brand-wordmark text-xl">quicktools</span>
          </Link>
          <p>Open-source tools for practical browser work.</p>
        </div>
      </footer>
    </div>
  );
};

export default QuickToolsLanding;
