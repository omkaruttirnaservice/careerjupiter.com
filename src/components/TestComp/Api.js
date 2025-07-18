import axios from "axios";
import { BASE_URL } from "../../utils/constansts";
import { getAuthHeader } from "../../utils/mics";

// export const getTest = async (testLevel) => {
//   const response = await axios.get(`${BASE_URL}/api/iqtest?type=${testLevel}`, {
//     headers: {
//       Authorization: getAuthHeader(),
//     },
//   });
//   return response.data;
// };

// export const getIqTestCategory = async () => {
//   const response = await axios.get(`${BASE_URL}/api/iq_category/all`);
//   return response.data;
// };

export const getTestResult = async (testId) => {
  const response = await axios.get(`${BASE_URL}/api/result/${testId}`, {
    headers: {
      Authorization: getAuthHeader(),
    },
  });
  return response.data;
};
export const sendResult = (data) => {
  return axios.post(`${BASE_URL}/api/iqtest/submit`, data);
};

export const createGuestUser = async (data) => {
  return await axios.post(`${BASE_URL}/api/auth/signup?role=GUEST`, data);
};

export const getUserDetail = (id) => {
  return axios.get(`${BASE_URL}/api/auth/${id}`);
};

export const updateUserDetails = (data) => {

  return axios.put(`${BASE_URL}/api/auth/${data.userId}`, {
    f_name: data.f_name,
    mobile_no: data.mobile_no,
  });
};

export const sendShareState = (data) => {
  return axios.post(`${BASE_URL}/api/result/updation`, data);
};

export const getResult = (userData) => {
  return axios.post(`${BASE_URL}/api/iqtest/result`, userData);
};

export const sendUserOTP = async (payload) => {
  const response = await axios.post(`${BASE_URL}/api/auth/send-otps`, payload);
  return response.data;
};

export const verifyUserOTP = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/api/auth/verify-otps`,
    payload
  );
  return response.data;
};

export const getIQTestData = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/api/iqtest/questions`,
    payload
  );
  return response.data;
};

export const deleteTest = async (userTestData) => {
  return await axios.post(`${BASE_URL}/api/iqtest/delete`, userTestData);
};

export const updateTestProgress = (data) => {
  return axios.put(`${BASE_URL}/api/iqtest/update`, {
    userId: data.userId,
    testID: data.iqTestId, //iqTestId: data.iqTestId,
    questionId: data.questionId,
    selectedOption: data.selectedOption,
    testDuration: data.testDuration,
    iqTestId: data.resultId, //resultID: data.resultId,
    status: data.status,
  });
};

export const getMainTest_Category = () => {
  return axios.post(`${BASE_URL}/api/iq_category/main-categories`);
};

export const getInProgressTest = (payload, config) => {
  return axios.post(
    `${BASE_URL}/api/iqtest/get-iq-test-list-by-user-in-progress`,
    payload,
    config
  );
};

export const getCompletedTest = (payload, config) => {
  return axios.post(
    `${BASE_URL}/api/iqtest/get-iq-test-list-by-user-complete`,
    payload,
    config
  );
};

export const uploadReport = (payload) => {
  return axios.post(
    `${BASE_URL}/api/iqtest/upload-pdf`,
    payload,
  );
};

export const uploadCertificate = (payload) => {
  return axios.post(
    `${BASE_URL}/api/iqtest/upload-pdf`,
    payload,
  );
};

//for only roadmap by id 




export const getRoadmapTests = async (roadmapId) => {
  const response = await axios.get(`${BASE_URL}/api/search/iQtest?roadmap=${roadmapId}`, {
    headers: {
      Authorization: getAuthHeader(),
    },
  })
  return response.data
}