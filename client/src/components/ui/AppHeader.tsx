import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GitHubRepoStar from './GitHubRepoStar';
import SoundToggle from './SoundToggle';
import ThemeToggle from './ThemeToggle';

const AppHeader = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const catalogActive = location.pathname === '/';
  const docsActive = location.pathname === '/docs';

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

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
