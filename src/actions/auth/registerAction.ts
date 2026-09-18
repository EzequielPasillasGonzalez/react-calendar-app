import calendarApi from "@/api/calendarApi.ts";
import type { UserApi } from "@/calendar/index.ts";

export const registerAction = async (
  name: string,
  email: string,
  password: string,
): Promise<UserApi | null> => {
  try {
    const { data } = await calendarApi.post("/auth/new", {
      name,
      email,
      password,
    });

    return {
      _id: data.uid,
      name: data.name,
      token: data.token,
    };
  } catch {
    return null;
  }
};
