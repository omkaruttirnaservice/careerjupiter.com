import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

// Get User Data
export const getUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/api/auth/${userId}`);
  return response.data;
};

// Add Education
export const setEducation = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/education/add`, data);
  return response.data;
};

// Update Education
export const updateEducation = async (data) => {
  console.log("inside education update api===", data.educationData);
  
  const response = await axios.put(
    `${BASE_URL}/api/education/${data.user_id}`,
    data.educationData
  );
  return response.data;
};

// Update User Profile API
export const updateUserProfile = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/auth/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
