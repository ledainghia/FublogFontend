import { Box, Grid, useTheme } from "@mui/material";
import Header from "../layouts/SidebarLayout/Header";
import Sidebar from "../layouts/SidebarLayout/Sidebar";
import { Outlet } from "react-router";
import HomePage from "./HomePage";
import Footer from "../components/Footer";
import AccountSettings from "./MyProfile/AccountSettings";

export default function MyProfile({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <>
      <Header /> <Sidebar />
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          display: "block",
          flex: 1,

          [theme.breakpoints.up("lg")]: {
            ml: `${theme.sidebar.width}`,
            mt: `${theme.header.height}`,
          },
        }}
      >
        <Box display="block">
          {children}
          <Footer />
        </Box>
      </Box>
    </>
  );
}
