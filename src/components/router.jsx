import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../Layouts/AppLayout.jsx';

import HeroSection from '../Layouts/HeroSection';
import Dashboard from '../Pages/Dashboard';
import IQTest from '../Pages/IQTest';
import LoginPage from '../Pages/Login/LoginPage';
import MultiStepForm from '../Pages/SignIn/MultiStepForm';
import CardDetails from '../components/CardDetails';
import InstituteMultiCard from '../components/InstituteComp/InstituteMultiCard';
import SingleInstitute from '../components/InstituteComp/SingleInstitute';
import MultiCards from '../components/MultiCards';
import Roadmap from '../components/Roadmap';
import UniversityDetail from '../components/UniversityComp/UniversityDetail';
import UniversityMultiCard from '../components/UniversityComp/UniversityMultiCard';
import ReviewPage from '../components/navComp/ReviewPage';
// import ClassesList from './InstituteComp/ClassesList.jsx';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{ path: '', element: <HeroSection /> },
			{ path: 'college', element: <MultiCards /> },
			{ path: 'college/:id', element: <CardDetails /> },

			{ path: 'university', element: <UniversityMultiCard /> },
			{ path: 'university/:id', element: <UniversityDetail /> },

			{ path: 'class', element: <InstituteMultiCard /> },
			{ path: 'class/:id', element: <SingleInstitute /> },

			{ path: 'reviews/:id', element: <ReviewPage /> },

			{ path: 'university', element: <UniversityMultiCard /> },
			{ path: 'university/:id', element: <UniversityDetail /> },
		],
	},

	{ path: '/dashboard', element: <Dashboard /> },

	{ path: '/signin', element: <LoginPage /> },
	{ path: '/signup', element: <MultiStepForm /> },
	{ path: '/roadmap', element: <Roadmap /> },
	{ path: '/iq', element: <IQTest /> },
]);

// unused repeated

// { path: '/institute', element: <InstituteMultiCard /> },
// { path: '/', element: <HeroSection /> },
// { path: '/institute', element: <ReviewPage /> },
// { path: "/college", element: <MultiCards /> },

// {
// 	path: '/location',
// 	element: <LocationPage />,
// },
// {
// 	path: '/login',
// 	element: <LoginPage />,
// },

// {
// 	path: '../sign',
// 	element: <MultiStepForm />,
// 	element: (
// 		<ProtectedRoute>
// 			<LocationPage />
// 		</ProtectedRoute>
// 	),
// },

// Public Routes
// { path: '/nav', element: <Nav /> },
