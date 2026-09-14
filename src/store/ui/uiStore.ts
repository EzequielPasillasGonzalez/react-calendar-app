import { create } from "zustand";

type UiState = {
  // Properties
  isDateModalOpen: boolean;

  // Actions
  onOpenDateModal: () => void;
  onCloseDateModal: () => void;
};

export const useUiStore = create<UiState>()((set) => ({
  isDateModalOpen: false,

  onCloseDateModal() {
    set({ isDateModalOpen: false });
  },
  onOpenDateModal() {
    set({ isDateModalOpen: true });
  },
}));
