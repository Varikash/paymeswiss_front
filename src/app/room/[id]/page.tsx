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

  const playerZones = {
    top: users.slice(0, 4),
    bottom: users.slice(4, 8),
    left: users.slice(8, 10),
    right: users.slice(10, 12)
  }

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
        <Button variant='outline' size='sm'>Cписок участников ({users.length})</Button>
      </Header>

      <div className={styles.main}>

        <div className={styles.tableContainer}>

          <div className={styles.topZone}>
              {playerZones.top.map((user) => (
                <Player
                  key={user.id}
                  name={user.name}
                  vote={user.vote}
                  isRevealed={revealed}
                  isCurrentUser={user.id === currentUser?.id}
                />
              ))}
          </div>

          <div className={styles.middleSection}>
            <div className={styles.leftZone}>
                {playerZones.left.map((user) => (
                  <Player
                    key={user.id}
                    name={user.name}
                    vote={user.vote}
                    isRevealed={revealed}
                    isCurrentUser={user.id === currentUser?.id}
                  />
                ))}
            </div>

            <Table button={<Button>Show Cards</Button>}>
            </Table>

            <div className={styles.rightZone}>
              {playerZones.right.map((user) => (
                <Player
                  key={user.id}
                  name={user.name}
                  vote={user.vote}
                  isRevealed={revealed}
                  isCurrentUser={user.id === currentUser?.id}
                />
              ))}
            </div>
          </div>

          <div className={styles.bottomZone}>
            {playerZones.bottom.map((user) => (
              <Player
                key={user.id}
                name={user.name}
                vote={user.vote}
                isRevealed={revealed}
                isCurrentUser={user.id === currentUser?.id}
              />
            ))}
          </div>

        </div>

        {!revealed && currentUser && (
          <div>
            <h2>Select your vote:</h2>
            
            <div className={styles.cardSection}>
              {voteValues.map((value) => (
                <Card
                  key={value}
                  value={value}
                  size="sm"
                  isRevealed={true}
                  onClick={() => handleVote(value)}
                />
              ))}
            </div>
          </div>
        )}    

        {isHost && revealed && (
          <div>
            <Button onClick={handleReset}>
              Reset Votes
            </Button>
          </div>
        )}

        
      </div>
    </div>
  );
} 