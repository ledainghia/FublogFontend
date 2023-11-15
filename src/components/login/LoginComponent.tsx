import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  useToastErrorStore,
  useToastSuccessStore,
  useUserStore,
  userLogin,
} from "../../config/ZustandStorage";
import axiosInstance from "../../config/axiosConfig";
import { auth, provider } from "../../config/firebase";
interface userGoogle {
  name: string;
  email: string;
  picture: string;
}

export default function LoginComponent() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = useState(false);
  const { addToastError } = useToastErrorStore();

  const { addToastSuccess } = useToastSuccessStore();
  //   const { toastWarning, addToastWarning, shiftToastWarning } =
  //     useToastWarningStore();
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [check, setCheck] = useState(false);
  const { setUser } = useUserStore();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleCheckboxChange = () => {
    setCheck(!check); // Khi người dùng click vào checkbox, cập nhật trạng thái của nó
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmitLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    const user = userRef.current?.value;
    const password = passwordRef.current?.value;
    const data = {
      username: user,
      password: password,
    };
    console.log(data);
    await axios
      .post("https://api.fublog.tech/api/v1/auth/login", data)
      .then((response) => {
        console.log(response);
        const userL: userLogin = jwtDecode(response.data.refreshToken);
        console.log(userL);
        addToastSuccess("Login success!");

        if (check) {
          localStorage.setItem("user", JSON.stringify(userL));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
        } else {
          sessionStorage.setItem("user", JSON.stringify(userL));
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("refreshToken", response.data.refreshToken);
        }
        setUser(userL);
        console.log(userL);
        setError(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        addToastError(error.response.data.message);
      });
  };

  const handleClickLoginGG = () => {
    localStorage.clear();
    sessionStorage.clear();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Đăng nhập thành công
        toast.dismiss();

        const user = result.user;
        console.log("User:", user);

        if (user.email && !user.email.endsWith("@fpt.edu.vn")) {
          addToastError("Please login with FPT email");
          return;
        } else {
          user.getIdTokenResult().then((idTokenResult) => {
            const userL: userGoogle = jwtDecode(idTokenResult.token);
            const postData = {
              fullName: userL.name,
              email: userL.email,
              picture: userL.picture,
            };

            axiosInstance
              .post("/api/v1/auth/google", postData, {
                timeout: 5000,
              })
              .then((response) => {
                // Xử lý kết quả trả về sau khi gửi request thành công (nếu cần)
                console.log("Response:", response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                  "refreshToken",
                  response.data.refreshToken
                );

                localStorage.setItem("user", JSON.stringify(userL));
                navigate("/");
                addToastSuccess("Login success!");
              })
              .catch((error) => {
                // Xử lý lỗi khi gửi request
                console.error("Error:", error);
                addToastError("Login Google error");
              });
            // console.log(userL);
          });
        }

        // localStorage.setItem("user", JSON.stringify(userL));
        // setUserGG(userL);

        // navigate("/");

        // Tiếp theo, bạn có thể thực hiện xử lý cho người dùng sau khi đăng nhập ở đây
      })
      .catch((error) => {
        // Xử lý lỗi đăng nhập

        console.error("Error:", error);
        addToastError("Login Google error");
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Đã đăng nhập
        console.log("User is signed in:", user);
      } else {
        // Đã đăng xuất
        console.log("User is signed out");
      }
      return () => unsubscribe;
    });

    return () => unsubscribe(); // Hủy theo dõi trạng thái đăng nhập khi component unmounts
  }, []);

  return (
    <>
      <ToastContainer />
      <TextField
        sx={{ marginTop: "30px" }}
        fullWidth
        required
        error={error}
        name="username"
        id="outlined-required"
        label="Username"
        defaultValue=""
        inputRef={userRef}
      />
      <FormControl
        error={error}
        fullWidth
        sx={{ marginTop: "20px" }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          inputRef={passwordRef}
          name="password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormGroup sx={{ marginTop: "20px", marginLeft: "10px" }}>
        <FormControlLabel
          control={<Switch onChange={handleCheckboxChange} value={check} />}
          label="Remember me"
        />
      </FormGroup>
      <Grid container direction={"column"}>
        <Grid item>
          <ButtonGroup>
            <Button
              onClick={(e) => handleSubmitLogin(e)}
              variant="contained"
              color="primary"
              sx={{
                color: "white",
                marginTop: "20px",
                paddingX: "30px",
              }}
              startIcon={<LoginTwoToneIcon />}
            >
              Login
            </Button>
            <Button
              variant="text"
              sx={{ marginTop: "20px", marginLeft: "10px" }}
            >
              Forgot password?
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item sx={{ marginTop: "20px" }}>
          <Typography
            sx={{
              position: "relative",
              textAlign: "center",
              "&::before, &::after": {
                content: "''",
                display: "inline-block",
                width: "50%",
                borderTop: "1px solid black",
                position: "absolute",
                top: "50%",
              },
              "&::before": {
                right: "0.5rem",
              },
              "&::after": {
                left: "0.5rem",
              },
            }}
          >
            <span
              style={{
                background: "#f2f5f9",
                padding: "0 10px",
                position: "relative",
                zIndex: 1, // Ensure text and background are above the lines
              }}
            >
              Or
            </span>
          </Typography>
          <Button
            className="button"
            sx={{ marginTop: "20px" }}
            onClick={handleClickLoginGG}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 262"
              className="svg"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                className="blue"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                className="green"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                className="yellow"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                className="red"
              ></path>
            </svg>
            <span className="text" style={{ color: "orange" }}>
              Continue with Google
            </span>
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
