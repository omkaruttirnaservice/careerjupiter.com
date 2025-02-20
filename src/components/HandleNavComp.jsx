import { useEffect, useState } from "react";
import Overview from "./navComp/Overview";
import CoursesFee from "./navComp/CoursesFee";
import Scholarship from "./navComp/Scholarship";
import ReviewPage from "./navComp/ReviewPage";
import PlacementDetails from "./navComp/PlacementDetails";
import CutoffTable from "./navComp/CutoffTable";
import Ranking from "./navComp/Ranking";
import Campus from "./navComp/Campus";
import Gallery from "./navComp/Gallery";
import News from "./navComp/News";
import QuenAns from "./navComp/QuenAns";

const HandleNavComp = ({ navName }) => {

    const [navComp, setNavComp] = useState(<Overview />);

    const navItem = [
    "Overview",
    "Courses & Fees",
    "Scholarship",
    "Placements",
    "CutOffs",
    "Ranking",
    "Campus",
    "Gallery",
    "Reviews",
    "News",
    "QnA",
    
  ];

    useEffect(() => {
      switch (navName) {
        case navItem[0]:
          setNavComp(<Overview />);
          break;
        case navItem[1]:
          setNavComp(<CoursesFee />);
          break;
        case navItem[2]:
          setNavComp(<Scholarship />);
          break;
        case navItem[3]:
          setNavComp(<PlacementDetails />);
          break;
        case navItem[4]:
          setNavComp(<CutoffTable />);
          break;
          case navItem[5]:
          setNavComp(<Ranking />);
          break;
          case navItem[6]:
            setNavComp(<Campus />);
          break;
          case navItem[7]:
            setNavComp(<Gallery />);
          break;
        case navItem[8]:
          setNavComp(<ReviewPage />);
          break;
          case navItem[9]:
            setNavComp(<News />);
          break;
          case navItem[10]:
            setNavComp(<QuenAns />);
          break;
        default:
          setNavComp(null);
      }
    }, [navName]);

    return <>{navComp}</>;
};

export default HandleNavComp;