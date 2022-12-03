import {
  FORGOT_PASSWORD,
  USER_SIGNIN,
  USER_SIGNUP,
  RESET_PASSWORD,
  SEND_SPENDING_NOTIFICATION,
  GET_ALL_USERS,
  GET_PROFILE,
} from "../constants/constants";
import toast from "react-hot-toast";

export const userSignInStatus = (userData, navigate) => async (dispatch) => {
  toast("Please Wait for a few seconds");
  const url = process.env.REACT_APP_SERVER + "/user/signIn";
  await axios
    .post(url, userData)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Successfully logged in");
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
        toast.success("Successfully logged in");
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

export const forgotPassword = (userEmail, navigate) => async (dispatch) => {
  toast("Please Wait for a few seconds");
  const url = process.env.REACT_APP_SERVER + "/user/forgot-password";
  await axios
    .post(url, userEmail)
    .then((res) => {
      if (res.status === 200) {
        toast.success("OTP has been sent to your email");
        console.log(res);
        dispatch({
          type: FORGOT_PASSWORD,
          payload: userData,
        });
        navigate("/dashboard");
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

export const resetPassword = (userData, navigate) => async (dispatch) => {
  toast("Please Wait for a few seconds");
  const url = process.env.REACT_APP_SERVER + "/user/reset-password";
  await axios
    .post(url, userData)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Your password is reset.");
        console.log(res);
        dispatch({
          type: RESET_PASSWORD,
          payload: userData,
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

export const getProfile = (userId) => async (dispatch) => {
  toast("Please Wait for a few seconds");
  const url = process.env.REACT_APP_SERVER + "/user/getProfile";
  await axios
    .post(url, userId)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Your password is reset.");
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
    .post(url, userId)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        dispatch({
          type: GET_ALL_USERS,
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

export const sendSpendNotification = (userId) => async (dispatch) => {
  toast("Please Wait for a few seconds");
  const url =
    process.env.REACT_APP_SERVER + "/user/sendSpendNotifications/" + userId;
  await axios
    .put(url)
    .then((res) => {
      if (res.status === 200) {
        toast.success("Your password is reset.");
        console.log(res);
        dispatch({
          type: SEND_SPENDING_NOTIFICATION,
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
