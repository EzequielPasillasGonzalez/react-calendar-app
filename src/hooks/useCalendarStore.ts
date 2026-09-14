import { calendarStore } from "@/store/index.ts";

export const useCalendarStore = () => {
  const events = calendarStore((state) => state.events);
  const activeEvent = calendarStore((state) => state.activeEvent);

  return {
    events,
    activeEvent,
  };
};
