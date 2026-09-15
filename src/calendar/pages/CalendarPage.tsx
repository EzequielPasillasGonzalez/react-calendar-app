import { useState, type CSSProperties } from "react";
import { Calendar, type EventPropGetter, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { localizer } from "@/helpers/";
import type { EventCalendar } from "@/calendar/interfaces/";
import { Navbar, CalendarModal, FabAddNew } from "@/calendar/";
import { useCalendarStore, useUiStore } from "@/store/index.ts";

export const CalendarPage = () => {
  const [currentView, setCurrentView] = useState<View>(
    (localStorage.getItem("lastView") as View) || "agenda",
  );

  const events = useCalendarStore((state) => state.events);
  const onSetActiveEvent = useCalendarStore((state) => state.onSetActiveEvent);

  const onOpenDateModal = useUiStore((state) => state.onOpenDateModal);

  const eventStyleGetter: EventPropGetter<EventCalendar> = () => {
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

  const onDoubleClick = () => {
    onOpenDateModal();
  };

  const onSelect = (event: EventCalendar) => {
    onSetActiveEvent(event);
  };

  const onViewChanged = (view: View) => {
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
      <FabAddNew />
    </>
  );
};
