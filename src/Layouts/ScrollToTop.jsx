// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const ScrollToTop = () => {
//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   return <></>;
// };

// export default ScrollToTop;
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" }); // Try "instant" instead of "smooth"
    }); // Small delay to wait for DOM updates
  }, [pathname]);

  return null;
};

export default ScrollToTop;
