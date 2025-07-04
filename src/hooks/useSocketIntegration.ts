'use client';

import { useEffect } from 'react';
import { useSocket } from './useSocket';
import { usePokerStore } from '../store/usePokerStore';
import { Room, VoteValue } from '../types';
import { Socket } from 'socket.io-client';
import { generateRoomId } from '../utils/uuid';

export const useSocketIntegration = () => {
    const socket = useSocket() as Socket | null;
    const { 
        setRoom, 
        setCurrentUser, 
        setConnectionStatus,
        createRoom: storeCreateRoom,
        joinRoom: storeJoinRoom,
        joinRoomByUUID: storeJoinRoomByUUID,
        vote: storeVote,
        resetVotes: storeResetVotes,
        startTimer: storeStartTimer,
        stopTimer: storeStopTimer
    } = usePokerStore();

    useEffect(() => {
        console.log('useSocketIntegration: socket changed', socket?.id);
        if (!socket) return;

        socket.on('connect', () => {
            console.log('Socket connected');
            setConnectionStatus(true);
        });

        socket.on('join_error', (data: { message: string }) => {
            console.error('Join error:', data.message);
            alert(data.message);
          });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
            setConnectionStatus(false);
        });

        socket.on('room_update', (data: { room: Room }) => {
            console.log('Room update received', data);
            setRoom(data.room);
        });

        socket.on('vote_reveal', (data: { room: Room }) => {
            console.log('Vote reveal received', data);
            setRoom(data.room);
        });

        socket.on('vote_reset', (data: { room: Room }) => {
            console.log('Vote reset received', data);
            setRoom(data.room);
        });

        socket.on('timer_start', (data: { room: Room }) => {
            console.log('Timer start received', data);
            setRoom(data.room);
        });
    
        socket.on('timer_end', (data: { room: Room }) => {
            console.log('Timer end received', data);
            setRoom(data.room);
        });

        socket.on('room_created', (data: { room: Room }) => {
            console.log('Room created received', data);
            setRoom(data.room);
        });

        socket.on('room_join_success', (data: { room: Room }) => {
            console.log('Room join success received', data);
            setRoom(data.room);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('room_update');
            socket.off('vote_reveal');
            socket.off('vote_reset');
            socket.off('timer_start');
            socket.off('timer_end');
        };
    }, [socket, setRoom, setConnectionStatus]);

    const createRoom = (username: string) => {
        console.log('Socket createRoom called', username);
        if (!socket) return '';
        const roomId = generateRoomId();
        socket.emit('create_room', { roomId, username });
        setCurrentUser({ id: socket.id!, name: username });
        return roomId;
    };

    const joinRoom = (roomId: string, username: string) => {
        console.log('Socket joinRoom called', roomId, username);
        if (!socket) return;
        socket.emit('join_room', { roomId, username });
        setCurrentUser({ id: socket.id!, name: username });
    };

    const joinRoomByUUID = (roomId: string, username: string) => {
        console.log('Socket joinRoomByUUID called', roomId, username);
        if (!socket) return;
        socket.emit('join_room', { roomId, username });
        setCurrentUser({ id: socket.id!, name: username });
    };

    const vote = (roomId: string, value: VoteValue) => {
        console.log('Socket vote called', roomId, value);
        if (!socket) return;
        socket.emit('vote', { roomId, value });
    };

    const resetVotes = (roomId: string) => {
        console.log('Socket resetVotes called', roomId);
        if (!socket) return;
        socket.emit('reset', { roomId });
    };

    const startTimer = (roomId: string, duration: number) => {
        console.log('Socket startTimer called', roomId, duration);
        if (!socket) return;
        socket.emit('start_timer', { roomId, duration });
    };

    const stopTimer = (roomId: string) => {
        console.log('Socket stopTimer called', roomId);
        if (!socket) return;
        socket.emit('stop_timer', { roomId });
    };

    useEffect(() => {
        console.log('Updating store actions');
        usePokerStore.setState({
            createRoom,
            joinRoom,
            joinRoomByUUID,
            vote,
            resetVotes,
            startTimer,
            stopTimer
        });
    }, [socket]);

    return {
        socket,
        createRoom,
        joinRoom,
        joinRoomByUUID,
        vote,
        resetVotes,
        startTimer,
        stopTimer
    };
};