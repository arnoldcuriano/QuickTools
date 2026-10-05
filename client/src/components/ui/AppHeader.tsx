import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GitHubRepoStar from './GitHubRepoStar';
import ThemeToggle from './ThemeToggle';

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const catalogActive = location.pathname === '/' && location.hash !== '#principles';
  const principlesActive = location.pathname === '/' && location.hash === '#principles';

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
    <header className="brand-header">
      <div className="brand-shell header-inner">
        <Link to="/" className="brand" aria-label="QuickTools home">
          <span className="brand-wordmark">quicktools</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          <Link to="/#catalog" className="brand-nav-link" aria-current={catalogActive ? 'page' : undefined}>
            Catalog
          </Link>
          <Link to="/#principles" className="brand-nav-link" aria-current={principlesActive ? 'page' : undefined}>
            Principles
          </Link>
          <GitHubRepoStar />
          <ThemeToggle />
        </nav>
        <button className="menu-btn" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((open) => !open)}>Menu</button>
      </div>
      <div className="menu" id="mobile-menu" hidden={!menuOpen}>
        <div className="brand-shell menu-inner">
          <Link to="/#catalog" aria-current={catalogActive ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Catalog</Link>
          <Link to="/#principles" aria-current={principlesActive ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Principles</Link>
          <GitHubRepoStar mobile />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
