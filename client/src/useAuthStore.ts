import { create } from "zustand";
import { User } from "@/types/User";

interface AuthStore {
  user: User | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loginUser: (user) => set({ user: user }),
  logoutUser: () =>
    set(() => {
      localStorage.removeItem("user");
      return {
        user: null,
      };
    }),
}));

export default useAuthStore;
