import React, { useEffect, useState } from 'react';
import { ArrowTopRightOnSquareIcon, StarIcon } from '@heroicons/react/24/outline';

const REPO_OWNER = 'arnoldcuriano';
const REPO_NAME = 'QuickTools';
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
const REPO_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const CACHE_KEY = 'quicktools.githubStars';

const formatStarCount = (count: number | null) => {
  if (count === null) return 'Loading stars';
  return `${new Intl.NumberFormat('en-US').format(count)} stars`;
};

const readCachedStars = () => {
  if (typeof window === 'undefined') return null;
  try {
    const cached = window.localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const parsed = Number(cached);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const writeCachedStars = (count: number) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CACHE_KEY, String(count));
  } catch {
    // Caching is optional; the live repository link remains usable.
  }
};

const GitHubRepoStar = () => {
  const [stars, setStars] = useState<number | null>(() => readCachedStars());
  const [hasError, setHasError] = useState(() => typeof fetch !== 'function');

  useEffect(() => {
    if (typeof fetch !== 'function') {
      return;
    }

    const controller = new AbortController();
    const loadStars = async () => {
      try {
        const response = await fetch(REPO_API_URL, {
          signal: controller.signal,
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!response.ok) throw new Error(`GitHub repo request failed with ${response.status}`);

        const data: { stargazers_count?: number } = await response.json();
        if (typeof data.stargazers_count !== 'number') throw new Error('Missing star count');

        setStars(data.stargazers_count);
        setHasError(false);
        writeCachedStars(data.stargazers_count);
      } catch {
        if (!controller.signal.aborted) setHasError(true);
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
      aria-label={`Open QuickTools on GitHub, ${label}`}
      className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-brand bg-brand-surface px-3 py-2 text-sm font-semibold text-brand transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      title="Open the QuickTools repository"
    >
      <StarIcon className="h-4 w-4 text-[var(--color-accent)]" />
      <span className="hidden sm:inline">GitHub</span>
      <span>{label}</span>
      <ArrowTopRightOnSquareIcon aria-hidden="true" className="hidden h-4 w-4 sm:block" />
    </a>
  );
};

export default GitHubRepoStar;
