// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { SET_TIME } from "../../utils/constansts";
// import { FaBrain } from "react-icons/fa";
// import { GiBrain } from "react-icons/gi";
// import { IoArrowForwardOutline } from "react-icons/io5";
// import { createGuestUser } from "./Api";
// import { useMutation } from "@tanstack/react-query";
// import Cookies from "js-cookie";
// import { login } from "../../store-redux/AuthSlice";
// import Lotify from "./Lotify";

// const IQTestPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const authState = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const mutation = useMutation({
//     mutationFn: createGuestUser,
//     onSuccess: (data) => {
//       const parsedData = data?.data?.data;
//       Cookies.set("token", parsedData.token, { expires: 1 });
//       Cookies.set("userId", parsedData.userId, { expires: 1 });
//       dispatch(login(parsedData.userId));
//       window.location.href = "/profile/test";
//     },
//   });

//   useEffect(() => {
//     let timer;
//     if (!authState.isLoggedIn) {
//       timer = setTimeout(() => {
//         setIsOpen(true);
//       }, SET_TIME);
//     }
//     return () => {
//       if (timer) clearTimeout(timer);
//     };
//   }, [authState.isLoggedIn]);

//   const handleCreateGuestUser = () => {
//     const token = Cookies.get("token");
//     const userId = Cookies.get("userId");

//     if (token && userId) {
//       window.location.href = "/profile/test";
//       return;
//     }

//     mutation.mutate({
//       mobile_no: "0000000000",
//     });
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl md:max-w-3xl p-8 relative scale-90 md:scale-100 animate-zoomIn">
//             {/* Close Button */}
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
//             >
//               ✕
//             </button>

//             <div className="flex flex-col md:flex-row items-center">
//               {/* Left: Image Section */}
//               <div className="w-full md:w-140 h-80 flex justify-center">
//                 <Lotify icon="\Lottiefiles\Animation - 1742981797770.json" />
//               </div>





//               {/* Right: Content Section */}
//               <div className="w-full md:w-1/2 text-center md:text-left p-6">
//                 <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
//                   <GiBrain className="text-4xl text-blue-500" />

                  
//                   <h2 className="text-3xl font-bold text-gray-900 font-mono">IQ Test</h2>
//                 </div>

//                 <p className="text-gray-700 text-base md:text-lg mb-6 font-serif">
//                   Test your intelligence and problem-solving skills with this
//                   quick IQ test.
//                 </p>

//                 {/* Price Tag */}
//                 <div className="flex items-center justify-center md:justify-start mr-15 mb-5">
//                   <span className="text-gray-500 font-bold text-3xl line-through ">
//                     ₹1499
//                   </span>
//                   <h1 className="text-9xl h-20 w-35">
//                   <Lotify  icon="\Lottiefiles\Animation - 1742985030727.json" />
//                   </h1>
//                 </div>

//                 {/* Button */}
//                 <button
//                   className=" animate-pulse w-full flex items-center justify-center cursor-pointer bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out shadow-lg animate-bounceSlow"
//                   onClick={handleCreateGuestUser}
//                 >
//                   <span>Give Test</span>
//                   <IoArrowForwardOutline className="ml-3 text-2xl transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default IQTestPopup;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"; // Import useLocation
import { SET_TIME } from "../../utils/constansts";
import { createGuestUser } from "./Api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { login } from "../../store-redux/AuthSlice";
import Lotify from "./Lotify";
import { GiBrain } from "react-icons/gi";
import { IoArrowForwardOutline } from "react-icons/io5";

const IQTestPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation(); // Access the current location

  const mutation = useMutation({
    mutationFn: createGuestUser,
    onSuccess: (data) => {
      const parsedData = data?.data?.data;
      Cookies.set("token", parsedData.token, { expires: 1 });
      Cookies.set("userId", parsedData.userId, { expires: 1 });
      dispatch(login(parsedData.userId));
      window.location.href = "/profile/test";
    },
  });

  useEffect(() => {
    const excludedPaths = ["/Sign-in", "/forget-password"];
    if (excludedPaths.includes(location.pathname)) return;

    let timer;
    if (!authState.isLoggedIn) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, SET_TIME);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [authState.isLoggedIn, location.pathname]);

  const handleCreateGuestUser = () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    if (token && userId) {
      window.location.href = "/profile/test";
      return;
    }

    mutation.mutate({
      mobile_no: "0000000000",
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl md:max-w-3xl p-8 relative scale-90 md:scale-100 animate-zoomIn">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row items-center">
              {/* Left: Image Section */}
              <div className="w-full md:w-140 h-80 flex justify-center">
                <Lotify icon="\Lottiefiles\Animation - 1742981797770.json" />
              </div>

              {/* Right: Content Section */}
              <div className="w-full md:w-1/2 text-center md:text-left p-6">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                  <GiBrain className="text-4xl text-blue-500" />
                  <h2 className="text-3xl font-bold text-gray-900 font-mono">
                    IQ Test
                  </h2>
                </div>

                <p className="text-gray-700 text-base md:text-lg mb-6 font-serif">
                  Test your intelligence and problem-solving skills with this
                  quick IQ test.
                </p>

                {/* Price Tag */}
                <div className="flex items-center justify-center md:justify-start mr-15 mb-5">
                  <span className="text-gray-500 font-bold text-3xl line-through ">
                    ₹1499
                  </span>
                  <h1 className="text-9xl h-20 w-35">
                    <Lotify icon="\Lottiefiles\Animation - 1742985030727.json" />
                  </h1>
                </div>

                {/* Button */}
                <button
                  className="animate-pulse w-full flex items-center justify-center cursor-pointer bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out shadow-lg animate-bounceSlow"
                  onClick={handleCreateGuestUser}
                >
                  <span>Give Test</span>
                  <IoArrowForwardOutline className="ml-3 text-2xl transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IQTestPopup;

