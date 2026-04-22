import { create } from "zustand";
import { User } from "../types/User.types";

const useUser = create((set) => ({
  user: <User | null>null,
  setUser: (user: User) => set({ user }),
}));

export default useUser;
