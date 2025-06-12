
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getResult, getIQTestData, deleteTest } from "./Api";
import { FaBrain } from "react-icons/fa";
import Swal from "sweetalert2";
import IQTest from "./IQTest";
import { useDispatch, useSelector } from "react-redux";
import { setTestResult } from "../../store-redux/testResultSlice";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingTestCard from "../loading-skeleton/LoadingTestCard";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setResultsId } from "../../store-redux/resultSlice";
import { BASE_URL } from "../../utils/constansts";
import axios from "axios";
import { getAuthHeader } from "../../utils/mics";
import { toast } from "react-toastify";

function RoadmapTestCard() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [testDuration, setTestDuration] = useState(0);
  const [testName, setTestName] = useState("");
  const [testId, setTestId] = useState(null);
  const [resultId, setResultId] = useState();
  const [iqTestDataPayload, setIqTestDataPayload] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);
  const [newTestId, setNewTestId] = useState(null);
  const [submitTest, setSubmitTest] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [roadmapName, setRoadmapName] = useState("");
  const [loadingIQTest, setLoadingIQTest] = useState(false);

  // Get roadmap ID from URL
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const roadmapId = query.get("roadmap");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && typeof token === "string") {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (err) {
        console.error("Token decode error:", err);
        toast.error("No user found.. Please login again.");
      }
    } else {
      toast.error("No user found. Please login.");
    }
  }, []);

  // Fetch roadmap tests
  const {
    data: roadmapTestsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["roadmapTests", roadmapId],
    queryFn: async () => {
      console.log("🚀 Fetching roadmap tests for ID:", roadmapId);
      const response = await axios.get(
        `${BASE_URL}/api/search/iQtest?roadmap=${roadmapId}`,
        {
          headers: {
            Authorization: getAuthHeader(),
          },
        }
      );
      console.log("📦 Roadmap API Response:", response.data);
      return response.data;
    },
    enabled: !!roadmapId,
    retry: 1,
  });

  // Extract tests from the response
  const iqtests = roadmapTestsData?.data?.results || [];

  // Set roadmap name when data is loaded
  useEffect(() => {
    if (roadmapTestsData?.data?.roadmapName) {
      setRoadmapName(roadmapTestsData.data.roadmapName);
    }
  }, [roadmapTestsData]);

  // IQ Test Data Mutation - This is the key mutation that starts the test
  const getIQTestDataMutation = useMutation({
    mutationFn: getIQTestData,
    onSuccess: (response) => {
      console.log("✅ IQ Test Data fetched successfully:", response);
      setNewTestId(response?.data?.testID);
      setSelectedTest(response?.data?.questions);
      setTestDuration(response?.data?.testDuration);
      setTestName(response?.data?.title);
      setResultId(response?.data?.iqTestId);
      dispatch(setResultsId(response?.data?.resultId));
      setLoadingIQTest(false);
    },
    onError: (error) => {
      console.error("❌ Error fetching IQ Test Data:", error);
      setLoadingIQTest(false);
      Swal.fire({
        icon: "error",
        title: "Failed to Start Test!",
        text: "Unable to load test data. Please try again.",
        confirmButtonColor: "#dc3545",
      });
    },
  });

  // Result fetching mutation
  const { mutate: fetchResult, data: resultData } = useMutation({
    mutationFn: ({ testID, userId }) => getResult({ testID, userId }),
    onSuccess: (response) => {
      console.log("✅ Result fetched successfully:", response);
    },
    onError: (error) => {
      console.error("❌ Error fetching result:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Load Result!",
        text: "Unable to load test result. Please try again.",
        confirmButtonColor: "#dc3545",
      });
    },
  });

  useEffect(() => {
    if (resultData?.data) {
      dispatch(setTestResult(resultData.data));
      navigate("/profile/test/?type=result");
    }
  }, [resultData?.data, dispatch, navigate]);

  // Delete test mutation for re-testing
  const deleteTestMutation = useMutation({
    mutationFn: deleteTest,
    onSuccess: () => {
      console.log("✅ Test reset successfully");
      Swal.fire({
        icon: "success",
        title: "Test Reset!",
        text: "You can now re-attempt the test.",
        confirmButtonColor: "#28a745",
      });
    },
    onError: (error) => {
      console.error("❌ Error resetting test:", error);
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong while resetting the test.",
      });
    },
  });

  // Helper function to start test after instructions
    // const showInstructionAndStart = (test) => {
    //   console.log("🎯 Starting test with ID:", test._id)
    //   const newIqTestDataPayload = { testID: test._id, userId }
    //   setIqTestDataPayload(newIqTestDataPayload)
    //   setTestId(test._id)
    //   setLoadingIQTest(true)
    //   getIQTestDataMutation.mutate(newIqTestDataPayload)
    // }
     const showInstructionAndStart = (test) => {
    const newIqTestDataPayload = { testID: test._id, userId };
    setIqTestDataPayload(newIqTestDataPayload);
    getIQTestDataMutation.mutate(newIqTestDataPayload);
    setTestId(test._id);
  };

  // const showInstructionAndStart = (test) => {
  //   console.log("Attempting to start test:", test._id);

  //   const payload = {
  //     testID: test._id,
  //     userId: userId, // Ensure userId exists
  //   };

  //   // Reset states first
  //   setSelectedTest(null);
  //   setTestId(null);

  //   // Start loading
  //   setLoadingIQTest(true);

  //   getIQTestDataMutation.mutate(payload, {
  //     onSuccess: (response) => {
  //       console.log("Test data loaded:", response);
  //       if (!response?.data?.questions) {
  //         throw new Error("No questions in response");
  //       }

  //       // Update all states together
  //       setSelectedTest(response.data.questions);
  //       setTestDuration(response.data.testDuration);
  //       setTestName(response.data.title);
  //       setTestId(test._id);
  //       setResultId(response.data.iqTestId);
  //       dispatch(setResultsId(response.data.resultId));

  //       setLoadingIQTest(false);
  //     },
  //     onError: (error) => {
  //       console.error("Failed to load test:", error);
  //       setLoadingIQTest(false);
  //       Swal.fire("Error", "Failed to load test questions", "error");
  //     },
  //   });
  // };

  // Handle test deletion and restart
   const handleDeleteTest = (test) => {
    setTestId(test._id);
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: `You are about to re-attempt "${test.title}"`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Re-Test!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTestMutation.mutate(
          { testID: test._id, userId },
          {
            onSuccess: () => {
              showInstructionAndStart(test);
            },
          }
        );
      }
    });
  };

  // Handle result viewing
  const handleResult = async (test) => {
    if (test.attempted === 1) {
      setTestId(test._id);
      await fetchResult({ testID: test._id, userId });
      return;
    }
  };

  // Main test click handler - This is the most important function
  const handleTestClick = async (test) => {
    console.log("1. Click handler triggered for test:", test._id);

    // Immediate feedback in UI
    setLoadingIQTest(true);

    try {
      console.log("2. Showing instructions popup");
      const result = await Swal.fire({
        title: `Start ${test.title}?`,
        html: `...`, // Your existing popup HTML
        showCancelButton: true,
        allowOutsideClick: false,
        preConfirm: () => {
          const checked = document.getElementById("agreeTerms")?.checked;
          if (!checked) {
            Swal.showValidationMessage("Please confirm the instructions");
            return false;
          }
          return true;
        },
      });

      console.log("3. Popup result:", result);

      if (result.isConfirmed) {
        console.log("4. Starting test...");
        await startTestExecution(test);
      }
    } catch (error) {
      console.error("Popup error:", error);
    } finally {
      setLoadingIQTest(false);
    }
  };

  const startTestExecution = async (test) => {
    console.log("5. Making API call for test:", test._id);
    try {
      const payload = { testID: test._id, userId };
      const response = await axios.post(
        `${BASE_URL}/api/iqtest/start`,
        payload
      );

      console.log("6. API response:", response.data);

      if (response.data?.questions) {
        setSelectedTest(response.data.questions);
        setTestId(test._id);
        // Force re-render
        forceUpdate();
      } else {
        throw new Error("Invalid test data");
      }
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire("Error", "Failed to start test", "error");
    }
  };
  // If test is selected and loaded, show IQTest component
  if (selectedTest && !loadingIQTest) {
    console.log(
      "🎮 Rendering IQTest component with questions:",
      selectedTest.length
    );
    return (
      <IQTest
        questions={selectedTest}
        testDuration={testDuration}
        title={testName}
        testId={testId}
        resultId={resultId}
        getIQTestDataMutation={getIQTestDataMutation}
        iqTestDataPayload={iqTestDataPayload}
        newTestId={newTestId}
        setSubmitTest={setSubmitTest}
        setResultsData={setResultsData}
      />
    );
  }

  // Show loading state when starting test
  if (loadingIQTest) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading test...</p>
          <p className="text-sm text-gray-500">
            Please wait while we prepare your test
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Roadmap Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          🎯 IQ Tests for  {roadmapName || "Roadmap"}
        </h1>
        <p className="text-gray-600 mt-1">
          Complete these tests to progress in your learning journey
        </p>
        <div className="mt-2 text-sm text-blue-600">
          {/* Roadmap ID: <span className="font-mono">{roadmapId}</span> */}
        </div>
      </div>

      {/* Loading, Error, and Content States */}
      {isLoading ? (
        <LoadingTestCard />
      ) : isError ? (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          ❌ Error loading roadmap tests:{" "}
          {error?.message || "Please try again later."}
        </div>
      ) : iqtests.length === 0 ? (
        <div className="p-4 bg-yellow-100 text-yellow-700 rounded-md">
          ⚠️ No tests available for this roadmap.
        </div>
      ) : (
        <>
          {/* Test Count Info */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800">
              📊 Found <strong>{iqtests.length}</strong> test
              {iqtests.length !== 1 ? "s" : ""} for this roadmap
            </p>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {iqtests?.map((test) => {
              const isAccessible =
                (userRole === "GUEST" && test.userType === "0") ||
                (userRole === "USER" &&
                  (test.userType === "0" || test.userType === "1"));

              return (
                <div
                  key={test._id}
                  className={`relative p-4 rounded-lg shadow-lg border cursor-pointer transition-all duration-300 hover:shadow-xl
                    ${isAccessible ? "opacity-100" : "opacity-40"}
                    ${test?.attempted === 1 ? "shadow-green-500 shadow-md bg-green-50" : "bg-white shadow-lg"}
                    ${test?.attempted === -1 ? "shadow-yellow-500 shadow-md bg-yellow-50" : "bg-white shadow-lg"}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Only if needed
                    console.log("Card clicked - Test ID:", test._id); // Debug log
                    handleTestClick(test);
                  }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <FaBrain className="text-blue-500 text-4xl" />
                    <h2 className="text-xl font-semibold">
                      {test.title || "N/A"}
                    </h2>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      Main Category:{" "}
                      <span className="font-medium">
                        {test.main_category || "N/A"}
                      </span>
                    </p>
                    <p>
                      Sub Category:{" "}
                      <span className="font-medium">
                        {test.sub_category || "N/A"}
                      </span>
                    </p>
                    <p>
                      Duration:{" "}
                      <span className="font-medium">
                        {test?.testDuration?.minutes || "N/A"} min
                      </span>
                    </p>
                    <p>
                      Total Marks:--{" "}
                      <span className="font-medium">
                        {test.totalMarks || "N/A"}
                      </span>
                    </p>
                    <p>
                      Questions:{" "}
                      <span className="font-medium">
                        {test.totalQuestions || "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* Test Status Indicators */}
                  {test?.attempted === 1 && (
                    <div className="flex gap-1 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResult(test);
                        }}
                        className="absolute bottom-2 right-18 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow hover:bg-green-700 transition-colors"
                      >
                        View Result
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTest(test);
                        }}
                        className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow hover:bg-blue-700 transition-colors"
                      >
                        Re-Test
                      </button>
                    </div>
                  )}

                  {test?.attempted === -1 && (
                    <button className="absolute bottom-2 right-2 bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow hover:bg-yellow-700 transition-colors">
                      Resume
                    </button>
                  )}

                  {(test?.attempted === 0 || test?.attempted === undefined) && (
                    <button className="absolute bottom-2 right-2 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow hover:bg-gray-700 transition-colors">
                      Start Test
                    </button>
                  )}

                  {/* Access Level Indicator */}
                  {!isAccessible && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      🔒 Premium
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default RoadmapTestCard;
