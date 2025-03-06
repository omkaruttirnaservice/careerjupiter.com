// import React from "react";

// const EligibilityBanner = () => {
//   return (
//     <div
//       className="relative w-full h-[60vh] bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://media.istockphoto.com/id/2163913008/photo/group-of-four-indian-asian-young-college-friends-with-backpack-books-laptop-standing-isolated.jpg?s=612x612&w=0&k=20&c=An8k6gGTi1jTxxAJJ93frMUXUyxej6TMRGcu9POxt38=')",
//       }}
//     >
//       <div className="absolute inset-0 flex justify-center bg-opacity-20 backdrop-blur-[2px] text-center px-4">
//         <h1 className="text-white mt-20 text-2xl md:text-4xl font-bold">
//           Check Your Eligibility Instantly, <br /> Unlock Your College Journey
//           Confidently!
//         </h1>
//       </div>

//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <button className="bg-blue-600 mt-5 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold hover:bg-blue-700 transition-all">
//           Check Eligibility
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EligibilityBanner;

import React from "react";

const EligibilityBanner = () => {
  return (
    <div className="w-full h-[60vh] bg-gray-100 flex flex-col md:flex-row items-center justify-between">
      {/* Left Section (35%) */}
      <div className="w-full  md:w-[35%] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Your Future Starts Here!
        </h1>
        <p className="mt-4 text-gray-700 text-sm md:text-base">
          Discover the best colleges for you. Check your eligibility and take
          the next step in your academic journey.
        </p>
        <button className=" mt-8 w-[100%] bg-blue-600 text-white py-3 rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-700 transition-all">
          Check Eligibility
        </button>
      </div>

      {/* Right Section (65%) - Image */}
      <div className="w-full md:w-[65%] h-full">
        <img
          src="https://media.istockphoto.com/id/2163913008/photo/group-of-four-indian-asian-young-college-friends-with-backpack-books-laptop-standing-isolated.jpg?s=612x612&w=0&k=20&c=An8k6gGTi1jTxxAJJ93frMUXUyxej6TMRGcu9POxt38="
          alt="Students"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default EligibilityBanner;

