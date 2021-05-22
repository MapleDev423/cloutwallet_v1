import * as actionTypes from "./actionTypes";

export const signIn = (user) => {
  return { type: actionTypes.SIGNIN, payload: user };
};

export const signUp = (user) => {
  return {
    type: actionTypes.SIGNUP,
    payload: user,
  };
};

export const signOut = () => {
  return {
    type: actionTypes.SIGNOUT,
  };
};
