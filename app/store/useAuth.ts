import { create } from "zustand";
import { login } from "../lib/auth";

interface AuthState {
  user: any;
  jwt: string;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  jwt: "",

  loginUser: async (email, password) => {
    const data = await login(email, password);
    set({ user: data.user, jwt: data.jwt }); // user должен быть полным объектом!
  },

  logout: () => set({ user: null, jwt: "" }),
}));


