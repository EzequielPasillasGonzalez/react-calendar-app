import {
  loginAction,
  registerAction,
  renewTokenAction,
} from "@/actions/index.ts";
import type { User } from "@/calendar/index.ts";
import { useCalendarStore } from "@/store/calendar/calendarStore.ts";
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
    const data = await loginAction(email, password);

    if (data === null) {
      get().onLogout("Credenciales incorrectas");
      return;
    }

    localStorage.setItem("token", data.token);

    get().onLogin({ id: data.id, name: data.name });
  },
  onLogout(message: string) {
    localStorage.removeItem("token");
    useCalendarStore.getState().onClearEvents();
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
    const data = await registerAction(name, email, password);
    if (data === null) {
      get().onLogout("Error en el registro");
      return;
    }
    localStorage.setItem("token", data.token);
    get().onLogin({ id: data.id, name: data.name });
  },
  async onCheckAuthToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      return get().onLogout("");
    }

    const data = await renewTokenAction();
    if (data === null) {
      localStorage.clear();
      get().onLogout("");
      return;
    }

    localStorage.setItem("token", data.token);

    get().onLogin({ id: data.id, name: data.name });
  },
}));
