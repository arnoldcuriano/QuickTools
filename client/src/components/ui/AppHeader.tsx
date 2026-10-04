import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GitHubRepoStar from './GitHubRepoStar';
import ThemeToggle from './ThemeToggle';

const AppHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const openCatalogSearch = useCallback(() => {
    navigate('/?focus=search#catalog');
  }, [navigate]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openCatalogSearch();
      }
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [openCatalogSearch]);

  return (
    <header className="brand-header sticky top-0 z-50">
      <div className="brand-shell">
        <div className="flex items-center justify-between gap-6 py-4">
          <Link to="/" className="flex min-w-0 items-baseline gap-2" aria-label="QuickTools home">
            <span className="brand-wordmark">quicktools</span>
            <span className="brand-submark">Open workbench</span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary">
            <Link to="/#catalog" className="brand-nav-link">
              Catalog
            </Link>
            <Link to="/#principles" className="brand-nav-link">
              Principles
            </Link>
            <ThemeToggle />
            <GitHubRepoStar />
          </nav>
          <button className="menu-btn" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((open) => !open)}>Menu</button>
        </div>
      </div>
      <div className="menu" id="mobile-menu" hidden={!menuOpen}>
        <div className="brand-shell menu-inner">
          <Link to="/#catalog" onClick={() => setMenuOpen(false)}>Catalog</Link>
          <Link to="/#principles" onClick={() => setMenuOpen(false)}>Principles</Link>
          <GitHubRepoStar mobile />
          <div className="menu-theme-row"><span>Theme</span><ThemeToggle /></div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
