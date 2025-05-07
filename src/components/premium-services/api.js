// api/enquiryApi.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.9:5000/api/enquiry',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendOtp = async ({ name, mobile }) => {
  const res = await API.post('/send-otp', {
    f_name: name,
    mobile_no: mobile,
    enqType: 'consulting',
  });
  return res.data;
};

export const verifyOtp = async ({ name, mobile, referenceId, otp }) => {
  const res = await API.post('/verify-otp', {
    f_name: name,
    mobile_no: mobile,
    reference_id: referenceId,
    otp,
    enqType: 'consulting',
  });
  return res.data;
};

export const addPremiumEnquiry = async ({ userId, token }) => {
  const res = await API.post(
    '/add',
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
