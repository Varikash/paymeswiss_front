import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';

jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
  }),
}));

describe('ThemeToggle', () => {
  it('renders toggle', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});