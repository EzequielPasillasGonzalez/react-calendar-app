import { useCalendarStore, useUiStore } from "@/store/index.ts";

export const FabAddNew = () => {
  const onOpenDateModal = useUiStore((state) => state.onOpenDateModal);
  const onSetActiveEvent = useCalendarStore((state) => state.onSetActiveEvent);

  const handleClickNew = () => {
    onSetActiveEvent(null);
    onOpenDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus" />
    </button>
  );
};
