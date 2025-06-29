import React from 'react';
import styles from './Sidebar.module.css';
import { User } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

export default function Sidebar({ isOpen, onClose, users }: SidebarProps) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} data-testid="sidebar">
      <div className={styles.header}>
        <h3>List of Participants ({users.length})</h3>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
      
      <div className={styles.content}>
        {users.map((user) => (
          <div key={user.id} className={styles.userItem}>
            <span className={styles.userName}>{user.name}</span>
            {user.isHost && <span className={styles.hostBadge}>Host</span>}
          </div>
        ))}
      </div>
    </div>
  );
}