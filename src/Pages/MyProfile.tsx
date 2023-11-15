import { Box, useTheme } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../layouts/SidebarLayout/Header";
import Sidebar from "../layouts/SidebarLayout/Sidebar";

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
