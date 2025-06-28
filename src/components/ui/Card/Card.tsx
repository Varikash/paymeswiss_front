import React from "react";
import styles from "./Card.module.css";
import { VoteValue } from '@/types';


interface CardProps {
    value: VoteValue;
    isSelected?: boolean;
    isRevealed?: boolean;
    onClick?:() => void;
    disabled?: boolean;
    size?: 'lg' | 'sm';
}

export default function Card({
    value,
    isSelected = false,
    isRevealed = false,
    onClick,
    disabled = false,
    size = 'lg',
}: CardProps) {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    return (
        <div className={`${styles.card} ${styles[size]} ${isRevealed ? styles.revealed : ''} ${disabled ? styles.disabled : ''}`} onClick={handleClick}>
            <div className={`${styles.cardInner} ${isSelected ? styles.selected : ''}`}>
                <div className={styles.cardFront}>
                    <div className={styles.cardContent}>
                        ?
                    </div>
                </div>
                <div className={styles.cardBack}>
                    <div className={styles.cardContent}>
                        {value}
                    </div>
                </div>
            </div>
        </div>
    )
}