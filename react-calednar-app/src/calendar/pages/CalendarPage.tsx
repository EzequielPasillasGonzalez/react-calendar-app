import { Calendar, type EventPropGetter } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";

import { Navbar } from "@/calendar/components/Navbar.tsx";
import { localizer } from "@/helpers/";
import type { EventCalendar } from "@/calendar/interfaces/";
import type { CSSProperties } from "react";

const events: EventCalendar[] = [
  {
    title: "Mi cumpleaños",
    notes: "Hay que organizar algo",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Cheke",
    },
  },
];

export const CalendarPage = () => {
  const eventStyleGetter: EventPropGetter<EventCalendar> = (
    event,
    start,
    end,
    isSelected,
  ) => {
    console.log({ event, start, end, isSelected });

    const style: CSSProperties = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };
  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
