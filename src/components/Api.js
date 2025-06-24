import axios from 'axios';
import { BASE_URL } from '../utils/constansts';
import { getAuthHeader } from '../utils/mics';



export const getCollege = async (id) => {
	const response = await axios.get(`${BASE_URL}/api/college/${id}`, {});
	// console.log(response.data.data , 'get college ')
	return response.data.data;
};

// 🔹 Logs user activity
export const logUserActivity = ({ userId, collegeId, token }) =>
  axios.post(
    `${BASE_URL}/api/user/activity`,
    { userId, collegeId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
