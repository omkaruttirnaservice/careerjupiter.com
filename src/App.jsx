import AOS from 'aos';
import { RouterProvider } from 'react-router';
import './App.css';
import { router } from './components/router.jsx';

function App() {
	AOS.init({ duration: 1000 });
	return <RouterProvider router={router} />;
}

export default App;
