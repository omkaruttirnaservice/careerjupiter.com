import { useEffect, useState } from "react";
import Overview from "./navComp/Overview";
import CoursesFee from "./navComp/CoursesFee";
import Scholarship from "./navComp/Scholarship";
import ReviewPage from "./navComp/ReviewPage";
import PlacementDetails from "./navComp/PlacementDetails";
import CutoffTable from "./navComp/CutoffTable";
import Ranking from "./navComp/Ranking";
import Infrastructure from "./navComp/infrastructure";
import Gallery from "./navComp/Gallery";
import News from "./navComp/News";
import QuenAns from "./navComp/QuenAns";

const HandleNavComp = ({
  navName,
  courses,
  infrastructure,
  placementData,
  imageGallery,
  review,
}) => {
  const [navComp, setNavComp] = useState(<Overview />);

  const navItem = [
    // "Overview",
    "Courses & Fees",
    // "Scholarship",
    "Placements",
    // "CutOffs",
    // "Ranking",
    "Infrastructure",
    "Gallery",
    "Reviews",
    // "News",
    // "QnA",
  ];

  useEffect(() => {
    switch (navName) {
      // case navItem[0]:
      //   setNavComp(<Overview />);
      //   break;
      case navItem[0]:
        setNavComp(<CoursesFee coursesData={courses} />);
        break;
      // case navItem[2]:
      //   setNavComp(<Scholarship />);
      //   break;
      case navItem[1]:
        setNavComp(<PlacementDetails placementData={placementData} />);
        break;
      // case navItem[4]:
      //   setNavComp(<CutoffTable />);
      //   break;
      // case navItem[5]:
      //   setNavComp(<Ranking />);
      //   break;
      case navItem[2]:
        setNavComp(<Infrastructure infrastructure={infrastructure} />);
        break;
      case navItem[3]:
        setNavComp(<Gallery imageGallery={imageGallery} />);
        break;
      case navItem[4]:
        setNavComp(<ReviewPage reviewCollegeName={review} />);
        break;
      // case navItem[9]:
      //   setNavComp(<News />);
      //   break;
      // case navItem[10]:
      //   setNavComp(<QuenAns />);
      //   break;
      default:
        setNavComp(null);
    }
  }, [navName]);

  return <>{navComp}</>;
};

export default HandleNavComp;