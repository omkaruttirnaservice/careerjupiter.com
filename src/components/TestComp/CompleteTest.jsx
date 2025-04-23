import { useSelector } from "react-redux";
import TestCard from "./TestCard";
import { useMutation } from "@tanstack/react-query";
import { getCompletedTest} from "./Api";
import { useEffect } from "react";
import { getAuthHeader } from "../../utils/mics";

const CompleteTest = () => {
  const { userId } = useSelector((state) => state.auth);

  const {
    mutate: fetchInCompetedTests,
    data: inCompletedTestData,
    isLoading: isInCompletedLoading,
    isError: isCompetedError,
    error: inCompletedError,
  } = useMutation({
    mutationFn: (payload) =>
      getCompletedTest(payload, {
        headers: {
          Authorization: getAuthHeader(),
        },
      }),
  });

  useEffect(() => {
    if (userId) {
      fetchInCompetedTests({ userId });
    }
  }, [userId, fetchInCompetedTests]);

  return (
    <>
      <h2 className="text-center text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-300 to-green-600 py-3 px-8 rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
        Completed Tests
      </h2>

      {isInCompletedLoading && <p>Loading...</p>}
      {isCompetedError && <p>Error: {inCompletedError.message}</p>}
      <TestCard
        externalCompetedTestList={inCompletedTestData?.data?.data || []}
      />
    </>
  );
};

export default CompleteTest;
