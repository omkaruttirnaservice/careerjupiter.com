// import React, { useState, useEffect } from "react";
// import {
//   FaCheckCircle,
//   FaTimesCircle,
//   FaQuestionCircle,
//   FaTrophy,
// } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import ShareResultPopup from "./ShareResultPopup";

// function TestResult() {
//   const resultData = useSelector((state) => state.testResult?.resultData);
//   const [openSharePopup, setOpenSharePopup] = useState(false);
//   const [passFailMessage, setPassFailMessage] = useState("");
//   const [resultIcon, setResultIcon] = useState(<FaQuestionCircle className="text-yellow-500 text-5xl" />);
//   const [resultEmoji, setResultEmoji] = useState("🎉");

//   if (!resultData)
//     return (
//       <div className="text-center text-xl font-semibold p-6">
//         ⏳ Loading results...
//       </div>
//     );

//   const {
//     totalQuestions,
//     correctAnswers,
//     wrongAnswers,
//     totalMarks,
//     marksGained,
//     passingMarks,
//     _id,
//   } = resultData?.result;

//   const percentage = (marksGained / totalMarks) * 100;
//   const isPassed = marksGained >= passingMarks;

//   useEffect(() => {
//     if (percentage >= 75) {
//       setPassFailMessage("Congratulations! Keep up the great work! 😃");
//       setResultIcon(<FaTrophy className="text-green-500 text-5xl" />);
//       setResultEmoji("😃");
//     } else if (percentage >= 50) {
//       setPassFailMessage("Well done! You're on the right track! 🙂");
//       setResultIcon(<FaCheckCircle className="text-blue-500 text-5xl" />);
//       setResultEmoji("🙂");
//     } else if (percentage >= 25) {
//       setPassFailMessage("Good effort! Keep practicing, you're improving! 😢");
//       setResultIcon(<FaCheckCircle className="text-blue-500 text-5xl" />);
//       setResultEmoji("😢");
//     } else {
//       setPassFailMessage("Keep going! Every step is progress! 😢");
//       setResultIcon(<FaTimesCircle className="text-red-500 text-5xl" />);
//       setResultEmoji("😢");
//     }
//   }, [percentage]);

//   return (
//     <>
//       <ShareResultPopup
//         setOpenSharePopup={setOpenSharePopup}
//         openSharePopup={openSharePopup}
//         resultId={_id}
//       />
//       <div className="text-center space-y-4 p-4 border rounded-lg bg-gray-100">
//         <h2 className="text-xl font-bold">Test Results {resultEmoji}</h2>
//         <div className="grid grid-cols-3 gap-2">
//           <div className="p-2 bg-blue-200 rounded">
//             <p className="text-lg">Total Questions</p>
//             <p className="text-xl font-bold">{totalQuestions}</p>
//           </div>
//           <div className="p-2 bg-green-200 rounded">
//             <p className="text-lg">Correct Answers</p>
//             <p className="text-xl font-bold">{correctAnswers}</p>
//           </div>
//           <div className="p-2 bg-red-200 rounded">
//             <p className="text-lg">Wrong Answers</p>
//             <p className="text-xl font-bold">{wrongAnswers}</p>
//           </div>
//         </div>
//         <p className="text-lg font-semibold">
//           Score: {marksGained} / {totalMarks} ({percentage.toFixed(2)}%)
//         </p>
//         <div
//           className={`p-2 flex items-center flex-col gap-2 text-lg font-semibold ${
//             isPassed ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {resultIcon} {passFailMessage}
//         </div>
//         <div className="flex justify-center mt-4">
//           <button
//             className="px-4 cursor-pointer py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
//             onClick={() => setOpenSharePopup(true)}
//           >
//             Share Your Result
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default TestResult;

import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaTrophy,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import ShareResultPopup from "./ShareResultPopup";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TestResultSkeleton from "../loading-skeleton/TestResultSkeleton";
import { FaShareAlt } from "react-icons/fa";
ChartJS.register(ArcElement, Tooltip, Legend);

