import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
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
  const Icon = theme === 'dark' ? SunIcon : MoonIcon;

  return (
    <Button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="brand-icon-button"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <Icon aria-hidden="true" className="h-5 w-5" />
    </Button>
  );
};

export default ThemeToggle;
