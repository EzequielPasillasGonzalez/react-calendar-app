import type { EventCalendar } from "@/calendar/index.ts";
import { addHours } from "date-fns";
import { create } from "zustand";

const tempEvent = {
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
  onOpenDateModal: () => void;
  onCloseDateModal: () => void;
};

export const useCalendarStore = create<CalendarState>()((set) => ({
  isDateModalOpen: false,

  onCloseDateModal() {
    set({ isDateModalOpen: false });
  },
  onOpenDateModal() {
    set({ isDateModalOpen: true });
  },
}));
