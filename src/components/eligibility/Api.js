import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

//get dist
export const getDist = () => {
  return axios.get(`${BASE_URL}/api/college/Dist`);
};

//get current education
export const getFutureCategory = () => {
  return axios.get(`${BASE_URL}/api/college/all-category`);
};

//get cast education
export const getCastList = () => {
  return axios.get(`${BASE_URL}/api/caste/all`);
};

// get Eligible Colleges
export const getEligibleColleges = ({
  percentage,
  caste,
  category,
  district,
  subCategory,
}) => {
  return axios.get(
    `${BASE_URL}/api/eligibility/colleges/eligible`,
    {
      params: {
        percentage,
        caste,
        category,
        district,
        subCategory,
      },
    }
  );
};

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

// 🔹 Logs user activity
// export const logUserActivity = ({ userId, collegeId, token }) =>
//   axios.post(
//     `${BASE_URL}/api/user/activity`,
//     { userId, collegeId },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );

  
// 🔹 Sends OTP
export const sendOtp = (mobile_no) => {
  return axios.post(`${BASE_URL}/api/auth/send-otp`, {
    mobile_no,
    role: "USER",
  });
};


// 🔹 Verifies OTP
export const verifyOtp = (mobile_no, otp, reference_id) => {
  return axios.post(`${BASE_URL}/api/auth/verify-otp`, {
    mobile_no,
    otp,
    reference_id, // 🆕 Required now
  });
};


// 🔹 Logs in user (signup if needed)
export const userLogin = (mobile_no) =>
  axios.post(`${BASE_URL}/api/auth/user-login`, { mobile_no });