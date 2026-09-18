import calendarApi from "@/api/calendarApi.ts";
import type { EventApi } from "@/calendar/index.ts";

export const getEventAction = async (): Promise<EventApi[]> => {
  try {
    const { data } = await calendarApi.get("/events");

    return data.eventos;
  } catch {
    return [];
  }
};
