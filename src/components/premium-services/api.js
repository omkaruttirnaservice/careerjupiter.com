// api/enquiryApi.js
import axios from 'axios';
import { BASE_URL } from '../../utils/constansts';

const API = axios.create({
  baseURL: `${BASE_URL}/api/enquiry`,
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
