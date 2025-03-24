import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTest } from "./Api";
import { FaBrain } from "react-icons/fa";
import Swal from "sweetalert2";
import { testOption } from "../../Constant/constantData";
import IQTest from "./IQTest";

function TestCard() {
  const [testLevel, setTestLevel] = useState("all");
  const [selectedTest, setSelectedTest] = useState(null);
  const [testDuration, setTestDuration] = useState(0);
  const [testName, setTestName] = useState("");
  const [testId, setTestId] = useState(null);
  const [startTest, setStartTest] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["getTest", testLevel],
    queryFn: () => getTest(testLevel),
  });

  const handleTestSelection = (test) => {
    if (test.attempted) {
      // If test is already completed, show completed message
      Swal.fire({
        title: "Test Completed!",
        text: "You have already completed this test.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      // If test is not completed, ask to start
      Swal.fire({
        title: `Start ${test.title}?`,
        text: "Are you ready to begin the test?",
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
          setStartTest(true); // Test will start after clicking "Start Test"
        }
      });
    }
  };

  if (startTest && selectedTest) {
    return (
      <IQTest
        questions={selectedTest}
        testDuration={testDuration}
        title={testName}
        testId={testId}
      />
    );
  }

  return (
    <div className="p-4">
        <div className="mb-4 flex items-center">
          <label className="text-lg font-medium mr-4 whitespace-nowrap">
            Test Level:
          </label>
          <select
            className="p-2 w-98 border rounded-lg"
            value={testLevel}
            onChange={(e) => setTestLevel(e.target.value)}
          >
            {testOption.map((testType, index) => (
              <option key={index} value={testType}>
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
              className={`p-4 rounded-lg shadow-lg border cursor-pointer transition-all duration-300 ${
                test.attempted ? "bg-green-200" : "bg-white"
              }`}
              onClick={() => handleTestSelection(test)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <FaBrain className="text-blue-500 text-4xl" />
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TestCard;
