import { useCalendarStore } from "@/store/index.ts";

export const FabDelete = () => {
  const onDeleteEvent = useCalendarStore((state) => state.onDeleteEvent);
  const hasEventSelected = useCalendarStore((state) => !!state.activeEvent);

  return hasEventSelected ? (
    <button
      className="btn btn-danger fab-danger"
      onClick={onDeleteEvent}
      aria-label="Borrar evento"
    >
      <i className="fas fa-trash" />
    </button>
  ) : null;
};
