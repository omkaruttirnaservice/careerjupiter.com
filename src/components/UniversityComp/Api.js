// src/api.js
import axios from "axios";
import { BASE_URL } from "../../utils/constansts";


export const fetchUniversities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/university/all`);
    const parsedData = JSON.parse(response.data?.data || "{}");
    return parsedData?.universities || [];
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw error;
  }
};
