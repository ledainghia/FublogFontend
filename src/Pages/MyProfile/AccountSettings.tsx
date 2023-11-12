// ** React Imports
import { SyntheticEvent, useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTab, { TabProps } from "@mui/material/Tab";

// ** Icons Imports
import AccountOutline from "mdi-material-ui/AccountOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";

// ** Demo Tabs Imports
import TabInfo from "./view/TabInfo";
import TabAccount from "./view/TabAccount";
import TabSecurity from "./view/TabSecurity";

// ** Third Party Styles Imports
import "react-datepicker/dist/react-datepicker.css";
import { userLogin } from "../../config/TypeDefine";
import { getUserInfoFromLocal } from "../../tools/getUserInfoFromLocal";
import { getUserInfor } from "../../APICall/apiConfig";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState<string>("account");
  const [userInfo, setUserInfo] = useState<userLogin | null>(null);
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [flag, setFlag] = useState<boolean>(true);

  const getUserInfo = async () => {
    try {
      const userID = getUserInfoFromLocal()?.id;
      if (!userID) return;
      else {
        const res = await getUserInfor(userID.toString());
        const user: userLogin | null = res.data.data;
        setUserInfo(user);
        console.log(res.data.data);
        setFlag(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!flag) return;
    getUserInfo();
  }, []);

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="account-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="account"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value="security"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />
          <Tab
            value="info"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value="account">
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="security">
          <TabSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="info">
          <TabInfo />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default AccountSettings;
