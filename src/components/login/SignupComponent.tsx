import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../APICall/apiConfig";
import {
  useToastErrorStore,
  useToastSuccessStore,
  useUserStore,
  userLogin,
} from "../../config/ZustandStorage";

type errorType = {
  content: string;
  of: "userName" | "fullName" | "email" | "password" | "rePassword";
};
export default function SignupComponent() {
  const [showPassword, setShowPassword] = React.useState(false);
  const userNameRef = React.useRef<HTMLInputElement>(null);
  const fullNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const rePasswordRef = React.useRef<HTMLInputElement>(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [error, setError] = React.useState<errorType[]>([]);
  const { addToastSuccess } = useToastSuccessStore();
  const { addToastError } = useToastErrorStore();
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [showRePassword, setShowRePassword] = React.useState(false);
  const handleUsernameChange = () => {
    const value = userNameRef.current?.value;
    setError((prev) => prev.filter((item) => item.of !== "userName"));
    if (!value) {
      setError((prev) => [
        ...prev,
        { content: "Username is required", of: "userName" },
      ]);
    } else {
    }

    if (value && value.length < 6) {
      setError((prev) => [
        ...prev,
        { content: "Username must be at least 6 characters", of: "userName" },
      ]);
    } else {
      setError((prev) =>
        prev.filter(
          (item) => item.content !== "Username must be at least 6 characters"
        )
      );
    }
    if (value && value.length > 20) {
      setError((prev) => [
        ...prev,
        { content: "Username must be less than 20 characters", of: "userName" },
      ]);
    } else {
      setError((prev) =>
        prev.filter(
          (item) => item.content !== "Username must be less than 20 characters"
        )
      );
    }
    if (value && !/^[a-zA-Z0-9_.-]+$/.test(value)) {
      setError((prev) => [
        ...prev,
        { content: "Username must be alphanumeric", of: "userName" },
      ]);
    } else {
      setError((prev) =>
        prev.filter((item) => item.content !== "Username must be alphanumeric")
      );
    }
  };

  const handleFullNameChange = () => {
    const value = fullNameRef.current?.value;
    setError((prev) => prev.filter((item) => item.of !== "fullName"));
    if (!value) {
      setError((prev) => [
        ...prev,
        { content: "FullName is required", of: "fullName" },
      ]);
    } else {
    }

    if (value && value.length < 6) {
      setError((prev) => [
        ...prev,
        { content: "FullName must be at least 6 characters", of: "fullName" },
      ]);
    } else {
      setError((prev) =>
        prev.filter(
          (item) => item.content !== "FullName must be at least 6 characters"
        )
      );
    }
    if (value && value.length > 20) {
      setError((prev) => [
        ...prev,
        { content: "FullName must be less than 20 characters", of: "fullName" },
      ]);
    } else {
      setError((prev) =>
        prev.filter(
          (item) => item.content !== "FullName must be less than 20 characters"
        )
      );
    }
  };
  const handleEmailChange = () => {
    const value = emailRef.current?.value;
    setError((prev) => prev.filter((item) => item.of !== "email"));
    if (!value) {
      setError((prev) => [
        ...prev,
        { content: "Email is required", of: "email" },
      ]);
    } else {
    }

    if (
      value &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]+)?$/.test(
        value
      )
    ) {
      setError((prev) => [
        ...prev,
        { content: "Email must be valid", of: "email" },
      ]);
    } else {
      setError((prev) =>
        prev.filter((item) => item.content !== "Email must be valid")
      );
    }
    if (value && value.includes("@fpt.edu.vn")) {
      setError((prev) => [
        ...prev,
        { content: "You can not use mail @fpt.edu.vn to sign up", of: "email" },
      ]);
    } else {
      setError((prev) =>
        prev.filter(
          (item) =>
            item.content !== "You can not use mail @fpt.edu.vn to signin"
        )
      );
    }
  };
  const handlePasswordChange = () => {
    const value = passwordRef.current?.value;
    const reValue = rePasswordRef.current?.value;
    setError((prev) => prev.filter((item) => item.of !== "password"));
    if (!value) {
      setError((prev) => [
        ...prev,
        { content: "Password is required", of: "password" },
      ]);
    } else {
      setError((prev) =>
        prev.filter((item) => item.content !== "Password is required")
      );
    }

    if (value && value.length < 6) {
      setError((prev) => [
        ...prev,
        { content: "Password must be at least 6 characters", of: "password" },
      ]);
    } else {
      setError((prev) =>
        prev.filter(
          (item) => item.content !== "Password must be at least 6 characters"
        )
      );
    }

    if (value && value.length > 20) {
      setError((prev) => [
        ...prev,
        { content: "Password must be less than 20 characters", of: "password" },
      ]);
    } else {
      setError((prev) =>
        prev.filter(
          (item) => item.content !== "Password must be less than 20 characters"
        )
      );
    }
    if (value && reValue && value !== reValue) {
      setError((prev) => [
        ...prev,
        { content: "Password and RePassword must be the same", of: "password" },
      ]);
    } else {
      setError((prev) =>
        prev.filter(
          (item) => item.content !== "Password and RePassword must be the same"
        )
      );
    }
  };

  const handleRePasswordChange = () => {
    const value = rePasswordRef.current?.value;

    setError((prev) => prev.filter((item) => item.of !== "rePassword"));

    if (!value) {
      setError((prev) => [
        ...prev,
        { content: "RePassword is required", of: "rePassword" },
      ]);
    } else {
      setError((prev) =>
        prev.filter((item) => item.content !== "RePassword is required")
      );
    }
  };
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);
  const handleSubmitSignup = async () => {
    const username = userNameRef.current?.value;
    const fullname = fullNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (error.length > 0) {
      addToastError(
        `You should fix ${error.length} error(s) in some input first `
      );
      return;
    }
    try {
      const res = await signup({
        username,
        fullname,
        email,
        password,
      });
      console.log(res);
      if (res.status === 200) {
        addToastSuccess("Sign up successfully");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        const userL: userLogin = jwtDecode(res.data.token);
        localStorage.setItem("user", JSON.stringify(userL));
        setUser(userL);
        navigate("/");
      } else {
        addToastError(res.data.message);
      }
    } catch (error) {
      addToastError("Sign up failed");
      console.log(error);
    }
  };

  const handleMouseDownRePassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <TextField
        sx={{ marginTop: "15px" }}
        fullWidth
        required
        id="outlined-required"
        label="Username"
        defaultValue=""
        error={error.some((item) => item.of === "userName")}
        inputRef={userNameRef}
        helperText={
          <div style={{ color: "red" }}>
            {error
              .filter((item) => item.of === "userName")
              .map((item) => (
                <>
                  {item.content}
                  <br />
                </>
              ))}
          </div>
        }
        onChange={handleUsernameChange}
      />
      <TextField
        sx={{ marginTop: "15px" }}
        fullWidth
        required
        onChange={handleFullNameChange}
        error={error.some((item) => item.of === "fullName")}
        helperText={
          <div style={{ color: "red" }}>
            {error
              .filter((item) => item.of === "fullName")
              .map((item) => (
                <>
                  {item.content}
                  <br />
                </>
              ))}
          </div>
        }
        id="outlined-required"
        label="FullName"
        defaultValue=""
        inputRef={fullNameRef}
      />
      <TextField
        sx={{ marginTop: "15px" }}
        fullWidth
        required
        id="outlined-required"
        label="Email address"
        defaultValue=""
        error={error.some((item) => item.of === "email")}
        helperText={
          <div style={{ color: "red" }}>
            {error
              .filter((item) => item.of === "email")
              .map((item) => (
                <>
                  {item.content}
                  <br />
                </>
              ))}
          </div>
        }
        onChange={handleEmailChange}
        inputRef={emailRef}
      />
      <FormControl
        onChange={handlePasswordChange}
        error={error.some((item) => item.of === "password")}
        fullWidth
        sx={{ marginTop: "15px" }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          inputRef={passwordRef}
          error={error.some((item) => item.of === "password")}
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
      <FormControl
        fullWidth
        onChange={handleRePasswordChange}
        error={error.some((item) => item.of === "rePassword")}
        sx={{ marginTop: "15px" }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Repeat Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showRePassword ? "text" : "password"}
          inputRef={rePasswordRef}
          error={error.some((item) => item.of === "rePassword")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowRePassword}
                onMouseDown={handleMouseDownRePassword}
                edge="end"
              >
                {showRePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Repeat Password"
        />
      </FormControl>
      {
        <div style={{ color: "red" }}>
          {error
            .filter(
              (item) => item.of === "rePassword" || item.of === "password"
            )
            .map((item) => (
              <>
                {item.content}
                <br />
              </>
            ))}
        </div>
      }
      <Button
        onClick={handleSubmitSignup}
        variant="contained"
        color="primary"
        sx={{
          color: "white",
          marginTop: "20px",
          paddingX: "30px",
        }}
        startIcon={<LoginTwoToneIcon />}
      >
        Sign Up
      </Button>
    </>
  );
}
