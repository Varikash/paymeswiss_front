import { create } from 'zustand';
import { User, Room, VoteValue} from '../types';

type PokerState = {
    //current user
    currentUser: {
        id: string;
        name: string;
    } | null;
    
    //current room
    room: Room | null;

    //connection state
    isConnected: boolean;

    //Actions

    setCurrentUser: (user: { id: string; name: string }) => void;
    setRoom: (room: Room) => void;
    setConnectionStatus: (connected: boolean) => void;

    joinRoom: (roomId: string, username: string) => void;
    vote: (roomId: string, value: VoteValue) => void;
    resetVotes: (roomId: string) => void;
    startTimer: (roomId: string, duration: number) => void;
    stopTimer: (roomId: string) => void;

    // Reset store
    resetStore: () => void;
}

export const usePokerStore = create<PokerState>((set, get) => ({
    currentUser: null,
    room: null,
    isConnected: false,
    
    setCurrentUser: (user) => set({ currentUser: user }),
    setRoom: (room) => set({ room }),
    setConnectionStatus: (connected) => set({ isConnected: connected }),
    
    // Socket actions (заглушки - будут реализованы с socket)
    joinRoom: (roomId: string, username: string) => {
        // TODO: Реализовать с socket
        console.log('joinRoom:', roomId, username);
    },
    
    vote: (roomId: string, value: VoteValue) => {
        // TODO: Реализовать с socket
        console.log('vote:', roomId, value);
    },
    
    resetVotes: (roomId: string) => {
        // TODO: Реализовать с socket
        console.log('resetVotes:', roomId);
    },
    
    startTimer: (roomId: string, duration: number) => {
        // TODO: Реализовать с socket
        console.log('startTimer:', roomId, duration);
    },
    
    stopTimer: (roomId: string) => {
        // TODO: Реализовать с socket
        console.log('stopTimer:', roomId);
    },
    
    resetStore: () => set({ 
        currentUser: null, 
        room: null, 
        isConnected: false 
    }),
}));

// Selectors for convinience
export const useCurrentUser = () => usePokerStore(state => state.currentUser);
export const useRoom = () => usePokerStore(state => state.room);
export const useUsers = () => usePokerStore(state => state.room?.users || []);
export const useRevealed = () => usePokerStore(state => state.room?.revealed || false);
export const useIsConnected = () => usePokerStore(state => state.isConnected);
export const useIsHost = () => usePokerStore(state => {
    const currentUser = state.currentUser;
    const room = state.room;
    return currentUser && room && room.hostId === currentUser.id;
});