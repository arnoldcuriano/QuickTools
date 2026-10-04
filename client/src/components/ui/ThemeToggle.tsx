import { Button } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
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
    <div className="theme-controls" role="group" aria-label="Color theme">
      <Button type="button" onClick={() => setTheme('light')} className="header-icon" aria-label="Use light theme" aria-pressed={theme === 'light'} title="Light theme"><SunIcon aria-hidden="true" /></Button>
      <Button type="button" onClick={() => setTheme('dark')} className="header-icon" aria-label="Use dark theme" aria-pressed={theme === 'dark'} title="Dark theme"><MoonIcon aria-hidden="true" /></Button>
    </div>
  );
};

export default ThemeToggle;
