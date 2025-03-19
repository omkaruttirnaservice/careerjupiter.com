import axios from "axios";
import { BASE_URL } from "../../utils/constansts";


export const getUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/api/auth/${userId}`);
  return response.data;
};

export const setEducation = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/education/add`, data);
  return response.data;
};

export const updateEducation = async (data) => {
  const response = await axios.put(
    `${BASE_URL}/api/education/${data.user_id}`,
    data.educationData
  );
  return response.data;
};
