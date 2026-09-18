import calendarApi from "@/api/calendarApi.ts";
import type { UserApi } from "@/calendar/index.ts";

export const renewTokenAction = async (): Promise<UserApi | null> => {
  try {
    const { data } = await calendarApi.get("/auth/renew");

    return {
      id: data.uid,
      name: data.name,
      token: data.token,
    };
  } catch {
    return null;
  }
};
