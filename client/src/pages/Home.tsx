import { Button } from '@headlessui/react';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppHeader from '../components/ui/AppHeader';
import CatalogBrowser from '../components/CatalogBrowser';
import { toolCatalog } from '../data/toolCatalog';

const QuickToolsLanding = () => {
  const location = useLocation();
  const catalogRef = useRef<HTMLElement>(null);
  const globeRef = useRef<HTMLCanvasElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (new URLSearchParams(location.search).get('focus') === 'search') {
      catalogRef.current?.scrollIntoView?.();
      searchInputRef.current?.focus();
    }
  }, [location.search]);

  useEffect(() => {
    const canvas = globeRef.current;
    if (!canvas || !window.createDotGlobe) return;

    const globe = window.createDotGlobe(canvas);
    return () => globe.destroy();
  }, []);

  return (
    <div className="brand-page">
      <AppHeader />

      <main>
        <section className="brand-shell hero-section">
          <div className="hero-content">
            <h1 className="hero-title">QuickTools</h1>
            <p className="hero-copy">
              Fast browser-local tools for code, data, content, and media.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button onClick={scrollToCatalog} className="brand-button px-4 py-2.5">
                Browse tools
              </Button>
            </div>
            <dl className="hero-meta">
              <div>
                <dt className="sr-only">Available tools</dt>
                <dd className="font-medium text-brand">{toolCatalog.length} working tools</dd>
              </div>
              <div>
                <dt className="sr-only">Processing model</dt>
                <dd>Most tools run locally</dd>
              </div>
              <div>
                <dt className="sr-only">License</dt>
                <dd>MIT licensed</dd>
              </div>
            </dl>
          </div>
          <div className="globe-wrap">
            <canvas ref={globeRef} className="globe" aria-hidden="true"></canvas>
          </div>
        </section>

        <section ref={catalogRef} id="catalog" className="brand-shell catalog-section scroll-mt-20">
          <div className="catalog-heading">
            <div>
              <h2>Tool catalog</h2>
              <p>Search by task or narrow the catalog by category. Every result opens a dedicated, bookmarkable tool.</p>
            </div>
            <p className="catalog-count">{toolCatalog.length} available</p>
          </div>
          <CatalogBrowser searchRef={searchInputRef} />
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
