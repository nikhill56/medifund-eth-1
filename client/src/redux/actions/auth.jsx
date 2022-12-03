import axios from 'axios'
import toast from "react-hot-toast";

export const userSignOut = (navigate) => async (dispatch) => {
    toast.success("Successfully signed out !");
    sessionStorage.setItem("userId", "");
    navigate("/signin");
  };