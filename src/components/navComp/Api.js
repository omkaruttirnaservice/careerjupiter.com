import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

/**
 * Fetch user details by userId.
 * @param {string} userId - ID of the logged-in user.
 * @returns {Promise<any>} - The fetched user details.
 */
export const fetchUserDetails = async (userId) => {
  const response = await axios.get(`${BASE_URL}/api/auth/${userId}`);
  return response.data;
};

/**
 * Fetch reviews for a specific college.
 * @param {object} payload - { id, type }
 * @returns {Promise<any>} - The fetched reviews.
 *
 */
export const fetchReviews = async ({ id, type }) => {
  const response = await axios.get(
    `${BASE_URL}/api/reviews/${id}?type=${type}`
  );
  return response.data.data;
};

/**
 * Submit a new review.
 * @param {object} data - Review details (id, studentMobile, starRating, description).
 * @returns {Promise<any>} - The API response.
 */
export const submitReview = async (data) => {
  // console.log(`${BASE_URL}/api/reviews/create?type=college`)
  const response = await axios.post(
    // `${BASE_URL}/api/reviews/create?${data.id}type=${data.type}`,
    `${BASE_URL}/api/reviews/create?type=${data.type}`,
    data,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};
