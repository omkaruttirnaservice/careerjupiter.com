import axios from 'axios';
import { BASE_URL } from '../../utils/constansts';

export const searchCollege = async ({ searchKey, category, type }) => {
	// if (!type) return;
	const response = await axios.get(
		`${BASE_URL}/api/search/?searchKey=${searchKey}&Category=${category}&type=${type}`
	);
	return response.data;
};
