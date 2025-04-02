import axios from "axios";
import { BASE_URL } from "../../utils/constansts";
// const api = axios.create({
//   baseURL: "http://192.168.1.5:5000",
// });

export const userSignUp = async (data) => {
  return await axios.post(`${BASE_URL}/api/auth/signup`, data);
};



export const loginUser = async (userData) => {
  console.log({ userData });

  const response = await fetch(`${BASE_URL}/api/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return await response.json();
};


// Fetch profile status by userId
export const fetchProfileStatusAPI = async (userId) => {
  const response = await axios.get(`${BASE_URL}/api/auth/status/${userId}`);
  return response.data;
};

// Update user profile
export const updateUserProfile = async ({ userId, values }) => {
  const response = await axios.put(`${BASE_URL}/api/auth/${userId}`, values);
  return response;
};

export const sendOTP = async (payload) => {
  const response = await axios.post(`${BASE_URL}/api/auth/send-otp`, payload);
  return response.data;
};

export const verifyOTP = async (payload) => {
  const response = await axios.post(`${BASE_URL}/api/auth/verify-otp`, payload);
  return response.data;
};


export const getCollege = async (id) => {
  const response = await axios.get(`/api/college/${id}`);
  return response.data.data;
};

export const forgotPassword = async (mobile_no) => {
  const response = await axios.post(`${BASE_URL}/api/auth/forgot`, { mobile_no });
  return response.data;
};


export const verifyResetOtp = async (payload) => {
 
    const response = await fetch(`${BASE_URL}/api/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    return await response.json()
  
}

export const resetPassword = async (payload) => {
 
   const response = await fetch(`${BASE_URL}/api/auth/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    return await response.json()
 
}
