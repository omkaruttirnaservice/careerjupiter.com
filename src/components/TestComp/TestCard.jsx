import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTest } from "./Api";
import { FaBrain } from "react-icons/fa";
import IQTest from "./IQTest";

function TestCard() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [startTest, setStartTest] = useState(false);
  const [testDuration, setTestDuration] = useState(0);
  const [testName, setTestName] = useState("");
  const type = "10th";

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getTest", type],
    queryFn: () => getTest(type),
  });

  console.log("title", data?.data?.title);

  if (isPending) return <div className="text-center text-lg">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  if (selectedTest) {
    return (
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
          />
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data?.data?.map((test) => (
        <div
          key={test._id}
          className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition duration-300 cursor-pointer"
          onClick={() => {
            setSelectedTest(test.questions);
            setTestDuration(test.testDuration);
            setTestName(test.title);
          }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FaBrain className="text-blue-500 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">
              {test.title}
            </h2>
          </div>
          <p className="text-gray-600">
            Test Level: <span className="font-medium">{test.testLevel}</span>
          </p>
          <p className="text-gray-600">
            Duration:{" "}
            <span className="font-medium">{test.testDuration} min</span>
          </p>
          <p className="text-gray-600">
            Total Marks: <span className="font-medium">{test.totalMarks}</span>
          </p>
          <p className="text-gray-600">
            Passing Marks:{" "}
            <span className="font-medium">{test.passingMarks}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default TestCard;
