import type { User } from "@/calendar/interfaces/user.ts";

export interface EventCalendar {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}
