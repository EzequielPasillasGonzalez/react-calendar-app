import { uiStore } from "@/store/index.ts";

export const useUiStore = () => {
  const isDateModalOpen = uiStore((state) => state.isDateModalOpen);
  const onCloseDateModal = uiStore((state) => state.onCloseDateModal);
  const onOpenDateModal = uiStore((state) => state.onOpenDateModal);

  return {
    isDateModalOpen,
    onCloseDateModal,
    onOpenDateModal,
  };
};
