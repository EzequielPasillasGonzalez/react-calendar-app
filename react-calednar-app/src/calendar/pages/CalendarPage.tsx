import { Calendar, type EventPropGetter, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";

import { localizer } from "@/helpers/";
import { useState, type CSSProperties } from "react";
import type { EventCalendar } from "@/calendar/interfaces/";
import { Navbar, CalendarModal } from "@/calendar/";

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
  const [currentView, setCurrentView] = useState<View>(
    (localStorage.getItem("lastView") as View) || "agenda",
  );

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

  const onDoubleClick = (event: EventCalendar) => {
    console.log({ doubleClick: event });
  };

  const onSelect = (event: EventCalendar) => {
    console.log({ select: event });
  };

  const onViewChanged = (view: View) => {
    console.log({ viewChange: view });
    localStorage.setItem("lastView", view);
    setCurrentView(view);
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
        defaultView="agenda"
        view={currentView}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
    </>
  );
};
