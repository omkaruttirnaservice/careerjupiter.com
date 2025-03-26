import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaTrophy } from "react-icons/fa";
import { useSelector } from "react-redux";
import ShareResultPopup from "./ShareResultPopup";


function TestResult({ getResult }) {
  const resultData = useSelector((state) => state.testResult?.resultData);
  const [openSharePopup, setOpenSharePopup] = useState(false);

  console.log("resultData....", resultData);
  console.log("already done resultData....", getResult);

  if (!resultData)
    return (
      <div className="text-center text-xl font-semibold p-6">
        ⏳ Loading results...
      </div>
    );

  const {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    totalMarks,
    marksGained,
    passingMarks,
    _id,
  } = resultData?.result;

  const percentage = (marksGained / totalMarks) * 100;
  let resultEmoji = "🤔";
  let resultIcon = <FaQuestionCircle className="text-yellow-500 text-5xl" />;

  if (percentage >= 80) {
    resultEmoji = "🎉😃";
    resultIcon = <FaTrophy className="text-green-500 text-5xl" />;
  } else if (percentage >= 50) {
    resultEmoji = "🙂";
    resultIcon = <FaCheckCircle className="text-blue-500 text-5xl" />;
  } else {
    resultEmoji = "😢";
    resultIcon = <FaTimesCircle className="text-red-500 text-5xl" />;
  }

  const isPassed = marksGained >= passingMarks;
  const passFailMessage = isPassed
    ? `🎉 Congratulations! You Passed! ${resultEmoji}`
    : `😞 Better luck next time! ${resultEmoji}`;

  return (
    <>
      <ShareResultPopup
        setOpenSharePopup={setOpenSharePopup}
        openSharePopup={openSharePopup}
        resultId={_id}
      />
      <div className="text-center space-y-4 p-4 border rounded-lg bg-gray-100">
        <h2 className="text-xl font-bold">Test Results {resultEmoji}</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 bg-blue-200 rounded">
            <p className="text-lg">Total Questions</p>
            <p className="text-xl font-bold">{totalQuestions}</p>
          </div>
          <div className="p-2 bg-green-200 rounded">
            <p className="text-lg">Correct Answers</p>
            <p className="text-xl font-bold">{correctAnswers}</p>
          </div>
          <div className="p-2 bg-red-200 rounded">
            <p className="text-lg">Wrong Answers</p>
            <p className="text-xl font-bold">{wrongAnswers}</p>
          </div>
        </div>
        <p className="text-lg font-semibold">
          Score: {marksGained} / {totalMarks} ({percentage.toFixed(2)}%)
        </p>
        <div
          className={`p-2 flex items-center flex-col gap-2 text-lg font-semibold ${isPassed ? "text-green-600" : "text-red-600"}`}
        >
          {resultIcon} {passFailMessage}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 cursor-pointer py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            onClick={() => setOpenSharePopup(true)}
          >
            Share Your Result
          </button>
        </div>
      </div>
    </>
  );
}

export default TestResult;
