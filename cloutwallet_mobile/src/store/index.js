import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuButtonSlice from "../app/shared/MenuButton/menuButton.slice";

const rootReducer = combineReducers({
  menu: menuButtonSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
