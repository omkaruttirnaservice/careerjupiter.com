// api.js
import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

// Create an Axios instance
// const axiosInstance = axios.create({
//   baseURL: "http://192.168.1.20:5000", // Your API base URL
// });
 
// Fetch cutoffs
export const fetchCutoffs = async () => {
  const response = await axios.get(`${BASE_URL}/api/cutoff/all`);
  return response.data.usrMsg;
};

// Fetch eligible colleges
export const fetchEligibleColleges = async (selectedData) => {
  const response = await axios.get(
    `${BASE_URL}/api/eligibility/colleges?education=${selectedData.education}&percentage=${selectedData.percentage}&caste=${selectedData.caste}&district=${selectedData.district}&year=2023`
  );
  return response.data;
};