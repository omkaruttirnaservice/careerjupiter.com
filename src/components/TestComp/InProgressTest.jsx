import { useSelector } from "react-redux";
import TestCard from "./TestCard";
import { useMutation } from "@tanstack/react-query";
import { getInProgressTest } from "./Api";
import { useEffect } from "react";
import { getAuthHeader } from "../../utils/mics";

const InProgressTest = () => {
  const { userId } = useSelector((state) => state.auth);

  const {
    mutate: fetchInProgressTests,
    data: inProgressTestsData,
    isLoading: isInProgressLoading,
    isError: isInProgressError,
    error: inProgressError,
  } = useMutation({
    mutationFn: (payload, config) =>
      getInProgressTest(payload, {
        headers: {
          Authorization: getAuthHeader(),
        },
      }),
  });

  useEffect(() => {
    if (userId) {
      fetchInProgressTests({ userId });
    }
  }, [userId, fetchInProgressTests]);

  return (
    <>
      <h2 className="text-center text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-600 py-3 px-8 rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
        In-Progress Test
      </h2>
      {isInProgressLoading && <p>Loading...</p>}
      {isInProgressError && <p>Error: {inProgressError.message}</p>}
      <TestCard externalTestList={inProgressTestsData?.data?.data || []} />
    </>
  );
};

export default InProgressTest;
