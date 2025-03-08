// api.js
import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://192.168.1.5:5000/api", // Your API base URL
});

// Fetch cutoffs
export const fetchCutoffs = async () => {
  const response = await axiosInstance.get("/cutoff/all");
  return response.data.usrMsg;
};

// Fetch eligible colleges
export const fetchEligibleColleges = async (params) => {
  const response = await axiosInstance.get(`/eligibility/colleges`, { params });
  return response.data;
};