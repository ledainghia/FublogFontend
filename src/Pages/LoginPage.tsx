import { Card, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import loginVector from "../assets/images/graphic3.svg";
import logo from "../assets/images/logo-light.svg";
import LoginComponent from "../components/login/LoginComponent";
import SignupComponent from "../components/login/SignupComponent";
import { useForgetStore } from "../config/ZustandStorage";

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
  const { isForgotten } = useForgetStore();
  const [value, setValue] = useState(0);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          md={4}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
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
            padding: "30px",
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
              <LoginComponent />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SignupComponent />
            </CustomTabPanel>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
