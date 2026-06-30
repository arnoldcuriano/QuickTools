import React, { useEffect, useState } from 'react';
import { ArrowTopRightOnSquareIcon, StarIcon } from '@heroicons/react/24/outline';

const REPO_OWNER = 'arnoldcuriano';
const REPO_NAME = 'QuickTools';
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
const REPO_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const CACHE_KEY = 'quicktools.githubStars';

const formatStarCount = (count: number | null) => {
  if (count === null) {
    return 'Loading stars';
  }

  return `${new Intl.NumberFormat('en-US').format(count)} stars`;
};

const readCachedStars = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const cached = window.localStorage.getItem(CACHE_KEY);
  if (!cached) {
    return null;
  }

  const parsed = Number(cached);
  return Number.isFinite(parsed) ? parsed : null;
};

const writeCachedStars = (count: number) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CACHE_KEY, String(count));
};

const GitHubRepoStar = () => {
  const [stars, setStars] = useState<number | null>(() => readCachedStars());
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof fetch !== 'function') {
      setHasError(true);
      return;
    }

    const controller = new AbortController();

    const loadStars = async () => {
      try {
        const response = await fetch(REPO_API_URL, {
          signal: controller.signal,
          headers: {
            Accept: 'application/vnd.github+json',
          },
        });

        if (!response.ok) {
          throw new Error(`GitHub repo request failed with ${response.status}`);
        }

        const data: { stargazers_count?: number } = await response.json();
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
          setHasError(false);
          writeCachedStars(data.stargazers_count);
          return;
        }

        throw new Error('Missing star count');
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setHasError(true);
      }
    };

    loadStars();

    return () => controller.abort();
  }, []);

  const label = hasError ? 'View on GitHub' : formatStarCount(stars);

  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Open the QuickTools repository on GitHub"
      className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-brand bg-brand-surface px-3 py-2 text-sm font-semibold text-brand transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      title="Open the QuickTools repository"
    >
      <StarIcon className="h-4 w-4 text-[var(--color-accent)]" />
      <span className="hidden sm:inline">GitHub</span>
      <span className="text-brand-muted sm:hidden">Stars</span>
      <span className="text-brand-muted">•</span>
      <span>{label}</span>
      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
    </a>
  );
};

export default GitHubRepoStar;
