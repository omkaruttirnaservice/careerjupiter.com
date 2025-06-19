// api/universityApi.js
import axios from 'axios';
import { BASE_URL } from '../../utils/constansts';

export const getUniversity = async (id) => {
	const response = await axios.get(`${BASE_URL}/api/university/${id}`);
	return JSON.parse(response.data.data);
};

export const fetchUniversities = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/api/university/all`);
		const parsedData = response.data?.data || '{}';
		return parsedData?.universities || [];
	} catch (error) {
		console.error('Error fetching universities:', error);
		throw error;
	}
};


export const searchUniversity = async (params = {}) => {
  const response = await axios.get(`${BASE_URL}/api/search/university`, {
    params: {
      ...params,
      type: "university",
    },
  });
  return response.data?.results || [];
};


// Fetch a single university by ID
export const fetchUniversityById = async (id) => {
	try {
		const response = await axios.get(`${BASE_URL}/api/university/${id}`);
		const parsedData = response.data?.data || '{}';
		return parsedData || {};
	} catch (error) {
		console.error('Error fetching university details:', error);
		throw error;
	}
};

// Fetch courses by university ID
export const fetchCoursesByUniversityId = async (universityId) => {
	if (!universityId) throw new Error('University ID is required');
	const response = await axios.get(`${BASE_URL}/api/university/course/${universityId}`);
	return response.data?.data?.courses || [];
};

