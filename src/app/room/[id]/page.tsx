'use client';

import React from 'react';
import styles from './pages.module.css';
import { useParams } from 'next/navigation';
import { usePokerStore, useUsers, useRevealed, useCurrentUser, useIsHost, useIsTimerActive, useRemainingTime, useTimerProgress, useRoom } from '../../../store/usePokerStore';
import Player from '@/components/ui/Player/Player';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import Header from '@/components/Header/Header';
import Table from '@/components/ui/Table/Table';
import Sidebar from '@/components/layout/SideBar/SideBar';
import { VoteValue } from '@/types';

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [timerTick, setTimerTick] = React.useState(0);

  const users = useUsers();
  const revealed = useRevealed();
  const currentUser = useCurrentUser();
  const isHost = useIsHost();
  const room = useRoom();

  const isTimerActive = useIsTimerActive();
  const remainingTime = useRemainingTime();
  const timerProgress = useTimerProgress();

  const { vote, resetVotes, startTimer, isConnected, resetStore } = usePokerStore();

  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

  React.useEffect(() => {
    // Проверяем при загрузке страницы
    if (!currentUser) {
      resetStore();
      window.location.href = '/';
    }
  }, [currentUser, resetStore]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen]);


  React.useEffect(() => {
    if (!isTimerActive) return;
  
    const interval = setInterval(() => {
      setTimerTick(prev => prev + 1);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const voteValues: VoteValue[] = [1, 2, 3, 5, 8, 13, '?', '☕️'];

  return (
    <div className={styles.container}>

      <Header
        roomId={roomId}
        userName={currentUser?.name || 'Unknown'}
        isConnected={isConnected}
      >
        <Button 
          variant='outline' 
          size='sm'
          onClick={handleSidebar}
        >
            List of participants ({users.length})
        </Button>
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

            <Table 
              button={
                <Button onClick={() => startTimer(roomId, 45)} disabled={!isHost}>
                  Start Timer (45s)
                </Button>
              }
              isTimerActive={isTimerActive}
              remainingTime={remainingTime}
              timerProgress={timerProgress}
              onStartTimer={() => startTimer(roomId, 45)}
              isHost={isHost}
            />

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

        {isSidebarOpen && <Sidebar
          isOpen={isSidebarOpen}
          onClose={handleSidebar}
          users={users}
        />}

        
      </div>
    </div>
  );
} 