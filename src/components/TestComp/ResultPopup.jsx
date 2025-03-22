import React from "react";

const ResultPopup = ({ setShowScore, showScore }) => {

  return (
    <div className="flex justify-center items-center mt-10">
      {showScore && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-800">
              Test Already Submitted!
            </h2>
            <p className="text-gray-600 mt-2">Your score is.</p>

            <button
              className="mt-5 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
              onClick={() => setShowScore(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPopup;
