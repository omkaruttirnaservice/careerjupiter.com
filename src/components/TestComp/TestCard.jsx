import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTest } from "./Api";
import { FaBrain } from "react-icons/fa";
import IQTest from "./IQTest";
import { setTestResult } from "../../store-redux/testResultSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { BounceLoader } from "react-spinners"; // Import BounceLoader

function TestCard() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [startTest, setStartTest] = useState(false);
  const [testDuration, setTestDuration] = useState(0);
  const [testName, setTestName] = useState("");
  const [testId, setTestId] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState("All");
  const [completedTests, setCompletedTests] = useState(new Map()); // Stores completed test results
  const dispatch = useDispatch();

  // Fetch tests from API
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getTest", selectedEducation],
    queryFn: () => getTest(selectedEducation === "All" ? "" : selectedEducation),
  });

  const filteredTests = data?.data;

  // If a test is selected, show the test screen
  if (selectedTest) {
    return (
      <div className="p-4">
        {!startTest ? (
          <button
            onClick={() => {
              setSelectedTest(null);
              setStartTest(false);
            }}
            className="mb-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            ⬅ Back to Tests
          </button>
        ) : null}

        {!startTest ? (
          <button
            onClick={() => {
              Swal.fire({
                icon: "question",
                title: "Are you sure?",
                text: "Do you really want to start the test?",
                showCancelButton: true,
                confirmButtonText: "Yes, Start Test!",
                cancelButtonText: "No, Not Now",
                confirmButtonColor: "#28a745",
                cancelButtonColor: "#dc3545",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    icon: "success",
                    title: "Test Started!",
                    text: "Your test has started! Click OK to begin.\n\n✨ Best of luck! ✨",
                    confirmButtonText: "OK, Let's Go!",
                    confirmButtonColor: "#007bff",
                  }).then(() => {
                    setStartTest(true);
                    dispatch(setTestResult([]));
                  });
                }
              });
            }}
            className="mb-4 ml-4 cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start Test
          </button>
        ) : (
          <IQTest
            questions={selectedTest}
            testDuration={testDuration}
            title={testName}
            testId={testId}
            onComplete={(result) => {
              setCompletedTests((prev) => {
                const newMap = new Map(prev);
                newMap.set(testId, result); // Save test result
                return newMap;
              });
            }}
          />
        )}
      </div>
    );
  }

  // Main test selection screen
  return (
    <div className="p-4">
      {/* Dropdown for selecting education type */}
      <div className="mb-6">
        <label
          htmlFor="educationType"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Filter by Education Type:
        </label>
        <select
          id="educationType"
          value={selectedEducation}
          onChange={(e) => setSelectedEducation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="All">All</option>
          <option value="HSC">HSC</option>
          <option value="SSC">SSC</option>
          <option value="Diploma">Diploma</option>
        </select>
      </div>

      {/* Loader below filter while fetching data */}
      {isPending && (
  <div className="flex flex-col justify-center items-center my-6">
    <BounceLoader color="#36d7b7" size={60} />
    <span className=" text-gray-600 text-lg font-semibold">Loading...</span>
  </div>
)}


      {/* Show error if fetching fails */}
      {isError && (
        <div className="text-center text-red-500">
          Error: {error.message}
        </div>
      )}

      {/* Grid for test cards */}
      {!isPending && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests?.map((test) => {
            const isCompleted = completedTests.has(test._id);
            const result = completedTests.get(test._id); // Get result if completed

            return (
              <div
                key={test._id}
                className={`shadow-lg rounded-2xl p-6 border border-gray-200 transition duration-300 cursor-pointer 
                  ${isCompleted ? 'bg-green-500 text-white' : 'bg-white hover:shadow-xl'}`}
                onClick={() => {
                  if (isCompleted) {
                    Swal.fire({
                      icon: "info",
                      title: "Test Already Taken",
                      text: `You have already completed this test.\n\n🎯 Score: ${result?.score || "N/A"} / ${test.totalMarks}`,
                      confirmButtonText: "OK",
                    });
                    return;
                  }
                  setSelectedTest(test.questions);
                  setTestDuration(test.testDuration);
                  setTestName(test.title);
                  setTestId(test._id);
                }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <FaBrain className="text-blue-500 text-3xl" />
                  <h2 className="text-xl font-semibold">{test.title}</h2>
                </div>
                <p>
                  Test Level: <span className="font-medium">{test.testLevel || "N/A"}</span>
                </p>
                <p>
                  Duration: <span className="font-medium">{test.testDuration || "N/A"} min</span>
                </p>
                <p>
                  Total Marks: <span className="font-medium">{test.totalMarks || "N/A"}</span>
                </p>
                <p>
                  Passing Marks: <span className="font-medium">{test.passingMarks || "N/A"}</span>
                </p>
                {isCompleted && (
                  <p className="font-bold text-white mt-2">
                    🎯 Your Score: {result?.score || "N/A"} / {test.totalMarks}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TestCard;
