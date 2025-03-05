// api/universityApi.js
import axios from 'axios';
import { BASE_URL } from '../../utils/constansts';

export const getUniversity = async (id) => {
	const response = await axios.get(`${BASE_URL}/api/university/${id}`);
	return JSON.parse(response.data.data);
};
// Base API URL
// const BASE_URL = 'http://192.168.1.5:5000';

// Fetch all universities
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
