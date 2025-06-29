import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header', () => {
  const defaultProps = {
    roomId: 'test-room',
    userName: 'Test User',
    isConnected: true,
    children: <button>Test Button</button>,
  };

  it('renders room ID', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('test-room')).toBeInTheDocument();
  });

  it('renders user name', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('shows green status dot when connected', () => {
    render(<Header {...defaultProps} isConnected={true} />);
    const statusDot = screen.getByTestId('status-dot');
    expect(statusDot).toHaveClass('connected');
  });

  it('shows red status dot when disconnected', () => {
    render(<Header {...defaultProps} isConnected={false} />);
    const statusDot = screen.getByTestId('status-dot');
    expect(statusDot).toHaveClass('disconnected');
  });
});