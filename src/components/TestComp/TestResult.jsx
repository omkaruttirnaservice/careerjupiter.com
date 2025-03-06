import React from 'react'

function TestResult() {
  return (
    <>
      <div className="text-center space-y-6 w-full max-w-4xl mx-auto p-4 sm:p-6">
        <h2 className="text-3xl font-bold mb-6">Test Results</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Total Questions</h3>
            <p className="text-3xl font-bold text-blue-600">
              30
            </p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Wrong Answers</h3>
            <p className="text-3xl font-bold text-red-600">
              5
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Correct Answers</h3>
            <p className="text-3xl font-bold text-green-600">50</p>
          </div>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow mt-6">
          <h3 className="text-2xl font-semibold mb-2">Final Result</h3>
          <p className="text-4xl font-bold text-purple-600">
            100
          </p>
          <p className="mt-2 text-lg">
            You answered 50 out of 100 questions correctly.
          </p>
        </div>
      </div>
    </>
  );
}

export default TestResult;