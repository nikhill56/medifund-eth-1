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
  users: null,
  userProfile: null,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_SIGNIN: {
      return Object.assign({}, state, {
        ...action.payload,
      });
    }
    case USER_SIGNUP: {
      return Object.assign({}, state, {
        ...action.payload,
      });
    }
    case GET_PROFILE: {
      return Object.assign({}, state, {
        ...action.payload,
      });
    }
    case GET_ALL_USERS: {
      return Object.assign({}, state, {
        users: action.payload.users,
      });
    }
    case SEND_SPENDING_NOTIFICATION: {
      return Object.assign({}, state, {
        notification: action.payload,
      });
    }
  }
};
