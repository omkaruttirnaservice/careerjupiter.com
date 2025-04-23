// import Cookies from "js-cookie";
// export function getAuthHeader() {
//   const token = Cookies.get("token");
//   return `Bearer ${token ? token : ""}`;
// }


import Cookies from "js-cookie";

/**
 * Safely retrieves the Authorization header with the Bearer token.
 * Logs errors and ensures a clean fallback if token is missing or malformed.
 *
 * @returns {string} - Authorization header value.
 */
export function getAuthHeader() {
  try {
    const token = Cookies.get("token");

    if (!token || typeof token !== "string") {
      console.warn("Token not found or invalid.");
      return "Bearer";
    }

    return `Bearer ${token}`;
  } catch (error) {
    console.error("Failed to get auth header:", error);
    return "Bearer";
  }
}
