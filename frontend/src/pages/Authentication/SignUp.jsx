import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../hooks/serverURL";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [UiProfilePic, setUiProfilePic] = useState(null);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const postProfilePic = (pics) => {
    setLoading(true);

    if (pics === undefined) {
      alert("Please Select an Image");
      return;
    }
    console.log(pics);

    const cloud_name = "united1234";

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", cloud_name);
      data.append("folder", "chat-app/chat-user");

      //for fetch
      const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
      const options = {
        method: "post",
        body: data,
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          const picURL = data.url.toString();
          setPic(picURL);
          console.log(picURL);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      alert("Please Select an Image");
      setLoading(false);
      return;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (firstName.trim() === "") {
      setFirstNameError(true);
    }
    if (lastName.trim() === "") {
      setLastNameError(true);
    }
    if (email.trim() === "") {
      setEmailError(true);
    }
    if (password.trim() === "") {
      setPasswordError(true);
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError(true);
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }

    const name = `${firstName} ${lastName}`;
    console.log(name, email, password, confirmPassword);

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${serverURL}/api/user`,
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);

      alert("Registration Successful");

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      const ErrorMessage = error.response.data.message;
      console.log(ErrorMessage);
      alert(ErrorMessage);

      setLoading(false);
    }
  };

  return (
    <form sx={{ flexGrow: 1 }} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            value={firstName}
            label="First Name"
            variant="outlined"
            required
            error={firstNameError}
            helperText={firstNameError && "Please enter your first name"}
            onChange={(event) => setFirstName(event.target.value)}
            // onBlur={() => setFirstNameError(firstName.trim() === "")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            value={lastName}
            label="Last Name"
            variant="outlined"
            required
            error={lastNameError}
            helperText={lastNameError && "Please enter your last name"}
            onChange={(event) => setLastName(event.target.value)}
            // onBlur={() => setLastNameError(lastName.trim() === "")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            value={email}
            label="Email Address"
            variant="outlined"
            required
            type="email"
            error={emailError}
            helperText={emailError && "Please enter a valid email address"}
            onChange={(event) => setEmail(event.target.value)}
            // onBlur={() =>
            //   setEmailError(
            //     email.trim() === "" || !/^\S+@\S+\.\S+$/.test(email)
            //   )
            // }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            value={password}
            label="Password"
            variant="outlined"
            required
            type={showPassword ? "text" : "password"}
            error={passwordError}
            helperText={passwordError && "Please enter a password"}
            onChange={(event) => setPassword(event.target.value)}
            // onBlur={() => setPasswordError(password.trim() === "")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            value={confirmPassword}
            label="Confirm Password"
            variant="outlined"
            required
            type={showPassword ? "text" : "password"}
            error={confirmPasswordError}
            helperText={
              confirmPasswordError &&
              // ? password !== confirmPassword
              "Passwords do not match"
              // : "Please confirm your password"
              // : ""
            }
            onChange={(event) => setConfirmPassword(event.target.value)}
            // onBlur={() =>
            //   setConfirmPasswordError(
            //     confirmPassword.trim() === "" || password !== confirmPassword
            //   )
            // }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography mb={1} variant="body2">
            Upload Profile picture
          </Typography>
          <input
            accept="image/*"
            // style={{ display: "none" }}
            id="profile-pic-upload"
            type="file"
            onChange={(e) => {
              const imageFile = e.target.files[0];
              postProfilePic(imageFile);
              setUiProfilePic(URL.createObjectURL(imageFile));
            }}
          />
          {/* <label htmlFor="profile-pic-upload">
            <Button variant="contained" component="span">
              Upload Profile Picture
            </Button>
          </label> */}
          {UiProfilePic && (
            <Avatar
              sx={{ width: 56, height: 56, ml: 2, mt: 1 }}
              src={UiProfilePic}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            size="small"
            color="primary"
            type="submit"
            fullWidth
            loading={loading}
            // loadingPosition="start"
            // startIcon={<RiUserAddFill />}
            variant="contained"
          >
            <span>Sign Up</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUp;
