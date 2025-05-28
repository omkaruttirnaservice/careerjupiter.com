import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

export const GetSearchCollege = async ({ searchKey, category, type, dist }) => {
  // if (!type) return;
  const response = await axios.get(
    `${BASE_URL}/api/search/college/?searchKey=${searchKey}&category=${category}&type=${type}&dist=${dist}`
  );

  // console.log(response.data , 'respose getserach college')
  return response.data;

};

export const GetSearchClass = async ({ searchKey, category, type, dist }) => {
  // if (!type) return;
  const response = await axios.get(
    `${BASE_URL}/api/search/class/?searchKey=${searchKey}&category=${category}&type=${type}&dist=${dist}`
  );
  return response.data;
};



export const GetSearchUniversity = async ({ searchKey, category, type, dist }) => {
  const response = await axios.get(
    `${BASE_URL}/api/search/university/?searchKey=${searchKey}&category=${category}&type=${type}&dist=${dist}`
  );
  console.log(response.data.data.results, 'university ');
  return response.data.data;
};



export const getCollegeCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/college/Category`);
  return response.data;
};

export const getCollegeDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/college/Dist`);
  return response.data;
};

export const getClassCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/class/Category`);
    // console.log(response.data, "responpasdof catory")

  return response.data;
};

export const getClassDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/class/Dist`);
  return response.data;
};

export const getUniversityCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/university/search/Allcat`);
  return response.data;
};

export const getUniversityDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/university/search/Dist`);
  return response.data;
};


