import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  user: {},
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SIGNIN:
      return {
        isAuth: true,
        user: action.payload,
      };

    case actionTypes.SIGNOUT:
      return {
        user: {},
        isAuth: false,
      };

    default:
      return state;
  }
};

export default auth;
