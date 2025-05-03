import { create } from 'zustand';
import { AuthState, User } from '../types';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../utils/authUtils';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await loginUser(email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await registerUser(name, email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred', 
        isLoading: false 
      });
    }
  },
  
  logout: () => {
    logoutUser();
    set({ user: null, isAuthenticated: false });
  },
  
  checkAuth: () => {
    const user = getCurrentUser();
    set({ user, isAuthenticated: !!user });
  }
}));