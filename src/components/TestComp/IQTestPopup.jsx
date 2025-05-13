import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation , useNavigate } from "react-router-dom"; // Import useLocation
import { SET_TIME } from "../../Constant/constantData";
import { createGuestUser } from "./Api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { login } from "../../store-redux/AuthSlice";
import Lotify from "./Lotify";
import { GiBrain } from "react-icons/gi";
import { IoArrowForwardOutline } from "react-icons/io5";
import { setIsOpen } from "../../store-redux/iqTestSlice";

const IQTestPopup = () => {
  const authState = useSelector((state) => state.auth);
  const isOpen = useSelector((state) => state.iqTest.isOpen);
  const dispatch = useDispatch();
  const location = useLocation(); // Access the current location
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createGuestUser,
    onSuccess: (data) => {
      const parsedData = data?.data?.data;
      Cookies.set("token", parsedData.token, { expires: 1 });
      Cookies.set("userId", parsedData.userId, { expires: 1 });
      dispatch(login(parsedData.userId));
      dispatch(setIsOpen(false));

      navigate("/profile/test");
      // window.location.href = "/profile/test";
    },
  });

  useEffect(() => {
  // Ensure popup opens when visiting /iqtest/popup directly
  if (location.pathname === "/iqtest/popup") {
    dispatch(setIsOpen(true));
  }
}, [location.pathname]);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenIQPopup");

    const excludedPaths = ["/Sign-in", "/forget-password", "/create-password"];
    if (excludedPaths.includes(location.pathname)) return;

    let timer;
    if (!authState.isLoggedIn) {
      timer = setTimeout(() => {
        dispatch(setIsOpen(true));
        // Mark that user has seen the popup
        localStorage.setItem("hasSeenIQPopup", "true");
      }, SET_TIME);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [authState.isLoggedIn, location.pathname]);

  const handleCreateGuestUser = () => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    dispatch(setIsOpen(false));

    if (token && userId) {
      navigate("/profile/test");
      // window.location.href = "/profile/test";
      return;
    }

    mutation.mutate({
      mobile_no: "0000000000",
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 sm:p-8 relative scale-100 animate-zoomIn">
            {/* Close Button */}
            <button
              onClick={() => dispatch(setIsOpen(false))}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Left: Image Section */}
              <div className="w-full md:w-1/2 h-60 sm:h-72 md:h-80 flex justify-center items-center">
                <Lotify icon="\Lottiefiles\Animation - 1742981797770.json" />
              </div>

              {/* Right: Content Section */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3 mb-4">
                  <GiBrain className="text-3xl sm:text-4xl text-blue-500" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-mono">
                    IQ Test
                  </h2>
                </div>

                <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 font-serif">
                  Test your intelligence and problem-solving skills with this
                  quick IQ test.
                </p>

                {/* Price Tag */}
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="text-gray-500 font-bold text-2xl sm:text-3xl line-through">
                    ₹1499
                  </span>
                  <div className="h-16 sm:h-20 w-24 sm:w-28">
                    <Lotify icon="\Lottiefiles\Animation - 1742985030727.json" />
                  </div>
                </div>

                {/* Button */}
                <button
                  className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg"
                  onClick={handleCreateGuestUser}
                >
                  <span>Give Test</span>
                  <IoArrowForwardOutline className="ml-2 text-xl" />
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

