import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import GitHubRepoStar from './GitHubRepoStar';

interface AppHeaderProps {
  children?: ReactNode;
}

const AppHeader = ({ children }: AppHeaderProps) => {
  return (
    <header className="brand-header sticky top-0 z-50">
      <div className="brand-shell">
        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="quicktools home">
            <span aria-hidden="true" className="brand-mark-icon" />
            <span className="brand-wordmark">quicktools</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            {children}
            <GitHubRepoStar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
