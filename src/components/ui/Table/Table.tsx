import React from 'react';
import styles from './Table.module.css';
import Button from '@/components/ui/Button/Button';

interface TableProps {
  button?: React.ReactNode;
  children?: React.ReactNode;
  isTimerActive?: boolean;
  remainingTime?: number;
  timerProgress?: number;
  onStartTimer?: () => void;
  isHost?: boolean;
}

export default function Table({ 
  button, 
  children, 
  isTimerActive = false, 
  remainingTime = 0, 
  timerProgress = 0, 
  onStartTimer, 
  isHost = false 
}: TableProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.table}>
      {isTimerActive ? (
        <div className={styles.timerContainer}>
          <div className={styles.timer}>
            {formatTime(remainingTime)}
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${100 - timerProgress}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          {button}
          {children}
        </>
      )}
    </div>
  );
}