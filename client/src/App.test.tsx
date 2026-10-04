import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
import App from './App';

beforeEach(() => {
  vi.restoreAllMocks();
  window.localStorage.clear();
  document.documentElement.dataset.theme = 'dark';
});

test('renders QuickTools app and the GitHub repository link', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: 'QuickTools', level: 1 });
  expect(headingElement).toBeInTheDocument();

  expect(screen.getByRole('link', { name: /open quicktools on github/i })).toBeInTheDocument();
});

test('filters the tool catalog by search and category', () => {
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    value: vi.fn().mockRejectedValue(new Error('offline')),
  });

  render(<App />);

  fireEvent.change(screen.getByRole('searchbox', { name: /search tools/i }), {
    target: { value: 'regex' },
  });
  expect(screen.getByRole('link', { name: /regex tester/i })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /base64 encoder/i })).not.toBeInTheDocument();

  fireEvent.change(screen.getByRole('searchbox', { name: /search tools/i }), {
    target: { value: '' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Media' }));
  expect(screen.getByRole('link', { name: /webp converter/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /qr code generator/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /json converter/i })).not.toBeInTheDocument();
});

test('switches and persists the selected theme', () => {
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    value: vi.fn().mockRejectedValue(new Error('offline')),
  });

  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /switch to light theme/i }));

  expect(document.documentElement.dataset.theme).toBe('light');
  expect(window.localStorage.getItem('quicktools.theme')).toBe('light');
});

test('focuses catalog search from the global command shortcut', () => {
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    value: vi.fn().mockRejectedValue(new Error('offline')),
  });

  render(<App />);
  fireEvent.keyDown(window, { key: 'k', ctrlKey: true });

  expect(screen.getByRole('searchbox', { name: /search tools/i })).toHaveFocus();
});
