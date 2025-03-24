import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTest } from "./Api";
import { FaBrain } from "react-icons/fa";
import IQTest from "./IQTest";
import { setTestResult } from "../../store-redux/testResultSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2"; // ✅ Import SweetAlert

function TestCard() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [startTest, setStartTest] = useState(false);
  const [testDuration, setTestDuration] = useState(0);
  const [testName, setTestName] = useState("");
  const [testId, setTestId] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState("All");
  const dispatch = useDispatch();

  const currentEducation = useSelector(
    (state) => state.education.currentEducation
  );

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getTest", currentEducation],
    queryFn: () => getTest(currentEducation),
  });

  if (isPending) return <div className="text-center text-lg">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  const filteredTests =
    selectedEducation === "All"
      ? data?.data
      : data?.data?.filter((test) => test.educationType === selectedEducation);

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
          />
        )}
      </div>
    );
  }

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

      {/* Grid for test cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests?.map((test) => (
          <div
            key={test._id}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition duration-300 cursor-pointer"
            onClick={() => {
              setSelectedTest(test.questions);
              setTestDuration(test.testDuration);
              setTestName(test.title);
              setTestId(test._id);
            }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaBrain className="text-blue-500 text-3xl" />
              <h2 className="text-xl font-semibold text-gray-800">
                {test.title}
              </h2>
            </div>
            <p className="text-gray-600">
              Test Level:{" "}
              <span className="font-medium">{test.testLevel || "N/A"}</span>
            </p>
            <p className="text-gray-600">
              Duration:{" "}
              <span className="font-medium">
                {test.testDuration || "N/A"} min
              </span>
            </p>
            <p className="text-gray-600">
              Total Marks:{" "}
              <span className="font-medium">{test.totalMarks || "N/A"}</span>
            </p>
            <p className="text-gray-600">
              Passing Marks:{" "}
              <span className="font-medium">{test.passingMarks || "N/A"}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestCard;