function TestResult() {
  const resultData = useSelector((state) => state.testResult?.resultData);
  const [openSharePopup, setOpenSharePopup] = useState(false);
  const [passFailMessage, setPassFailMessage] = useState("");
  const [resultIcon, setResultIcon] = useState(
    <FaQuestionCircle className="text-amber-500 text-4xl sm:text-5xl" />
  );
  const [resultEmoji, setResultEmoji] = useState("🎉");
  const [percentage, setPercentage] = useState(0);
  const [isPassed, setIsPassed] = useState(false);
  const [skippedQuestions, setSkippedQuestions] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        label: "Answers",
        data: [0, 0, 0],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 2,
      },
    ],
  });
  const [chartPercentage, setChartPercentage] = useState("0");
  const [_id, set_id] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [marksGained, setMarksGained] = useState(0);
  const [passingMarks, setPassingMarks] = useState(0);

  useEffect(() => {
    if (resultData?.result) {
      const {
        totalQuestions: tQ,
        correctAnswers: cA,
        wrongAnswers: wA,
        totalMarks: tM,
        marksGained: mG,
        passingmarks: pM,
        _id: id,
      } = resultData?.result;

      setTotalQuestions(tQ);
      setCorrectAnswers(cA);
      setWrongAnswers(wA);
      setTotalMarks(tM);
      setMarksGained(mG);
      setPassingMarks(pM);
      set_id(id);

      const calculatedPercentage = (mG / tM) * 100;
      setPercentage(calculatedPercentage);
      setIsPassed(mG >= pM);

      const calculatedSkippedQuestions = tQ - (cA + wA);
      setSkippedQuestions(calculatedSkippedQuestions);

      setChartData({
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            label: "Answers",
            data: [cA, wA, calculatedSkippedQuestions],
            backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
            borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
            borderWidth: 2,
          },
        ],
      });

      setChartPercentage(((cA / tQ) * 100).toFixed(0));
    }
  }, [resultData]);

  useEffect(() => {
    if (percentage >= 75) {
      setPassFailMessage("Excellent! You've mastered this test!");
      setResultIcon(
        <FaTrophy className="text-amber-500 text-4xl sm:text-5xl" />
      );
      setResultEmoji("🏆");
    } else if (percentage >= 50) {
      setPassFailMessage("Well done! You're on the right track!");
      setResultIcon(
        <FaCheckCircle className="text-blue-500 text-4xl sm:text-5xl" />
      );
      setResultEmoji("👍");
    } else if (percentage >= 25) {
      setPassFailMessage("Good effort! Keep practicing to improve.");
      setResultIcon(
        <FaCheckCircle className="text-blue-400 text-4xl sm:text-5xl" />
      );
      setResultEmoji("🔄");
    } else {
      setPassFailMessage("Keep going! Every attempt helps you learn.");
      setResultIcon(
        <FaTimesCircle className="text-red-500 text-4xl sm:text-5xl" />
      );
      setResultEmoji("📚");
    }
  }, [percentage]);

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#333",
          font: {
            size: 12,
            weight: "bold",
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#333",
        bodyFont: {
          size: 14,
        },
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
      },
    },
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: true,
  };

  if (!resultData) return <TestResultSkeleton />;

  return (
    <>
      <ShareResultPopup
        setOpenSharePopup={setOpenSharePopup}
        openSharePopup={openSharePopup}
        resultId={_id}
      />

      <div className="bg-white shadow-md overflow-hidden max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-300 p-4 sm:p-5 text-white">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <FaStar className="text-yellow-300 text-base sm:text-lg" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Test Results
            </h2>
            <FaStar className="text-yellow-300 text-base sm:text-lg" />
          </div>

          <div className="flex items-center justify-center mt-2">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {marksGained}/{totalMarks}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Stats Cards */}
          <div className="w-full lg:w-1/3 p-3 sm:p-4 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <FaClock className="text-blue-600 text-lg sm:text-xl" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Total Questions
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">
                    {totalQuestions}
                  </p>
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
                <div className="bg-green-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <FaCheckCircle className="text-green-600 text-lg sm:text-xl" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Correct Answers
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">
                    {correctAnswers}
                  </p>
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center">
                <div className="bg-red-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <FaTimesCircle className="text-red-600 text-lg sm:text-xl" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Wrong Answers
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-red-600">
                    {wrongAnswers}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="w-full lg:w-2/3 p-3 sm:p-4 md:p-5">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
                <Doughnut data={chartData} options={chartOptions} />
                <div className="absolute inset-0 flex flex-col items-center mb-8 justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                    {chartPercentage}%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Accuracy
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 w-full max-w-md">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 text-center md:text-left">
                  Performance Summary
                </h3>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-700 flex-1">
                    {correctAnswers} Correct
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-700 flex-1">
                    {wrongAnswers} Incorrect
                  </div>
                </div>

                <div className="pt-1 sm:pt-2">
                  <div className="text-xs sm:text-sm md:text-base text-gray-500">
                    Score Percentage
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 mt-1">
                    <div
                      className={`h-2 sm:h-2.5 rounded-full ${
                        percentage >= 75
                          ? "bg-green-600"
                          : percentage >= 50
                            ? "bg-blue-600"
                            : percentage >= 25
                              ? "bg-amber-500"
                              : "bg-red-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs sm:text-sm md:text-base mt-1 font-medium text-gray-700">
                    {percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result Message */}
        <div
          className={`p-3 sm:p-4 md:p-5 flex items-center justify-center flex-col gap-1 sm:gap-2 ${
            isPassed ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="flex items-center gap-2">{resultIcon}</div>
          <p
            className={`text-center text-sm sm:text-base md:text-lg font-medium ${
              isPassed ? "text-green-700" : "text-red-700"
            }`}
          >
            {passFailMessage}
            {resultEmoji}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <button
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition shadow-lg"
            onClick={() => setOpenSharePopup(true)}
            aria-label="Share results"
          >
            <FaShareAlt className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </>
  );
}

export default TestResult;
