import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LuNotebookPen } from "react-icons/lu";
import CheckEligibility from "./CheckEligibility";
import BestCollege from "./BestCollege";
import BestClass from "./BestClass";
import BestUniversity from "./BestUniversity";
import Carouseldiv from "./CarouselDiv";
import Logopage from "./logopage";
import { useDispatch } from "react-redux";
import Flotingbutton from "./Flotingbutton";

// import IQtestBanner from './IQtestBanner';


const HeroSection = () => {
  let dispatch = useDispatch();
  // Auto-scroll to top on page load or route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="relative bg-green-200 overflow-hidden">
        {/* Main Floating Button */}
        <Flotingbutton />
      </div>

      {/* <IQtestBanner /> */}

      <br />
      <Carouseldiv />
      <br />
      <Logopage />
      <br />
      <CheckEligibility />
      <br />
      <BestCollege />
      <br />
      <BestClass />
      <br />
      <BestUniversity />
    </>
  );
};

export default HeroSection;
