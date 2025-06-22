import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders QuickTools app', () => {
  render(<App />);
  const headingElement = screen.getByText(/QuickTools/i);
  expect(headingElement).toBeInTheDocument();
});