'use client';

import { useParams } from 'next/navigation';

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;

  return (
    <div>
      <h1>Комната: {roomId}</h1>
      <p>Здесь будет интерфейс Planning Poker</p>
    </div>
  );
} 