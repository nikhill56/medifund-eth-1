import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  FormLabel,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import "../../../styles/AuthenticationStyles/SignUp.scss";
import toast, { Toaster } from "react-hot-toast";
import { create } from "ipfs-http-client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthenticationNavbar } from "../index";
import { userSignUpStatus } from "../../../redux/actions/auth";

export default function SignUp() {
  const [agree, setAgree] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const projectId = "2DHzCBxzg2oEnows9uCK5IWbcDw";
  const projectSecret = "d684e8c4cd0e4bef558de4f2d0d4c5a6";
  const projectIdAndSecret = `${projectId}:${projectSecret}`;
  const emailFormat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
        "base64"
      )}`,
    },
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    e.persist();
    setUser((inp) => ({
      ...inp,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === "" ||
      user.profileImage === "" ||
      agree === false
    ) {
      toast("Please fill up the fields", {
        icon: "❗️",
      });
    } else if (!user.email.match(emailFormat)) {
      toast("Incorrect email format", {
        icon: "❗️",
      });
    } else if (user.password !== user.confirmPassword) {
      toast("Passwords don't match", {
        icon: "❗️",
      });
    } else if (user.password.length < 6) {
      toast("Password must be at least 6 characters", {
        icon: "❗️",
      });
    } else {
      try {
        const profile = await client.add(profileImage);
        const proUrl = `https://medifund.infura-ipfs.io/ipfs/${profile.path}`;

        const data = {
          email: user.email,
          password: user.password,
          profileImg: proUrl,
          fundsReceived: [],
          fundsDonated: [],
          notification: [],
        };
        dispatch(userSignUpStatus(data, navigate));
      } catch (error) {
        toast.error("Something went wrong !");
      }
    }
  };
  return (
    <>
      <div className='signUpParentContainer'>
        <div className='signUpNavContainer'>
          <AuthenticationNavbar />
        </div>
        <Grid container className='signUpContainer'>
          <Grid item xs={12} sm={2} md={2} lg={3} xl={4}></Grid>
          <Grid item xs={12} sm={8} md={8} lg={6} xl={4} className='signUpBox'>
            <form autoComplete='off'>
              <Stack className='signUpFormBox' spacing={2}>
                <Typography variant='h6' className='signUpTitle' align='center'>
                  Sign up with your email
                </Typography>

                <TextField
                  label='Email address'
                  type='email'
                  className='signUpInput'
                  name='email'
                  value={user.email}
                  onChange={handleInputChange}
                />
                <TextField
                  label='Password'
                  type='password'
                  name='password'
                  className='signUpInput'
                  value={user.password}
                  onChange={handleInputChange}
                />
                <TextField
                  label='Confirm Password'
                  type='password'
                  name='confirmPassword'
                  className='signUpInput'
                  value={user.confirmPassword}
                  onChange={handleInputChange}
                />
                <section className='signUpUpload'>
                  <FormLabel id='demo-row-radio-buttons-group-label signUpFileLabel'>
                    Upload your Profile Image
                  </FormLabel>
                  <br />
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </section>
                <Stack direction='row' alignItems='center'>
                  <Checkbox
                    checked={agree}
                    onChange={(e) => setAgree(!agree)}
                  />
                  <Typography variant='body1'>
                    I agree to the Terms of Service and Privacy Policy
                  </Typography>
                </Stack>
                <Button
                  onClick={handleSignUpSubmit}
                  variant='contained'
                  color='primary'
                  className='signUpSubmitBtn'
                >
                  Sign Up
                </Button>
                <Typography variant='body1' align='center'>
                  Already have an account?{" "}
                  <a href='/signin' className='navigatingLink'>
                    Sign in
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
