import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './SideBar';
import { User } from '@/types';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice',
    isHost: true,
    joinedAt: new Date()
  },
  {
    id: '2', 
    name: 'Bob',
    isHost: false,
    joinedAt: new Date()
  },
  {
    id: '3',
    name: 'Charlie',
    isHost: false,
    joinedAt: new Date()
  }
];

describe('Sidebar', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders when open', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        users={mockUsers}
      />
    );

    expect(screen.getByText('List of Participants (3)')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Sidebar
        isOpen={false}
        onClose={mockOnClose}
        users={mockUsers}
      />
    );
  
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveClass('sidebar');
    expect(sidebar).not.toHaveClass('open');
  });

  it('displays all users', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        users={mockUsers}
      />
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('shows host badge for host user', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        users={mockUsers}
      />
    );

    expect(screen.getByText('Host')).toBeInTheDocument();
  });

  it('does not show host badge for non-host users', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        users={mockUsers}
      />
    );

    const hostBadges = screen.getAllByText('Host');
    expect(hostBadges).toHaveLength(1); // only one host
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        users={mockUsers}
      />
    );

    const closeButton = screen.getByRole('button', { name: /✕/ });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays correct user count', () => {
    const singleUser = [mockUsers[0]];
    
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        users={singleUser}
      />
    );

    expect(screen.getByText('List of Participants (1)')).toBeInTheDocument();
  });

  it('handles empty users list', () => {
    render(
      <Sidebar
        isOpen={true}
        onClose={mockOnClose}
        users={[]}
      />
    );

    expect(screen.getByText('List of Participants (0)')).toBeInTheDocument();
  });
});