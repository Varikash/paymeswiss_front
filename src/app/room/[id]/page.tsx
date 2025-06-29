'use client';

import React from 'react';
import styles from './pages.module.css';
import { useParams } from 'next/navigation';
import { usePokerStore, useUsers, useRevealed, useCurrentUser, useIsHost } from '../../../store/usePokerStore';
import Player from '@/components/ui/Player/Player';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import Header from '@/components/Header/Header';
import Table from '@/components/ui/Table/Table';
import { VoteValue } from '@/types';

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;

  const users = useUsers();
  const revealed = useRevealed();
  const currentUser = useCurrentUser();
  const isHost = useIsHost();
  const { vote, resetVotes, isConnected } = usePokerStore();

  const handleVote = (value: VoteValue) => {
    if (!currentUser) return;
    vote(roomId, value);
  };

  const handleReset = () => {
    resetVotes(roomId);
  };

  const voteValues: VoteValue[] = [1, 2, 3, 5, 8, 13, '?', '☕️'];

  return (
    <div className={styles.container}>

      <Header
        roomId={roomId}
        userName={currentUser?.name || 'Unknown'}
        isConnected={isConnected}
      >
        <Button variant='outline' size='sm'>Cписок участников</Button>
      </Header>
    
        <div>
          <h2>Players ({users.length}):</h2>
          {users.map((user) => (
            <Player
            key={user.id}
            name={user.name}
            vote={user.vote}
            isRevealed={revealed}
            isCurrentUser={user.id === currentUser?.id}
          />
          ))}
        </div>

        {isHost && revealed && (
          <div>
            <Button onClick={handleReset}>
              Reset Votes
            </Button>
          </div>
        )}

        {!revealed && currentUser && (
          <div>
            <h2>Select your vote:</h2>
            
            <div>
              {voteValues.map((value) => (
                <Card
                  key={value}
                  value={value}
                  size="sm"
                  onClick={() => handleVote(value)}
                />
              ))}
            </div>
          </div>
        )}

        {revealed && (
          <div>
            <h2>All votes revealed!</h2>
              <Button onClick={handleReset} disabled={!isHost}>
                Reset Votes
              </Button>
          </div>
        )}

    </div>
  );
} 