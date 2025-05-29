// store/useAuth.ts
import { create } from "zustand";

type Role = "admin" | "user";

interface User {
  name: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  login: () => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  login: () =>
    set({
      user: { name: "Admin", role: "admin" },
    }),
  logout: () => set({ user: null }),
}));
