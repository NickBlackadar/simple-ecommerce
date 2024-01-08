import { create } from "zustand";
import { User } from "@/types/User";

interface AuthStore {
  user: User | null;
  setUser(user: User): void;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  login: (email, password) => {},
  register: (email, password) => {},
  logout: () => {},
}));

export default useAuthStore;
