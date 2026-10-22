import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { publishedTools } from '../generated/toolRegistry';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const close = () => { setOpen(false); setQuery(''); };
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return publishedTools.filter((tool) => !value || [tool.name, tool.description, tool.category, ...tool.keywords].join(' ').toLowerCase().includes(value)).slice(0, 12);
  }, [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === 'Escape') close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('quicktools:command', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('quicktools:command', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  if (!open) return null;
  return <div className="command-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <section className="command-palette" role="dialog" aria-modal="true" aria-label="Find a tool">
      <label className="catalog-search"><span className="sr-only">Find a tool</span><input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools" /></label>
      <div className="command-results">{results.map((tool) => <Link key={tool.id} to={tool.path} onClick={close}><span>{tool.name}</span><small>{tool.category}</small></Link>)}{!results.length && <p>No tools found.</p>}</div>
    </section>
  </div>;
};

export default CommandPalette;
