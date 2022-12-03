import {
  SIGN_OUT,
  USER_SIGNIN,
  USER_SIGNUP,
  SEND_SPENDING_NOTIFICATION,
  GET_ALL_USERS,
  GET_PROFILE,
} from "../constants/constants";

const initState = {
  userId: "",
  userEmail: "",
  users: [],
  userProfile: {},
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_SIGNIN: {
      if (action.payload !== undefined) return { ...state, ...action.payload };
    }
    case USER_SIGNUP: {
      if (action.payload !== undefined) return { ...state, ...action.payload };
      return Object.assign({}, state, {
        ...action.payload,
      });
    }
    case GET_PROFILE: {
      if (action.payload !== undefined) return { ...state, ...action.payload };
    }
    case GET_ALL_USERS: {
      if (action.payload !== undefined) return { users: action.payload.users };
    }
    case SEND_SPENDING_NOTIFICATION: {
      if (action.payload !== undefined)
        return { ...state, notification: action.payload };
    }
    default:
      return state;
  }
};
