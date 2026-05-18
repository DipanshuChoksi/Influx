import { create } from 'zustand';

interface Participant {
  id: string;
  name: string;
  isHost: boolean;
}

interface PartyState {
  roomId: string | null;
  participants: Participant[];
  isPlaying: boolean;
  currentTime: number;
  setRoomId: (id: string) => void;
  addParticipant: (p: Participant) => void;
  removeParticipant: (id: string) => void;
  setParticipants: (p: Participant[]) => void;
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  reset: () => void;
}

export const usePartyStore = create<PartyState>((set) => ({
  roomId: null,
  participants: [],
  isPlaying: false,
  currentTime: 0,
  setRoomId: (id) => set({ roomId: id }),
  addParticipant: (p) => set((state) => ({ participants: [...state.participants, p] })),
  removeParticipant: (id) => set((state) => ({ participants: state.participants.filter((p) => p.id !== id) })),
  setParticipants: (participants) => set({ participants }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  reset: () => set({ roomId: null, participants: [], isPlaying: false, currentTime: 0 }),
}));
