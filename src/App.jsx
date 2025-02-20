import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router';
import './App.css'
import AOS from 'aos';
import HeroSection from './Layouts/HeroSection';
import DashboardPage from './Pages/DashboardPage';
import LocationPage from './Pages/LocationPage';
import LoginPage from './Pages/LoginPage';
import SignInPage from './Pages/SignInPage';
import CardDetails from './components/CardDetails';
import Roadmap from './components/Roadmap';
import Nav from './Layouts/Nav';
import TreeStructure from './components/TreeStructure';
import IQTest from './Pages/IQTest';
import MultiCards from './components/MultiCards';
import ReviewPage from './components/navComp/ReviewPage';
import AppLayout from './Layouts/AppLayout';
import InstituteMultiCard from './components/InstituteComp/InstituteMultiCard';
import UniversityMultiCard from './components/UniversityComp/UniversityMultiCard';
import SingleInstitute from './components/InstituteComp/SingleInstitute';
import UniversityDetail from './components/UniversityComp/UniversityDetail';

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
        
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/location",
      element: <LocationPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/sign",
      element: <SignInPage />,
    },
    {
      path: "/card/:id",
      element: <CardDetails />,
    },
    {
      path: "/institute/:id",
      element: <SingleInstitute />,
    },
    {
      path: "/roadmap",
      element: <Roadmap />,
    },
    {
      path: "/nav",
      element: <Nav />,
    },
    {
      path: "/tree",
      element: <TreeStructure />,
    },
    {
      path: "/iq",
      element: <IQTest />,
    },
    {
      path: "/review",
      element: <ReviewPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App;
