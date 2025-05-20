import axios from 'axios';
import { BASE_URL } from '../../utils/constansts';



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
