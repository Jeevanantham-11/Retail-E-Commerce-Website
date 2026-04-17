import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUser {
  email: string | null;
  isGuest: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
  
  // Actions
  login: (email: string) => void;
  continueAsGuest: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (email: string) => 
        set({ 
          user: { email, isGuest: false }, 
          isLoggedIn: true 
        }),
        
      continueAsGuest: () => 
        set({ 
          user: { email: null, isGuest: true }, 
          isLoggedIn: true 
        }),
        
      logout: () => 
        set({ 
          user: null, 
          isLoggedIn: false 
        }),
    }),
    {
      name: "idacs-auth-storage", // stores auth state in localStorage
    }
  )
);
