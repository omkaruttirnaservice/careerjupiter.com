import React from 'react'
import {  FaUserGraduate } from "react-icons/fa";

const EntranceExam = () => {
    const questions = [
        "Who is the current President of the USA?",
        "What is the capital of France?",
        "Who wrote 'Hamlet'?",
        "What is the square root of 144?",
        "Which planet is known as the Red Planet?"
    ];
  return (
    <div>
      <section className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-200 hover:scale-101">
                                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                      <FaUserGraduate className="text-blue-600" /> Entrance Test
                                  </h2>
                                  <form>
                                      {questions.map((question, index) => (
                                          <div key={index} className="mb-4">
                                              <p className="font-medium text-gray-700">
                                                  {index + 1}. {question}
                                              </p>
                                              <input
                                                  type="text"
                                                  className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                  placeholder="Your Answer"
                                              />
                                          </div>
                                      ))}
                                      <button
                                          type="submit"
                                          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                      >
                                          Submit
                                      </button>
                                  </form>
                              </section>
    </div>
  )
}

export default EntranceExam
