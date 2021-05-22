import { createSlice } from "@reduxjs/toolkit";

const initialState = "close";

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu(state) {
      return state === "close" ? "open" : "close";
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
