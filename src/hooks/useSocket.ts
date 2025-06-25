import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        const socket = io('http://localhost:3000');
        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, []);

    return socketRef.current;
};