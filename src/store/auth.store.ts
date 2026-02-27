import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  token?: string;
  username?: string;
  isAuthenticated: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      username: undefined,
      isAuthenticated: false,
      login: (token, username) => set({ token, username, isAuthenticated: true }),
      logout: () => set({ token: undefined, username: undefined, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);

export const getState = () => useAuthStore.getState();
