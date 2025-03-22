import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTest, getTestResult } from "./Api";
import { FaBrain } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TestResult from "./TestResult"; // ✅ Import TestResult Component
import { testOption } from "../../Constant/constantData";
import IQTest from "./IQTest";
import ResultPopup from './ResultPopup';

function TestCard() {
  // const [selectedTest, setSelectedTest] = useState(null);
  const [completedTests, setCompletedTests] = useState(new Map());
  const [testLevel, setTestLevel] = useState("all");
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState(null);
  const [startTest, setStartTest] = useState(false);
  const [testDuration, setTestDuration] = useState(0);
  const [testName, setTestName] = useState("");
  const [testId, setTestId] = useState(null);
  const [testAttemed , setTestAttemed] = useState(false);
  const [showScore , setShowScore] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["getTest", testLevel],
    queryFn: () => getTest(testLevel),
  });

  useEffect(() => {
    if (data?.data) {
      const completedMap = new Map();
      data.data.forEach(async (test) => {
        if (test.attempted) {
          const result = await getTestResult(test._id);
          // const result = []
          completedMap.set(test._id, result?.data || {}); // ✅ Store full result data
        }
      });
      setCompletedTests(completedMap);
    }
  }, [data]);

  const handleTestStatus = () => {
    if (data?.data?.test?.attempted) {
    }
  };

  useEffect(() => {
    if (testAttemed) {
      setShowScore(true);
    }
  }, [testAttemed]);

    if (selectedTest) {
      return (
        <>
          {showScore && (
            <ResultPopup showScore={showScore} setShowScore={setShowScore} />
          )}
          <div className="p-4">
            {!startTest ? (
              <button
                onClick={() => {
                  setSelectedTest(null);
                  setStartTest(false);
                }}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                ⬅ Back to Tests
              </button>
            ) : null}
            {!startTest ? (
              <button
                onClick={() => setStartTest(true)}
                className="mb-4 ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Start Test
              </button>
            ) : (
              <IQTest
                questions={selectedTest}
                testDuration={testDuration}
                title={testName}
                testId={testId}
              />
            )}
          </div>
        </>
      );
    }

  return (
    <>
      <div className="p-4">
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            Select Test Level:
          </label>
          <select
            className="p-2 w-full border rounded-lg"
            value={testLevel}
            onChange={(e) => setTestLevel(e.target.value)}
          >
            {testOption.map((testType) => {
              return <option value={testType}>{testType}</option>;
            })}
          </select>
        </div>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((test, idx) => {
              const isCompleted = completedTests.has(test._id);
              const previousScore = completedTests.get(test._id);

              return (
                <>
                  <div
                    key={test._id}
                    className={`p-4 rounded-lg shadow-lg border cursor-pointer transition-all duration-300 ${
                      test?.attempted ? "bg-green-200" : "bg-white"
                    } ${false || idx === 0 ? "opacity-100" : "opacity-50"}`}
                    // onClick={() =>
                    //   setSelectedTest(selectedTest === test._id ? null : test._id)
                    // }
                    onClick={() => {
                      setSelectedTest(test.questions);
                      setTestDuration(test.testDuration);
                      setTestName(test.title);
                      setTestId(test._id);
                      setTestAttemed(test?.attempted);
                    }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <FaBrain className="text-blue-500 text-4xl" />
                      <h2 className="text-xl font-semibold">{test.title}</h2>
                    </div>
                    <p>
                      Test Level:{" "}
                      <span className="font-medium">
                        {test.testLevel || "N/A"}
                      </span>
                    </p>
                    <p>
                      Duration:{" "}
                      <span className="font-medium">
                        {test.testDuration || "N/A"} min
                      </span>
                    </p>
                    <p>
                      Total Marks:{" "}
                      <span className="font-medium">
                        {test.totalMarks || "N/A"}
                      </span>
                    </p>

                    {isCompleted && (
                      <p className="text-green-700 font-semibold mt-2">
                        ✅ Your Last Score: {previousScore.marksGained}/
                        {previousScore.totalMarks}
                      </p>
                    )}

                    {/* Show TestResult inside card when clicked */}
                    {selectedTest === test._id && isCompleted && (
                      <div className="mt-4 p-4 border-t">
                        <TestResult resultData={previousScore} />
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default TestCard;
