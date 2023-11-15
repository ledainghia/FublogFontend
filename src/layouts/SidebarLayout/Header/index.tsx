import { useContext } from "react";

import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  alpha,
  lighten,
  styled,
  useTheme,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import logo from "../../../assets/images/logo-color.svg";
import { useTabNavStore } from "../../../config/ZustandStorage";
import { SidebarContext } from "../../../contexts/SidebarContext";
import { checkUser } from "../../../tools/CheckUser";
import { getUserInfoFromLocal } from "../../../tools/getUserInfoFromLocal";
import HeaderButtons from "./Buttons";
import HeaderNotifications from "./Buttons/Notifications";
import HeaderUserbox from "./Userbox";
const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha("#fff", 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        
`
);

const fadeImages = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/fublog-6a7cf.appspot.com/o/pinBlogImage%2F2.png?alt=media&token=794d87b6-28e2-415e-8a1e-10f96f4116b1&_gl=1*vmomuu*_ga*NDEzNjY4MDEzLjE2OTc2NzkwMjI.*_ga_CW55HF8NVT*MTY5ODg2ODg4Ny4zLjEuMTY5ODg2OTAwOC42MC4wLjA.",
    caption: "First Slide",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/fublog-6a7cf.appspot.com/o/pinBlogImage%2F3.png?alt=media&token=966b25b8-a86e-41e3-86f0-18e044f6ba7d&_gl=1*s4k4td*_ga*NDEzNjY4MDEzLjE2OTc2NzkwMjI.*_ga_CW55HF8NVT*MTY5ODg2ODg4Ny4zLjEuMTY5ODg2OTAyOS4zOS4wLjA.",
    caption: "Second Slide",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/fublog-6a7cf.appspot.com/o/pinBlogImage%2F4.png?alt=media&token=128c4283-8c04-4874-b933-42090444a8e1&_gl=1*1k4a5wz*_ga*NDEzNjY4MDEzLjE2OTc2NzkwMjI.*_ga_CW55HF8NVT*MTY5ODg2ODg4Ny4zLjEuMTY5ODg2OTA0MS4yNy4wLjA.",
    caption: "Third Slide",
  },
];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const { tabIndex, setTabIndex } = useTabNavStore();
  const naviagate = useNavigate();
  const check = checkUser();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setTabIndex(newValue);
  };
  const location = useLocation();
  console.log(location.pathname);
  const userRole: string[] | undefined = getUserInfoFromLocal()?.roles;

  return (
    <>
      <HeaderWrapper
        display="flex"
        alignItems="center"
        sx={{
          zIndex: 100,
          boxShadow:
            theme.palette.mode === "dark"
              ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
              : `0px 2px 8px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.2
                )}, 0px 5px 22px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}`,
        }}
      >
        <Stack
          direction="row"
          // divider={<Divider orientation="vertical" flexItem />}
          alignItems="center"
          spacing={2}
        >
          <img src={logo} height={80} alt="" />
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              label="Content creator"
              {...a11yProps(0)}
              onClick={() => naviagate("/")}
            />
            <Tab
              label="blogs"
              {...a11yProps(1)}
              onClick={() => naviagate("/")}
            />
            <Tab
              label="Write Blog"
              {...a11yProps(2)}
              onClick={() => naviagate("/")}
            />
            {userRole &&
              (userRole[0] === "LECTURE" || userRole[0] === "ADMIN") && (
                <Tab
                  label="Approving posts"
                  {...a11yProps(3)}
                  onClick={() => naviagate("/")}
                />
              )}
            {userRole && userRole[0] === "ADMIN" && (
              <Tab
                label="Admin"
                {...a11yProps(4)}
                onClick={() => naviagate("/")}
              />
            )}
            <Tab
              label="My profile"
              {...a11yProps(4)}
              onClick={() => naviagate("/myprofile")}
            />
          </Tabs>

          {/* <HeaderMenu /> */}
        </Stack>
        <Box display="flex" alignItems="center">
          <HeaderButtons />
          {!check ? (
            <>
              <Button variant="contained">
                <Link style={{ textDecoration: "none" }} to={"/login"}>
                  Login
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ mx: 0.5 }} component="span">
                <HeaderNotifications />
              </Box>
              <HeaderUserbox />
            </>
          )}

          <Box
            component="span"
            sx={{
              ml: 2,
              display: { lg: "none", xs: "inline-block" },
            }}
          >
            <Tooltip arrow title="Toggle Menu">
              <IconButton color="primary" onClick={toggleSidebar}>
                {!sidebarToggle ? (
                  <MenuTwoToneIcon fontSize="small" />
                ) : (
                  <CloseTwoToneIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </HeaderWrapper>
      <div
        className="slide-container"
        style={
          location.pathname.includes("myprofile") ? { display: "none" } : {}
        }
      >
        <Fade autoplay nextArrow={<></>}>
          {fadeImages.map((fadeImage, index) => (
            <div key={index}>
              <img
                style={{
                  width: "100%",
                  height: "130px",
                  marginTop: "80px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={fadeImage.url}
              />
            </div>
          ))}
        </Fade>
      </div>
    </>
  );
}

export default Header;
