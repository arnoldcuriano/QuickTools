import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useEffect, useMemo, useState, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { publishedTools, type ToolCategory, type ToolMeta } from '../generated/toolRegistry';
import { getFavoriteToolIds, getRecentToolIds, toggleFavoriteTool } from '../utils/toolPreferences';

type Filter = 'All' | ToolCategory;

const ToolRow = ({ tool, favorite, onFavorite }: { tool: ToolMeta; favorite: boolean; onFavorite: () => void }) => <div className="tool-row">
  <Link to={tool.path} className="tool-row-link"><h3>{tool.name}</h3><p>{tool.description}</p><span>{tool.category}</span></Link>
  <button className="favorite-button" type="button" aria-label={`${favorite ? 'Remove' : 'Add'} ${tool.name} ${favorite ? 'from' : 'to'} favorites`} aria-pressed={favorite} onClick={onFavorite}>{favorite ? <StarSolidIcon aria-hidden="true" /> : <StarIcon aria-hidden="true" />}</button>
</div>;

const CatalogBrowser = ({ searchRef }: { searchRef: RefObject<HTMLInputElement> }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Filter>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const categories = useMemo(() => [...new Set(publishedTools.map((tool) => tool.category))], []);
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    return publishedTools.filter((tool) => (category === 'All' || tool.category === category) && (!value || [tool.name, tool.description, tool.category, ...tool.keywords].join(' ').toLowerCase().includes(value)));
  }, [category, query]);
  const groups = useMemo(() => categories.map((name) => ({ name, tools: filtered.filter((tool) => tool.category === name) })).filter((group) => group.tools.length), [categories, filtered]);

  useEffect(() => {
    const load = () => { setFavorites(getFavoriteToolIds()); setRecent(getRecentToolIds()); };
    load();
    window.addEventListener('quicktools:preferences', load);
    return () => window.removeEventListener('quicktools:preferences', load);
  }, []);

  const toolById = new Map<string, ToolMeta>(publishedTools.map((tool) => [tool.id, tool]));
  const recentTools = recent.flatMap((id) => { const tool = toolById.get(id); return tool ? [tool] : []; });
  const favoriteTools = favorites.flatMap((id) => { const tool = toolById.get(id); return tool ? [tool] : []; });
  const toggle = (id: string) => setFavorites(toggleFavoriteTool(id));

  return <>
    <div className="catalog-controls">
      <label className="catalog-search"><span className="sr-only">Search tools</span><input ref={searchRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, task, or keyword" /></label>
      <button className="brand-command" type="button" onClick={() => window.dispatchEvent(new Event('quicktools:command'))}><span>Find tool</span><kbd>Ctrl K</kbd></button>
    </div>
    <div className="catalog-browser">
      <aside className="catalog-sidebar" aria-label="Tool categories"><p className="side-label">Categories</p><ul className="side-list"><li><button type="button" aria-pressed={category === 'All'} onClick={() => setCategory('All')}><span>All tools</span><span className="n">{publishedTools.length}</span></button></li>{categories.map((name) => <li key={name}><button type="button" aria-pressed={category === name} onClick={() => setCategory(name)}><span>{name}</span><span className="n">{publishedTools.filter((tool) => tool.category === name).length}</span></button></li>)}</ul></aside>
      <div className="catalog-results">
        {!query && category === 'All' && favoriteTools.length > 0 && <section className="catalog-group"><h3>Favorites</h3>{favoriteTools.map((tool) => <ToolRow key={tool.id} tool={tool} favorite onFavorite={() => toggle(tool.id)} />)}</section>}
        {!query && category === 'All' && recentTools.length > 0 && <section className="catalog-group"><h3>Recent</h3>{recentTools.map((tool) => <ToolRow key={tool.id} tool={tool} favorite={favorites.includes(tool.id)} onFavorite={() => toggle(tool.id)} />)}</section>}
        {groups.map((group) => <section className="catalog-group" key={group.name}><h3>{group.name}</h3>{group.tools.map((tool) => <ToolRow key={tool.id} tool={tool} favorite={favorites.includes(tool.id)} onFavorite={() => toggle(tool.id)} />)}</section>)}
        {!filtered.length && <div className="brand-empty-state"><h3>No matching tools</h3><p>Try a broader term or clear the category.</p><button className="ui-button ui-button-secondary" type="button" onClick={() => { setQuery(''); setCategory('All'); }}>Clear filters</button></div>}
      </div>
    </div>
  </>;
};

export default CatalogBrowser;
