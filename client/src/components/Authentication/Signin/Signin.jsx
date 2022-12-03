import React, { useState } from "react";
import "../../../styles/AuthenticationStyles/SignIn.scss";
import { Grid, Typography, Button, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import { userSignIn } from "../../../redux/action/auth";
import { AuthenticationNavbar } from "..";
export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    e.persist();
    setUser((inp) => ({
      ...inp,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      toast("Please fill up the fields", {
        icon: "❗️",
      });
    } else {
      const data = {
        email: user.email,
        password: user.password,
      };
      // dispatch(userSignIn(data, navigate));
    }
  };
  return (
    <>
      <div className='signInParentContainer'>
        <div className='signInNavContainer'>
          <AuthenticationNavbar />
        </div>
        <Grid container className='signInContainer'>
          <Grid item xs={12} sm={2} md={2} lg={3} xl={4}></Grid>

          <Grid item xs={12} sm={8} md={8} lg={6} xl={4} className='signInBox'>
            <form autoComplete='off'>
              <Stack className='signInFormBox' spacing={2}>
                <Typography variant='h6' className='signInTitle' align='center'>
                  Sign in to your account
                </Typography>

                <TextField
                  label='Email address'
                  type='email'
                  className='signInInput'
                  name='email'
                  value={user.email}
                  onChange={handleInputChange}
                />
                <TextField
                  label='Password'
                  type='password'
                  name='password'
                  className='signInInput'
                  value={user.password}
                  onChange={handleInputChange}
                />

                <Button
                  variant='contained'
                  color='primary'
                  className='signInSubmitBtn'
                  onClick={handleSignInSubmit}
                >
                  Sign In
                </Button>
                {/* <Typography variant="body1" className="" align="center">
                Forgot password? <a href="/" className="signInLink">Click Here</a>
              </Typography> */}
                <Typography variant='body1' className='' align='center'>
                  Don't have an account?{" "}
                  <a href='/#/signup' className='signInLink'>
                    Sign Up
                  </a>
                </Typography>
              </Stack>
            </form>
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={3} xl={4}></Grid>
        </Grid>
        <Toaster position='top-center' reverseOrder={false} />
      </div>
    </>
  );
}
