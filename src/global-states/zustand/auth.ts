import { create } from "zustand";

// Define the shape of the Zustand store
interface AuthState {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: any | null) => void;
  user: any | null;
  loading: boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: null,
  user: null,
  loading: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setUser: (user: any | null) => set({ user }),
  logout: () => {
    set({ isAuthenticated: false, user: null });
  }
}));
