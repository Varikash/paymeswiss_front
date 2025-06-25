'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { User, VoteValue } from '../types';

export default function HomePage() {
  const socketRef = useRef<Socket | null>(null);
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [revealed, setRevealed] = useState(false);
  const roomId = 'test-room';

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
      setUsers((prev) => prev.map(u => ({ ...u, vote: undefined })));
      setRevealed(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (!username.trim()) return;
    socketRef.current?.emit('join_room', { roomId, username });
  };

  const vote = (value: VoteValue) => {
    socketRef.current?.emit('vote', { roomId, value });
  };

  const reset = () => {
    socketRef.current?.emit('reset', { roomId });
  };

  return (
      <main style={{ padding: 20 }}>
        <h2>Planning Poker</h2>

        <input
            placeholder="Your name"
            value={username}
            onChange={e => setUsername(e.target.value)}
        />
        <button onClick={joinRoom}>Join</button>

        <div style={{ marginTop: 20 }}>
          {[1, 2, 3, 5, 8, 13, '?'].map(val => (
              <button key={val} onClick={() => vote(val as VoteValue)}>
                {val}
              </button>
          ))}
        </div>

        <button onClick={reset}>Reset</button>

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