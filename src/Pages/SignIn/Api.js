import axios from 'axios';
import { BASE_URL } from '../../utils/constansts';
// const api = axios.create({
//   baseURL: "http://192.168.1.5:5000",
// });

export const userSignUp = (data) => {
	return axios.post(`${BASE_URL}/api/auth/signin`, data);
};

export const getCollege = async (id) => {
	const response = await axios.get(`/api/college/${id}`);
	return response.data.data;
};
