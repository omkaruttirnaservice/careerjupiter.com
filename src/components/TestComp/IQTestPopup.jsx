import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_TIME } from "../../utils/constansts";
import { FaBrain } from "react-icons/fa";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import { createGuestUser } from "./Api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { login } from "../../store-redux/AuthSlice";

const IQTestPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch;

  useEffect(() => {
    let timer;

    if (!authState.isLoggedIn) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, SET_TIME);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [authState.isLoggedIn]);

  const handleCreateGuestUser = () => {
    // check it token and userId availabe in cookies
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    if (token && userId) {
      console.log("Guest user already exists.");
      return;
    }

      const mutation = useMutation({
        mutationFn: createGuestUser,
        onSuccess: (data) => {
          console.log(data, "signup data");
          const parsedData = data?.data?.data;
          Cookies.set("token", parsedData.token, { expires: 1 });
          Cookies.set("userId", parsedData.userId, { expires: 1 });
          dispatch(login(parsedData.userId));
          //   <Navigate to={"/profile/test"} />;
        },
      });

    mutation.mutate({});
  };

  return (
    <>
      <div>
        {isOpen && (
          <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              {/* Card on the right */}
              <div className="flex items-center justify-center p-2">
                {/* Card */}
                <div className="bg-gradient-to-tr from-green-500/80 to-green-600 p-4 rounded-xl w-full md:w-96 max-w-sm">
                  {/* Header */}
                  <div className="flex items-center mb-3 space-x-3">
                    <FaBrain className="text-4xl text-white" />
                    <h2 className="text-3xl font-bold text-white">IQ Test</h2>
                  </div>
                  <p className="text-gray-100 font-bold mb-6 leading-relaxed">
                    Test your intelligence and problem-solving skills with this
                    quick IQ test.
                  </p>

                  {/* Time and Button */}
                  <div className="flex items-center justify-between">
                    {/* <NavLink
                      to="profile/test"
                      className="text-white flex-row gap-2 ml-auto animate-pulse hover:animate-none border-white border hover:border-green-700
                                        hover:bg-green-700 shadow-lg w-full cursor-pointer px-6 py-3 rounded-md text-md font-medium flex items-center text-xl space-x-2 transition-all duration-300 ease-in-out group justify-center"
                    >
                      <span>Give Test</span>
                      <IoArrowForwardOutline className="text-xl transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                    </NavLink> */}
                    <div
                      to="profile/test"
                      className="text-white flex-row gap-2 ml-auto animate-pulse hover:animate-none border-white border hover:border-green-700
                                        hover:bg-green-700 shadow-lg w-full cursor-pointer px-6 py-3 rounded-md text-md font-medium flex items-center text-xl space-x-2 transition-all duration-300 ease-in-out group justify-center"
                      onClick={handleCreateGuestUser}
                    >
                      <span>Give Test</span>
                      <IoArrowForwardOutline className="text-xl transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IQTestPopup;
