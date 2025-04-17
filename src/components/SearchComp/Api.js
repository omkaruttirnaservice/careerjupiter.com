import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

// export const searchCollege = async ({ searchKey, category, type }) => {
//   // if (!type) return;
//   const response = await axios.get(
//     `${BASE_URL}/api/search/?searchKey=${searchKey}&Category=${category}&type=${type}`
//   );
//   return response.data;
// };

export const GetSearchCollege = async ({ searchKey, category, type, dist }) => {
  // if (!type) return;
  const response = await axios.get(
    `${BASE_URL}/api/search/?searchKey=${searchKey}&category=${category}&type=${type}&dist=${dist}`
  );
  return response.data;
};

export const GetSearchClass = async ({ searchKey, category, type, dist }) => {
  // if (!type) return;
  const response = await axios.get(
    `${BASE_URL}/api/search/?searchKey=${searchKey}&category=${category}&type=${type}&dist=${dist}`
  );
  return response.data;
};

export const getCollegeCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/college/search`);
  return response.data;
};

export const getCollegeDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/college/Dist`);
  return response.data;
};

export const getClassCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/class/search`);
  return response.data;
};

export const getClassDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/class/Dist`);
  return response.data;
};

export const getUniversityCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/class/categories/all`);
  return response.data;
};

export const getUniversityDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/class/Dist`);
  return response.data;
};