import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import "./App.css";
import AOS from "aos";
import HeroSection from "./Layouts/HeroSection";
import Dashboard from "./Pages/Dashboard";
import LocationPage from "./Pages/LocationPage";
import LoginPage from "./Pages/Login/LoginPage";
import SignInPage from "./Pages/SignInPage";
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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  AOS.init({ duration: 1000 }); // 1000ms = 1s

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <HeroSection /> },
        { path: "/college", element: <MultiCards /> },
        { path: "/institute", element: <InstituteMultiCard /> },
        { path: "/university", element: <UniversityMultiCard /> },
        { path: "/university/:id", element: <UniversityDetail /> },
      ],
    },

    // 🔒 Protected Routes (Login Required)
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      ),
    },
    {
      path: "/location",
      element: (
        <ProtectedRoute>
          <LocationPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/card/:id",
      element: (
        <ProtectedRoute>
          <CardDetails />
        </ProtectedRoute>
      ),
    },

    // Public Routes
    { path: "/login", element: <LoginPage /> },
    { path: "/sign", element: <SignInPage /> },
    { path: "/roadmap", element: <Roadmap /> },
    { path: "/nav", element: <Nav /> },
    { path: "/iq", element: <IQTest /> },
    { path: "/review", element: <ReviewPage /> },
    { path: "/institute/:id", element: <SingleInstitute /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
