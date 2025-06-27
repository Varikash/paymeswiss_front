'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import {VoteValue} from "@/types";
import { usePokerStore } from "@/store/usePokerStore";
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import Card from '@/components/ui/Card/Card';

export default function HomePage() {
  const socketRef = useRef<Socket | null>(null);
  const username = usePokerStore(state => state.username);
  const setUsername = usePokerStore(state => state.setUsername);
  const users = usePokerStore(state => state.users);
  const setUsers = usePokerStore(state => state.setUsers);
  const revealed = usePokerStore(state => state.revealed);
  const setRevealed = usePokerStore(state => state.setRevealed);
  const resetStore = usePokerStore(state => state.reset);
  const roomId = 'test-room';

  const [testRevealed, setTestRevealed] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.on('room_update', ({ users, revealed }) => {
      setUsers(users);
      setRevealed(revealed);
    });

    socket.on('vote_reveal', ({ users }) => {
      setUsers(users);
      setRevealed(true);
    });

    socket.on('vote_reset', () => {
      resetStore();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (!username.trim()) return;
    setUsername(username);
    socketRef.current?.emit('join_room', { roomId, username });
  };

  const vote = (value: VoteValue) => {
    socketRef.current?.emit('vote', { roomId, value });
  };

  const reset = () => {
    socketRef.current?.emit('reset', { roomId });
  };

  const cardValues: VoteValue[] = [1, 2, 3, 5, 8, 13, '?', '☕️'];

  return (
      <main style={{ padding: 20 }}>
        <h2>Planning Poker</h2>

        <Input
            label="Your name"
            value={username}
            onChange={setUsername}
        />
        <Button onClick={joinRoom}>Join</Button>

         {/* Временная кнопка для тестирования */}
         <Button onClick={() => setTestRevealed(!testRevealed)}>
          {testRevealed ? 'Hide Cards' : 'Reveal Cards'}
        </Button>

        <div style={{ marginTop: 20, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {cardValues.map(val => (
              <Card 
                key={val} 
                value={val} 
                isRevealed={testRevealed}
                onClick={() => vote(val)}
              />
          ))}
        </div>

        <Button onClick={reset}>Reset</Button>

        <ul>
          {users.map(u => (
              <li key={u.id}>
                {u.name} — {revealed ? u.vote ?? '—' : 'hidden'}
              </li>
          ))}
        </ul>
      </main>
  );
}