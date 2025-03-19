import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTest, getTestResult } from "./Api";
import { FaBrain } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TestResult from "./TestResult"; // ✅ Import TestResult Component

function TestCard() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [completedTests, setCompletedTests] = useState(new Map());
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["getTest"],
    queryFn: getTest,
  });

  useEffect(() => {
    if (data?.data) {
      const completedMap = new Map();
      data.data.forEach(async (test) => {
        if (test.attempted) {
          const result = await getTestResult(test._id);
          completedMap.set(test._id, result?.data || {}); // ✅ Store full result data
        }
      });
      setCompletedTests(completedMap);
    }
  }, [data]);

  return (
    <div className="p-4">
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((test) => {
            const isCompleted = completedTests.has(test._id);
            const previousScore = completedTests.get(test._id);

            return (
              <div
                key={test._id}
                className={`p-4 rounded-lg shadow-lg border cursor-pointer ${
                  isCompleted ? "bg-green-100" : "bg-white hover:shadow-xl"
                }`}
                onClick={() => setSelectedTest(selectedTest === test._id ? null : test._id)}
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
                
                {isCompleted && (
                  <p className="text-green-700 font-semibold mt-2">
                    ✅ Your Last Score: {previousScore.marksGained}/{previousScore.totalMarks}
                  </p>
                )}

                {/* Show TestResult inside card when clicked */}
                {selectedTest === test._id && isCompleted && (
                  <div className="mt-4 p-4 border-t">
                    <TestResult resultData={previousScore} />
                  </div>
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
