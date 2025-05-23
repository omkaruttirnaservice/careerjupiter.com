import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import "./App.css";
import AOS from "aos";
import HeroSection from "./Layouts/HeroSection";
import Dashboard from "./Pages/Dashboard";
import LocationPage from "./Pages/LocationPage";
import LoginPage from "./Pages/Login/LoginPage";
import CardDetails from "./components/CardDetails";
import Roadmap from "./components/Roadmap";
import Nav from "./Layouts/Nav";
import IQTest from "./Pages/IQTest";
import MultiCards from "./components/MultiCards";
import ReviewPage from "./components/navComp/ReviewPage";
import AppLayout from "./Layouts/AppLayout";
import InstituteMultiCard from "./components/InstituteComp/InstituteMultiCard";
import UniversityMultiCard from "./components/UniversityComp/UniversityMultiCard";
import SingleInstitute from "./components/InstituteComp/SingleInstitute";
import UniversityDetail from "./components/UniversityComp/UniversityDetail";
import MultiStepForm from "./Pages/SignIn/MultiStepForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  AOS.init({ duration: 1000 }); // 1000ms = 1s

  // React.useEffect(() => {

  // }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HeroSection />,
        },
        {
          path: "/college",
          element: <MultiCards />,
        },
        {
          path: "/institute",
          element: <InstituteMultiCard />,
        },
        {
          path: "/university",
          element: <UniversityMultiCard />,
        },
        {
          path: "/university/:id", // Route for single university details
          element: <UniversityDetail />,
        },
        { path: "/", element: <HeroSection /> },
        // { path: "/college", element: <MultiCards /> },
        { path: "/institute", element: <InstituteMultiCard /> },
        { path: "/university", element: <UniversityMultiCard /> },
        { path: "/university/:id", element: <UniversityDetail /> },
        { path: "/institute", element: <ReviewPage /> },
      ],
    },

    // 🔒 Protected Routes (Login Required)
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/location",
      element: <LocationPage />,
    },
    {
      path: "/signin",
      element: <LoginPage />,
    },
    {
      path: "../sign",
      element: <MultiStepForm />,
      element: (
        <ProtectedRoute>
          <LocationPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/college/:id",
      element: (
        <ProtectedRoute>
          <CardDetails />
        </ProtectedRoute>
      ),
    },

    // Public Routes
    { path: "/signin", element: <LoginPage /> },
    { path: "/sign", element: <MultiStepForm /> },
    { path: "/roadmap", element: <Roadmap /> },
    { path: "/nav", element: <Nav /> },
    { path: "/iq", element: <IQTest /> },
    { path: "/reviews/:id", element: <ReviewPage /> },
    { path: "/institute/:id", element: <SingleInstitute /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
