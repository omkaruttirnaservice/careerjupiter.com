import { useState, useEffect } from "react";
import Nav from "../../Layouts/Nav.jsx";
import Footer from "../Footer.jsx";
import SignupPopup from "./SignupPopup.jsx";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { addPremiumEnquiry } from "./api.js";

const PremiumServices = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const parts = token.split(".");
        if (parts.length !== 3) return;

        const payload = parts[1];
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
        const decoded = JSON.parse(atob(padded));

        setUserData(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const services = [
    {
      title: "Personal Career Counselling 🎯",
      description: "Based on IQ/Aptitude via Video Call or Conferencing.",
      oldPrice: "₹1999",
      newPrice: "₹999",
      saveAmount: "1000",
      link: "/career-counselling",
      image: "https://www.drramakantpsychologist.com/wp-content/uploads/2018/10/career-counselling-in-nagpu.jpg",
    },
  ];

  const handleCardClick = async () => {
    const token = Cookies.get("token");

    if (!token) {
      setShowSignup(true);
      return;
    }

    try {
      if (!userData) {
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: "Could not identify your account. Please try logging in again.",
          confirmButtonColor: "#DC2626",
        });
        return;
      }

      let userId =
        userData.id ||
        userData._id ||
        userData.userId ||
        userData.user_id ||
        (userData.user && (userData.user.id || userData.user._id)) ||
        (userData.data && (userData.data.id || userData.data._id || userData.data.userId));

      if (!userId) {
        for (const key in userData) {
          if (typeof userData[key] === "string" && userData[key].length >= 24) {
            userId = userData[key];
            break;
          }
        }
      }

      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: "Could not identify your account. Please try logging in again.",
          confirmButtonColor: "#DC2626",
        });
        return;
      }

      const data = await addPremiumEnquiry({ userId, token });

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Inquiry Accepted!",
          text: "Your inquiry has been accepted. We will contact you soon!",
          confirmButtonColor: "#6D28D9",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: data.message || "Something went wrong with the inquiry.",
          confirmButtonColor: "#DC2626",
        });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Could not process your request. Please try again.",
        confirmButtonColor: "#DC2626",
      });
    }
  };

  return (
    <>
      <Nav />

      <div className="mt-10 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "url('https://img.freepik.com/premium-vector/dynamic-abstact-minimal-modern-background_1035899-11291.jpg')",
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Premium Career Services For Students 🌟
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </h1>

          <center>
            <div className="flex justify-center">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={handleCardClick}
                  className="cursor-pointer max-w-md w-full group relative bg-white rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-purple-50 hover:border-purple-100"
                >
                  <div className="absolute -top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                    ⚡ Limited Offer
                    <div className="ml-2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  </div>

                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-xl mb-6 border-4 border-white shadow-lg"
                  />

                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>

                  <div className="flex items-end gap-4 mb-4">
                    <span className="text-2xl font-bold text-green-600">{service.newPrice}</span>
                    <span className="text-gray-400 line-through text-lg">{service.oldPrice}</span>
                  </div>

                  <div className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between shadow-md">
                    💰 Save ₹{service.saveAmount}
                  </div>
                </div>
              ))}
            </div>
          </center>
        </div>
      </div>

      <SignupPopup isOpen={showSignup} onClose={() => setShowSignup(false)} />

      <Footer />
    </>
  );
};

export default PremiumServices;
