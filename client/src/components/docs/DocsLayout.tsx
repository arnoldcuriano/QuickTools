import { useEffect, useMemo, useState, type ReactNode } from 'react';

export interface DocsNavGroup {
  label: string;
  items: Array<{ id: string; label: string; count?: number }>;
}

const DocsLayout = ({ groups, search, onSearch, children }: { groups: DocsNavGroup[]; search: string; onSearch: (value: string) => void; children: ReactNode }) => {
  const sectionIds = useMemo(() => groups.flatMap((group) => group.items.map((item) => item.id)), [groups]);
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const headerBottom = document.querySelector('.brand-header')?.getBoundingClientRect().bottom ?? 0;
        const active = sectionIds.reduce((current, id) => {
          const section = document.getElementById(id);
          return section && section.getBoundingClientRect().top <= headerBottom + 1 ? id : current;
        }, sectionIds[0]);
        setActiveId(active);
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [sectionIds]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <div className="docs">
      <button
        className="docs-toggle"
        id="docsToggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="sidebar"
        data-sound={menuOpen ? 'menu-close' : 'menu-open'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span>Docs menu</span>
        <span>{menuOpen ? 'Close' : 'Open'}</span>
      </button>
      <aside id="sidebar" className="sidebar" aria-label="Docs navigation" data-open={menuOpen}>
        <input
          className="sidebar-search"
          id="sideq"
          type="search"
          placeholder="Search APIs"
          autoComplete="off"
          aria-label="Search APIs"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
        {groups.map((group) => (
          <div className="side-group" key={group.label}>
            <p className="side-label">{group.label}</p>
            <ul className="side-list">
              {group.items.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} aria-current={activeId === item.id ? 'true' : undefined} onClick={() => setMenuOpen(false)}>
                    <span>{item.label}</span>
                    {item.count !== undefined && <span className="n">{item.count}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
      <main className="docs-main">{children}</main>
    </div>
  );
};

export default DocsLayout;
