// GuestHandler.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"; // ✅ safe here
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { createGuestUser } from "./TestComp/Api.js";
import { login } from "../store-redux/AuthSlice.js";

const GuestHandler = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const location = useLocation(); // ✅ now safe

  const mutation = useMutation({
    mutationFn: createGuestUser,
    onSuccess: (data) => {
      console.log("✅ Guest user created:", data); // 👈 LOG THIS
      const parsedData = data?.data?.data;
      Cookies.set("token", parsedData.token, { expires: 1 });
      Cookies.set("userId", parsedData.userId, { expires: 1 });
      // dispatch(login(parsedData.userId));
      dispatch(login({ userId: parsedData.userId }));

      // console.log("userid guest login", userId);
      console.log("userid guest login", userId);


        // ✅ After setting cookies and login => Reload the page
        window.location.reload();
    },
  });

  useEffect(() => {
    const currentPath = location.pathname;
 console.log("📍 GuestHandler running on path:", currentPath);
  console.log("🟢 authState.isLoggedIn:", authState.isLoggedIn);

    // ✅ Guest creation only for /profile routes
    if (currentPath.startsWith("/profile") && !authState.isLoggedIn) {
       console.log("🚀 Triggering guest user creation...");
      mutation.mutate({
        mobile_no: "0000000000",
      });
    }
  }, [location.pathname, authState.isLoggedIn]);

  return null; // 👈 no UI, only background logic
};

export default GuestHandler;
