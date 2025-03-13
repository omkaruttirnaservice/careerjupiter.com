import axios from "axios";
import { BASE_URL } from "../../utils/constansts";
// const api = axios.create({
//   baseURL: "http://192.168.1.5:5000",
// });

export const userSignUp = async (data) => {
  return await axios.post(`${BASE_URL}/api/auth/signup`, data);
};


export const loginUser = async (userData) => {
  console.log({ userData });

  const response = await fetch(`${BASE_URL}/api/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return await response.json();
};
export const getCollege = async (id) => {
  const response = await axios.get(`/api/college/${id}`);
  return response.data.data;
};
