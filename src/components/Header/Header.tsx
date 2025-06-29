import React from 'react';
import styles from './Header.module.css';
import ThemeToggle from '../ui/ThemeToggle/ThemeToggle';

interface HeaderProps {
    children: React.ReactNode;
    onClick?: () => void;
    roomId: string;
    userName: string;
    isConnected: boolean
}

export default function Header({
    children,
    onClick,
    roomId,
    userName,
    isConnected,
}: HeaderProps) {
    return (
        <header className={styles.header}>
            <p className={styles.roomId}>{roomId}</p>
            <ThemeToggle />
            <div className={styles.userInfo}>
            <div className={`${styles.statusDot} ${isConnected ? styles.connected : styles.disconnected}`} data-testid="status-dot"></div>
                <p>{userName}</p>
            </div>
            {children}
        </header>
    )
}