import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { ThemeProvider } from '@/context/ThemeContext';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Header', () => {
  const defaultProps = {
    roomId: 'test-room',
    userName: 'Test User',
    isConnected: true,
    children: <button>Test Button</button>,
  };

  it('renders room ID', () => {
    render(
      <ThemeProvider>
        <Header {...defaultProps} />
      </ThemeProvider>
    );
    expect(screen.getByText('test-room')).toBeInTheDocument();
  });

  it('renders user name', () => {
    render(
      <ThemeProvider>
        <Header {...defaultProps} />
      </ThemeProvider>
    );
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <ThemeProvider>
        <Header {...defaultProps} />
      </ThemeProvider>
    );
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('shows green status dot when connected', () => {
    render(
      <ThemeProvider>
        <Header {...defaultProps} isConnected={true} />
      </ThemeProvider>
    );
    const statusDot = screen.getByTestId('status-dot');
    expect(statusDot).toHaveClass('connected');
  });

  it('shows red status dot when disconnected', () => {
    render(
      <ThemeProvider>
        <Header {...defaultProps} isConnected={false} />
      </ThemeProvider>
    );
    const statusDot = screen.getByTestId('status-dot');
    expect(statusDot).toHaveClass('disconnected');
  });
});