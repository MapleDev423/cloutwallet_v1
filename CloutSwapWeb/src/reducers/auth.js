import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  user: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN:
      return {
        isAuth: true,
        user: action.payload,
      };
    case actionTypes.SIGNUP:
      return {
        isAuth: true,
        user: action.payload,
      };
    case actionTypes.SIGNOUT:
      return {
        isAuth: false,
        user: {},
      };
    default:
      return state;
  }
};

export default auth;
