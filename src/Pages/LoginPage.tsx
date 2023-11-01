import React, { useEffect, useState } from "react";
import { useForgetStore } from "../config/ZustandStorage";
import {
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  TextField,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  FormControlLabel,
  FormGroup,
  Button,
  ButtonGroup,
} from "@mui/material";
import loginVector from "../assets/images/graphic3.svg";
import logo from "../assets/images/logo-light.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const label = { inputProps: { "aria-label": "Switch demo" } };

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
export default function LoginPage() {
  const [loading, setLoading] = useState(true);
  const { isForgotten } = useForgetStore();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      document.onreadystatechange = function () {
        if (document.readyState == "complete") {
          setLoading(false);
        }
      };
    }
  }, [setLoading]);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <Grid container>
        <Grid item md={4}>
          <img className="logo-login" src={logo} alt="logo" />
          <Paper
            elevation={3}
            sx={{
              backgroundImage: "linear-gradient( to left,#FFBB5C ,#FF9B50 )",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={loginVector}
              style={{ width: "70%" }}
              alt="Login vector Fublog"
            />
          </Paper>{" "}
        </Grid>
        <Grid
          item
          md={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              background: "none",
              boxShadow: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h3">Welcome back to Fublog</Typography>
            <Typography variant="h6" mt={1}>
              Thank you for coming to Fublog which FPTU's largest community
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ marginTop: "30px" }}
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Signup" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <TextField
                sx={{ marginTop: "30px" }}
                fullWidth
                required
                id="outlined-required"
                label="Username"
                defaultValue=""
              />
              <FormControl
                fullWidth
                sx={{ marginTop: "20px" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
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
                <FormControlLabel control={<Switch />} label="Remember me" />
              </FormGroup>
              <Grid container direction={"column"}>
                <Grid item>
                  <ButtonGroup>
                    <Button
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
                <Grid item direction={"row"} sx={{ marginTop: "20px" }}>
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
                  <Button className="button" sx={{ marginTop: "20px" }}>
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
            </CustomTabPanel>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
