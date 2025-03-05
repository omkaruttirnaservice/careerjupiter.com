import { BASE_URL } from '../../utils/constansts';
import axios from 'axios';


export const fetchInstitutesData = async () => {
	try {
		const response = await fetch(`${BASE_URL}/api/class/all`);
		const result = await response.json();

		if (result.success && result.data) {
			const parsedData =
				typeof result.data === 'string'
					? result.data.classes
					: result.data.classes;

			// Format the data as required by your UI
			const formattedInstitutes = parsedData.map((cls) => ({
				id: cls._id,
				name: cls.className,
				rank: 5,
				successRatio:
					cls.admissionEntranceDetails?.lastYearCutoffMarks || 'N/A',
				image: cls.image.startsWith('http')
					? cls.image
					: `${BASE_URL}${cls.image}`,
				description: cls.info?.description || 'No description available',
				category: cls.Category || 'N/A',
				location: `${cls.address?.line1}, ${cls.address?.line2}, ${cls.address?.dist}`,
			}));

			return formattedInstitutes;
		} else {
			throw new Error('API response did not return expected data.');
		}
	} catch (error) {
		console.error('Error fetching institutes:', error);
		throw error;
	}
};
export const handleReviews = async (action, payload = {}) => {
	try {
		let response;

		if (action === 'fetch') {
			const { id } = payload;
			if (!id) throw new Error('class ID is required to fetch reviews.');
			response = await axios.get(`${BASE_URL}/api/reviews/${id}?type=class`);
		} else if (action === 'submit') {
			response = await axios.post(
				`${BASE_URL}/api/reviews/create?type=class`,
				payload,
				{ headers: { 'Content-Type': 'application/json' } }
			);
		} else {
			throw new Error("Invalid action. Use 'fetch' or 'submit'.");
		}

		if (![200, 201].includes(response.data?.statusCode)) {
			throw new Error(response.data?.message || 'Request failed.');
		}

		return action === 'fetch' ? response.data.data || '[]' : response.data;
	} catch (error) {
		throw error.response?.data || error.message;
	}
};
