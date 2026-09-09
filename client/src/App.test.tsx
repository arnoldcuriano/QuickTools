import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
import App from './App';

beforeEach(() => {
  vi.restoreAllMocks();
});

test('renders QuickTools app and the live GitHub repo link', async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ stargazers_count: 1234 }),
  });
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    value: fetchMock,
  });

  render(<App />);
  const headingElement = screen.getByRole('heading', {
    name: /client-side tools for.*everyday file and text work/i,
  });
  expect(headingElement).toBeInTheDocument();

  expect(await screen.findByRole('link', { name: /quicktools repository/i })).toBeInTheDocument();
  expect(await screen.findByText(/1,234 stars/i)).toBeInTheDocument();
});
