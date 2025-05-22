import { useEffect, useState } from "react";
import Overview from "./navComp/Overview";
import CoursesFee from "./navComp/CoursesFee";
import Scholarship from "./navComp/Scholarship";
import ReviewPage from "./navComp/ReviewPage";
import PlacementDetails from "./navComp/PlacementDetails";

import Gallery from "./navComp/Gallery";

import Infrastructure from "./navComp/Infrastructure";
import ContactDetails from "./ContactDetails";

const HandleNavComp = ({
  navName,
  courses,
  infrastructure,
  placementData,
  imageGallery,
  review,
  Contact,


}) => {
  const [navComp, setNavComp] = useState(<Overview />);

  const navItem = [
    // "Overview",
    "Courses & Fees",
    "Placements",
    "Infrastructure",
    "Gallery",
    "Reviews",
    "Contact Details"
  ];
  // console.log(Contact , 'sdlkfjsldkfjsdklfjl')

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
      
      case navItem[2]:
        setNavComp(<Infrastructure infrastructure={infrastructure} />);
        break;
      case navItem[3]:
        setNavComp(<Gallery imageGallery={imageGallery} />);
        break;
      case navItem[4]:
        setNavComp(
          <ReviewPage
            reviewCollegeName={review}
            reviewUniversityName={review}
          />
        );
        break;
      case navItem[5]:
        setNavComp(
        <ContactDetails college={Contact} />
        );
        break;
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
