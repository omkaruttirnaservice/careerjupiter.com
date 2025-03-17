import React from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaTrophy } from "react-icons/fa"; // ✅ Import Icons

function TestResult() {
  const resultData = useSelector((state) => state.testResult?.resultData);

  if (!resultData) {
    return (
      <div className="text-center text-xl font-semibold p-6">
        ⏳ Loading results...
      </div>
    );
  }

  const { totalQuestions, correctAnswers, wrongAnswers, totalMarks, marksGained, passingMarks } =
    resultData?.result || {};

  // ✅ Calculate Percentage
  const percentage = (marksGained / totalMarks) * 100;

  // ✅ Dynamic Emoji Based on Performance
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

  // ✅ Pass or Fail Logic
  const isPassed = marksGained >= passingMarks;
  const passFailMessage = isPassed
    ? `🎉 Congratulations! You Passed! ${resultEmoji}`
    : `😞 Better luck next time! ${resultEmoji}`;

  return (
    <div className="text-center space-y-6 w-full max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
         Test Results {resultEmoji}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">Total Questions</h3>
          <p className="text-3xl font-bold text-blue-600">{totalQuestions}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            Correct Answers <FaCheckCircle className="text-green-600 text-2xl" />
          </h3>
          <p className="text-3xl font-bold text-green-600">{correctAnswers}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            Wrong Answers <FaTimesCircle className="text-red-600 text-2xl" />
          </h3>
          <p className="text-3xl font-bold text-red-600">{wrongAnswers}</p>
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg shadow flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          Total Marks / Gained Marks <FaTrophy className="text-yellow-600 text-2xl" />
        </h3>
        <p className="text-3xl font-bold text-yellow-600">
          {totalMarks} / {marksGained}
        </p>
      </div>

      <div className="bg-purple-100 p-6 rounded-lg shadow mt-6">
        <h3 className="text-xl font-semibold mb-2">Performance</h3>
        <p className="mt-2 text-lg">
          You answered <strong>{correctAnswers}</strong> out of <strong>{totalQuestions}</strong>{" "}
          questions correctly. <br />
          Your score: <strong>{percentage.toFixed(2)}%</strong>
        </p>
      </div>

      <div className={`p-6 rounded-lg shadow text-white text-lg font-semibold flex items-center justify-center gap-3 ${isPassed ? "bg-green-500" : "bg-red-500"}`}>
        {resultIcon} {passFailMessage}
      </div>
    </div>
  );
}

export default TestResult;
