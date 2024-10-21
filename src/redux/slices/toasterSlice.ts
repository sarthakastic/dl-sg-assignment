// src/redux/slices/toasterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToasterState {
  show: boolean;
  type: "success" | "error";
  message: string;
}

const initialState: ToasterState = {
  show: false,
  type: "success",
  message: "",
};

const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    showToaster: (
      state,
      action: PayloadAction<{ type: "success" | "error"; message: string }>
    ) => {
      state.show = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideToaster: (state) => {
      state.show = false;
      state.message = "";
    },
  },
});

export const { showToaster, hideToaster } = toasterSlice.actions;
export default toasterSlice.reducer;
