import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OPTIONS_ENUMS } from "../../utils/constansts";
import TestClock from "./TestClock";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDetail, sendResult, updateTestProgress } from "./Api";
import { setTestResult } from "../../store-redux/testResultSlice";
import MobileNumberPopup from "./MobileNumberPopup";
import { setIqTestId } from "../../store-redux/iqTestSlice";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const IQTest = ({
  questions,
  testDuration,
  title,
  testId,
  resultId,
  iqTestDataPayload,
  getIQTestDataMutation,
  newTestId,
  setSubmitTest,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    questions.map((q) => q.selectedOption || "")
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMobileNumberPopup, setShowMobileNumberPopup] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isProgressSaved, setIsProgressSaved] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [timeLeft, setTimeLeft] = useState(
    testDuration.minutes * 60 + testDuration.seconds
  );
  const [TestProgress, setTestProgress] = useState({
    userId: userId,
    iqTestId: testId,
    resultId: resultId,
    questionId: "",
    testDuration: "",
    selectedOption: "",
    status: -1,
  });

  // Add refs to store current values that can be accessed in the interval
  const progressIntervalRef = useRef(null);
  const timeLeftRef = useRef(timeLeft);
  const testProgressRef = useRef(TestProgress);

  // previce code ---------------

  // const token = Cookies.get("token");
  // const decodedToken = jwtDecode(token);
  // const userRole = decodedToken.role;

  // new code -----------------------


  useEffect(() => {
    const token = Cookies.get("token");

    if (token && typeof token === "string") {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (err) {
        console.error("Token decode error:", err);
        toast.error("No user found.. Please login again.");
      }
    } else {
      toast.error("No user found. Please login.");
    }
  }, []);


  // Update refs when state changes
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    testProgressRef.current = TestProgress;
  }, [TestProgress]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return { minutes, seconds: remainingSeconds };
  }

  const resultGenerationMutation = useMutation({
    mutationFn: sendResult,
    onSuccess: (response) => {
      Swal.fire({
        icon: "success",
        title: "Test Submitted!",
        text: "Your test was submitted successfully!",
        confirmButtonColor: "#28a745",
      }).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["getTest"],
          exact: false,
        });
        navigate("/profile/test/?type=result");
        dispatch(setTestResult(response.data));
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        text: "You are unable to submit the test. Please try again.",
        confirmButtonColor: "#dc3545",
        showCancelButton: true,
        confirmButtonText: "Try Again",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          resultGenerationMutation.mutate(resultData); // Retry submission
        }
      });
    },
  });

  const updateTestProgressMutation = useMutation({
    mutationFn: updateTestProgress,
    onSuccess: (response) => {
      setIsProgressSaved(true);
    },
    onError: () => {
      setIsProgressSaved(true);
    },
  });

  const [resultData, setResultData] = useState({
    testID: newTestId,
    userId: userId,
    // status: 1,
    // answers: questions.map((q) => ({ questionId: q._id, selectedOption: "" })),
  });

  dispatch(setIqTestId(testId));

  const currentTimeLeft = timeLeftRef.current;
  const currentTestProgress = testProgressRef.current;

  useEffect(() => {
    setResultData({
      testID: newTestId,
      userId: userId,
      // status: -1,
      // answers: questions.map((q) => ({
      //   questionId: q._id,
      //   selectedOption: "",
      // })),
    });
  }, [questions, testId, userId]);

  const handleOptionSelect = (letter) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = letter;
    setAnswers(newAnswers);
    setIsProgressSaved(false);

    const updatedProgress = {
      userId: userId,
      iqTestId: testId,
      resultId: resultId,
      questionId: questions[currentQuestion]._id,
      testDuration: formatTime(timeLeft),
      selectedOption: letter,
      status: -1,
    };

    setTestProgress(updatedProgress);
    updateTestProgressMutation.mutate(updatedProgress); // API call here

    setResultData((prevData) => ({
      ...prevData,
      // Optional: update answers here if you track them
    }));
  };

  const handleNextQuestion = () => {
    // Clear the existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    if (currentTestProgress.questionId && currentTestProgress.selectedOption) {
      updateTestProgressMutation.mutate({
        ...currentTestProgress,
        testDuration: formatTime(currentTimeLeft),
      });
    }

    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  useEffect(() => {
    setAnswers(questions.map((q) => q.selectedOption || ""));
    setResultData({
      testID: newTestId,
      userId: userId,
      // status: 1,
      // answers: questions.map((q) => ({
      //   questionId: q._id,
      //   selectedOption: q.selectedOption || "",
      // })),
    });
  }, [questions, testId, userId]);

  const handleSubmit = async () => {
    const latestUserRole = userRole;
    const allAnswered = answers.every((ans) => ans !== "");

    if (timeLeft === 0) {
      if (latestUserRole === "GUEST") {
        setShowMobileNumberPopup(true);
      } else {
        setIsSubmitted(true);
        resultGenerationMutation.mutate(resultData);
      }
    }

    if (!allAnswered && timeLeft !== 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Test!",
        text: "You must answer all questions before submitting!",
        confirmButtonColor: "#f39c12",
      });
      return;
    }

    if (timeLeft !== 0) {
      Swal.fire({
        icon: "question",
        title: "Are you sure?",
        text: "Once submitted, you cannot change your answers.",
        showCancelButton: true,
        confirmButtonText: "Yes, Submit",
        cancelButtonText: "No, Cancel",
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#dc3545",
      }).then((result) => {
        if (result.isConfirmed) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }

          if (latestUserRole === "GUEST") {
            setShowMobileNumberPopup(true);
          } else {
            setIsSubmitted(true);
            resultGenerationMutation.mutate(resultData);
          }
        }
      });
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      return;
    }

    const updateProgress = () => {
      const currentTimeLeft = timeLeftRef.current;
      const currentTestProgress = testProgressRef.current;

      if (
        currentTestProgress.questionId &&
        currentTestProgress.selectedOption
      ) {
        updateTestProgressMutation.mutate({
          ...currentTestProgress,
          testDuration: formatTime(currentTimeLeft),
        });
      }
    };

    progressIntervalRef.current = setInterval(updateProgress, 10000);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentQuestion, isSubmitted]);

  useEffect(() => {
    const handleOffline = () => {
      Swal.fire({
        icon: "error",
        title: "Network Issue!",
        text: "You have lost internet connection. Please check your network.",
        showCancelButton: true,
        confirmButtonText: "Retry",
        cancelButtonText: "Go to Home",
        confirmButtonColor: "#007bff",
        cancelButtonColor: "#dc3545",
      }).then((result) => {
        if (result.isConfirmed) {
          getIQTestDataMutation.mutate(iqTestDataPayload);
        } else {
          navigate("/");
        }
      });
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate]);

  return (
    <>
      <div className="flex flex-col w-full max-w-7xl mx-auto">
        {showMobileNumberPopup && (
          <MobileNumberPopup
            setShowMobileNumberPopup={setShowMobileNumberPopup}
            resultGenerationMutation={resultGenerationMutation}
            resultData={resultData}
            testID={newTestId}
            userId={userId}
          />
        )}
        {!isSubmitted && (
          <div className="w-full bg-gray-100 p-3 md:p-4 shadow-lg rounded-xl mb-4 flex flex-col sm:flex-row justify-between items-center">
            <TestClock
              testDuration={testDuration}
              handleSubmit={handleSubmit}
              title={title}
              setTimeLeft={setTimeLeft}
              timeLeft={timeLeft}
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row p-2 sm:p-4 bg-gray-100 gap-4">
          <div className="flex-1 w-full bg-white p-3 sm:p-6 rounded-lg shadow-md">
            <div className="h-auto min-h-[15vh] md:min-h-[20vh] w-full">
              <div className="bg-[#2C4167] text-white w-10 h-10 flex items-center justify-center text-xl font-bold rounded-sm">
                {currentQuestion + 1}
              </div>
              <div className="flex items-center w-full h-30 mb-4">
                <h2 className="text-lg sm:text-xl font-medium text-[#2C4167]">
                  {questions[currentQuestion].question}
                </h2>
                <div className="ml-auto text-sm text-gray-500">
                  <span className="inline-block w-2 h-2 bg-[#2C4167] rounded-full mr-2"></span>
                  {1} Marks
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {[
                OPTIONS_ENUMS.OPTION_A,
                OPTIONS_ENUMS.OPTION_B,
                OPTIONS_ENUMS.OPTION_C,
                OPTIONS_ENUMS.OPTION_D,
                OPTIONS_ENUMS.OPTION_E,
              ].map((letter) => {
                const optionValue =
                  questions[currentQuestion][`option${letter}`];
                if (!optionValue) return null;

                return (
                  <label
                    key={letter}
                    className="flex items-center p-2 rounded border border-gray-200 hover:border-[#2C4167] cursor-pointer text-sm sm:text-base transition-all duration-200"
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
              })}
            </div>

            <div className="flex justify-between mt-4 sm:mt-6">
              <button
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(0, prev - 1))
                }
                className="flex items-center bg-white border border-[#2C4167] text-[#2C4167] px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                <FaArrowLeft className="mr-1 sm:mr-2" /> Previous
              </button>

              {/* {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className={`flex items-center px-4 py-2 rounded transition-colors
      ${
        isProgressSaved
          ? "bg-[#F7941D] text-white hover:bg-[#E88C19]"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
                  disabled={!isProgressSaved}
                >
                  Save & Next <FaArrowRight className="ml-1 sm:ml-2" />
                </button>
              ) : (
                answers[currentQuestion] !== "" && (
                  <button
                    onClick={handleSubmit}
                    className={`flex items-center px-4 py-2 rounded transition-colors
        ${
          isProgressSaved
            ? "bg-[#F7941D] text-white hover:bg-[#E88C19]"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
                    disabled={!isProgressSaved}
                  >
                    Submit <FaCheckCircle className="ml-1 sm:ml-2" />
                  </button>
                )
              )} */}
              {currentQuestion < questions.length - 1 ? (
                answers[currentQuestion] === "" ? (
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-pointer hover:bg-gray-400 transition-colors"
                  >
                    Next <FaArrowRight className="ml-1 sm:ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Save & Next <FaArrowRight className="ml-1 sm:ml-2" />
                  </button>
                )
              ) : (
                answers[currentQuestion] !== "" && (
                  <button
                    onClick={handleSubmit}
                    className={`flex items-center px-4 py-2 rounded transition-colors
        ${isProgressSaved
                        ? "bg-[#F7941D] text-white hover:bg-[#E88C19]"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    disabled={!isProgressSaved}
                  >
                    Submit <FaCheckCircle className="ml-1 sm:ml-2" />
                  </button>
                )
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3 xl:w-1/4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Questions</h2>

            <div className="flex flex-wrap gap-2 py-2 overflow-y-auto">
              {questions.map((q, index) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-7 h-7 flex items-center justify-center transition-all duration-300 border-2
              ${currentQuestion === index
                      ? "bg-blue-500 text-white border-blue-900"
                      : answers[index]
                        ? "bg-cyan-800 text-white border-cyan-900"
                        : "bg-amber-400  text-black border-amber-600"
                    }
            `}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="text-base sm:text-lg font-bold text-[#2C4167] mb-4">
                Legend
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#2C4167] mr-3"></div>
                  <span className="text-gray-700">Attempted</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#3498DB] mr-3"></div>
                  <span className="text-gray-700">Current Question</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#E67E22] mr-3"></div>
                  <span className="text-gray-700">Unattempted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IQTest;
