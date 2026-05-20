import { User } from '@/app/types';

export interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
}
