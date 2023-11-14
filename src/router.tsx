import { ComponentType, Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "./layouts/SidebarLayout";
import BaseLayout from "./layouts/BaseLayout";

import SuspenseLoader from "./components/SuspenseLoader";
import WriteBlog from "./Pages/WriteBlog";
import Navigation from "./Pages/Navigation";
import AboutProject from "./components/aboutProject";
import SingleBlog from "./Pages/SingleBlog";
import YourComponent from "./tools/tableOfContentsReplace";
import Profile from "./Pages/Profile";
import MyProfile from "./Pages/MyProfile";
import AccountSettings from "./Pages/MyProfile/AccountSettings";
import Wall from "./Pages/MyProfile/Wall";
import BlogPosts from "./components/TestGrap";

export const Loader = (Component: ComponentType<any>) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const HomePage = Loader(lazy(() => import("./Pages/HomePage")));
const LoginPage = Loader(lazy(() => import("./Pages/LoginPage")));
const aboutProject = Loader(lazy(() => import("./components/aboutProject")));
// const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

// const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

// const Messenger = Loader(
//   lazy(() => import('src/content/applications/Messenger'))
// );
// const Transactions = Loader(
//   lazy(() => import('src/content/applications/Transactions'))
// );
// const UserProfile = Loader(
//   lazy(() => import('src/content/applications/Users/profile'))
// );
// const UserSettings = Loader(
//   lazy(() => import('src/content/applications/Users/settings'))
// );

// Components

// const Buttons = Loader(
//   lazy(() => import('src/content/pages/Components/Buttons'))
// );
// const Modals = Loader(
//   lazy(() => import('src/content/pages/Components/Modals'))
// );
// const Accordions = Loader(
//   lazy(() => import('src/content/pages/Components/Accordions'))
// );
// const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
// const Badges = Loader(
//   lazy(() => import('src/content/pages/Components/Badges'))
// );
// const Tooltips = Loader(
//   lazy(() => import('src/content/pages/Components/Tooltips'))
// );
// const Avatars = Loader(
//   lazy(() => import('src/content/pages/Components/Avatars'))
// );
// const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
// const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

// const Status404 = Loader(
//   lazy(() => import('src/content/pages/Status/Status404'))
// );
// const Status500 = Loader(
//   lazy(() => import('src/content/pages/Status/Status500'))
// );
// const StatusComingSoon = Loader(
//   lazy(() => import('src/content/pages/Status/ComingSoon'))
// );
// const StatusMaintenance = Loader(
//   lazy(() => import('src/content/pages/Status/Maintenance'))
// );

const routes: RouteObject[] = [
  {
    path: "login",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"/test"} />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "testing",
        element: <BlogPosts />,
      },
      {
        path: "newest",
        element: <HomePage />,
      },
      {
        path: "writeblog",
        element: <WriteBlog />,
      },
      {
        path: "test",
        element: <Navigation />,
      },
      {
        path: "blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "profile/:userID",
        element: <Profile />,
      },
    ],
  },

  {
    path: "myprofile",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={"userprofile"} />,
      },
      {
        path: "accountsettings",
        element: <MyProfile children={<AccountSettings />} />,
      },
      { path: "userprofile", element: <MyProfile children={<Wall />} /> },
    ],
  },
];

export default routes;
