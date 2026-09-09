import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import GitHubRepoStar from './GitHubRepoStar';
import ThemeToggle from './ThemeToggle';

interface AppHeaderProps {
  children?: ReactNode;
}

const AppHeader = ({ children }: AppHeaderProps) => {
  return (
    <header className="brand-header sticky top-0 z-50">
      <div className="brand-shell">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <Link to="/" className="flex items-center gap-3" aria-label="quicktools home">
            <span aria-hidden="true" className="brand-mark-icon" />
            <span>
              <span className="brand-wordmark block">quicktools</span>
              <span className="hidden text-[11px] font-semibold uppercase text-brand-faint sm:block">
                Open Workbench
              </span>
            </span>
          </Link>
          <div className="flex w-full min-w-0 flex-wrap items-center justify-end gap-2 sm:w-auto sm:gap-3">
            {children}
            <ThemeToggle />
            <GitHubRepoStar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
