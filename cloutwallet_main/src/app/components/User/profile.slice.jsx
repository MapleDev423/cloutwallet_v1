import { createSlice } from "@reduxjs/toolkit";
import fetch from "isomorphic-unfetch";
import { fetchCreatorCoins } from "../User/CreatorCoins/creatorCoins.slice";

export const initialState = {
  loading: false,
  hasErrors: false,
  profileData: null,
  usernameIsValid: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfileData: (state) => {
      state.loading = true;
      state.hasErrors = false;
    },
    getProfileSuccess: (state, { payload }) => {
      state.profileData = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getProfileNotFound: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.usernameIsValid = false;
    },
    getProfileFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export function fetchProfile(username) {
  return async (dispatch) => {
    dispatch(getProfileData());
    try {
      const response = await fetch(`/api/profile/${username}`, {
        method: "POST",
      });
      const res_profile = await response.json();
      if (res_profile.hasOwnProperty("error")) {
        // console.log(res_profile);
        return dispatch(getProfileNotFound());
      }
      const { data } = res_profile;
      const { profile } = data;
      const { PublicKeyBase58Check } = profile;
      dispatch(fetchCreatorCoins(PublicKeyBase58Check));
      dispatch(getProfileSuccess(res_profile));
    } catch (error) {
      dispatch(getProfileFailure());
    }
  };
}

export const {
  getProfileData,
  getProfileSuccess,
  getProfileFailure,
  getProfileNotFound,
} = profileSlice.actions;
export const profileSelector = (state) => state.profile;
export default profileSlice.reducer;
