'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePokerStore } from '../../store/usePokerStore';
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
  const router = useRouter();
  const { joinRoom, isConnected } = usePokerStore();

  // const handleJoinRoom = () => {
  //   console.log('handleJoinRoom called');
  //   if (!username.trim()) return;
    
  //   const roomId = 'main-room';
  //   joinRoom(roomId, username);
  //   router.push(`/room/${roomId}`);
  //   onClose();
  // };

  const handleJoinRoom = () => {
    console.log('handleJoinRoom called');
    if (!username.trim()) return;
    
    // Ждём пока socket подключится
    if (!isConnected) {
        console.log('Waiting for socket connection...');
        return;
    }
    
    const roomId = 'main-room';
    joinRoom(roomId, username);
    router.push(`/room/${roomId}`);
    onClose();
};

  const isUsernameValid = username.trim().length >=3;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Join Planning Poker
        </h2>
        
        <div className={styles.form}>
          <Input
            label="Your Name"
            value={username}
            onChange={setUsername}
          />
          
          <Button 
            onClick={handleJoinRoom}
            disabled={!isUsernameValid || !isConnected}
          >
            Join Room
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