import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, userLogin } from "./Api";
// import {logUserActivity } from "../Api"
import { toast } from "react-toastify";
// import { logUserActivityAPI } from "../api";
import { useDispatch } from "react-redux";
import { showPopup } from "../../store-redux/eligibilitySlice"; // or your actual path
import { login } from "../../store-redux/AuthSlice";
import { logUserActivityAPI } from "../Api";

const OtpLoginPopup = ({ onClose, collegeId }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // ✅ Use this instead
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Add this inside your component
  

  // ✅ Step 1: Send OTP
  const handleSendOtp = async () => {
    try {
      const res = await sendOtp(mobile);
      const ref = res?.data?.data?.reference_id;
      console.log("OTP sent, ref:", ref);

      if (ref) {
        setReferenceId(ref);
        setIsOtpSent(true); // ✅ trigger OTP input render
      } else {
        console.error("No reference ID found in OTP response");
      }
    } catch (err) {
      console.error("Send OTP failed:", err);
      toast.warning(err?.response?.data?.usrMsg || "Please Try Again!");
    }
  };

  // ✅ Step 2: Verify OTP & Login
  // const handleVerifyOtp = async () => {
  //   try {
  //     const verifyRes = await verifyOtp(mobile, otp, referenceId);
  //     const success = verifyRes?.data?.success;

  //     if (success) {
  //       const loginRes = await userLogin(mobile);
  //       const { token, userId } = loginRes.data.data;

  //       Cookies.set("token", token);
  //       Cookies.set("userId", userId);

  //       // ⛔ Log user activity
  //       const res = await logUserActivityAPI({ userId, collegeId, token });

  //       if (
  //         res?.data?.usrMsg === "College not found in DB, but activity logged"
  //       ) {
  //         onClose();
  //         dispatch(showPopup());
  //         return;
  //       }

  //       // ✅ Success → Navigate
  //       onClose();
  //       navigate(`/college/${college._id}`, {
  //         state: { status: false, searchData: {} },
  //       });
  //     } else {
  //       console.error("OTP not verified");
  //     }
  //   } catch (err) {
  //     console.error("OTP verification or login failed:", err);
  //     toast.warning(err?.response?.data?.usrMsg || "Please Try Again!");
  //   }
  // };

//   const handleVerifyOtp = async () => {
//   try {
//     const verifyRes = await verifyOtp(mobile, otp, referenceId);
//     const success = verifyRes?.data?.success;

//     if (success) {
//       const loginRes = await userLogin(mobile);
//       const { token, userId } = loginRes.data.data;

//       Cookies.set("token", token);
//       Cookies.set("userId", userId);

//       // ⛔ Log user activity
//       const res = await logUserActivityAPI({ userId, collegeId, token });

//       const usrMsg = res?.data?.usrMsg;
//       const mongoId = res?.data?.data?.collegeMongoId;

//       // ✅ If college is not in DB → show WhatsApp popup
//       if (usrMsg === "College not found in DB, but activity logged") {
//         onClose();
//         dispatch(showPopup());
//         return;
//       }

//       // ✅ If college is found → navigate using mongoId
//       if (usrMsg === "Activity logged" && mongoId) {
//         onClose();
//         navigate(`/college/${mongoId}`, {
//           state: { status: false, searchData: {} },
//         });
//         return;
//       }

//       // Fallback (just close popup if nothing matches)
//       onClose();
//     } else {
//       console.error("OTP not verified");
//     }
//   } catch (err) {
//     console.error("OTP verification or login failed:", err);
//     toast.warning(err?.response?.data?.usrMsg || "Please Try Again!");
//   }
// };


const handleVerifyOtp = async () => {
  try {
    const verifyRes = await verifyOtp(mobile, otp, referenceId);
    const success = verifyRes?.data?.success;

    if (success) {
      const loginRes = await userLogin(mobile);
      const { token, userId } = loginRes.data.data;

      // ✅ Store in cookies
      Cookies.set("token", token);
      Cookies.set("userId", userId);

      // ✅ Update Redux login state immediately
      dispatch(login(userId));

      // ✅ Log user activity
      const res = await logUserActivityAPI({ userId, collegeId, token });
      const usrMsg = res?.data?.usrMsg;
      const mongoId = res?.data?.data?.collegeMongoId;

      if (usrMsg === "College not found in DB, but activity logged") {
        onClose();
        dispatch(showPopup());
        return;
      }

      if (usrMsg === "Activity logged" && mongoId) {
        onClose();
        navigate(`/college/${mongoId}`, {
          state: { status: false, searchData: {} },
        });
        return;
      }

      onClose(); // fallback
    } else {
      console.error("OTP not verified");
    }
  } catch (err) {
    console.error("OTP verification or login failed:", err);
    toast.warning(err?.response?.data?.usrMsg || "Please Try Again!");
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md p-6 rounded-2xl shadow-2xl bg-white border border-purple-100 animate-fade-in">
        <h2 className="text-2xl font-extrabold text-center text-purple-700 mb-6">
          Login with OTP
        </h2>

        {!isOtpSent ? (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500">
                📱
              </span>
            </div>
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-[1.02] transition"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                🔐
              </span>
            </div>
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:scale-[1.02] transition"
            >
              Verify & Login
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full text-sm text-gray-500 hover:text-red-500 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpLoginPopup;
