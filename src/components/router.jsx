import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout.jsx";

import HeroSection from "../Layouts/HeroSection";
import Dashboard from "../Pages/Dashboard";
import IQTest from "./TestComp/IQTest.jsx";
// import LoginPage from '../Pages/Login/LoginPage';
import MultiStepForm from "../Pages/Login/MultiStepForm.jsx";
import CardDetails from "../components/CardDetails";
import InstituteMultiCard from "../components/InstituteComp/InstituteMultiCard";
import SingleInstitute from "../components/InstituteComp/SingleInstitute";
import MultiCards from "../components/MultiCards";

import UniversityDetail from "../components/UniversityComp/UniversityDetail";
import UniversityMultiCard from "../components/UniversityComp/UniversityMultiCard";
import ReviewPage from "../components/navComp/ReviewPage";
import ProfileDetails from "./ProfileDashboard/ProfileDetails.jsx";
import ProfileLayout from "./ProfileDashboard/ProfileLayout.jsx";
import MyEligibility from "./eligibility/MyEligibility.jsx";
// import TestCard from './TestComp/TestCard.jsx';
import QueryBasedComponent from "./TestComp/QueryBasedComponent.jsx";
import Logout from "../Pages/Logout.jsx";
import SignupPopup from "../Pages/SignIn/SignupPopup.jsx";
import ContactUs from "../Legal/ContactUs.jsx";
import AboutUs from "../Legal/AboutUs.jsx";
import SignInPopup from "../Pages/SignIn/Signinpopup.jsx";
// import ComingSoon from '../Pages/CommingSoom.jsx';
// import Nav from '../Layouts/Nav.jsx';
import ScrollToTop from "../Layouts/ScrollToTop.jsx";
import ExtraPopUp from "../Layouts/ExtraPopUp.jsx";

import ServiceProvide from "../Pages/service_provider.jsx";
import AddImage from "./Add-Img/Add-Image.jsx";
import ForgetPasswordPage from "../Pages/SignIn/ForgetPasswordPage.jsx";
import LoginPage from "../Pages/Login/LoginPage.jsx";
import CreatePasswordPage from "../Pages/SignIn/CreatePasswordPage.jsx";
import TestCard from "./TestComp/TestCard.jsx";
import InProgressTest from "./TestComp/InProgressTest.jsx";
import CompleteTest from "./TestComp/CompleteTest.jsx";
import PremiumServices from "./premium-services/PremiumServices.jsx";
import GuestHandler from "./GuestHandler.jsx";
import TestResult from "./TestComp/TestResult.jsx";
import IQTestPopup from "./TestComp/IQTestPopup.jsx";
import ShareTestResult from "./TestComp/ShareTestResult.jsx";
import Roadmap from "./roadMap/Roadmap.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
    <ExtraPopUp />
    <ScrollToTop/>
    <GuestHandler /> 
    </>,
 children: [
      {
        path: "/",
        element: (
          <>
            <AppLayout />,
          </>
        ),
        children: [
          { path: "", element: <HeroSection /> },
          { path: "college", element: <MultiCards /> },

          { path: "university", element: <UniversityMultiCard /> },

          { path: "class", element: <InstituteMultiCard /> },

          { path: "reviews/:id", element: <ReviewPage /> },
          { path: "/service-provider", element: <ServiceProvide /> },
        ],
      },

      { path: "college/:id", element: <CardDetails /> },
      { path: "university/:id", element: <UniversityDetail /> },
      { path: "class/:id", element: <SingleInstitute /> },

      { path: "/dashboard", element: <Dashboard /> },

      { path: "/signin", element: <LoginPage /> },
      { path: "/sign", element: <MultiStepForm /> },
      { path: "/roadmap", element: <Roadmap /> },
      { path: "/iq", element: <IQTest /> },

      { path: "/my-eligibility", element: <MyEligibility /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/my-eligibility", element: <MyEligibility /> },

      {
        path: "/contact-us",
        element: (
          <>
            <ScrollToTop />
            <ContactUs />
          </>
        ),
      },
      {
        path: "/about-us",
        element: (
          <>
            <ScrollToTop />
            <AboutUs />
          </>
        ),
      },

      // {
      //   path: "profile",
      //   element: <ProfileLayout />,
      //   children: [
      //     {
      //       path: "personal-details",
      //       element: <ProfileDetails />,
      //     },
      //     { path: "test", element: <QueryBasedComponent /> },
      //   ],
      //   scrollRestoration: "manual",
      // },

      {
        path: "profile",
        element: <>
          {/* <ProtectedRoute> */}
            <ProfileLayout />
          {/* </ProtectedRoute> */}
        </>,
        children: [
          {
            path: "personal-details",
            element: <ProfileDetails />,
          },
          { path: "test", element: <QueryBasedComponent /> },
        ],
        scrollRestoration: "manual",
      },

      { path: "/test/report", element: <ShareTestResult /> },

      { path: "/iqtest/popup", element: <IQTestPopup /> },

      {
        path: "/signout",
        element: <Logout />,
      },
      {
        path: "/popup",
        element: <SignupPopup />,
      },
      { path: "/Sign-in", element: <SignInPopup /> },
      { path: "forget-password", element: <ForgetPasswordPage /> },
      { path: "create-password", element: <CreatePasswordPage /> },

      { path: "university", element: <UniversityMultiCard /> },

      { path: "class", element: <InstituteMultiCard /> },

      { path: "reviews/:id", element: <ReviewPage /> },
      { path: "/service-provider", element: <ServiceProvide /> },
      { path: "/add-img", element: <AddImage /> },
      { path: "/Premium-services", element: <PremiumServices /> },



      { path: "college/:id", element: <CardDetails /> },
      { path: "university/:id", element: <UniversityDetail /> },
      { path: "class/:id", element: <SingleInstitute /> },

      { path: "/dashboard", element: <Dashboard /> },

      // { path: '/signin', element: <LoginPage /> },
      { path: "/sign", element: <MultiStepForm /> },
      { path: "/roadmap", element: <Roadmap /> },
      { path: "/iq", element: <IQTest /> },

      { path: "/my-eligibility", element: <MyEligibility /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/my-eligibility", element: <MyEligibility /> },
      {
        path: "/contact-us",
        element: (
          <>
            <ScrollToTop />
            <ContactUs />
          </>
        ),
      },
      {
        path: "/about-us",
        element: (
          <>
            <ScrollToTop />
            <AboutUs />
          </>
        ),
      },

    ],
  },

  {
    path: "profile",
    element: <ProfileLayout />,
    children: [
      {
        path: "personal-details",
        element: <ProfileDetails />,
      },

      { path: "test", element: <QueryBasedComponent /> },
      { path: "in-progress-test", element: <InProgressTest /> },
      { path: "completed-test", element: <CompleteTest /> },
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
  { path: "/SigninPopup", element: <SignupPopup /> },
]);
