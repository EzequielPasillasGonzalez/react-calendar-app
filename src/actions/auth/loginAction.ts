import calendarApi from "@/api/calendarApi.ts";
import type { UserApi } from "@/calendar/index.ts";

export const loginAction = async (
  email: string,
  password: string,
): Promise<UserApi | null> => {
  try {
    const { data } = await calendarApi.post("/auth", { email, password });

    return {
      id: data.uid,
      name: data.name,
      token: data.token,
    };
  } catch {
    return null;
  }
};
