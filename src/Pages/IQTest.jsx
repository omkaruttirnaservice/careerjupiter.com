"use client"

import { useState, useEffect } from "react"
import { FcAlarmClock } from "react-icons/fc"
import { FaSave, FaArrowRight, FaArrowLeft, FaCheckCircle } from "react-icons/fa"

const IQTest = () => {
  // Sample questions
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
      answer: "William Shakespeare",
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean",
    },
    {
      id: 5,
      question: "Which country is famous for the Great Wall?",
      options: ["India", "China", "Japan", "South Korea"],
      answer: "China",
    },
    {
      id: 6,
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "NaCl"],
      answer: "H2O",
    },
    {
      id: 7,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
      answer: "Leonardo da Vinci",
    },
    {
      id: 8,
      question: "What is the smallest prime number?",
      options: ["1", "2", "3", "5"],
      answer: "2",
    },
    {
      id: 9,
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Carbon Dioxide",
    },
    {
      id: 10,
      question: "What is the currency of Japan?",
      options: ["Yuan", "Won", "Yen", "Ringgit"],
      answer: "Yen",
    },
    {
      id: 11,
      question: "Which animal is known as the 'King of the Jungle'?",
      options: ["Elephant", "Lion", "Tiger", "Giraffe"],
      answer: "Lion",
    },
    {
      id: 12,
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
      answer: "Blue Whale",
    }

  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(""))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Handle option selection
  const handleOptionSelect = (option) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = option
    setAnswers(newAnswers)
  }

  // Navigate to the next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  // Navigate to the previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Save progress
  const handleSave = () => {
    alert("Progress saved!")
  }

  // Submit the test and calculate score
  const handleSubmit = () => {
    let calculatedScore = 0
    answers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        calculatedScore += 1
      }
    })
    setScore(calculatedScore)
    setIsSubmitted(true)
    console.log("User Score:", calculatedScore)
  }

  // Jump to a specific question
  const handleQuestionNavigation = (index) => {
    setCurrentQuestion(index)
  }

  return (
    <>

      {/* Top section with title and timer */}
      {!isSubmitted && (
        <div className="w-full bg-gray-100 p-4 shadow-lg rounded-xl mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">IQ Test</h1>
          <div className="w-1/2 bg-gray-300 rounded-full h-4">
            <div className="bg-blue-500 h-4 rounded-full"></div>
          </div>
          <p className="text-lg flex flex-row items-center font-semibold">
            <FcAlarmClock className="text-xl mr-2 font-bold" /> {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </p>
        </div>
      )}

      <div className="flex flex-col md:flex-row  p-4 bg-gray-100">
        {/* Main question panel */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4">
          {!isSubmitted ? (
            <>
              <h2 className="text-xl font-bold mb-4">Question {currentQuestion + 1}</h2>
              <p className="mb-4">{questions[currentQuestion].question}</p>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center p-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  >
                    <span className="mr-2">{index + 1}.</span>
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={() => handleOptionSelect(option)}
                      className="mr-2"
                    />

                    {option}
                  </label>
                ))}
              </div>


              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className=" cursor-pointer flex items-center bg-blue-500 text-white p-2 rounded "
                >
                  <FaArrowLeft className="mr-2" /> Previous
                </button>

                <button className=" cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition duration-300">
                  Save
                </button>


                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="cursor-pointer flex items-center bg-blue-500 p-2 rounded text-white"
                  >
                    Next <FaArrowRight className="ml-2" />
                  </button>

                ) : answers[currentQuestion] !== "" ? ( // Show submit if last question has an answer
                  <button
                    onClick={handleSubmit}
                    className="cursor-pointer flex items-center bg-green-500 p-2 rounded text-white"
                  >
                    Submit <FaCheckCircle className="ml-2" />
                  </button>

                ) : null}
              </div>

            </>
          ) : (
            <div className="text-center space-y-6 w-full max-w-4xl mx-auto p-4 sm:p-6">
              <h2 className="text-3xl font-bold mb-6">Test Results</h2>

              {/* Grid for score details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">Total Questions</h3>
                  <p className="text-3xl font-bold text-blue-600">{questions.length}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">Wrong Answers</h3>
                  <p className="text-3xl font-bold text-red-600">{questions.length - score}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">Correct Answers</h3>
                  <p className="text-3xl font-bold text-green-600">{score}</p>
                </div>
              </div>

              {/* Final result box */}
              <div className="bg-purple-100 p-6 rounded-lg shadow mt-6">
                <h3 className="text-2xl font-semibold mb-2">Final Result</h3>
                <p className="text-4xl font-bold text-purple-600">
                  {Math.round((score / questions.length) * 100)}%
                </p>
                <p className="mt-2 text-lg">
                  You answered {score} out of {questions.length} questions correctly.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar for question navigation */}
        {!isSubmitted && (
          <div className="w-full md:w-1/4 h-[60vh]   bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4  ">Questions</h2>
            <div className="grid grid-cols-4 h-[80%] overflow-auto gap-2 py-1.5">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionNavigation(index)}
                  className={`p-2 rounded-full w-10 h-10 flex items-center justify-center ${currentQuestion === index
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
  )
}

export default IQTest