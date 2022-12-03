import {
  USER_SIGNIN,
  USER_SIGNUP,
  SEND_SPENDING_NOTIFICATION,
  GET_ALL_USERS,
  GET_PROFILE,
} from "../constants/constants";
import toast from "react-hot-toast";
import axios from "axios";

export const userSignInStatus = (userData, navigate) => async (dispatch) => {
  toast("Please Wait for a few seconds");
  const url = process.env.REACT_APP_SERVER + "/user/signIn";
  await axios
    .post(url, userData)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Successfully logged in");
        sessionStorage.setItem("userId", res.data.user._id);
        dispatch({
          type: USER_SIGNIN,
          payload: userData,
        });
        navigate("/dashboard");
      } else {
        toast.error("Please try Again!");
        console.log(res);
      }
    })
    .catch((err) => {
      toast.error("Please try Again!");
      console.log(err);
    });
};

export const userSignUpStatus = (userData, navigate) => async (dispatch) => {
  toast("Please Wait for a few seconds");
  const url = process.env.REACT_APP_SERVER + "/user/signUp";
  await axios
    .post(url, userData)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Successfully created Account");
        sessionStorage.setItem("userId", res.data.user._id);
        dispatch({
          type: USER_SIGNUP,
          payload: userData,
        });
        navigate("/dashboard");
      } else {
        toast.error("Please try Again!");
        console.log(res);
      }
    })
    .catch((err) => {
      toast.error("Please try Again!");
      console.log(err);
    });
};

export const getProfile = (userId, navigate) => async (dispatch) => {
  toast("Please Wait for a few seconds");
  const url = process.env.REACT_APP_SERVER + "/user/getProfile";
  await axios
    .post(url, userId)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: GET_PROFILE,
          payload: res,
        });
        navigate("/signIn");
      } else {
        toast.error("Please Try Again");
        console.log(res);
      }
    })
    .catch((err) => {
      toast.error("Please try Again!");
      console.log(err);
    });
};

export const getAllUsers = () => async (dispatch) => {
  toast("Please Wait for a few seconds");
  const url = process.env.REACT_APP_SERVER + "/user/getProfile";
  await axios
    .post(url)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: GET_ALL_USERS,
          payload: res,
        });
      } else {
        toast.error("Please Try Again");
        console.log(res);
      }
    })
    .catch((err) => {
      toast.error("Please try Again!");
      console.log(err);
    });
};

export const sendSpendNotification = (userId) => async (dispatch) => {
  toast("Please Wait for a few seconds");
  const url =
    process.env.REACT_APP_SERVER + "/user/sendSpendNotifications/" + userId;
  await axios
    .put(url)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: SEND_SPENDING_NOTIFICATION,
          payload: res,
        });
      } else {
        toast.error("Please Try Again");
        console.log(res);
      }
    })
    .catch((err) => {
      toast.error("Please try Again!");
      console.log(err);
    });
};

export const userSignOut = (navigate) => async (dispatch) => {
  toast.success("Successfully signed out !");
  sessionStorage.setItem("userId", "");
  navigate("/signin");
};
