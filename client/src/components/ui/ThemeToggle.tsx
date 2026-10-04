import { Button } from '@headlessui/react';
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'quicktools.theme';

const getInitialTheme = (): Theme => {
  if (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light') {
    return 'light';
  }

  return 'dark';
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // The selected theme still applies for this session when storage is unavailable.
    }
  }, [theme]);

  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="brand-nav-link"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      {nextTheme === 'dark' ? 'Dark' : 'Light'}
    </Button>
  );
};

export default ThemeToggle;
