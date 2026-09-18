import calendarApi from "@/api/calendarApi.ts";
import type { EventApi, FormCalendarValues } from "@/calendar/index.ts";

export const updateEventAction = async (
  id: string,
  event: FormCalendarValues,
): Promise<EventApi | null> => {
  try {
    const { data } = await calendarApi.put(`/events/${id}`, {
      title: event.title,
      start: event.start,
      end: event.end,
      notes: event.notes,
    });

    return {
      title: data.evento.title,
      end: data.evento.end,
      id: data.evento.id,
      notes: data.evento.notes,
      start: data.evento.start,
      user: data.evento.user,
    };
  } catch {
    return null;
  }
};
