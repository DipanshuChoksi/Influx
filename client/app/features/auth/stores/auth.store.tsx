import { create } from 'zustand';
import { AuthState } from '../types/auth.type';

const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
