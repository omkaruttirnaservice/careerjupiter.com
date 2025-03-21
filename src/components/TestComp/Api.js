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
