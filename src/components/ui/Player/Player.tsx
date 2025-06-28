import React from "react";
import styles from "./Player.module.css";
import { VoteValue } from "@/types";
import Card from "../Card/Card";

interface PlayerProps {
  name: string;
  vote?: VoteValue;
  isRevealed: boolean;
  isCurrentUser?: boolean;
}

export default function Player({
  name,
  vote,
  isRevealed,
  isCurrentUser = false,
}: PlayerProps) {
  return (
    <div className={`${styles.playerCard} ${isCurrentUser ? styles.current : ''}`}>
      <div className={styles.cardWrapper}>
        {vote === undefined ? (
          <div className={styles.emptyCard}></div>
        ) : (
          <Card
            value={vote}
            isRevealed={isRevealed}
            size="sm"
          />
        )}
      </div>
      <div className={styles.playerName} title={name}>
        {name}
        {isCurrentUser && <span className={styles.you}>(you)</span>}
      </div>
    </div>
  );
}