import calendarApi from "@/api/calendarApi.ts";

export const loginAction = async (
  email: string,
  password: string,
): Promise<{
  _id: string | null;
  name: string | null;
  token: string | null;
}> => {
  try {
    const { data } = await calendarApi.post("/auth", { email, password });

    return {
      _id: data.uid,
      name: data.name,
      token: data.token,
    };
  } catch {
    return {
      _id: null,
      name: null,
      token: null,
    };
  }
};
