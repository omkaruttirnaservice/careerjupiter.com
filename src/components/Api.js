import axios from 'axios';
import { BASE_URL } from '../utils/constansts';
import { getAuthHeader } from '../utils/mics';

// const api = axios.create({
//   baseURL: "http://192.168.1.5:5000",
// });

export const getCollege = async (id) => {
	const response = await axios.get(`${BASE_URL}/api/college/${id}`, {});
	console.log(response.data.data , 'get college ')
	return response.data.data;
};
