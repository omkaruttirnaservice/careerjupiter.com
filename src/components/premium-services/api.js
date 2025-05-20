import axios from 'axios';
import { BASE_URL } from '../../utils/constansts';
<<<<<<< HEAD


=======

const API = axios.create({
  baseURL: `${BASE_URL}/api/enquiry`,
  headers: {
    'Content-Type': 'application/json',
  },
});
>>>>>>> c9574584e5e88dbcc105095d47243dcb1347f56c

export const sendOtp = async ({ name, mobile }) => {
  const res = await axios.post(`${BASE_URL}/api/enquiry/send-otp`, {
    f_name: name,
    mobile_no: mobile,
    enqType: 'consulting',
  });
  return res.data;
};

export const verifyOtp = async ({ name, mobile, referenceId, otp }) => {
  const res = await axios.post(`${BASE_URL}/api/enquiry/verify-otp`, {
    f_name: name,
    mobile_no: mobile,
    reference_id: referenceId,
    otp,
    enqType: 'consulting',
  });
  return res.data;
};

export const addPremiumEnquiry = async ({ userId, token }) => {
  const res = await axios.post(`${BASE_URL}/api/enquiry/add`,
    {
      enqType: 'Premium Service',
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
