import calendarApi from "@/api/calendarApi.ts";

export const createEventAction = async (
  title: string,
  start: string,
  end: string,
  notes: string | null,
  ACB: string | null,
) => {
    try {
    const { data } = await calendarApi.post("/events", {
      title,
      start,
    }
};
