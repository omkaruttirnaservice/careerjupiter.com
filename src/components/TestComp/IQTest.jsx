"use client";

import { useState, useEffect } from "react";
import { FcAlarmClock } from "react-icons/fc";
import {
  FaSave,
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const IQTest = ({ questions, testDuration, title }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(testDuration * 60);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (letter) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = letter;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAns) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
    toast.success("Test submit successfully..");
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestion(index);
  };

  // Helper function to render options
  const renderOptions = () => {
    return ["A", "B", "C", "D", "E"].map((letter) => {
      const optionValue = questions[currentQuestion][`option${letter}`];
      if (!optionValue) return null;

      return (
        <label
          key={letter}
          className="flex items-center p-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="radio"
            name="option"
            value={letter}
            checked={answers[currentQuestion] === letter}
            onChange={() => handleOptionSelect(letter)}
            className="mr-2"
          />
          {letter}. {optionValue}
        </label>
      );
    });
  };

  return (
    <>
      {/* Top section with title and timer */}
      {!isSubmitted && (
        <div className="w-full bg-gray-100 p-4 shadow-lg rounded-xl mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="w-1/2 bg-gray-300 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${(timeLeft / (1 * 60)) * 100}%` }}
            ></div>
          </div>
          <p className="text-lg flex flex-row items-center font-semibold">
            <FcAlarmClock className="text-xl mr-2 font-bold" />
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row p-4 bg-gray-100">
        {/* Main question panel */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4">
          {!isSubmitted ? (
            <>
              <h2 className="text-xl font-bold mb-4">
                Question {currentQuestion + 1}
              </h2>
              <p className="mb-4">{questions[currentQuestion].question}</p>
              <div className="space-y-2">{renderOptions()}</div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="cursor-pointer flex items-center bg-blue-500 text-white p-2 rounded"
                >
                  <FaArrowLeft className="mr-2" /> Previous
                </button>

                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="cursor-pointer flex items-center bg-blue-500 p-2 rounded text-white"
                  >
                    Next <FaArrowRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="cursor-pointer flex items-center bg-green-500 p-2 rounded text-white"
                  >
                    <Link
                      to="/profile/test/?type=result"
                      className="flex items-center"
                    >
                      Submit <FaCheckCircle className="ml-2" />
                    </Link>
                  </button>
                )}
              </div>
            </>
          ) : (
            {
              /* <div className="text-center space-y-6 w-full max-w-4xl mx-auto p-4 sm:p-6">
              <h2 className="text-3xl font-bold mb-6">Test Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">
                    Total Questions
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {questions.length}
                  </p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">Wrong Answers</h3>
                  <p className="text-3xl font-bold text-red-600">
                    {questions.length - score}
                  </p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">
                    Correct Answers
                  </h3>
                  <p className="text-3xl font-bold text-green-600">{score}</p>
                </div>
              </div>
              <div className="bg-purple-100 p-6 rounded-lg shadow mt-6">
                <h3 className="text-2xl font-semibold mb-2">Final Result</h3>
                <p className="text-4xl font-bold text-purple-600">
                  {Math.round((score / questions.length) * 100)}%
                </p>
                <p className="mt-2 text-lg">
                  You answered {score} out of {questions.length} questions
                  correctly.
                </p>
              </div>
            </div> */
            }
          )}
        </div>

        {/* Sidebar for question navigation */}
        {!isSubmitted && (
          <div className="w-full md:w-1/4 h-[60vh] bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Questions</h2>
            <div className="grid grid-cols-4 h-[80%] overflow-auto gap-2 py-1.5">
              {questions.map((q, index) => (
                <button
                  key={q._id}
                  onClick={() => handleQuestionNavigation(index)}
                  className={`p-2 rounded-full w-10 h-10 flex items-center justify-center ${
                    currentQuestion === index
                      ? "bg-blue-500 text-white"
                      : answers[index]
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IQTest;
