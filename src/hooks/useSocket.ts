import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '../types';

export const useSocket = () => {
    const socketRef = useRef<Socket<SocketEvents> | null>(null);

    useEffect(() => {
        const socket = io('http://localhost:3000', {
            transports: ['websocket', 'polling']
        });
        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, []);

    return socketRef.current;
};