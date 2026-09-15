import type { EventCalendar } from "@/calendar/index.ts";
import { addHours } from "date-fns";
import { create } from "zustand";

const tempEvent: EventCalendar = {
  _id: "123",
  title: "Mi cumpleaños",
  notes: "Hay que organizar algo",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Cheke",
  },
};

type CalendarState = {
  // Properties
  events: EventCalendar[];
  activeEvent: EventCalendar | null;

  // Actions
  onSetActiveEvent: (payload: EventCalendar | null) => void;
  onSaveEvent: (payload: EventCalendar) => void;
};

export const useCalendarStore = create<CalendarState>()((set) => ({
  activeEvent: null,
  events: [tempEvent],
  onSetActiveEvent(payload) {
    set({ activeEvent: payload });
  },
  onSaveEvent: (payload) => {
    if (!payload.title.trim()) return;

    set((state) => {
      // Comprobamos si el evento ya existe en la lista
      const isExisting = state.events.some(
        (event) => event._id === payload._id,
      );

      // Si el evento ya existe, lo actualizamos; de lo contrario, lo agregamos
      const updatedEvents = isExisting
        ? state.events.map((event) =>
            event._id === payload._id ? payload : event,
          )
        : [
            ...state.events,
            { ...payload, _id: payload._id || new Date().getTime().toString() },
          ];

      return {
        events: updatedEvents,
        activeEvent: null, //  Limpia la selección en el mismo render
      };
    });
  },
}));
