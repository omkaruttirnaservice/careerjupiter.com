"use client";
import { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OPTIONS_ENUMS } from "../../utils/constansts";
import TestClock from "./TestClock";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDetail, sendResult } from "./Api";
import { setTestResult } from "../../store-redux/testResultSlice";
import MobileNumberPopup from "./MobileNumberPopup";
import { setIqTestId } from "../../store-redux/iqTestSlice";

const IQTest = ({ questions, testDuration, title, testId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMobileNumberPopup, setShowMobileNumberPopup] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [timeLeft, setTimeLeft] = useState(testDuration * 60);

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
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#dc3545",
      });
    },
  });

  const [resultData, setResultData] = useState({
    iqTestId: testId,
    userId: userId,
    answers: questions.map((q) => ({ questionId: q._id, selectedOption: "" })),
  });

  dispatch(setIqTestId(testId));

  useEffect(() => {
    setResultData({
      iqTestId: testId,
      userId: userId,
      answers: questions.map((q) => ({
        questionId: q._id,
        selectedOption: "",
      })),
    });
  }, [questions, testId, userId]);

  const handleOptionSelect = (letter) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = letter;
    setAnswers(newAnswers);

    setResultData((prevData) => {
      const updatedAnswers = prevData.answers.map((ans) =>
        ans.questionId === questions[currentQuestion]._id
          ? { ...ans, selectedOption: letter }
          : ans
      );
      return { ...prevData, answers: updatedAnswers };
    });
  };

  //get user details api call

  const { data, isPending, refetch } = useQuery({
    queryKey: ["getUserDetail", userId],
    queryFn: () => getUserDetail(userId),
    enabled: false,
    refetchOnMount: false,
  });

  // useEffect(() => {
  //   const mobileNumber = data?.data?.data?.mobile_no;
  //   console.log({ mobileNumber });

  // step 2 : check user present or not
  //   if (data?.data) {
  //     if (mobileNumber === "0000000000") {
  //       setShowMobileNumberPopup(true);
  //     } else {

  //       resultGenerationMutation.mutate(resultData);
  //       setShowMobileNumberPopup(false);
  //       // generate result mutation
  //     }
  //   }
  // }, [data]);

  const handleSubmit = () => {
    const allAnswered = answers.every((ans) => ans !== "");

    if (timeLeft===0) {
      setShowMobileNumberPopup(true);
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

    //step 1 : get user details

    if(timeLeft !== 0){
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
          // refetch();
          setShowMobileNumberPopup(true);
        }
      });
    }
  };

  return (
    <>
      <div className="flex flex-col w-full max-w-7xl mx-auto">
        {showMobileNumberPopup && (
          <MobileNumberPopup
            setShowMobileNumberPopup={setShowMobileNumberPopup}
            resultGenerationMutation={resultGenerationMutation}
            resultData={resultData}
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
            <div className="h-[15vh] md:h-[20vh] w-full">
              <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
                Question {currentQuestion + 1}
              </h2>
              <p className="mb-2 sm:mb-4">
                {questions[currentQuestion].question}
              </p>
            </div>

            <div className="space-y-2">
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
                    className="flex items-center p-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer text-sm sm:text-base"
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
                className="cursor-pointer flex items-center bg-blue-500 text-white p-1.5 sm:p-2 rounded text-sm sm:text-base"
              >
                <FaArrowLeft className="mr-1 sm:mr-2" /> Previous
              </button>

              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestion((prev) => prev + 1)}
                  className="cursor-pointer flex items-center bg-blue-500 p-1.5 sm:p-2 rounded text-white text-sm sm:text-base"
                >
                  Next <FaArrowRight className="ml-1 sm:ml-2" />
                </button>
              ) : (
                answers[currentQuestion] !== "" && (
                  <button
                    onClick={handleSubmit}
                    className="cursor-pointer flex items-center bg-green-500 p-1.5 sm:p-2 rounded text-white text-sm sm:text-base"
                  >
                    Submit <FaCheckCircle className="ml-1 sm:ml-2" />
                  </button>
                )
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3 xl:w-1/4 bg-white p-3 sm:p-4 rounded-lg shadow-md mt-4 lg:mt-0">
            <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4">
              Questions
            </h2>
            <div className="grid grid-cols-4  sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-4 gap-1 sm:gap-2 py-2 h-[40vh] lg:h-[60vh] overflow-y-auto">
              {questions.map((q, index) => (
                <button
                  key={q._id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`rounded-full ml-4 md:ml-1 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300 cursor-pointer text-xs sm:text-sm ${
                    currentQuestion === index
                      ? "bg-blue-500 text-white ring-2 ring-offset-2 ring-blue-700"
                      : answers[index]
                        ? "bg-green-500 text-white"
                        : "bg-red-600 text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IQTest;

