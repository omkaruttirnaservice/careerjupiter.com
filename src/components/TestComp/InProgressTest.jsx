import { useSelector } from "react-redux";
import TestCard from "./TestCard";
import { useMutation } from "@tanstack/react-query";
import { getInProgressTest } from "./Api";
import { useEffect } from "react";
import { getAuthHeader } from "../../utils/mics";
import dataNotFound from "../../assets/images/dataNotFound.jpg";
import LoadingTestCard from "../loading-skeleton/LoadingTestCard";

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

  const testList = inProgressTestsData?.data?.data;

  return (
    <>
      {!isInProgressLoading && !isInProgressError && testList?.length === 0 && (
        <>
          <div className="flex justify-center items-center flex-col mt-5">
            <img
              src={dataNotFound}
              alt="No image found"
              className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
            />
            <p className="text-center text-gray-800">
              No In-progress test data found
            </p>
          </div>
        </>
      )}
      {isInProgressLoading && <LoadingTestCard />}
      <TestCard externalTestList={inProgressTestsData?.data?.data || []} />
    </>
  );
};

export default InProgressTest;
