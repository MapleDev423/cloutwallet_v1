import * as actionTypes from './actionTypes';

export function signIn(user) {
  return {
    type: actionTypes.SIGNIN,
    payload: user,
  };
}

export function signOut() {
  return {
    type: actionTypes.SIGNOUT,
  };
}
