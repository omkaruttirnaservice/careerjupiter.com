// src/api.js
import axios from "axios";

const baseURL = "http://192.168.1.17:5000/api";

export const fetchUniversities = async () => {
  try {
    const response = await axios.get(`${baseURL}/university/all`);
    const parsedData = JSON.parse(response.data?.data || "{}");
    return parsedData?.universities || [];
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw error;
  }
};
