import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import menuButtonSlice from "../app/shared/MenuButton/menuButton.slice";
import authSlice from "../app/components/Auth/Login/login.slice";
import profileSlice from "../app/components/User/profile.slice";
import creatorCoinsSlice from "../app/components/User/CreatorCoins/creatorCoins.slice";
import themeSlice from "../app/components/Theme/theme.slice";
import storage from "./storage";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  menu: menuButtonSlice,
  creatorCoins: creatorCoinsSlice,
  theme: themeSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return reducer(state, action);
};

export const persistConfig = {
  key: "clout-wallet",
  storage,
  blacklist: ["menu"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
