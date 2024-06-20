import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import { serverURL } from "../../hooks/serverURL";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("Login");
  const { setUser } = ChatState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [emailError, setEmailError] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (email.trim() === "") {
      setEmailError(true);
    }
    // console.log(`Username: ${email}, Password: ${password}`);

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${serverURL}/api/user/login`,
        {
          email,
          password,
        },
        config
      );
      // console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);

      setLoading(false);
      // alert("Login Successful");

      navigate("/chats");
    } catch (error) {
      const ErrorMessage = error.response.data.message;
      console.log(ErrorMessage);

      toast.error(`${ErrorMessage} !`);
      // alert(ErrorMessage);

      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <form onSubmit={handleLogin}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            value={email}
            label="Email"
            size="small"
            type="email"
            error={emailError}
            helperText={emailError && "Please enter a valid email address"}
            required
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            fullWidth
            value={password}
            label="Password"
            variant="outlined"
            size="small"
            required
            type={showPassword ? "text" : "password"}
            onChange={(event) => setPassword(event.target.value)}
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

          <LoadingButton
            color="primary"
            type="submit"
            fullWidth
            loading={loading}
            // loadingPosition="start"
            // startIcon={<RiUserAddFill />}
            variant="contained"
          >
            <span>Login</span>
          </LoadingButton>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("123456");
            }}
          >
            <span>Guest User</span>
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Login;
