import { StarIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const REPO_URL = 'https://github.com/arnoldcuriano/QuickTools';
const API_URL = 'https://api.github.com/repos/arnoldcuriano/QuickTools';
const CACHE_KEY = 'qt-stars';
const CACHE_TTL = 60 * 60 * 1000;

type CachedStars = { count: number; savedAt: number };

const GitHubIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>;

export const formatStarCount = (count: number) => count < 1000 ? String(count) : count < 10000 ? `${(count / 1000).toFixed(1).replace('.0', '')}k` : `${Math.round(count / 1000)}k`;

const readCache = (): CachedStars | null => {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    return typeof parsed?.count === 'number' && typeof parsed?.savedAt === 'number' ? parsed : null;
  } catch { return null; }
};

const GitHubRepoStar = ({ mobile = false }: { mobile?: boolean }) => {
  const cached = readCache();
  const [stars, setStars] = useState<number | null>(cached?.count ?? null);

  useEffect(() => {
    const current = readCache();
    if (current && Date.now() - current.savedAt < CACHE_TTL) return;
    const controller = new AbortController();
    fetch(API_URL, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('GitHub request failed')))
      .then((data) => {
        if (typeof data.stargazers_count !== 'number') return;
        setStars(data.stargazers_count);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ count: data.stargazers_count, savedAt: Date.now() })); } catch { /* Cache is optional. */ }
      })
      .catch(() => setStars((value) => value));
    return () => controller.abort();
  }, []);

  return <a className={mobile ? undefined : 'gh'} href={REPO_URL} target="_blank" rel="noopener">
    <span className="gh-label"><GitHubIcon />GitHub</span>
    <span className="gh-stars" hidden={stars === null}><StarIcon aria-hidden="true" /><span data-stars>{stars === null ? '' : formatStarCount(stars)}</span><span className="sr-only"> stars</span></span>
    <span className="sr-only"> (opens in a new tab)</span>
  </a>;
};

export default GitHubRepoStar;
