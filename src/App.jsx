// import AOS from 'aos';
// import { RouterProvider } from 'react-router';
// import './App.css';
// import { router } from './components/router.jsx';

// function App() {
// 	AOS.init({ duration: 1000 });
// 	return <RouterProvider router={router} />;
// }

// export default App;


import AOS from 'aos';
import { RouterProvider } from 'react-router-dom'; // Ensure you're using 'react-router-dom'
import './App.css';
import { router } from './components/router.jsx';
// import ScrollToTop from './Layouts/ScrollToTop.jsx';

function App() {
	AOS.init({ duration: 1000 });

	return (
		<>
			{/* <ScrollToTop /> Ensure this is included */}
			<RouterProvider router={router} />
		</>
	);
}

export default App;
