'use client';

import { useState, useEffect } from 'react';
import { usePokerStore } from '../store/usePokerStore';
import  Button  from '../components/ui/Button/Button';
import { LobbyModal } from '../components/lobby/LobbyModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected } = usePokerStore();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div>
      <div>
        <h1>Planning Poker</h1>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          disabled={!isConnected}
        >
          Join Planning Poker
        </Button>
        
        {!isConnected && (
          <p>Connecting to server...</p>
        )}
      </div>

      <LobbyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}