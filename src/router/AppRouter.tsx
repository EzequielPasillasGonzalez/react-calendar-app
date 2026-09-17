import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/auth/";
import { CalendarPage } from "@/calendar/pages/CalendarPage.tsx";
import { useAuthStore, type typeAuthStatus } from "@/store/index.ts";
import { useEffect } from "react";

export const AppRouter = () => {
  const authStatus: typeAuthStatus = useAuthStore((state) => state.status);
  const onCheckAuthToken = useAuthStore((state) => state.onCheckAuthToken);

  useEffect(() => {
    onCheckAuthToken();
  }, [onCheckAuthToken]);

  if (authStatus === "checking") {
    return <h3>Loading...</h3>;
  }
  return (
    <Routes>
      {authStatus === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
};
