import calendarApi from "@/api/calendarApi.ts";

export const registerAction = async (
  name: string,
  email: string,
  password: string,
): Promise<{
  _id: string | null;
  name: string | null;
  token: string | null;
}> => {
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
    return {
      _id: null,
      name: null,
      token: null,
    };
  }
};
