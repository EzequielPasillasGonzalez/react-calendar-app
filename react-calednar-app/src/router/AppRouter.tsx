import { LoginPage } from "@/auth/";
import { CalendarPage } from "@/calendar/pages/CalendarPage.tsx";
import { Navigate, Route, Routes } from "react-router-dom";

type typeAuthStatus = "authenticated" | "not-authenticated";

export const AppRouter = () => {
  const authStatus: typeAuthStatus = "authenticated";

  return (
    <Routes>
      {authStatus === "not-authenticated" ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
