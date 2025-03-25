import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTest } from "./Api";
import { FaBrain } from "react-icons/fa";
import Swal from "sweetalert2";
import TestResult from "./TestResult";
import { testOption } from "../../Constant/constantData";
import IQTest from "./IQTest";

function TestCard() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [testDuration, setTestDuration] = useState(0);
  const [testName, setTestName] = useState("");
  const [testId, setTestId] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [getResult, setGetResult] = useState({});
  const [testLevel, setTestLevel] = useState("all");

  const { data, isPending, refetch } = useQuery({
    queryKey: ["getTest", testLevel],
    queryFn: () => getTest(testLevel),
    staleTime: 0,
  });

  useEffect(() => {
    refetch();
  }, [testLevel, refetch]);

  const anyTestAttempted = data?.data?.some((test) => test?.attempted);

  const handleTestClick = (test) => {
    const isFirstTest = data?.data?.indexOf(test) === 0;
    const isUnlocked = anyTestAttempted || isFirstTest;

    if (!isUnlocked) {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Please complete the first basic test before attempting other tests.",
      });
      return;
    }

    Swal.fire({
      title: `Start ${test.title}?`,
      text: `Duration: ${test.testDuration} min | Total Marks: ${test.totalMarks}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Start Test",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedTest(test.questions);
        setTestDuration(test.testDuration);
        setTestName(test.title);
        setTestId(test._id);
        setShowResult(test?.attempted);
        setGetResult(test?.result);
      }
    });
  };

  if (selectedTest) {
    return (
      <IQTest
        questions={selectedTest}
        testDuration={testDuration}
        title={testName}
        testId={testId}
      />
    );
  }

  if (showResult) {
    return <TestResult getResult={getResult} />;
  }

  return (
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
          {testOption.map((testType) => (
            <option key={testType} value={testType}>
              {testType}
            </option>
          ))}
        </select>
      </div>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((test) => (
            <div
              key={test._id}
              className={`relative p-4 rounded-lg shadow-lg border cursor-pointer transition-all duration-300 
                ${anyTestAttempted || test === data?.data[0] ? "opacity-100" : "opacity-40"} 
                ${test?.attempted ? "shadow-green-500 shadow-md" : "bg-white shadow-lg"}`}
              onClick={() => handleTestClick(test)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <FaBrain className="text-blue-500 text-4xl" />
                <h2 className="text-xl font-semibold">{test.title}</h2>
              </div>
              <p>
                Test Level:{" "}
                <span className="font-medium">{test.testLevel || "N/A"}</span>
              </p>
              <p>
                Duration:{" "}
                <span className="font-medium">
                  {test.testDuration || "N/A"} min
                </span>
              </p>
              <p>
                Total Marks:{" "}
                <span className="font-medium">{test.totalMarks || "N/A"}</span>
              </p>

              {test?.attempted && (
                <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                  ✅ Completed
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TestCard;
