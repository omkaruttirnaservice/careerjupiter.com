import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

export const searchCollege = async ({ searchKey, category, type }) => {
  // if (!type) return;
  const response = await axios.get(
    `${BASE_URL}/api/search/?searchKey=${searchKey}&Category=${category}&type=${type}`
  );
  return response.data;
};

export const getCollegeCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/college/categories/all`);
  return response.data;
};

export const getCollegeDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/college/Dist`);
  return response.data;
};