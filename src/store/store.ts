import { uiSlice } from "@/store/ui/uiSlice.ts";
import { configureStore } from "@reduxjs/toolkit";

// todo cambiar el store a la nueva forma y apuntar a lo mas alto de la app
export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});
