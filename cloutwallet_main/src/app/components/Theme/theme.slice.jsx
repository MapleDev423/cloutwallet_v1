import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTrue(state) {
      state.darkTheme = true;
    },
    setFalse(state) {
      state.darkTheme = false;
    },
  },
});

export const { setTrue, setFalse } = themeSlice.actions;
export default themeSlice.reducer;
