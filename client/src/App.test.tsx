import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders QuickTools app', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', {
    name: /client-side tools for everyday file and text work/i,
  });
  expect(headingElement).toBeInTheDocument();
});
