export type VoteValue = 1 | 2 | 3 | 5 | 8 | 13 | '?' | '☕️';

export type User = {
    id: string;
    name: string;
    vote?: VoteValue;
    isHost?: boolean;
    joinedAt: Date;
};

export type Room = {
    id: string;
    name: string;
    users: User[];
    revealed: boolean;
    timer?: {
        duration: number;
        startTime?: Date;
        isActive: boolean;
    };
    createdAt: Date;
    hostId: string;
};

export type SocketEvents = {
    'join_room': { roomId: string; username: string };
    'vote': { roomId: string; value: VoteValue };
    'reset': { roomId: string };
    'start_timer': { roomId: string; duration: number };
    'stop_timer': { roomId: string };
    'room_update': { room: Room };
    'vote_reveal': { room: Room };
    'vote_reset': { room: Room };
};