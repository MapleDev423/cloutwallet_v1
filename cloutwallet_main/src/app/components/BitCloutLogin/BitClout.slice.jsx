import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publicKey: "",
};

const publicKeySlice = createSlice({
  name: "publicKey",
  initialState,
  reducers: {
    setPublicKey(state, action) {
      state.publicKey = action.payload;
    },
  },
});

export const { setPublicKey } = publicKeySlice.actions;
export default publicKeySlice.reducer;
