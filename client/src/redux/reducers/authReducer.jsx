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
      if (action.payload !== undefined) return { ...state, ...action.payload };
      break;
    }
    case USER_SIGNUP: {
      if (action.payload !== undefined) return { ...state, ...action.payload };
      return Object.assign({}, state, {
        ...action.payload,
      });
      break;
    }
    case GET_PROFILE:{
      return Object.assign({},state,{
        userProfile:action.payload,
    
        })
  }
    case GET_ALL_USERS: {
      return Object.assign({},state,{
        users:action.payload,
    
        })
    }
    case SEND_SPENDING_NOTIFICATION: {
      if (action.payload !== undefined)
        return { ...state, notification: action.payload };
      break;
    }
    default:
      return state;
  }
};
