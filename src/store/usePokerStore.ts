import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
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