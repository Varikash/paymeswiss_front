export type VoteValue = number | '?';

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
    'leave_room': { roomId: string; userId: string };
    'vote': { roomId: string; value: VoteValue };
    'reset': { roomId: string };
    'start_timer': { roomId: string; duration: number };
    'stop_timer': { roomId: string };
    'room_update': { room: Room };
    'vote_reveal': { room: Room };
    'vote_reset': { room: Room };
    'timer_update': { room: Room };
    'user_joined': { room: Room; user: User };
    'user_left': { room: Room; userId: string };
};