import type { EventCalendar } from "@/calendar/interfaces/eventCalendar";

export interface EventBackendResponse {
  id: string;
  title: string;
  notes?: string;
  start: string | Date;
  end: string | Date;
  user: {
    id: string;
    name: string;
  };
}

export const convertEventsToDateEvents = (
  events: EventBackendResponse[] = [],
): EventCalendar[] => {
  return events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
};
