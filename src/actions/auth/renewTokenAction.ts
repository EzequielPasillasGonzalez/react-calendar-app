import calendarApi from "@/api/calendarApi.ts";

export const renewTokenAction = async (): Promise<{
  _id: string | null;
  name: string | null;
  token: string | null;
}> => {
  try {
    const { data } = await calendarApi.get("/auth/renew");

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
