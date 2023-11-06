import { Box, Typography } from "@mui/material";
import React, { ComponentType, Suspense, lazy } from "react";
import { useTabNavStore } from "../config/ZustandStorage";

import SuspenseLoader from "../components/SuspenseLoader";
import RankingContentCreator from "./RankingContentCreator";

export const Loader = (Component: ComponentType<any>) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
const HomePage = Loader(lazy(() => import("./HomePage")));
const Trending = Loader(lazy(() => import("./Trending")));
const WriteBlog = Loader(lazy(() => import("./WriteBlog")));
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Navigation() {
  const { tabIndex } = useTabNavStore();

  return (
    <>
      <CustomTabPanel value={tabIndex} index={0}>
        <RankingContentCreator></RankingContentCreator>
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        <HomePage />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={2}>
        <Trending />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={4}>
        <WriteBlog />
      </CustomTabPanel>
    </>
  );
}
