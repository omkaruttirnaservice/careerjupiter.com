// const API_URL = "http://192.168.1.5:5000/api/auth/signin"; // ✅ Correct API URL

import { BASE_URL } from "../../utils/constansts";

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Login API Error:", error.message);
    throw error;
  }
};
