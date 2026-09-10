import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isdateModalOpen: false,
  },
  reducers: {
    onOpenDateModal: (state) => {
      state.isdateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isdateModalOpen = false;
    },
  },
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
