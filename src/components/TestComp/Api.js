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

export const sendResult = (data) => {
  return axios.post(`${BASE_URL}/api/result/create`, data);
};

export const createGuestUser = async (data) => {
  return await axios.post(`${BASE_URL}/api/auth/signup?role=GUEST`, data);
};

export const getTestResult = (data) => {
  return axios.get(`${BASE_URL}/api/iqtest/${data}`);
};

export const getUserDetail = (id) => {
  return axios.get(`${BASE_URL}/api/auth/${id}`);
};

export const updateUserDetails = (data) => {
  console.log({ data });

  return axios.put(`${BASE_URL}/api/auth/${data.userId}`, {
    mobile_no: data.mobile_no,
  });
};

export const sendShareState = (data) => {
  return axios.post(`${BASE_URL}/api/result/updation`, data);
};