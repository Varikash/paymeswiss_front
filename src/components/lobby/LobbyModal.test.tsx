import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LobbyModal } from './LobbyModal';
import { usePokerStore } from '../../store/usePokerStore';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('../../store/usePokerStore', () => ({
  usePokerStore: jest.fn(),
}));

jest.mock('../../utils/uuid', () => ({
  generateRoomId: () => 'ABC123',
}));

describe('LobbyModal', () => {
  const mockJoinRoomByUUID = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePokerStore as unknown as jest.Mock).mockReturnValue({
      joinRoomByUUID: mockJoinRoomByUUID,
      isConnected: true,
    });
  });

  it('renders modal with form', () => {
    render(<LobbyModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Planning Poker')).toBeInTheDocument();
    expect(screen.getByText('Your Name')).toBeInTheDocument();
    expect(screen.getByText('Room ID (optional)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Join Room' })).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<LobbyModal isOpen={false} onClose={mockOnClose} />);
    
    expect(screen.queryByText('Planning Poker')).not.toBeInTheDocument();
  });

  it('disables join button when username is too short', () => {
    render(<LobbyModal isOpen={true} onClose={mockOnClose} />);
    
    const joinButton = screen.getByRole('button', { name: 'Join Room' });
    expect(joinButton).toBeDisabled();
  });

  it('enables join button when username is valid', () => {
    render(<LobbyModal isOpen={true} onClose={mockOnClose} />);
    
    const nameInput = screen.getByTestId('username-input');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    const joinButton = screen.getByRole('button', { name: 'Join Room' });
    expect(joinButton).not.toBeDisabled();
  });

  it('creates new room when no room ID is provided', async () => {
    render(<LobbyModal isOpen={true} onClose={mockOnClose} />);
    
    const nameInput = screen.getByTestId('username-input');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    const joinButton = screen.getByRole('button', { name: 'Join Room' });
    fireEvent.click(joinButton);
    
    await waitFor(() => {
      expect(mockJoinRoomByUUID).toHaveBeenCalledWith('ABC123', 'John');
      expect(mockPush).toHaveBeenCalledWith('/room/ABC123');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('joins existing room when room ID is provided', async () => {
    render(<LobbyModal isOpen={true} onClose={mockOnClose} />);
    
    const nameInput = screen.getByTestId('username-input');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    const roomIdInput = screen.getByTestId('room-id-input');
    fireEvent.change(roomIdInput, { target: { value: 'EXISTING123' } });
    
    const joinButton = screen.getByRole('button', { name: 'Join Room' });
    fireEvent.click(joinButton);
    
    await waitFor(() => {
      expect(mockJoinRoomByUUID).toHaveBeenCalledWith('EXISTING123', 'John');
      expect(mockPush).toHaveBeenCalledWith('/room/EXISTING123');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('shows loading state when joining room', async () => {
    render(<LobbyModal isOpen={true} onClose={mockOnClose} />);
    
    const nameInput = screen.getByTestId('username-input');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    const joinButton = screen.getByRole('button', { name: 'Join Room' });
    fireEvent.click(joinButton);
    
    expect(screen.getByRole('button', { name: 'Loading...' })).toBeInTheDocument();
  });

  it('shows connection error when not connected', () => {
    (usePokerStore as unknown as jest.Mock).mockReturnValue({
      joinRoomByUUID: mockJoinRoomByUUID,
      isConnected: false,
    });

    render(<LobbyModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Connecting to server...')).toBeInTheDocument();
  });

  it('disables join button when not connected', () => {
    (usePokerStore as unknown as jest.Mock).mockReturnValue({
      joinRoomByUUID: mockJoinRoomByUUID,
      isConnected: false,
    });

    render(<LobbyModal isOpen={true} onClose={mockOnClose} />);
    
    const nameInput = screen.getByTestId('username-input');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    const joinButton = screen.getByRole('button', { name: 'Join Room' });
    expect(joinButton).toBeDisabled();
  });
});