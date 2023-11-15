// ** React Imports
import { SyntheticEvent, useEffect, useState } from "react";

// ** MUI Imports
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import MuiTab, { TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";

// ** Icons Imports
import AccountOutline from "mdi-material-ui/AccountOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";
import LockOpenOutline from "mdi-material-ui/LockOpenOutline";

// ** Demo Tabs Imports
import TabAccount from "./view/TabAccount";
import TabInfo from "./view/TabInfo";
import TabSecurity from "./view/TabSecurity";

// ** Third Party Styles Imports
import "react-datepicker/dist/react-datepicker.css";
import { getUserInfor } from "../../APICall/apiConfig";
import { getUserInfoFromLocal } from "../../tools/getUserInfoFromLocal";

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

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };
  const [flag, setFlag] = useState<boolean>(true);

  const getUserInfo = async () => {
    try {
      const userID = getUserInfoFromLocal()?.id;
      if (!userID) return;
      else {
        const res = await getUserInfor(userID.toString());
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
