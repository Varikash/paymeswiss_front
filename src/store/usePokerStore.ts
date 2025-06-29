import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { User, Room, VoteValue} from '../types';
import { generateRoomId } from '../utils/uuid';

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

    // Room management
    createRoom: (username: string) => string;
    joinRoom: (roomId: string, username: string) => void;
    joinRoomByUUID: (roomId: string, username: string) => void;
    
    // Game actions
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
    
    // Create new room with UUID
    createRoom: (username: string) => {
        const roomId = generateRoomId();
        console.log('createRoom:', roomId, username);
        // TODO: Реализовать с socket
        return roomId;
    },
    
    // Join existing room
    joinRoom: (roomId: string, username: string) => {
        console.log('joinRoom:', roomId, username);
        // TODO: Реализовать с socket
    },
    
    // Join room by UUID (alias for joinRoom)
    joinRoomByUUID: (roomId: string, username: string) => {
        console.log('joinRoomByUUID:', roomId, username);
        // TODO: Реализовать с socket
    },
    
    vote: (roomId: string, value: VoteValue) => {
        console.log('vote:', roomId, value);
        // TODO: Реализовать с socket
    },
    
    resetVotes: (roomId: string) => {
        console.log('resetVotes:', roomId);
        // TODO: Реализовать с socket
    },
    
    startTimer: (roomId: string, duration: number) => {
        console.log('startTimer:', roomId, duration);
        // TODO: Реализовать с socket
    },
    
    stopTimer: (roomId: string) => {
        console.log('stopTimer:', roomId);
        // TODO: Реализовать с socket
    },
    
    resetStore: () => set({ 
        currentUser: null, 
        room: null, 
        isConnected: false 
    }),
}));

// Selectors for convinience
export const useCurrentUser = () => usePokerStore(useShallow((state) => state.currentUser));
export const useRoom = () => usePokerStore(useShallow((state) => state.room));
export const useUsers = () => usePokerStore(useShallow((state) => state.room?.users ?? []));
export const useRevealed = () => usePokerStore((state) => state.room?.revealed ?? false);
export const useIsConnected = () => usePokerStore((state) => state.isConnected);
export const useIsHost = () => usePokerStore((state) => {
    const currentUser = state.currentUser;
    const room = state.room;
    return Boolean(currentUser && room && room.hostId === currentUser.id);
});
export const useTimer = () => usePokerStore((state) => state.room?.timer);
export const useIsTimerActive = () => usePokerStore((state) => state.room?.timer?.isActive ?? false);
export const useRemainingTime = () => usePokerStore((state) => {
  const timer = state.room?.timer;
  if (!timer?.isActive || !timer.startTime) return 0;
  
  const now = new Date().getTime();
  const startTime = new Date(timer.startTime).getTime();
  const elapsed = Math.floor((now - startTime) / 1000);
  const remaining = timer.duration - elapsed;
  
  return Math.max(0, remaining);
});

export const useTimerProgress = () => usePokerStore((state) => {
    const timer = state.room?.timer;
    if (!timer?.isActive || !timer.startTime) return 0;
    
    const now = new Date().getTime();
    const startTime = new Date(timer.startTime).getTime();
    const elapsed = Math.floor((now - startTime) / 1000);
    const progress = (elapsed / timer.duration) * 100;
    
    return Math.min(100, Math.max(0, progress));
  });