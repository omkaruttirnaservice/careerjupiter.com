import AOS from "aos";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./components/router.jsx";
import ScrollToTop from "./Layouts/ScrollToTop.jsx";

function App() {
  AOS.init({ duration: 1000 });

  return (
   <>
      {/* <ScrollToTop />  */}

       </>
  );
}

export default App;
