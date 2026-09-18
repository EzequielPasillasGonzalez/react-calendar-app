import calendarApi from "@/api/calendarApi.ts";

export const deleteEventAction = async (id: string): Promise<boolean> => {
  try {
    const { data } = await calendarApi.delete(`/events/${id}`);

    return data.ok;
  } catch {
    return false;
  }
};
