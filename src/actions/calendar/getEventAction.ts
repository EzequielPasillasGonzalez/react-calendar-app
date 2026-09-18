import calendarApi from "@/api/calendarApi.ts";
import type { EventCalendar } from "@/calendar/index.ts";
import { convertEventsToDateEvents } from "@/helpers/";

export const getEventAction = async (): Promise<EventCalendar[]> => {
  try {
    const { data } = await calendarApi.get("/events");

    const eventos = data.eventos || [];

    return convertEventsToDateEvents(eventos);
  } catch {
    return [];
  }
};
