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

  return (
    <Button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="theme" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      <span data-t="light" data-active={theme === 'light'}>Light</span>
      <span aria-hidden="true">/</span>
      <span data-t="dark" data-active={theme === 'dark'}>Dark</span>
    </Button>
  );
};

export default ThemeToggle;
