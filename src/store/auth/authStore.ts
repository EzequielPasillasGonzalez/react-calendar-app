import calendarApi from "@/api/calendarApi.ts";
import type { User } from "@/calendar/index.ts";
import { create } from "zustand";

export type typeAuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  // Properties
  status: typeAuthStatus;
  user: User | null;
  errorMessage: string | null;
  // Actions
  onCheking: () => void;
  onLogin: (user: User) => void;
  onStartLogin: (email: string, password: string) => Promise<void>;
  onLogout: (message: string) => void;
  onClearErrorMessage: () => void;
  onStartRegister: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  onCheckAuthToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
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
  async onStartLogin(email: string, password: string) {
    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      get().onLogin({ _id: data.uid, name: data.name });
    } catch {
      get().onLogout("Credenciales incorrectas");
    }
  },
  onLogout(message: string) {
    set({
      status: "not-authenticated",
      user: null,
      errorMessage: message,
    });
  },
  onClearErrorMessage() {
    set({
      errorMessage: null,
    });
  },
  async onStartRegister(name, email, password) {
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      get().onLogin({ _id: data.uid, name: data.name });
    } catch {
      get().onLogout("Error en el registro");
    }
  },
  async onCheckAuthToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      return get().onLogout("");
    }
    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      get().onLogin({ _id: data.uid, name: data.name });
    } catch {
      localStorage.clear();
      get().onLogout("");
    }
  },
}));
