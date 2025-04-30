// AppLoader.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";


import { router } from "./router.jsx";
import { createGuestUser } from "./TestComp/Api.js";
import { login } from "../store-redux/AuthSlice.js";

const AppLoader = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const mutation = useMutation({
    mutationFn: createGuestUser,
    onSuccess: (data) => {
      const parsedData = data?.data?.data;
      Cookies.set("token", parsedData.token, { expires: 1 });
      Cookies.set("userId", parsedData.userId, { expires: 1 });
      dispatch(login(parsedData.userId));
      window.location.href = "/";
    },
  });

  useEffect(() => {
    if (!authState.isLoggedIn) {
      mutation.mutate({
        mobile_no: "0000000000",
      });
    }
  }, [authState.isLoggedIn]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppLoader;
