import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout.jsx";

import HeroSection from "../Layouts/HeroSection";
import Dashboard from "../Pages/Dashboard";
import IQTest from "./TestComp/IQTest.jsx";
import LoginPage from "../Pages/Login/LoginPage";
import MultiStepForm from "../Pages/SignIn/MultiStepForm";
import CardDetails from "../components/CardDetails";
import InstituteMultiCard from "../components/InstituteComp/InstituteMultiCard";
import SingleInstitute from "../components/InstituteComp/SingleInstitute";
import MultiCards from "../components/MultiCards";
import Roadmap from "../components/Roadmap";
import UniversityDetail from "../components/UniversityComp/UniversityDetail";
import UniversityMultiCard from "../components/UniversityComp/UniversityMultiCard";
import ReviewPage from "../components/navComp/ReviewPage";
import ProfileDetails from "./ProfileDashboard/ProfileDetails.jsx";
import ProfileLayout from "./ProfileDashboard/ProfileLayout.jsx";
import MyEligibility from "./eligibility/MyEligibility.jsx";
import TestCard from "./TestComp/TestCard.jsx";
import QueryBasedComponent from "./TestComp/QueryBasedComponent.jsx";
import Logout from "../Pages/Logout.jsx";
import SignupPopup from "../Pages/SignIn/SignupPopup.jsx";
// import ClassesList from './InstituteComp/ClassesList.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <HeroSection /> },
      { path: "college", element: <MultiCards /> },
      { path: "college/:id", element: <CardDetails /> },

      { path: "university", element: <UniversityMultiCard /> },
      { path: "university/:id", element: <UniversityDetail /> },

      { path: "class", element: <InstituteMultiCard /> },
      { path: "class/:id", element: <SingleInstitute /> },

      { path: "reviews/:id", element: <ReviewPage /> },

      { path: "university", element: <UniversityMultiCard /> },
      { path: "university/:id", element: <UniversityDetail /> },
    ],
  },

  { path: "/dashboard", element: <Dashboard /> },

  { path: "/signin", element: <LoginPage /> },
  { path: "/sign", element: <MultiStepForm /> },
  { path: "/roadmap", element: <Roadmap /> },
  { path: "/iq", element: <IQTest /> },

  { path: "/my-eligibility", element: <MyEligibility /> },

  {
    path: "profile",
    element: <ProfileLayout />,
    children: [
      {
        path: "personal-details",
        element: <ProfileDetails />,
      },
      { path: "test", element: <QueryBasedComponent /> },
    ],
    scrollRestoration: "manual",
  },

  {
    path: "/signout",
    element: <Logout />,
  },
  {
    path: "/popup",
    element: <SignupPopup />,
  },
]);
