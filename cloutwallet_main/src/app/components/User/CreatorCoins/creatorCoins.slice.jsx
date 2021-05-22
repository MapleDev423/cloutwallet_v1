import { createSlice } from "@reduxjs/toolkit";
import fetch from "isomorphic-unfetch";

export const initialState = {
  loading: false,
  hasErrors: false,
  creatorCoins: null,
};

const creatorCoinsSlice = createSlice({
  name: "creator-coins",
  initialState,
  reducers: {
    getCreatorCoinsData: (state) => {
      state.loading = true;
      state.hasErrors = false;
    },
    getCreatorCoinsSuccess: (state, { payload }) => {
      state.creatorCoins = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCreatorCoinsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export function fetchCreatorCoins(id) {
  return async (dispatch) => {
    dispatch(getCreatorCoinsData());
    try {
      const response = await fetch(`/api/holding/${id}`, {
        method: "POST",
      });
      const creatorCoins = await response.json();
      dispatch(getCreatorCoinsSuccess(creatorCoins));
    } catch (error) {
      dispatch(getCreatorCoinsFailure());
    }
  };
}

export const {
  getCreatorCoinsData,
  getCreatorCoinsSuccess,
  getCreatorCoinsFailure,
} = creatorCoinsSlice.actions;
export const creatorCoinsSelector = (state) => state.creatorCoins;
export default creatorCoinsSlice.reducer;
