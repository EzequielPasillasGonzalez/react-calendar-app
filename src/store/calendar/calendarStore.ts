import {
  createEventAction,
  deleteEventAction,
  getEventAction,
  updateEventAction,
} from "@/actions/index.ts";
import type { EventCalendar } from "@/calendar/index.ts";
import { create } from "zustand";

type CalendarState = {
  // Properties
  events: EventCalendar[];
  activeEvent: EventCalendar | null;

  // Actions
  onSetActiveEvent: (payload: EventCalendar | null) => void;
  onSaveEvent: (payload: Partial<EventCalendar>) => Promise<void>;
  onDeleteEvent: () => Promise<boolean>;
  onGetEvent: () => Promise<void>;
};

export const useCalendarStore = create<CalendarState>()((set, get) => ({
  activeEvent: null,
  events: [],
  onSetActiveEvent(payload) {
    set({ activeEvent: payload });
  },
  onSaveEvent: async (payload: Partial<EventCalendar>) => {
    if (!payload.title?.trim() || !payload.start || !payload.end) return;
    const isUpdate = payload.id && payload.id !== "";

    if (isUpdate) {
      await updateEventAction(payload.id!, {
        title: payload.title,
        start: payload.start,
        end: payload.end,
        notes: payload.notes ?? "",
      });
    } else {
      await createEventAction({
        title: payload.title,
        start: payload.start,
        end: payload.end,
        notes: payload.notes ?? "",
      });
    }

    get().onGetEvent();
  },
  onDeleteEvent: async (): Promise<boolean> => {
    if (!get().activeEvent) return false;
    const eventId = get().activeEvent!.id;
    const ok = await deleteEventAction(eventId);

    get().onGetEvent();

    set({ activeEvent: null });

    return ok;
  },
  onGetEvent: async () => {
    const events = await getEventAction();
    set({ events: events });
  },
}));
