import type { User } from "@/calendar/interfaces/user.ts";

export interface EventApi {
  title: string;
  start: Date;
  end: Date;
  notes: string;
  user: User;
  id: string;
}
