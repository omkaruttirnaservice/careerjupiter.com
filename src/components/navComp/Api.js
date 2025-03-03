// api/reviewApi.js
import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

// const baseURL = "http://192.168.1.5:5000/api";

/**
 * Handles API requests for fetching or submitting reviews.
 * @param {string} action - "fetch" or "submit"
 * @param {object} [payload] - Data for submission or fetch (e.g., { id } for fetch or reviewData for submit)
 * @returns {Promise<any>} - The API response data
 */
export const handleReviews = async (action, payload = {}) => {
  try {
    let response;

    if (action === "fetch") {
      const { id } = payload;
      if (!id) throw new Error("College ID is required to fetch reviews.");
      response = await axios.get(`${BASE_URL}/api/reviews/${id}?type=college`);
    } 
    
    else if (action === "submit") {
      response = await axios.post(
        `${BASE_URL}/api/reviews/create?type=college`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
    } 
    
    else {
      throw new Error("Invalid action. Use 'fetch' or 'submit'.");
    }

    if (![200, 201].includes(response.data?.statusCode)) {
      throw new Error(response.data?.message || "Request failed.");
    }

    return action === "fetch" ? JSON.parse(response.data.data || "[]") : response.data;

  } catch (error) {
    throw error.response?.data || error.message;
  }
};
