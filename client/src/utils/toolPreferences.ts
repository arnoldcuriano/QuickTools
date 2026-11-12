const RECENT_KEY = 'qt-recent-tools';
const FAVORITES_KEY = 'qt-favorite-tools';

const readIds = (key: string) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
};

const writeIds = (key: string, ids: string[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent('quicktools:preferences'));
  } catch {
    // Storage is optional; catalog navigation still works without it.
  }
};

export const getRecentToolIds = () => readIds(RECENT_KEY);
export const getFavoriteToolIds = () => readIds(FAVORITES_KEY);
export const recordRecentTool = (id: string) => writeIds(RECENT_KEY, [id, ...readIds(RECENT_KEY).filter((item) => item !== id)].slice(0, 8));
export const toggleFavoriteTool = (id: string) => {
  const current = readIds(FAVORITES_KEY);
  const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  writeIds(FAVORITES_KEY, next);
  return next;
};
