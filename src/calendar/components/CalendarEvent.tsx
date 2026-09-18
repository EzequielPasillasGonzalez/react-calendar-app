import type { EventProps } from "react-big-calendar";
import type { EventCalendar } from "@/calendar/interfaces";

export const CalendarEvent = ({ event }: EventProps<EventCalendar>) => {
  const { title, user, notes } = event;

  return (
    <div className="d-flex flex-column">
      <strong>{title}</strong>
      {user?.name && (
        <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>- {user.name}</span>
      )}
      {notes && (
        <small style={{ fontSize: "0.7rem", fontStyle: "italic" }}>
          {notes}
        </small>
      )}
    </div>
  );
};
