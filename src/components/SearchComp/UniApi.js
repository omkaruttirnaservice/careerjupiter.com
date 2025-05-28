// UniApi.js
import axios from "axios";

const BASE_URL = "http://192.168.1.7:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export const getUniversityCategory = async () => {
  try {
    const response = await api.get("/university/search/Allcat");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch categories");
  }
};

export const getUniversityDist = async () => {
  try {
    const response = await api.get("/university/search/Dist");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch districts");
  }
};

export const searchUniversity = async (params = {}) => {
  try {
    const response = await api.get("/search/university", { 
      params: {
        ...params,
        type: "university"
      } 
    });
    return response.data?.results || response.data || [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Search failed");
  }
};