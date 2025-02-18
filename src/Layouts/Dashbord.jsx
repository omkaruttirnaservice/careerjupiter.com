import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  createBrowserRouter,
} from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import PlaceIcon from "@mui/icons-material/Place";

import DashboardPage from "../Pages/DashboardPage";
import LocationPage from "../Pages/LocationPage";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "location",
    title: "Location",
    icon: <PlaceIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardApp() {
    return (
        <Router>
            <Dashbord />
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/location" element={<LocationPage />} />
            </Routes>
        </Router>
    );
}

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/location",
    element: <LocationPage />,
  },
]);

function Dashbord(props) {
  const { window } = props;

  const [session, setSession] = React.useState({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const router = useDemoRouter("/dashboard");

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout></DashboardLayout>
    </AppProvider>
  );
}

export default Dashbord;

//___________________________________________________________________________________________
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { useState } from "react";
// import { dashbordStoreProvider } from "../store/DashbordData";

// const Dashboard = () => {
//   const [dashToggle, setDashToggle] = useState(false);

//   const handleDashbordToggle = () => {
//     setDashToggle(!dashToggle);
//   };
//   console.log({ dashToggle });
//   return (
//     <>
//       <dashbordStoreProvider.Provider
//         value={{
//           handleDashbordToggle: handleDashbordToggle,
//         }}
//       >
//         <Navbar />
//         {dashToggle ? <Sidebar /> : null}
//       </dashbordStoreProvider.Provider>{" "}
//     </>
//   );
// };

// export default Dashboard;
