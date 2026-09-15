import type { User } from "@/calendar/index.ts";
import { create } from "zustand";

type AuthState = {
  // Properties
  status: "checking" | "authenticated" | "not-authenticated";
  user: User | null;
  errorMessage: string | null;
  // Actions
  onCheking: () => void;
  onLogin: (user: User) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  errorMessage: null,
  status: "checking",
  user: null,
  onCheking() {
    set({
      status: "checking",
      user: null,
      errorMessage: null,
    });
  },
  onLogin(user: User) {
    set({
      status: "authenticated",
      user: user,
      errorMessage: null,
    });
  },
}));
