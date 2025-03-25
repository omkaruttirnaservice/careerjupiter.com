import axios from "axios";
import { BASE_URL } from "../../utils/constansts";
import { getAuthHeader } from "../../utils/mics";

export const getTest = async (testLevel) => {
  const response = await axios.get(`${BASE_URL}/api/iqtest?type=${testLevel}`, {
    headers: {
      Authorization: getAuthHeader(),
    },
  });
  return response.data;
};

export const getTestResult = async (testId) => {
  const response = await axios.get(`${BASE_URL}/api/result/${testId}`, {
    headers: {
      Authorization: getAuthHeader(),
    },
  });
  return response.data;
};
export const sendResult = (data) => {
  return axios.post(`${BASE_URL}/api/result/create`, data);
};

export const createGuestUser = async (data) => {
  return await axios.post(`${BASE_URL}/api/auth/signup?role=GUEST`, data);
};

export const getUserDetail = (id) => {
  return axios.get(`${BASE_URL}/api/auth/${id}`);
};

export const updateUserDetails = (data) => {
  console.log({ data });

  return axios.put(`${BASE_URL}/api/auth/${data.userId}`, {
    f_name: data.f_name,
    mobile_no: data.mobile_no,
  });
};

export const sendShareState = (data) => {
  return axios.post(`${BASE_URL}/api/result/updation`, data);
};

export const getResult = (userData) => {
  return axios.get(
    `${BASE_URL}/api/result?iqTestId=${userData.iqTestId}&userId=${userData.userId}`
  );
};

export const sendUserOTP = async (payload) => {
  const response = await axios.post(`${BASE_URL}/api/auth/send-otp`, payload);
  return response.data;
};

export const verifyUserOTP = async (payload) => {
  const response = await axios.post(`${BASE_URL}/api/auth/verify-otp`, payload);
  return response.data;
};