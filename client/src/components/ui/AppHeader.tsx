import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GitHubRepoStar from './GitHubRepoStar';
import SoundToggle from './SoundToggle';
import ThemeToggle from './ThemeToggle';

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const catalogActive = location.pathname === '/';
  const docsActive = location.pathname === '/docs';

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
          <Link to="/docs" className="brand-nav-link" aria-current={docsActive ? 'page' : undefined}>
            Docs
          </Link>
          <GitHubRepoStar />
          <ThemeToggle />
          <SoundToggle />
        </nav>
        <button className="menu-btn" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" data-sound={menuOpen ? 'menu-close' : 'menu-open'} onClick={() => setMenuOpen((open) => !open)}>Menu</button>
      </div>
      <div className="menu" id="mobile-menu" hidden={!menuOpen}>
        <div className="brand-shell menu-inner">
          <Link to="/#catalog" aria-current={catalogActive ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Catalog</Link>
          <Link to="/docs" aria-current={docsActive ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Docs</Link>
          <GitHubRepoStar mobile />
          <ThemeToggle />
          <SoundToggle mobile />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
