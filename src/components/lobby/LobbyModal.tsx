'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePokerStore } from '../../store/usePokerStore';
import { generateRoomId } from '../../utils/uuid';
import Modal from '../ui/Modal/Modal';
import Input from '../ui/Input/Input';
import Button from '../ui/Button/Button';
import styles from './LobbyModal.module.css';

interface LobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LobbyModal({ isOpen, onClose }: LobbyModalProps) {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { joinRoomByUUID, isConnected } = usePokerStore();

  const handleJoinRoom = async () => {
    if (!username.trim()) return;
    
    if (!isConnected) {
      console.log('Waiting for socket connection...');
      return;
    }
    
    setIsLoading(true);
    try {
      const finalRoomId = roomId.trim() || generateRoomId();
      
      joinRoomByUUID(finalRoomId, username);
      await new Promise(resolve => setTimeout(resolve, 500));
      router.push(`/room/${finalRoomId}`);
      onClose();
    } catch (error) {
      console.error('Failed to join room:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isUsernameValid = username.trim().length >= 3;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Planning Poker
        </h2>
        
        <div className={styles.form}>
          <Input
            label="Your Name"
            value={username}
            onChange={setUsername}
            data-testid="username-input"
          />
          
          <Input
            label="Room ID (optional)"
            value={roomId}
            onChange={setRoomId}
            data-testid="room-id-input"
          />
          
          <Button 
            onClick={handleJoinRoom}
            disabled={!isUsernameValid || !isConnected || isLoading}
          >
            {isLoading ? 'Loading...' : 'Join Room'}
          </Button>
        </div>
        
        {!isConnected && (
          <p className={styles.error}>
            Connecting to server...
          </p>
        )}
      </div>
    </Modal>
  );
}