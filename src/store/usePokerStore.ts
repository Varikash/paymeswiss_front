import { create } from 'zustand';
import { User } from '../types';

type PokerState = {
    username: string;
    users: User[];
    revealed: boolean;
    setUsername: (name: string) => void;
    setUsers: (users: User[]) => void;
    setRevealed: (revealed: boolean) => void;
    reset: () => void;
}

export const usePokerStore = create<PokerState>((set) => ({
    username: '',
    users: [],
    revealed: false,
    setUsername: (name) => set({ username: name }),
    setUsers: (users) => set({ users }),
    setRevealed: (revealed) => set({ revealed }),
    reset: () => set({ users: [], revealed: false }),
}));