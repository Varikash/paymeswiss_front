'use client'

import { useEffect } from 'react';
import { useSocket } from './useSocket';
import { usePokerStore } from '../store/usePokerStore';
import { Room, VoteValue } from '../types';
import { Socket } from 'socket.io-client';

export const useSocketIntegration = () => {
    const socket = useSocket() as Socket | null;
    const { 
        setRoom, 
        setCurrentUser, 
        setConnectionStatus,
        joinRoom: storeJoinRoom,
        vote: storeVote,
        resetVotes: storeResetVotes,
        startTimer: storeStartTimer,
        stopTimer: storeStopTimer
    } = usePokerStore();

    useEffect(() => {
        if (!socket) return;

        // Подключение
        socket.on('connect', () => {
            setConnectionStatus(true);
        });

        // Отключение
        socket.on('disconnect', () => {
            setConnectionStatus(false);
        });

        // Обновление комнаты
        socket.on('room_update', (data: { room: Room }) => {
            setRoom(data.room);
        });

        // Показ голосов
        socket.on('vote_reveal', (data: { room: Room }) => {
            setRoom(data.room);
        });

        // Сброс голосов
        socket.on('vote_reset', (data: { room: Room }) => {
            setRoom(data.room);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('room_update');
            socket.off('vote_reveal');
            socket.off('vote_reset');
        };
    }, [socket, setRoom, setConnectionStatus]);

    // Реализуем socket actions
    const joinRoom = (roomId: string, username: string) => {
        if (!socket) return;
        socket.emit('join_room', { roomId, username });
        setCurrentUser({ id: socket.id!, name: username });
    };

    const vote = (roomId: string, value: VoteValue) => {
        if (!socket) return;
        socket.emit('vote', { roomId, value });
    };

    const resetVotes = (roomId: string) => {
        if (!socket) return;
        socket.emit('reset', { roomId });
    };

    const startTimer = (roomId: string, duration: number) => {
        if (!socket) return;
        socket.emit('start_timer', { roomId, duration });
    };

    const stopTimer = (roomId: string) => {
        if (!socket) return;
        socket.emit('stop_timer', { roomId });
    };

    // Обновляем store actions
    useEffect(() => {
        usePokerStore.setState({
            joinRoom,
            vote,
            resetVotes,
            startTimer,
            stopTimer
        });
    }, [socket]);

    return {
        socket,
        joinRoom,
        vote,
        resetVotes,
        startTimer,
        stopTimer
    };
};