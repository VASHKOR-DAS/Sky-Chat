import React, { useState } from "react";
import {
  Button,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { serverURL } from "../../serverURL";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
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
    console.log(email, password);

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
      console.log(data);

      toast.success("Login Successful");

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error("Error Occurred!");
      // console.log(error);
      console.log(error.response.data.message);
      setLoading(false);
    }
  };


  return (
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
          size="small"
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
  );
};

export default Login;
